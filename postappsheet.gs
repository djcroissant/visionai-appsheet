// construct a full rest api post to Appsheet
// NOTE: This .gs file is no longer used. The return value is processed 
// directly in AppSheet. Keeping this as an example of an alternative method

function buildPost(postBody) {
  var postParentOptions = 
      {
        "method" : "POST",
        "headers" : {
          "applicationAccessKey" : appsheetApiKey,
          "Content-Type" : "application/json"
        },
        "payload" : JSON.stringify(postBody)
      };
  
  return postParentOptions;
}

function buildAlertsPost(rowkey, createdby) {
  var postAlertsBody = 
      {
        "Action": "Add",
        "Properties": {
          "Locale": "en-US",
          "Location": "47.623098, -122.330184",
          "Timezone": "Pacific Standard Time",
          "RunAsUserEmail": "derekco@google.com"
        },
        "Rows": [      {
         "InventoryID": rowkey,
         "createdby": createdby
        }]
      };
  
  return buildPost(postAlertsBody);
}

function buildInventoryPost(rowkey, ai_final_response, DriveImageWidth, DriveImageHeight) {
  var postInventoryBody = 
      {
        "Action": "Edit",
        "Properties": {
          "Locale": "en-US",
          "Location": "47.623098, -122.330184",
          "Timezone": "Pacific Standard Time",
          "RunAsUserEmail": "derekco@google.com"
        },
        "Rows": [      {
         "Key": rowkey,
         "Status": "Analysis complete",
         "Dictionary": ai_final_response,
         "Width": DriveImageWidth,
         "Height": DriveImageHeight
        }]
      };
  
  return buildPost(postInventoryBody);
}

