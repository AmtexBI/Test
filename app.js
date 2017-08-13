// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');
var request = require('request');
var yelp = require('yelp-fusion');
let app = express();
app.use(bodyParser.json({ type: 'application/json' }));
var Error1;
// Save database object from the callback for reuse.

app.get('/', function(req, res) {
    res.send("hi");
});

var obj, length, state, actions, i, list, name, measure;
var businesslength;
var test;

// [START YourAction]
app.post('/', function(req, res) {
    const assistant = new Assistant({ request: req, response: res });
	if (actions == "ACCIDENT_C1L2") {
		var date_names = req.body.result.parameters.Date_Names;
		     request('http://115.110.117.70:8080/ibi_apps/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FPublic%252FAmelia&BIP_item=C1L2.fex&windowHandle=865649&IBI_random=7852.14315766086&DATE_NAMES='+date_names, function(error, response, body)
			 {
            var obj = JSON.parse(body);
          var RESP = obj.records[0].ACCIDENT;
            function responseHandler(assistant) {
				if(RESP == 0)
				assistant.ask("Thank God no Sayee. People are taking measures and driving safely ");
			else if (RESP == 1)
				assistant.ask("Sorry to Say  there has been one accident "+date_names);
               else
				 assistant.ask("Sorry to Say  there has been "+RESP+" accidents "+date_names);
            }
            assistant.handleRequest(responseHandler);
        });
    }
	if (actions == "ACCIDENT_C1L3") {
		var date_names = req.body.result.parameters.Date_Names;
		     request('http://115.110.117.70:8080/ibi_apps/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FPublic%252FAmelia&BIP_item=C1L3.fex&windowHandle=865649&IBI_random=7852.14315766086&DATE_NAMES='+date_names, function(error, response, body)
			 {
            var obj = JSON.parse(body);
          var RESP = obj.records[0].FATAL;
            function responseHandler(assistant) {
				if(RESP == 0)
        {assistant.ask("Fortunately, none of them were fatal ");}
				else
        {
          if (RESP == 1)
          {assistant.ask("Unfortunately one of them was fatal "+date_names + " Do You need more details?");}
  				else
  				 {assistant.ask("Unfortunately "+ RESP +" of them was FATAL "+date_names + " Do You need more details?");}
              }
        }

            assistant.handleRequest(responseHandler);
        });
    }
	if (actions == "ACCIDENT_C1L4") {
		var date_names = req.body.result.parameters.Date_Names;
                var details = req.body.result.parameters.DETAILS_REQUIRED;
		     request('http://115.110.117.70:8080/ibi_apps/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FPublic%252FAmelia&BIP_item=C1L4.fex&windowHandle=846103&IBI_random=8447.579620829423&DATE_NAMES='+date_names, function(error, response, body)
			 {
            var obj = JSON.parse(body);
		  if (details  != 'NO')
		  {
                  var D_HITRUN1 = obj.records[0].D_HITRUN;
		  var LANDMARK_DESC1 = obj.records[0].LANDMARK_DESC;
		  var VILLAGE_NAME1 = obj.records[0].VILLAGE_NAME;
		  var LOCATION_TYPE_DESCRIPTION11 = obj.records[0].LOCATION_TYPE_DESCRIPTION1;
		  var ROAD_NAME1 = obj.records[0].ROAD_NAME;
		 var VEHICLE_DESCRIPTION1 = obj.records[0].VEHICLE_DESCRIPTION;
		  var VEH_MODEL_DESC1 = obj.records[0].VEH_MODEL_DESC;
		 var ACCIDENT_DESCRIPTION1 = obj.records[0].ACCIDENT_DESCRIPTION;
                 var NAME = obj.records[0].DR_NAME;
                 var FATAL1 = obj.records[0].FATAL;
		  }
            function responseHandler(assistant) {
if (details != 'NO')
				{
          if(FATAL1 == 0)
          {
	           assistant.ask("Fortunately, none of them were fatal ");
          }
          else
          {
	           if(FATAL1 == 1)
	             {
		               assistant.ask("It was a "+ACCIDENT_DESCRIPTION1 +" collision "+ D_HITRUN1 + " accident and the parties involved stayed until police and help arrived. It happened " +LANDMARK_DESC1+ " in "+ VILLAGE_NAME1+" " + LOCATION_TYPE_DESCRIPTION11 +" in "+ROAD_NAME1+".The vehicle involved was a "+VEH_MODEL_DESC1+ ' ' + VEHICLE_DESCRIPTION1+" registered under the name of "+NAME);
	             }
	              else
	               {
		                 assistant.ask("I am assuming for the first one, so here it is. It was a "+ACCIDENT_DESCRIPTION1 +" collision "+ D_HITRUN1 + " accident and the parties involved stayed until police and help arrived. It happened " +LANDMARK_DESC1+ " in "+ VILLAGE_NAME1+" " + LOCATION_TYPE_DESCRIPTION11 +" in "+ROAD_NAME1+".The vehicle involved was a "+VEH_MODEL_DESC1+ ' ' + VEHICLE_DESCRIPTION1+" registered under the name of "+NAME);
	               }
          }

      }
			else
      {
        assistant.ask("Ok then, what else do you need from me? ");
      }
            }

            assistant.handleRequest(responseHandler);
        });
    }

	if (actions == "ACCIDENT_C1L6") {
	var date_names = req.body.result.parameters.Date_Names;
		     request('http://115.110.117.70:8080/ibi_apps/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FPublic%252FAmelia&BIP_item=C1L6.fex&windowHandle=846103&IBI_random=8447.579620829423&DATE_NAMES='+date_names, function(error, response, body)
			 {
            var obj = JSON.parse(body);
          var RESP = obj.records[0].PEDESTRIAN;

            function responseHandler(assistant) {
              if (RESP  != 'YES')
                  {
                assistant.ask("No pedestrian involved ");
                  }
              else {
                var PEDESTRIAN_INJURY_DESCRIPTION1 = obj.records[0].PEDESTRIAN_INJURY_DESCRIPTION;
                var PEDESTRIAN_HOSPITALISATION1 = obj.records[0].PEDESTRIAN_HOSPITALISATION;
                var PDN_NAME = obj.records[0].PDN_NAME;
                var VEHICLE_DESCRIPTION = obj.records[0].VEHICLE_DESCRIPTION;

               assistant.ask("Yes a pedestrian was involved, while crossing the road he was hit by a "+ VEHICLE_DESCRIPTION + ". The pedestrian had " + PEDESTRIAN_INJURY_DESCRIPTION1 + " and his name was " + PDN_NAME);
              }
            }
            assistant.handleRequest(responseHandler);
        });
    }

if (actions == "ACCIDENT_top5") {
       request('http://115.110.117.70:8080/ibi_apps/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FPublic%252FAmelia&BIP_item=top5districts.fex&windowHandle=846103&IBI_random=8447.579620829423', function(error, response, body)
     {
          var obj = JSON.parse(body);
        var list = obj.records[0].DISTRICT_NAME;
          function responseHandler(assistant) {

            for (i = 1; i < 5; i++) {
                list += " , " + obj.records[i].DISTRICT_NAME;
            }
          assistant.ask("These are the top 5 accident prone districts " + list);
          }
          assistant.handleRequest(responseHandler);
      });
  }

	if (actions == "ACCIDENT_C1L5") {
		var date_names = req.body.result.parameters.Date_Names;
		     request('http://115.110.117.70:8080/ibi_apps/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FPublic%252FAmelia&BIP_item=C1L5.fex&windowHandle=846103&IBI_random=8447.579620829423&DATE_NAMES='+date_names, function(error, response, body)
			 {
            var obj = JSON.parse(body);
          var RESP = obj.records[0].SAFETYMEASURES;
            function responseHandler(assistant) {
              if (RESP  != 'NO')
                  {
                assistant.ask("Yes they were wearing a helmet or Seat belt");
                  }
              else {
                assistant.ask("No, they were not wearing a helmet or Seat belt");
              }
            }
            assistant.handleRequest(responseHandler);
        });
    }

});
// [END YourAction]

app.listen(process.env.PORT || 8081, function () {
 console.log('Example app listening on port 9090!')
})

function functioncall() {
    console.log("inside the functioncall");

}


module.exports = app;
