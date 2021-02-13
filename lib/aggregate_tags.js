const fs = require('fs');
const AdmZip = require('adm-zip');

const tags = [];

const zip = new AdmZip('./data/external/client.jar');
const entries = zip.getEntries();

const lang = entries.filter(entry => entry.entryName === 'assets/minecraft/lang/en_us.json');
const config = JSON.parse(lang[0].getData());

for (const key of Object.keys(config)) {
    if (!key.startsWith('block') && !key.startsWith('item')) continue;

    const tagParts = key.split('.');
    const usefulTagParts = tagParts.filter(p => p !== 'minecraft' && p !== 'block' && p !== 'item');
    const normalizedTag = usefulTagParts.join('_').toLowerCase();

    tags.push(normalizedTag);
}

fs.writeFileSync('./data/tags.json', JSON.stringify(tags, null, 4));
