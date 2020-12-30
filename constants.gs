// our api key from Google Vision GCP Project
var visionApiKey               = 'GCP_KEYHERE';


// the DriveID of the sheet named Attributes
var attributeSheet             = 'ID_HERE';


// the DriveID of the sheet named Facial Landmarks
var facialLandmarksSheet       = 'ID_HERE';


// the DriveID of the sheet named Colors
var colorsSheet                = 'ID_HERE';


// the images folder once you have copied the Appsheet template app to your appsheet account
var imagefolder                = DriveApp.getFolderById('ID_HERE');


// this solution requires the Appsheet Rest API, you need the API Key and App ID
// https://help.appsheet.com/en/articles/1979976-enabling-the-api
var appsheetApiKey             = 'APPSHEET_API_KEY';
var appsheetAppID              = 'APPSHEET_APP_ID';


// you should not have to change anything below this line
var attributeWriter   = SpreadsheetApp.openById(attributeSheet).getSheetByName('Attributes');
var facialLandmarksWriter   = SpreadsheetApp.openById(facialLandmarksSheet).getSheetByName('Facial Landmarks');
var colorsWriter = SpreadsheetApp.openById(colorsSheet).getSheetByName('Colors');
var postAppsheetURL = "https://api.appsheet.com/api/v2/apps/" + appsheetAppID + "/tables/Alerts/Action";
