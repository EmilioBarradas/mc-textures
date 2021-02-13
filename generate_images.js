const fs = require('fs');
const sharp = require('sharp');

fs.rmdirSync('./data/images', { recursive: true });
fs.mkdirSync('./data/images');

const config = JSON.parse(fs.readFileSync('./data/sprite-config-enhanced.json'));
const positions = JSON.parse(fs.readFileSync('./data/positions.json'));

const sharpInstance = sharp(`./data/external/${config.settings.image}`);

for (const [ tag, pos ] of Object.entries(positions)) {
    sharpInstance.extract({
        left: pos.x,
        top: pos.y,
        width: config.settings.size,
        height: config.settings.size
    }).toFile(`./data/images/${tag}.png`, (err) => {
        if (err !== null) throw err;
    });
}
