const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(showTimes())
});

showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
        result += i + ' ';
    }
    return result;
}

module.exports = router;