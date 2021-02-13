const fs = require('fs');
const sharp = require('sharp');

fs.rmdirSync('./data/images/minecraft', { recursive: true });
fs.mkdirSync('./data/images/minecraft', { recursive: true });

const config = JSON.parse(fs.readFileSync('./data/sprite-config.json'));
const positions = JSON.parse(fs.readFileSync('./data/positions.json'));
const tags = JSON.parse(fs.readFileSync('./data/tags.json'));
const deviations = JSON.parse(fs.readFileSync('./data/tag_deviations.json'));

const sharpInstance = sharp(`./data/external/${config.settings.image}`);

for (const tag of tags) {
    const id = typeof deviations[tag] !== 'undefined'
        ? deviations[tag]
        : tag.replace(/_/g, ' ').replace(/(\b[a-z](?!\s))/g, x => x.toUpperCase());

    if (typeof positions[id] === 'undefined') continue;

    sharpInstance.extract({
        left: positions[id].x,
        top: positions[id].y,
        width: config.settings.size,
        height: config.settings.size
    }).toFile(`./data/images/minecraft/${tag}.png`, (err) => {
        if (err !== null) throw err;
    });
}
