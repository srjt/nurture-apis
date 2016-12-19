//Reference: http://blog.theburge.co/web/2016/06/30/typescript-express-api.html

import express = require('express');
import { NurtureApi } from './nurtureApi';
import * as mongoose from 'mongoose'

mongoose.connect("mongodb://localhost/nurture");

let port = 3000; //or from a configuration file
let api = new NurtureApi(express(), port);
api.run();
console.info(`listening on ${port}`);