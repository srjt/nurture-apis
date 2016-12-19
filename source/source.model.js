"use strict";
var mongoose = require("mongoose");
;
var sourceSchema = new mongoose.Schema({
    name: String,
    link: String,
    type: String,
    lastBuildDate: Date
});
var Source = mongoose.model("Source", sourceSchema);
module.exports = Source;
//# sourceMappingURL=source.model.js.map