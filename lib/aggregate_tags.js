const fs = require('fs');
const AdmZip = require('adm-zip');

const tags = [];

const zip = new AdmZip('./data/external/client.jar');
const entries = zip.getEntries();

entries.forEach(entry => {
    if (entry.entryName.startsWith('assets/minecraft/textures/item')
            || entry.entryName.startsWith('assets/minecraft/textures/block')) {
        const tagParts = entry.entryName.split('/');
        const normalizedTag = tagParts[tagParts.length - 1].split('.')[0].toUpperCase();
        tags.push(normalizedTag);
    }
});

fs.writeFileSync('./data/tags.json', JSON.stringify(tags, null, 4));
