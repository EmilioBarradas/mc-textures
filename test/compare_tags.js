const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./data/sprite-config.json'));
const tags = JSON.parse(fs.readFileSync('./data/tags.json'));
const ignored = JSON.parse(fs.readFileSync('./data/ignored_tags.json'));
const deviations = JSON.parse(fs.readFileSync('./data/tag_deviations.json'));

const notFound = [];

for (const tag of tags) {
    if (ignored.includes(tag)) continue;

    const id = typeof deviations[tag] !== 'undefined'
        ? deviations[tag] 
        : tag.replace(/_/g, ' ').replace(/(\b[a-z](?!\s))/g, x => x.toUpperCase());

    if (typeof config.ids[id] !== 'undefined') continue;

    notFound.push(tag);
}

fs.writeFileSync('./test/tags_not_found.json', JSON.stringify(notFound, null, 4));
