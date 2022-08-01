function main(rowkey, createdby, theImagevalue, ai_type) {
  ai_type = ai_type.map(String);
  Logger.log("running these feature types: " + ai_type);
  
  var ai_final_response = '';


  try {
    var localFileName =           imagefolder.getFilesByName(theImagevalue.split("/")[1]).next();  
    var theFileID =               getFileByName(localFileName);
    var driveImage =              DriveApp.getFileById(theFileID.id).getBlob();

    var DriveImageWidth =         getSize(driveImage).width;
    var DriveImageHeight =        getSize(driveImage).height;

    var encoded =                 Utilities.base64Encode(driveImage.getBytes());

    Logger.log(ai_type);
  
    for (var ai in ai_type) {

        // makeRequest() is where the bulk of work is performed
        // where we write to child tables Colors and Facial Landmarks
        // and collect general vision ai data to add to our ai_final_response
        var resp = makeRequest(encoded, ai_type[ai], rowkey, createdby);
        ai_final_response += ai_type[ai] + ":\n";
        for (var item in resp) {
          ai_final_response += item + ": " + resp[item] + ", "
        }
        ai_final_response += '\n\n';
    }

    // NOTE: the call to AppSheet's REST API is no longer required. The return
    // value is processed directly in AppSheet. Keeping this here as an example
    // of an alternative implementation.
    // var postInventoryURL = "https://api.appsheet.com/api/v2/apps/" 
    // + appsheetAppID + "/tables/Inventory/Action";

    // var postAlertsURL = "https://api.appsheet.com/api/v2/apps/" 
    // + appsheetAppID + "/tables/Alerts/Action";

    // // Send results from VisionAI back to the Inventory table
    // postInventory = UrlFetchApp.fetch(postInventoryURL, 
    // buildInventoryPost(rowkey, ai_final_response, DriveImageWidth, DriveImageHeight));

    // Return results to AppSheet
    var return_object = {
      "Key": rowkey,
      "Status": "Analysis complete",
      "Dictionary": ai_final_response,
      "Width": DriveImageWidth,
      "Height": DriveImageHeight
    }
    return return_object;

} catch (e) {
  Logger.log(e);
}
}
