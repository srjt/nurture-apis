"use strict";
var Source = require('./source.model');
var SourceLib = (function () {
    function SourceLib() {
    }
    SourceLib.prototype.getAll = function (success, error) {
        Source.find(function (err, sources) {
            if (err) {
                error(err);
            }
            success(sources);
        });
    };
    SourceLib.prototype.getByName = function (name, success, error) {
        Source.find({ name: name }, function (err, article) {
            if (err) {
                error(error);
            }
            success(article);
        });
    };
    SourceLib.prototype.save = function (newSource, success, error) {
        if (newSource) {
            this.getByName(newSource.name, function () {
                error('Source already exists');
            }, function () {
                var sourceToSave = new Source(newSource);
                sourceToSave.save(function (err) {
                    if (err) {
                        error(err);
                    }
                    success(sourceToSave);
                });
            });
        }
        else {
            error('No a valid Source');
        }
    };
    return SourceLib;
}());
exports.SourceLib = SourceLib;
//# sourceMappingURL=source.lib.js.map