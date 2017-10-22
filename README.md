node-led homebridge-better-http-rgb server
==========================================

Designed to give an easily configurable back end for [homebridge-better-http-rgb](https://www.npmjs.com/package/homebridge-better-http-rgb) using a Raspberry Pi and NodeJS.

For wiring an RGB LED strip to a Raspberry Pi see [Guide by David Ordnung](http://dordnung.de/raspberrypi-ledstrip/) as is used to test this library.

Install
=======
npm install

You will need to patch node_modules/pigpio-components with the code from [this pull request](https://github.com/andybb/pigpio-components/pull/1/commits/16a9776eecce5affe74d0253c7a0703486e01d65). If the URL 404s then the PR has been merged and you might not need to do this step.

Setup
=====
Edit app.js and configure the pins to match those you have wired up. 

You can add as many as you want to an array of lights. One is pre-configured to use pins 12,16 and 20 on a Raspberry Pi.

lights[0] = new RGBLed({ red: 12, green: 16, blue: 20 });

so if you want to add a second then add something like this:

lights[1] = new RGBLed({ red: 23, green: 24, blue: 25 });
color[1] = "000000";

Running
=======

(as root)

node app.js

Sample config for [homebridge-better-http-rgb](https://www.npmjs.com/package/homebridge-better-http-rgb)
=============================================

This config will control light[0] "0" on pins 12,16 and 20 above. To control light[1] replace 0 with 1, simple! 

    "accessories": [
        {
            "accessory": "HTTP-RGB",
            "name": "RGB Led Strip",

            "switch": {
                "status": "http://localhost/0,
                "powerOn": "http://localhost/0/on",
                "powerOff": "http://localhost/0/off"
            },

            "brightness": {
                "status": "http://localhost/0/brightness",
                "url": "http://localhost/0/brightness/%s"
            },

            "color": {
                "status": "http://localhost/0/color",
                "url": "http://localhost/0/color/%s",
                "brightness": true
            }
        }
    ]
    
