"use strict";
var Source = require("./source.model");
var Promise = require("promise");
var _ = require("underscore");
var SourceLib = (function () {
    function SourceLib() {
    }
    SourceLib.prototype.getAll = function () {
        return new Promise(function (fulfill, reject) {
            Source.find(function (err, sources) {
                if (err) {
                    reject(err);
                }
                fulfill(sources);
            });
        });
    };
    SourceLib.prototype.getByName = function (name) {
        return new Promise(function (fulfill, reject) {
            Source.find({ name: name }, function (err, article) {
                if (err) {
                    reject(err);
                }
                fulfill(article);
            });
        });
    };
    SourceLib.prototype.doesSourceAreadyExist = function (name) {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            _this.getByName(name).then(function (existingSource) {
                if (_.isNull(existingSource)) {
                    fulfill(false);
                }
                fulfill(true);
            }, function (err) {
                reject(err);
            });
        });
    };
    SourceLib.prototype.validate = function (source) {
        return new Promise(function (fulfill, reject) {
            if (_.isEmpty(source) || _.isEmpty(source.name) || _.isEmpty(source.link)) {
                reject('Not a valid Source');
            }
            fulfill(source);
        });
    };
    SourceLib.prototype.save = function (newSource) {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            _this.validate(newSource).then(function (source) {
                return _this.doesSourceAreadyExist(newSource.name);
            }).then(function (exists) {
                if (exists) {
                    reject("Source already exists \"" + newSource.name + "\"");
                }
                else {
                    var sourceToSave_1 = new Source(newSource);
                    sourceToSave_1.save(function (err) {
                        if (err) {
                            reject(err);
                        }
                        fulfill(sourceToSave_1);
                    });
                }
            }, function (err) {
                reject(err);
            });
        });
    };
    return SourceLib;
}());
exports.SourceLib = SourceLib;
//# sourceMappingURL=source.lib.js.map