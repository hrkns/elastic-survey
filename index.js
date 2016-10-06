"use strict";

var express = require('express'),
	app = express(),
	//to read files
	fs = require('fs'),
	//miniframework to manage db(s)
	db = require('__driver/db'),
	//useless personal debugger
	monitor = require('__driver/monitor'),
	//to analyze HTTP data
	bodyParser = require('body-parser'),
	//manage cookies
	cookieParser = require('cookie-parser'),
	//manage session
	session = require('express-session'),
	//personal module to perform callbacks anidation
	myasync = require('__driver/myasync').async,
	//mongodb driver
	mongodb = require("mongodb"),
	//useful for sockets
	server = require('http').Server(app),
	//personal module to perform notifications
	notifications = require("__driver/notifications"),
	//personal module to perform cron tasks
	cronTasks = require("__driver/cron-tasks"),
	//cache for system (db and others)
	cache = require("__driver/cache");

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(session({
	secret: '1234567890QWERTY',
	resave : true,
	saveUninitialized : false
}));
//static-files
app.use(express.static(__dirname + '/assets/general/img'));
app.use('/assets/logged/css',		express.static(__dirname + '/assets/logged/css', 		{ maxAge: 86400 }));
app.use('/assets/not-logged/css',	express.static(__dirname + '/assets/not-logged/css',	{ maxAge: 86400 }));
app.use('/assets/logged/js',		express.static(__dirname + '/assets/logged/js', 		{ maxAge: 86400 }));
app.use('/assets/not-logged/js',	express.static(__dirname + '/assets/not-logged/js', 	{ maxAge: 86400 }));
app.use('/assets/general/css',		express.static(__dirname + '/assets/general/css', 		{ maxAge: 86400 }));
app.use('/assets/general/js',		express.static(__dirname + '/assets/general/js', 		{ maxAge: 86400 }));
app.use('/assets/general/img',		express.static(__dirname + '/assets/general/img', 		{ maxAge: 86400 }));
app.use('/assets/logged/fonts',		express.static(__dirname + '/assets/logged/fonts', 		{ maxAge: 86400 }));
app.use('/assets/survey-live/css',	express.static(__dirname + '/assets/survey-live/css', 	{ maxAge: 86400 }));
app.use('/assets/survey-live/js',	express.static(__dirname + '/assets/survey-live/js', 	{ maxAge: 86400 }));
app.use('/assets/survey-live/font',	express.static(__dirname + '/assets/survey-live/fonts', { maxAge: 86400 }));

//views directory
app.set('views', './views');
//view engine
app.set('view engine', 'jade');

function decodeUrl(url){
	var arr = url.split("/").slice(1);
	return {
		module:arr[0],
		data:arr.slice(1)
	};
};

var controllers = {
	"post" : Array(		"account-recovering", 
						"login",
						"master-survey-type-field",
						"register",
						"survey",
						"survey-applying"),	//Create
	"get" : Array(		"account-disabling",
						"account-recovering",
						"logout",
						"register-confirmation",
						"survey"),	//Read
	"put" : Array(		"master-survey-type-field",
						"survey"),	//Update
	"delete" : Array(	"survey",
						"surveys")	//Delete
};

for(var k1 in controllers){
	var tmp = {};
	for(var k2 in controllers[k1]){
		tmp[controllers[k1][k2]] = require("__driver/"+k1+"/"+controllers[k1][k2]+".js");
	}
	controllers[k1] = tmp;
}

app.get("/", function(request, response){
	if(request.session.logged){
		var parms = {
			type_user : request.session.user_data.type
		};
		response.render('index', parms);
	}else{
		fs.readFile('assets/not-logged/index.html', function (err, html) {
			response.writeHeader(200, {"Content-Type": "text/html"});
			response.write(html);
			response.end();
		});
	}
});

var __mysurvey__controller = require("__driver/get/my-surveys.js");
app.get("/my-surveys", function(request, response){
	__mysurvey__controller.exec(request, response);
});

var __admin__controller = require("__driver/get/admin.js");
app.get("/admin", function(request, response){
	__admin__controller.exec(request, response);
});

var __community__controller = require("__driver/get/community.js");
app.get("/community", function(request, response){
	__community__controller.exec(request, response);
});

var __profile__controller = require("__driver/get/profile.js");
app.get("/profile", function(request, response){
	__profile__controller.exec(request, response);
});

var __surveyapplying__controller = require("__driver/get/survey-applying.js");
app.get("/survey-applying/:hash", function(request, response){
	__surveyapplying__controller.exec(request, response);
});

app.get("/account-disabling|account-recovering/:idresource|logout|register-confirmation/:idresource|survey/:idsurvey", function(request, response){
	var data = decodeUrl(request.originalUrl);
	controllers["get"][data.module].exec({
		data : data.data,
		response:response,
		request : request
	});
});
app.post("*", function(request, response){
	var data = decodeUrl(request.originalUrl);
	controllers["post"][data.module].exec({
		data:request.body.data,
		response:response,
		request:request,
		url_data : data.data
	});
});
app.put("*", function(request, response){
	var data = decodeUrl(request.originalUrl);
	controllers["put"][data.module].exec({
		data:request.body.data,
		response:response,
		request:request,
		url_data : data.data
	});
});
app.delete("*", function(request, response){
	var data = decodeUrl(request.originalUrl);
	controllers["delete"][data.module].exec({
		data:request.body.data,
		response:response,
		request:request,
		url_data : data.data,
	});
});

server.listen(8081, function(){
	console.log("Servidor corriendo en http://localhost:8081");
	notifications.start(server);
	cronTasks.start();
});