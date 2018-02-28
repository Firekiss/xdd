require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var fs = require('fs');
var archiver = require('archiver');
var https = require('https');

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, function(err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))

        var url = config.build.serverDomain + '/common/getNewH5Version.do?appType=1';

        https.get(url, function(res) {
            var datas = [];
            var size = 0;
            res.on('data', function(data) {
                datas.push(data);
                size += data.length;
            });
            res.on("end", function() {
                var buff = Buffer.concat(datas, size);
                var result = JSON.parse(buff.toString()); //转码//var result = buff.toString();//不需要转编码,直接tostring  

                if (result && result.code == 1 && result.data && !isNaN(parseFloat(result.data.versionNo))) {

                    var version = ((parseFloat(result.data.versionNo) * 10 + 1) / 10).toFixed(1);
                    console.log('-----current_h5_version----' + version);
                    createAndZip(version);
                } else {
                    console.log(chalk.red("---------------------htts failed-------------------------"));
                    createAndZip('1.0');
                }
            });
        }).on("error", function(err) {

            createAndZip('1.0');
            console.log(chalk.red("htts failed"));
            Logger.error(err.stack);
            callback.apply(null);
        });

        // createAndZip('1.2');

        function createAndZip(version) {
            fs.writeFile(path.join(config.build.assetsRoot) + "/version.txt", version, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log(chalk.yellow("version.txt was saved!"));
            })


            var output = fs.createWriteStream(path.resolve(config.build.assetsRoot, '../stu_vue.zip'));
            var archive = archiver('zip');
            archive.on('error', function(err) {
                throw err;
            });
            archive.pipe(output);
            archive.directory(config.build.assetsRoot, false);
            archive.finalize();

            console.log(chalk.yellow("zip was create!"));
        }
    })
})
