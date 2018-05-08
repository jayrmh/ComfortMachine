**This is a brief explanation of the project and the way to install the Comfort Machine project.  The goal of this project is to provide users the ability to monitor a room or a building for measuring comfort in any given space.**

**Things you need to install the software and how to install them (FOR THE BACKEND):**

•	Node.js from : `https://nodejs.org/en/download/`


**After adding the node.js to the system please install :** 


•	Express by : `npm –save install express`

•	Cookies and sessions: `npm –save install cookie-parser`

•	Body parser: `npm –save install  body-parser`

•	Express session: `npm –save install express-session` 

•	The database CouchDB  from : `http://couchdb.apache.org/`


**Things you need to install the software and how to install them (FOR THE FRONTEND):**

•	Install Cordova by: `npm install cordova`

•	Install Ionic by: `npm install –g ionic` ( *NOTE: make sure you are using ionic version 1 by saying ionic start *filename *template --type ionic1*)

**Installation of Android:** 

•	Install java SDK and add the PATH of java SDK in your system environmental variables

•	Install Android Tools manager from: `https://developer.android.com/studio/ ` 

•	Fixe the PATH of ANDROID_HOME in your system environmental variables that directs to the folder where Android SDK is installed.

*After downloading the above programs download the Cordova-ionic folder from `https://github.com/jayrmh/ComfortMachine`. *

**The following plugins was downloaded with specific versions in the project to make sure its compatibility:** 

•	iBeacon plugin: cordova plugin add `https://github.com/petermetz/cordova-plugin-ibeacon.git`

•	Proximity Beacon Plugin: `com.unarin.cordova.beacon@3.4.1`


•	Battery: `cordova-plugin-battery-status@2.0.2`

•	Camera: `cordova-plugin-camera@2.3.1`

•	Compat: `cordova-plugin-compat@1.2.0`


•	Geolocation: `cordova-plugin-geolocation 4.0.1`

•	Whitelist: `cordova-plugin-whitelist@1.3.3`


•	Browser:  `cordova platform add browser`

•	Android : `cordova platform add android@6.3.0`


•	Chart libray: `npm i express-cdn`

**After the above plugins are installed run the Cordova-ionic file:**

•	`Ionic Cordova build android`

•	`Ionic cordova run –device` to run it on the phone 


•	`ionic serve` (*if you want to see the results on the browser however the some of the plugins might not work*)
  







