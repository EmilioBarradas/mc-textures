const fs = require('fs');
const AdmZip = require('adm-zip');

fs.rmdirSync('./data/tags', { recursive: true });
fs.mkdirSync('./data/tags');

const zip = new AdmZip('./data/external/client.jar');
const entries = zip.getEntries();

entries.forEach(entry => {
    if (entry.entryName.startsWith('data/minecraft/tags/items')
            || entry.entryName.startsWith('data/minecraft/tags/blocks')) {
        const parts = entry.entryName.split('/');
        fs.writeFileSync(`./data/tags/${parts[parts.length - 1]}`, entry.getData());
    }
});
