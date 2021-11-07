const path = require('path');
const fs = require('fs');
const async = require('async');


const getFiles = (dirPath, callback) => {

    fs.readdir(dirPath, function (err, files) {
        if (err) return callback(err);

        let filePaths = [];
        async.eachSeries(files, function (fileName, eachCallback) {
            let filePath = path.join(dirPath, fileName);

            fs.stat(filePath, function (err, stat) {
                if (err) return eachCallback(err);

                if (stat.isDirectory()) {
                    getFiles(filePath, function (err, subDirFiles) {
                        if (err) return eachCallback(err);

                        filePaths = filePaths.concat(subDirFiles);
                        eachCallback(null);
                    });

                } else {
                    if (stat.isFile() && /\.js$/.test(filePath)) {
                        filePaths.push(filePath);
                    }

                    eachCallback(null);
                }
            });
        }, function (err) {
            callback(err, filePaths);
        });

    });
}

module.exports = getFiles