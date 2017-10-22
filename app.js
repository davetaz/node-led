const { Button, RGBLed } = require('pigpio-components');
const convert = require('color-convert');
const express = require('express');
const app = express();

const error_400 = require('./routes/error_400.js');
const error_404 = require('./routes/error_404.js');
const error_410 = require('./routes/error_410.js');
const error_503 = require('./routes/error_503.js');

const lights = [];
lights[0] = new RGBLed({ red: 12, green: 16, blue: 20 });
var color = [];
color[0] = "000000";

/* 
 * Status
 * Read the status of things
 */
app.get('/', function(req,res) {
	return error_400(res);	
});
app.get('/:num', function(req,res) {
	try {
		array = lights[req.params.num].getColor();
		console.log(Math.max.apply(null,array));
		res.send('1');
	} catch (err) {
		res.send('0');
	}
});
app.get('/:num/brightness', function(req,res) {
	try {
		array = lights[req.params.num].getColor();
		max = Math.max.apply(null,array);
		brightness = Math.floor((max/255) * 100);
		res.send('' + brightness + '');
	} catch (err) {
		res.send('0');
	}
});
app.get('/:num/color', function(req,res) {
	try {
		array = lights[req.params.num].getColor();
		res.send('#' + convert.rgb.hex(array));
	} catch (err) {
		res.send('#000000');
	}
});
/* 
 * Write operations
 * Should be done via PUT or POST!!
 */
app.get('/:num/on', function(req,res) {
	if (color[req.params.num] == "000000") {
		lights[req.params.num].color('#ffffff').on();
		color[req.params.num] = 'ffffff';
	} else {
		lights[req.params.num].color('#' + color[req.params.num]).on();
	}
	res.send('1');
});
app.get('/:num/off', function(req,res) {
	lights[req.params.num].off();
	res.send('1');
});
app.get('/:num/brightness/:level', function(req,res) {
	try {
		array = lights[req.params.num].getColor();
		newBright = req.params.level;
		max = Math.max.apply(null,array);
		currentBright = (max/255) * 100;
		multiplier = newBright / currentBright;
		for (var i=0;i<array.length;i++) {
			array[i] = array[i] * multiplier;
		}
		lights[req.params.num].color('#' + convert.rgb.hex(array)).on();
		res.send('' + newBright + '');
		color[req.params.num] = convert.rgb.hex(array);
	} catch (err) {
		res.send('0');
	}
});
app.get('/:num/color/:color', function(req,res) {
	try {
		lights[req.params.num].color('#' + req.params.color).on();
		color[req.params.num] = req.params.color;
		res.send('1');
	} catch (err) {
		res.send('0');
	}
});

/*
 * Launch server
 */
app.listen(80, function() {
	console.log('Ready on port 80');
});


/*
 * Reference section
 */

//const button = new Button({ gpio: 24, isPullup: true });
 
//light1.color('#000011').on();
//console.log(convert.rgb.hex(light1.getColor()));
//rgbLed.off();
//rgbLed.color('#0000ff').strobe(1000);
//rgbLed.rainbow();
//rgbLed.pulse();
//while (true) {}
