const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./data/sprite-config-enhanced.json'));
const ignore = JSON.parse(fs.readFileSync('./data/ignored.json'));
const deviations = JSON.parse(fs.readFileSync('./data/deviations.json'));
const tags = JSON.parse(fs.readFileSync('./data/tags.json'));

const notFound = [];

for (const tag of tags) {
    if (ignore.includes(tag)) continue;

    if (typeof config.ids[tag] === 'undefined' && typeof config.ids[deviations[tag]] === 'undefined') {
        notFound.push(tag);
    }
}

fs.writeFileSync('./test/not_found.json', JSON.stringify(notFound, null, 4));
