function main(e) {

// the sheet we were triggered from
var theSource =               e.source;
var theSheet =                theSource.getActiveSheet();
var theActiveRange =          theSheet.getActiveRange();
var theActiveRow =            theActiveRange.getRow();

// this entire next section solves for people rearranging columns in their Google Sheet. 
// Instead of hardwiring column numbers, we refer them by name by creating a dictionary of columnsname:numbers
// The names below are those we expect from the Appsheet app's Google Sheet data source
// some of them are arrays that we split - also see columndictionary.gs

// there are also various hardwired strings in the code herein 
// which correlate to the companion Appsheet app for this example

for (i in requiredColumns) {
  columnMap[i] = getColumnNumberByName(theSheet,requiredColumns[i]);
}
var rowkey =                    theSheet.getRange(theActiveRow,columnMap["Key"]).getValue();
var createdby =                 theSheet.getRange(theActiveRow,columnMap["createdby"]).getValue();
var theImagevalue =             theSheet.getRange(theActiveRow,columnMap["Image"]).getValue();
var ai_type =                   theSheet.getRange(theActiveRow,columnMap["AINoun"]).getValue().split(" , ");
var ai_final_response = '';

Logger.log("running these feature types: " + ai_type);

try {
  var localFileName =           imagefolder.getFilesByName(theImagevalue.split("/")[1]).next();  
  var theFileID =               getFileByName(localFileName);
  var driveImage =              DriveApp.getFileById(theFileID.id).getBlob();

  var encoded =                 Utilities.base64Encode(driveImage.getBytes());
  
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
  theSheet.getRange(theActiveRow,columnMap["Dictionary"]).setValue(ai_final_response);

  // now let's tell appsheet that we are done by adding a new record to our Alerts table
  // this will trigger an Appsheet workflow and notify the end user.
  alertAppsheet = UrlFetchApp.fetch(postAppsheetURL, buildPost(rowkey, createdby));

} catch (e) {
  Logger.log(e);
}

}
