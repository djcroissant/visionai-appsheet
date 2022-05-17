# visionai-appsheet
Reference design for integration between Google Appsheet and Google Vision AI using Google Apps Script

#### Overview

This solution is a combination of
- Google Vision AI API usage
- A set of Google Apps Script files
- A copy of a Google Appsheet no-code application template

The result is an app on your phone. When you add a new image to the app, it triggers a call to Google VisionAI with the types of AI you have selected
- FACE_DETECTION
- IMAGE_PROPERTIES
- LANDMARK_DETECTION
- LOGO_DETECTION
- LABEL_DETECTION
- OBJECT_LOCALIZATION
- TEXT_DETECTION (OCR)

#### Steps to Install

- Create a new GCP Project and enable Google Vision API services
- Generate an ApiKey from the previous step using the [GCP console](https://console.cloud.google.com/apis/credentials)
	- e.g. it might look like [this](media/01.png)
- Both of the above steps are documented as part of the Google Vision API [Quickstart](https://cloud.google.com/vision/docs/setup). This quickstart uses oAuth but we are using an api key
- Copy [this Appsheet template](https://www.appsheet.com/Template/AppDef?appName=VisionAITemplate-4870276&utmSource=ShareApp)
	- after the copy finished, there is a drive folder e.g. My Drive>Appsheet>Data>VisionAITemplate-something
- for this app, [enable the Appsheet rest api](https://help.appsheet.com/en/articles/1979976-enabling-the-api)
	- note the App ID
	- note the Api Key
- Create an Apps Script project
- Copy the apps script (gs) files from this repo into your new Apps Script project
	- e.g. it might look like [this](media/02.png)
- change the constants in constants.gs
	- now that you have copied the Appsheet app, you will need to dig up a few other Drive ID's and insert them here.
- save your work
- update the 'Call Apps Script' task to use your ne Apps Script Project
	- e.g. it will look like [this](media/03.png)
- now TEST by using the Appsheet app :)
