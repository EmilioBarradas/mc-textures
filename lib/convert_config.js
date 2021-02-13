const fs = require('fs');

const idsRegexp = new RegExp(/ids = \{(.*)\},/, 's');
const sectionsRegexp = new RegExp(/"sections": \{(.*?)\}(,\s*")/, 's');

const contentsRegexp = new RegExp(/return \{\n(.*)\n\}/, 's');
const removeURLRegexp = new RegExp(/\n\t\turl = .*/, 'gm');
const encapsulationRegexpDouble = new RegExp(/\["(.*)"\] =/, 'g');
const encapsulationRegexpSingle = new RegExp(/\['(.*)'\] =/, 'g');
const encapsulationRegexpNone = new RegExp(/([^\s'"]+) =/, 'g');
const encapsulationRegexpValue = new RegExp(/'(.*)'/, 'g');
const removeTrailingCommaRegexp = new RegExp(/,(\s*(?:}|]))/, 'g');

const buffer = fs.readFileSync('./data/external/sprite-config-unprocessed.txt');
let text = buffer.toString();

text = text.replace(contentsRegexp, `{\n$1\n}`);

text = text.replace(removeURLRegexp, ``);

text = text.replace(idsRegexp, (_match, group) => {
    let innerText = group;

    innerText = innerText.replace(encapsulationRegexpDouble, `"$1":`);
    innerText = innerText.replace(encapsulationRegexpSingle, `"$1":`);
    innerText = innerText.replace(encapsulationRegexpNone, `"$1":`);

    return `ids = {${innerText}},`;
});

text = text.replace(encapsulationRegexpNone, `"$1":`);
text = text.replace(encapsulationRegexpValue, `"$1"`);

text = text.replace(sectionsRegexp, `"sections": \[$1\]$2`);

text = text.replace(removeTrailingCommaRegexp, `$1`);

fs.writeFileSync('./data/sprite-config.json', text);
