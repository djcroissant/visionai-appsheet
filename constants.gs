// our api key from Google Vision GCP Project
var visionApiKey               = 'your_api_key_here';


// the DriveID of the sheet named Attributes
var attributeSheet             = '1ioWvEPqRwWH2hV1DVBJAsdhgEJWSTp1b9ipCKUzRyxc';


// the DriveID of the sheet named Facial Landmarks
var facialLandmarksSheet       = '1TQBMOwWiSvgRurziCdggHminpwWEf3YG1WeIKC25YlY';


// the DriveID of the sheet named Colors
var colorsSheet                = '1Y8V5Jy--ZweI6oKaJ4zuTGBMnPtn6VLRfuJYF03bQvk';


// the images folder once you have copied the Appsheet template app to your appsheet account
var imagefolder                = DriveApp.getFolderById('1XGfPq4P-wKMsym-eD-UDYktt6yUpIRA8');


// this solution requires the Appsheet Rest API, you need the API Key and App ID
// https://help.appsheet.com/en/articles/1979976-enabling-the-api
var appsheetApiKey             = 'your_api_key_here';
var appsheetAppID              = 'your_app_id_here';


// you should not have to change anything below this line
var attributeWriter   = SpreadsheetApp.openById(attributeSheet).getSheetByName('Attributes');
var facialLandmarksWriter   = SpreadsheetApp.openById(facialLandmarksSheet).getSheetByName('Facial Landmarks');
var colorsWriter = SpreadsheetApp.openById(colorsSheet).getSheetByName('Colors');
