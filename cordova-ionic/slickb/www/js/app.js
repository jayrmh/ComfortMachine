
// app.js - Business logic here
// Creating module with name cordovaApp
    var App = angular.module('cordovaApp', ['ngCordova']);

    // creating the controller and inject Angular's $scope
    App.controller('mainController', ['$scope', '$http', function($scope, $http) {


	try {

		// debugging functions for logging and error reporting

		$scope.logToDom = function (message) {
			var e = document.createElement('div');
			e.innerText = message;
			document.body.appendChild(e);
			window.scrollTo(0, window.document.height);
		};

		$scope.logToError = function (message) {
			var e = document.getElementById("error");
			e.innerText = message;
			//e.appendChild(e);
			//window.scrollTo(0, window.document.height);
		};


	  // ---------------------  install all the event handlers --------------------------------

	// -- battery events
	// batterystatus
	// batterycritical
    // batterylow
	 window.addEventListener("batterystatus", onBatteryStatus, false);
     function onBatteryStatus(status) {
			$scope.batteryLevel = status.level
			$scope.batteryIsPlugged = status.isPlugged;
            $scope.logToDom("Battery Level: " + status.level + " isPlugged: " + status.isPlugged);
	 }

	// ------------------------ define the preferences ---------------------------------------


        $scope.getPref = function(){

            $http.get('http://192.168.0.101:3002/getprofile').then(function(data){

                $scope.pref = data.data;

            })};

        $scope.getData = function(){

            $http.get('http://192.168.0.101:3002/finddata').then(function(data){

            var comfindex = [];
            $scope.index = data.data;
            for(var i = 0; i< data.data.length; i++){
                comfindex[i] = parseInt($scope.pref[0])- parseInt(data.data[i][0])+ parseInt($scope.pref[1]) - parseInt(data.data[i][1]);
            }
            var min = comfindex.indexOf(parseInt(Math.min.apply(Math, comfindex)));
            $scope.index = comfindex;
            $scope.beaconid= data.data[min][2];


                if(min == 0)
            {
                $scope.routing = "Keeping heading North";
            }
            else if(min == 1)
            {
                $scope.routing = "Keeping heading South";
            }
            else if(min == 2)
            {
                $scope.routing = "Keeping heading East";
            }
            else if(min == 3)
            {
                $scope.routing = "Keeping heading West";
            }



            })};


        $scope.getCurrentPosition = function() {

		var options = {
			enableHighAccuracy: true,
			maximumAge: 3600000
		 }

		var onSuccess = function(position) {
			$scope.logToDom('getCurrent Position: onSuccess');
			console.log('OnSuccess from getCurrentPosition:');
			$scope.latitude= position.coords.latitude;
			$scope.longitude= position.coords.longitude;
			$scope.altitude=  position.coords.altitude;
			$scope.coordAccuracy=position.coords.accuracy;
			$scope.altitudeAccuracy =position.coords.altitudeAccuracy;
			$scope.heading =position.coords.heading;
			$scope.speed = position.coords.speed;
			$scope.timestamp=position.timestamp;
			$scope.$digest();
		};

		// onError Callback receives a PositionError object
		//
		function onError(error) {
			$scope.logToError('getCurrentPosition because code: '    + error.code    + '\n' +
				  'message: ' + error.message + '\n');
		}

		var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	}

	 //--------------------------  using the camera plugin -----------------------------------

	// to see if image shoule be shown or not
		$scope.showImage=false;

		//Function to capture image
		// Imran changed Camera.DestinationType.FILE_URI to Camera.DestinationType.DATA_URI
		$scope.captureImage = function() {
			 $scope.showImage=true;

			 if(navigator.camera){
				        // note that this.onCameraSuccess is the same as $scope.onCemaraSuccess.
						navigator.camera.getPicture(this.onCameraSuccess, this.onCameraFail, { quality: 25,
						 destinationType: Camera.DestinationType.FILE_URI,
						 saveToPhotoAlbum:true
					 });
			}
			else{

				$scope.logToError("Fail: captureImage > camera not found");
			}
		};

		$scope.newImage = function() {
			$scope.showImage=false;
		};

		$scope.onCameraSuccess=function(imageUri) {
			$scope.showImage=true;
			console.log("onSuccess: "+$scope.showImage);
			var image = document.getElementById('capturedImage');
		   // Imran fixed the src for browser willnot work on the phone
		   // image.src = "data:image/jpeg;base64," + imageUri;
		   image.src = imageUri;
	  }

	  $scope.onCameraFail=function (message) {
		  $scope.logToError('Fail: getPicture because: ' + message);
	  }

	/// -------------------------  MQTT example -------------------------------------------
    var wsbroker = "broker.mqttdashboard.com";  //mqtt websocket enabled broker
    var wsport = 8000; // port for above
    var client = new Paho.MQTT.Client(wsbroker, wsport,
        "myclientid_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = function (responseObject) {
	   $scope.logToError("connection lost: " + responseObject.errorMessage);
    };

	client.onMessageArrived = function (message) {
	// since we are updating scope in a call-back function we must
	// wrap it in $scope.$apply or call $scope.digest() after updating

	  $scope.messageDestinationName = message.destinationName;
	  $scope.messagePayloadString = message.payloadString;
	  $scope.$digest();
      $scope.logToDom(message.destinationName+'--'+message.payloadString);
    };

    var options = {
      timeout: 3,
      onSuccess: function () {
        $scope.logToDom("mqtt connected");
		$scope.MQTTConnected = true;
        // Connection succeeded; subscribe to our topic, you can add multile lines of these
        client.subscribe('LazyPanda/#', {qos: 2});

        //use the below if you want to publish to a topic on connect
        message = new Paho.MQTT.Message("Hello Shrajah -- I am alive now");
        message.destinationName = "/World";
        client.send(message);
      },
      onFailure: function (message) {
		$scope.MQTTConnected = false;
		$scope.$digest();
		$scope.logToError("Connection failed: " + message.errorMessage);
      }
    };

	// only call if client is alive
	$scope.publishMQTT = function(msgString, topicString){
        message = new Paho.MQTT.Message(msgString);
        message.destinationName = topicString;
		$scope.logToDom("trying to send <"+msgString+"> to "+wsbroker);
        client.send(message);
	}

	$scope.initMQTT= function() {
		$scope.logToDom("trying to connect to mqtt");
		$scope.MQTTConnected = false;
		client.connect(options);
	}

	// -------------------------------iBeacon BLE stuff ------------------------------------

   try{ //iBeacon Initializtation

	try{ // bluetooth is bound and ON
	// check to see if Bluetooth is ON, if not turn it ON
		cordova.plugins.locationManager.isBluetoothEnabled()
			.then(function(isEnabled){
				$scope.logToDom("BLE isEnabled: " + isEnabled);
				if (isEnabled) {
					//cordova.plugins.locationManager.disableBluetooth();
				} else {
					cordova.plugins.locationManager.enableBluetooth();
				}
			})
			.fail(function(e) {
								//console.error(e);
								$scope.logToError("isBluetoothEnabled failed because: "+e);
							})
			.done();
	}
	catch(err){

		$scope.logToError("ERROR Bluetooth:"+err.name+"->"+err.message);
	}

    alert("cordova.plugins.locationManager"+cordova.plugins.locationManager);

	// create a delegate
	$scope.delegate = new cordova.plugins.locationManager.Delegate();

	alert('$scope.delegate'+$scope.delegate);

	// called when user enters or exits a region
    $scope.delegate.didDetermineStateForRegion = function (pluginResult) {

		$scope.logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

		cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
			+ JSON.stringify(pluginResult));
 	 };

    // called when the monitoring starts
	$scope.delegate.didStartMonitoringForRegion = function (pluginResult) {
		console.log('didStartMonitoringForRegion:', pluginResult);

		$scope.logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
	};

	// called every second, there is a list of beacons inside data.beacons
	// will get called even if there are 0 beacons in the list
	$scope.delegate.didRangeBeaconsInRegion = function (pluginResult) {
    	$scope.logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
	};

	// called if anything fails
	$scope.delegate.monitoringDidFailForRegionWithError = function(error) {
		$scope.logToError(JSON.stringify(error));
	};

	//set the delegate
	cordova.plugins.locationManager.setDelegate($scope.delegate);

	// does not work - $scope.uuid = cordova.plugins.locationManager.BeaconRegion.WILDCARD_UUID;
	$scope.uuid = "b9407f30-f5f8-466e-aff9-25556b57fed6";
	$scope.identifier = "some beacon"; //"bfb7d7eb384e6f18469c02836cd41813";
	$scope.minor = 0; //45968;
	$scope.major = 0;//33300;

	//create a Region to monitor
	try{

		$scope.beaconRegion = new cordova.plugins.locationManager.BeaconRegion($scope.identifier, $scope.uuid, $scope.major, $scope.minor);
	}
	catch(err){

		$scope.logToError("ERROR from cordova.plugins.locationManager.BeaconRegion:"+err.name+"->"+err.message);
	}

	alert("beaconRegion:"+$scope.beaconRegion);

	// required in iOS 8+
	//cordova.plugins.locationManager.requestWhenInUseAuthorization();
	// or cordova.plugins.locationManager.requestAlwaysAuthorization()

	cordova.plugins.locationManager.startMonitoringForRegion($scope.beaconRegion)
		.fail(function(e) {
							console.error(e);
							$scope.logToError("Fail: startMonitoringForRegion > "+e);
						  })
		.done();

	$scope.logToDom("Monitoring Started ....");

	}
	catch(err) { // try failed in iBeacon

		var vDebug = "";
		for (var prop in err)
		{
		   vDebug += "property: "+ prop+ " value: ["+ err[prop]+ "]\n";
		}
		vDebug += "toString(): " + " value: [" + err.toString() + "]";

		$scope.logToError("ERROR:"+err.name+"->"+err.message+" details:"+vDebug);

	}
	}  //try
	catch(err) {  //try fail overall

		var vDebug = "";
		for (var prop in err)
		{
		   vDebug += "property: "+ prop+ " value: ["+ err[prop]+ "]\n";
		}
		vDebug += "toString(): " + " value: [" + err.toString() + "]";

		$scope.logToError("ERROR:"+err.name+"->"+err.message+" details:"+vDebug);
	}
}]);
