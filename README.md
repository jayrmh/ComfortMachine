**This is a brief explanation of the project and the way to install the IOT Comfort Machine Application. The goal of this project is to provide users the ability to monitor a room or a building for measuring comfort in any given space, using Estimote iBeacons.**

**LazyPanda allows the users to set their desired levels of comfort on the applicaiton, in terms of temperature and luminosity, and accordingly view comfort maps of the ambience catered to their preferences, as well as find zones within the deployed indoor spaces that match their choices and finally be routed to such a location. **

**The nodes in this system are the MQTT and Beacon initiator installed on the Raspberry PI, the NodeJS + Express Back-End Server that also launches a companion website for the users to set their preferences and view maps, and finally a Cordova android application to allow the users to find and route to their comfort zone**

**Please note that 'sudo' administrator priveleges might be required to perform the following for Linux and UNIX users**

**Things you need to install the beacon initiator and how to install them (FOR THE MQTT Publisher):**

•	Beacon connection : `npm install noble`

•	Bluetooth service* : `npm install bluetooth-hci-socket`

*Might face issues in some PCs due to the limited models of bluetooth devices currently supported by this module.*

**Things you need to install the software and how to install them (FOR THE BACKEND):**

•	Node.js from : `https://nodejs.org/en/download/`

**After adding the node.js to the system please install :** 

•	Express by : `npm –save install express`

•	Cookies and sessions: `npm –save install cookie-parser`

•	Body parser: `npm –save install  body-parser`

•	Express session: `npm –save install express-session` 

•	The database CouchDB  from : `http://couchdb.apache.org/`

•	To connect to database: `npm –save install nano` 

**Things you need to install the software and how to install them (FOR THE FRONTEND):**

•	Install Cordova by: `npm install cordova`

•	Install Ionic by: `npm install –g ionic` (NOTE: make sure you are using ionic version 1 by saying ionic start *filename *template --type ionic1)

**Installation of Android:** 

•	Install java SDK and add the PATH of java SDK in your system environmental variables

•	Install Android Tools manager from *: `https://developer.android.com/studio/ ` 

•	Fix the PATH of ANDROID_HOME in your system environmental variables that directs to the folder where Android SDK is installed.

*Make sure Android SDK tools for platform 26 is the latest available for your system, as later versions cause errors.*

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
  

**For execution of Lazy Panda:**

•	For running MQTT, and reading from Beacons - 
• Please navigate to the /estimote-specs directory from the repo root
•	Run telemetry file: 
`node estimote-telemetry.js`

•	For running Nodejs + Express back-end server, to populate database and launch front-end website 
• Please navigate to the expressheader1.js directory from the root, then to the directory /www 
•	Run back-end server and website client: 
`node www`

•	For running cordova application, to launch front-end android
• Please navigate to the cordova-ionic directory within the repo root, then to the directory /slickb
•	Run front-end client:
`cordova run --device`







