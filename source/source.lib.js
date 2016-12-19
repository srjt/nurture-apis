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
    SourceLib.prototype.save = function (newSource, success, error) {
        if (newSource) {
            var sourceToSave_1 = new Source(newSource);
            sourceToSave_1.save(function (err) {
                if (err) {
                    error(err);
                }
                success(sourceToSave_1);
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