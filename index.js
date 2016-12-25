//Reference: http://blog.theburge.co/web/2016/06/30/typescript-express-api.html
"use strict";
var express = require("express");
var nurtureApi_1 = require("./nurtureApi");
var mongoose = require("mongoose");
var fs = require("fs");
mongoose.connect("mongodb://localhost/nurture");
var port = 3000; //or from a configuration file
var portSsl = 8443;
var api = new nurtureApi_1.NurtureApi(express(), port, portSsl);
//api.run();
var key = fs.readFileSync("sslcert/local.nurture.com.key", "utf8");
var cert = fs.readFileSync("sslcert/local.nurture.com.crt", "utf8");
// api.runHttps(key, cert);
api.run();
//# sourceMappingURL=index.js.map