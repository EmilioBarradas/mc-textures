const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./data/sprite-config.json'));
const materials = JSON.parse(fs.readFileSync('./data/materials.json'));
const ignored = JSON.parse(fs.readFileSync('./data/ignored_materials.json'));
const deviations = JSON.parse(fs.readFileSync('./data/material_deviations.json'));

const notFound = [];

for (const material of materials) {
    if (ignored.includes(material)) continue;

    const id = typeof deviations[material] !== 'undefined'
        ? deviations[material] 
        : material.replace(/_/g, ' ').toLowerCase().replace(/(\b[a-z](?!\s))/g, x => x.toUpperCase());

    if (typeof config.ids[id] !== 'undefined') continue;

    notFound.push(material);
}

fs.writeFileSync('./test/materials_not_found.json', JSON.stringify(notFound, null, 4));
