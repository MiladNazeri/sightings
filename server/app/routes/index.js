'use strict';
var router = require('express').Router();
var aws = require('aws-sdk');
var fs = require('fs')
//
//
//
router.use('/animals', require('./animals.router.js'));
router.use('/sightings', require('./sightings.router.js'));
router.use('/users', require('./users.router.js'));

    var AWS_ACCCES_KEY_ID = fs.readFileSync(__dirname + '/../../../key.pem').toString();
    var AWS_SECRET_ACCESS_KEY = fs.readFileSync(__dirname + '/../../../cert.pem').toString();
    var S3_BUCKET = "mobyclick";

    aws.config.update({accessKeyId: AWS_ACCCES_KEY_ID  , secretAccessKey: AWS_SECRET_ACCESS_KEY });
    aws.config.update({region: 'us-west-2' , signatureVersion: 'v4' });



    router.post('/sign_s3', function(req,res){
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.body.filename,
        Expires: 60,
        ContentType: req.body.filetype,
        ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', s3_params, function (err,data) {
            if(err){
                console.log(err);
            }
            else {
                console.log("s3 getsignedUrl", data)
                res.send(data)
            }

        })
    })
    // Make sure this is after all of
    // the registered routes!
    router.use(function (req, res) {
        res.status(404).end();
    });

module.exports = router
