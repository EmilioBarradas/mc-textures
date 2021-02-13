const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./data/sprite-config-enhanced.json'));
const deviations = JSON.parse(fs.readFileSync('./data/deviations.json'));
const ignored = JSON.parse(fs.readFileSync('./data/ignored.json'));
const tags = JSON.parse(fs.readFileSync('./data/tags.json'));

const positions = {};

const sheetWidth = config.settings.sheetsize;
const size = config.settings.size;
const tiles = sheetWidth / size;
const scale = 1;

for (const tag of tags) {
    if (tag.startsWith('#') || ignored.includes(tag)) continue;

    let pos = config.ids[tag]?.pos;

    if (typeof pos === 'undefined') {
        pos = config.ids[deviations[tag]]?.pos;
    }

    if (typeof pos === 'undefined') continue;

    positions[tag] = {
        x: (pos - 1) % tiles * size * scale,
        y: Math.floor((pos - 1) / tiles) * size * scale
    };
}

fs.writeFileSync('./data/positions.json', JSON.stringify(positions, null, 4));
