//Reference: http://blog.theburge.co/web/2016/06/30/typescript-express-api.html
"use strict";
var express = require('express');
var nurtureApi_1 = require('./nurtureApi');
var port = 3000; //or from a configuration file
var api = new nurtureApi_1.NurtureApi(express(), port);
api.run();
console.info("listening on " + port);
//# sourceMappingURL=index.js.map