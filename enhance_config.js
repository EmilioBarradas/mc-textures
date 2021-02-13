const fs = require('fs');

const buffer = fs.readFileSync('./data/sprite-config.json');
let text = buffer.toString();

const config = JSON.parse(text);

for (const [key, value] of Object.entries(config.ids)) {
    delete config.ids[key];
    config.ids[key.replace(/ /g, '_').toUpperCase()] = value;
}

fs.writeFileSync('./data/sprite-config-enhanced.json', JSON.stringify(config, null, 4));
