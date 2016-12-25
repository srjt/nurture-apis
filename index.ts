//Reference: http://blog.theburge.co/web/2016/06/30/typescript-express-api.html

import express = require("express");
import { NurtureApi } from "./nurtureApi";
import * as mongoose from "mongoose"

import fs = require("fs");

mongoose.connect("mongodb://localhost/nurture");

let port = 3000; //or from a configuration file
let portSsl = 8443;
let api = new NurtureApi(express(), port, portSsl);
//api.run();
let key = fs.readFileSync("sslcert/local.nurture.com.key", "utf8");
let cert = fs.readFileSync("sslcert/local.nurture.com.crt", "utf8");

// api.runHttps(key, cert);
api.run();