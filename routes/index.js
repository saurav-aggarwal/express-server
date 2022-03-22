var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */

let mountData = [];
let tabChange = [];
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/mount', function (req, res, next) {
    mountData.push(req.body);
    res.render('index', { title: 'Express' });
});

router.post('/tabChange', function (req, res, next) {
    tabChange.push(req.body);
    res.render({ data: 'successful' });
});

router.get('/mount', function (req, res, next) {
    res.json({ data: mountData });
});

router.get('/tabChange', function (req, res, next) {
    res.json({ data: tabChange });
});

router.get('/generateMountReport', function (req, res, next) {
    let avgTime =
        mountData.reduce((prev, curr) => prev + curr.timeDiff, 0) /
        mountData.length;
    fs.writeFileSync(
        `data_mount.json`,
        JSON.stringify({
            iteration: mountData.length,
            avgTime,
            data: mountData,
        }),
        (err) => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Successfully wrote file');
            }
        }
    );
    res.json({ status: 'Successfully wrote file' });
});

router.get('/generateTabChangeReport', function (req, res, next) {
    fs.writeFileSync(
        `tab_change.json`,
        JSON.stringify({
            iteration: tabChange.length,
            data: tabChange,
        }),
        (err) => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Successfully wrote file');
            }
        }
    );
    res.json({ status: 'Successfully wrote file' });
});

module.exports = router;
