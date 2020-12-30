# visionai-appsheet
Reference design for integration between Google Appsheet and Google Vision AI using Google Apps Script

#### Overview

This soluton is a combination of:
	- Google Vision AI API usage
	- A set of Google Apps Script files
	- A copy of a Google Appsheet no-code application template

The result is an app on your phone. When you add a new image to the app, it triggers a call to Google VisionAI with the types of AI you have selected:
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
- Both of the above steps are documented as part of the Google Vision API [Quickstart](https://cloud.google.com/vision/docs/setup). This quickstart uses oAuth but we are using an api key.
- Copy [this appsheet template](https://www.appsheet.com/samples/Vision-AI-integration-via-Workspace-and-Appsheet?appGuidString=ea73c479-52e4-4af8-b2cb-3668f21ef67c)
- for this app, [enable the rest api](https://help.appsheet.com/en/articles/1979976-enabling-the-api)
	- note the App ID
	- note the Api Key
- open the google sheet called Inventory
- add an apps script from the Tools menu
- start copying these apps script (gs) files in this project
- change the constants in constants.gs
	- you will need to dig up a few Drive ID's now that you have copied the Appsheet app
- save your work
- add a trigger and set it to "main" and "on-change"
- TEST by using the app