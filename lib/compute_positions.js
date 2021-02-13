const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./data/sprite-config.json'));

const positions = {};

const sheetWidth = config.settings.sheetsize;
const size = config.settings.size;
const tiles = sheetWidth / size;
const scale = 1;

for (const [ key, value ] of Object.entries(config.ids)) {
    positions[key] = {
        x: (value.pos - 1) % tiles * size * scale,
        y: Math.floor((value.pos - 1) / tiles) * size * scale
    };
}

fs.writeFileSync('./data/positions.json', JSON.stringify(positions, null, 4));
