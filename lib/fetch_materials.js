const { default: axios } = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./data/external_config.json'));

(async () => {
    const res = await axios({
        method: 'get',
        url: config.spigot_materials,
    });

    if (res.status !== 200 || typeof res.data === 'undefined') throw new Error("Error while retrieving spigot materials.");

    const materials = [];

    const $ = cheerio.load(res.data);
    $('.constantsSummary .memberNameLink a').each((_i, e) => materials.push($(e).text()));

    fs.writeFileSync('./data/materials.json', JSON.stringify(materials, null, 4));
})();
