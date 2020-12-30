var currentTimeZone  = Session.getScriptTimeZone();
var currentTimestamp = Utilities.formatDate(new Date(), currentTimeZone, "MM-dd-yyyy HH:mm:ss");

function buildJSONRequestImgUrl(Base64string, ai_type) {

return JSON.stringify({
  requests: [{
    image: {
      content: Base64string
    },
    features: [{
      type: ai_type,
      maxResults: 10
      }]
    }]
  });
}

function makeRequest(Base64string, ai_type, rowkey, createdby) {
// Make a POST request to Vision API with a JSON payload containing the base64 encoding of our image      
var visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' + visionApiKey;
var JSON_REQ = buildJSONRequestImgUrl(Base64string, ai_type);
var options = {
  'method': 'post',
  'contentType': 'application/json',
  'payload': JSON_REQ
  };
var response = UrlFetchApp.fetch(visionApiUrl, options);
var parsedResponse = JSON.parse(response.getContentText());

// comment or uncomment to debug as needed:
// Logger.log(parsedResponse);

var aiDict = {};

if (ai_type == 'OBJECT_LOCALIZATION' && parsedResponse.responses[0].localizedObjectAnnotations) {
      // let's try to count objects and return a dictionary of that count
      parsedResponse.responses[0].localizedObjectAnnotations.forEach( function (localizedObjectAnnotations) {
      var thisThing = localizedObjectAnnotations.name;
      // the object_localization feature is a count of items discovered, 
      // so let's increment to our dictionary for each item
      if (aiDict[thisThing]) {          
        aiDict[thisThing] = aiDict[thisThing] + 1;
      } else {
        aiDict[thisThing] = 1;
      }
  });
      // attributeWriter is in constants.gs
      for (let [key, value] of Object.entries(aiDict)) {
      attributeWriter.appendRow([genRandomKey(),rowkey, ai_type, key, value, currentTimestamp, createdby])
        }
  return aiDict;
}
else if (ai_type == 'LABEL_DETECTION') {
      // let's get the top NN labels found and their score
      parsedResponse.responses[0].labelAnnotations.forEach( function (labelAnnotations) {
        var thisThing = labelAnnotations.description;       
        aiDict[thisThing] = labelAnnotations.score;
      });
      // attributeWriter is in constants.gs
      for (let [key, value] of Object.entries(aiDict)) {
        attributeWriter.appendRow([genRandomKey(),rowkey, ai_type, key, value, currentTimestamp, createdby])
      }
  return aiDict;
}
else if (ai_type == 'TEXT_DETECTION' && parsedResponse.responses[0].textAnnotations) {
      // seems to work, I need to learn this particular feature better
      parsedResponse.responses[0].textAnnotations.forEach( function (textAnnotations) {
        var thisThing = textAnnotations.description;
        // if it's a big chunk of text it worked, so let's return that
        if (thisThing.length > 30) {
        aiDict['Text'] = textAnnotations.description;
        }
      });
  return aiDict;
}
else if (ai_type == 'IMAGE_PROPERTIES' && parsedResponse.responses[0].imagePropertiesAnnotation.dominantColors) {
      // get the primary colors
      // we're ignoring a majority of the image properties sent back to us
      parsedResponse.responses[0].imagePropertiesAnnotation.dominantColors.colors.forEach( function (colors) {      
        var thisColor = colors.color;
        var thisRed = colors.color.red;
        var thisGreen = colors.color.green;
        var thisBlue = colors.color.blue;
        var thisScore = colors.score;
        colorsWriter.appendRow([genRandomKey(),rowkey, thisColor, thisRed, thisGreen, thisBlue, thisScore, currentTimestamp, createdby]);
      });

  aiDict['Color Info'] = 'Stored in seperate Colors table';
  return aiDict;
}
else if (ai_type == 'LOGO_DETECTION' && parsedResponse.responses[0].logoAnnotations) {
      parsedResponse.responses[0].logoAnnotations.forEach( function (logoAnnotations) {
        var thisThing = logoAnnotations.description;
        aiDict[thisThing] = logoAnnotations.score;
      });
      for (let [key, value] of Object.entries(aiDict)) {
          // attributeWriter is in constants.gs
          attributeWriter.appendRow([genRandomKey(),rowkey, ai_type, key, value, currentTimestamp, createdby])
      }
  return aiDict;
}
else if (ai_type == 'LANDMARK_DETECTION' && parsedResponse.responses[0].landmarkAnnotations) {
      parsedResponse.responses[0].landmarkAnnotations.forEach( function (landmarkAnnotations) {
        var thisThing = landmarkAnnotations.description;
        aiDict[thisThing] = landmarkAnnotations.score;
      });
      for (let [key, value] of Object.entries(aiDict)) {
        attributeWriter.appendRow([genRandomKey(),rowkey, ai_type, key, value, currentTimestamp, createdby])
      }    
  return aiDict;
}
else if (ai_type == 'SAFE_SEARCH_DETECTION' && parsedResponse.responses[0].safeSearchAnnotation) {
    aiDict['Adult'] = parsedResponse.responses[0].safeSearchAnnotation.adult;
    aiDict['Medical'] = parsedResponse.responses[0].safeSearchAnnotation.medical;
    aiDict['Spoof'] = parsedResponse.responses[0].safeSearchAnnotation.spoof;
    aiDict['Violence'] = parsedResponse.responses[0].safeSearchAnnotation.violence;
    aiDict['Racy'] = parsedResponse.responses[0].safeSearchAnnotation.racy;
    return aiDict;
}
else if (ai_type == 'FACE_DETECTION' && parsedResponse.responses[0].faceAnnotations) {

    parsedResponse.responses[0].faceAnnotations.forEach( function (faceAnnotations) {

      thisFace = faceAnnotations;
      aiDict['joyLikelihood'] = thisFace.joyLikelihood;
      aiDict['sorrowLikelihood'] = thisFace.sorrowLikelihood;
      aiDict['angerLikelihood'] = thisFace.angerLikelihood;
      aiDict['surpriseLikelihood'] = thisFace.surpriseLikelihood;
      aiDict['underExposedLikelihood'] = thisFace.underExposedLikelihood;
      aiDict['blurredLikelihood'] = thisFace.blurredLikelihood;
      aiDict['headwearLikelihood'] = thisFace.headwearLikelihood;

      thisFace.landmarks.forEach( function (landmarks) {
        thisLandmark = JSON.stringify(landmarks.type);
        thisType = landmarks.type;
        thisPosition = landmarks.position;
        thisX = thisPosition.x;
        thisY = thisPosition.y;
        thisZ = thisPosition.z;
        // facialLandmarksWriter is in constants.gs
        facialLandmarksWriter.appendRow([genRandomKey(),rowkey, thisType, thisX, thisY, thisZ, currentTimestamp, createdby]);
      });
    } );

    for (let [key, value] of Object.entries(aiDict)) {
      attributeWriter.appendRow([genRandomKey(),rowkey, ai_type, key, value, currentTimestamp, createdby])
    }
  return aiDict;
}
else {
  Logger.log("got here without a supported feature type or there were no results returned for the feature: " + ai_type);
  return JSON.stringify(parsedResponse.responses);
}
}