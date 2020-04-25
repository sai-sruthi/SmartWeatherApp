# Smart Weather Application
A simple weather application which provides features like weather forecast, recommendations in addition to displaying the current weather conditions. It also provides two different types of accounts - normal and business. Business accounts have an additional feature which allows them to create promotional notifications which are then sent to users in their vicinity (currenty, a 2 mile radius). The application server also has an API defined for triggering emergency notifications across all devices.

## Setup steps

### API Server Setup
* Import the server code in server/smart-weather-api in an IDE of your choice as a Maven project
* Start the server by either building a jar and then running it, or running as a Java Application

### Firebase Setup
* Create a new project at https://console.firebase.google.com/
* Create a web app in the newly created project, copy the config generated upon creation
* Assign the copied config to the firebaseConfig object in config.js
* Navigate to Cloud Messaging Tab in the settings section of the firebase project, copy the server key
* Run expo push:android:upload --api-key \<server key\> in the project directory to upload the server key to expo server

### Client setup
* Run npm install in the project folder
* Run npm start to start the expo server

Download the expo application from Playstore/Appstore and scan the barcode generated on the expo server to run the application on your device.
 
### Notes 
* Register/login to expo cli before setting up firebase
* Change the spring.jpa.hibernate.ddl-auto property in resources/application.properties file of the server to "validate" after the first run of the server
