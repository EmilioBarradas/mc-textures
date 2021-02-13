const fs = require('fs');
const { default: axios } = require('axios');
const cheerio = require('cheerio');

const config = JSON.parse(fs.readFileSync('./data/external_config.json'));

if (!fs.existsSync('./data/external')) {
    fs.mkdirSync('./data/external');
}

if (fs.existsSync('./data/external/sprite-config-unprocessed.txt')) {
    fs.rmSync('./data/external/sprite-config-unprocessed.txt');
}

(async () => {
    const res = await axios({
        method: 'get',
        url: config.sprite_config,
    });

    const $ = cheerio.load(res.data);
    const code = $('.mw-code').text();

    fs.writeFileSync('./data/external/sprite-config-unprocessed.txt', code);
})();
