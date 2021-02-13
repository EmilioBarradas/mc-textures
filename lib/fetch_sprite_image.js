const fs = require('fs');
const { default: axios } = require("axios");

const config = JSON.parse(fs.readFileSync('./data/external_config.json'));

if (!fs.existsSync('./data/external')) {
    fs.mkdirSync('./data/external');
}

if (fs.existsSync('./data/external/InvSprite.png')) {
    fs.rmSync('./data/external/InvSprite.png');
}

(async () => {
    axios({
        method: 'get',
        url: config.sprite_picture,
        responseType: 'stream'
    }).then(res => {
        res.data.pipe(fs.createWriteStream('./data/external/InvSprite.png'))
    });
})();
