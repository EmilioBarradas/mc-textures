const fs = require('fs');
const sharp = require('sharp');

fs.rmdirSync('./data/images/spigot', { recursive: true });
fs.mkdirSync('./data/images/spigot', { recursive: true });

const config = JSON.parse(fs.readFileSync('./data/sprite-config.json'));
const positions = JSON.parse(fs.readFileSync('./data/positions.json'));
const materials = JSON.parse(fs.readFileSync('./data/materials.json'));
const deviations = JSON.parse(fs.readFileSync('./data/material_deviations.json'));

const sharpInstance = sharp(`./data/external/${config.settings.image}`);

for (const material of materials) {
    const id = typeof deviations[material] !== 'undefined'
        ? deviations[material]
        : material.replace(/_/g, ' ').toLowerCase().replace(/(\b[a-z](?!\s))/g, x => x.toUpperCase());

    if (typeof positions[id] === 'undefined') continue;

    sharpInstance.extract({
        left: positions[id].x,
        top: positions[id].y,
        width: config.settings.size,
        height: config.settings.size
    }).toFile(`./data/images/spigot/${material}.png`, (err) => {
        if (err !== null) throw err;
    });
}
