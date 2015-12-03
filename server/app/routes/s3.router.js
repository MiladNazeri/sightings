    var router = require('express').Router();
    var aws = require('aws-sdk');
    var fs = require('fs')


    if (process.env.NODE_ENV === 'production'){
    var AWS_ACCCES_KEY_ID = process.env.AWS_ACCESS_KEY_ID
    var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
    var S3_BUCKET = process.env.S3_BUCKET
    } else
    {
        var AWS_ACCCES_KEY_ID = fs.readFileSync(__dirname + '/../../../key.pem').toString();
        var AWS_SECRET_ACCESS_KEY = fs.readFileSync(__dirname + '/../../../cert.pem').toString();
        var S3_BUCKET = fs.readFileSync(__dirname + '/../../../bucket.pem').toString();
    }

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

    module.exports = router
