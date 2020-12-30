// construct a full rest api post to Appsheet
// this simply adds a record to a sheet called Alerts
// which will thus trigger an Appsheet notification

function buildPost(rowkey, createdby) {

  var postparentbody = 
      {
        "Action": "Add",
        "Properties": {
          "Locale": "en-US",
          "Location": "47.623098, -122.330184",
          "Timezone": "Pacific Standard Time",
          "RunAsUserEmail": "alevizostestharness@gmail.com"
        },
        "Rows": [      {
         "InventoryID": rowkey,
         "createdby": createdby
      }]
      };
  
  var postParentOptions = 
      {
        "method" : "POST",
        "headers" : {
          "applicationAccessKey" : appsheetApiKey,
          "Content-Type" : "application/json"
        },
        "payload" : JSON.stringify(postparentbody)
      };
  
  return postParentOptions;
}
