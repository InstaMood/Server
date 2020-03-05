const router = require('express').Router();

const restler = require('restler');
const multer = require('multer');
const bufferToBase64 = require('base64-arraybuffer');

const { Photo } = require('../models/index');

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});

const HTMLInputFileName = 'upload';

router.post("/upload", upload.single(HTMLInputFileName), (req, res) => {
    let base64String = bufferToBase64.encode(req.file.buffer);
    restler.post('https://api.imgbb.com/1/upload', {
            multipart: true,
            data: {
                'key': 'e9061d427dc893cca88401e5c9628dd9',
                'image': base64String
            }
        }).on('complete', function(data, response) {
            let imgURL = data.data.url;
            // let deleteURL = data.delete_url;
            let message = "Image uploaded";
            // res.status(201).json({
            //     imgURL,
            //     deleteURL,
            //     message
            // })
            Photo.update({
                link: imgURL
            }, {
                where: {
                    id: req.activeUser.id
                }
            })
            .then(result => {
                res.status(201).json({
                    message: message
                })
            })
            .catch(next);

        }).on('fail', function(data, response) {
            let err = new Error();
            err.code = 400;
            err.message = 'Fail to upload';
            throw err;
        }).on('error', function(err, response) {
            err = new Error();
            err.code = 500;
            err.message = 'Internal Server Error';
            throw err;
        });
})
module.exports = router;