const fs = require('fs');

const tags = [];

const files = fs.readdirSync('./data/tags');

for (const file of files) {
    const data = fs.readFileSync(`./data/tags/${file}`);
    const text = data.toString();
    const obj = JSON.parse(text);

    tags.push(...obj.values);
}

fs.writeFileSync('./data/tags.json', JSON.stringify(tags, null, 4));
