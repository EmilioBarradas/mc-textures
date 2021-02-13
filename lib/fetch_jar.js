const { default: axios } = require('axios');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./data/external_config.json'));

if (!fs.existsSync('./data/external')) {
    fs.mkdirSync('./data/external');
}


if (fs.existsSync('./data/external/client.jar')) {
    fs.rmSync('./data/external/client.jar');
}

(async () => {
    let res;

    res = await axios({
        method: 'get',
        url: config.mojang_manifest,
    });

    if (res.status !== 200 || typeof res.data === 'undefined') throw Error("Error while retrieving mojang manifest.");

    let versionURL;

    for (const version of res.data.versions) {
        if (version.id === res.data.latest.release) {
            versionURL = version.url;
        }
    }

    res = await axios({
        method: 'get',
        url: versionURL,
    });

    if (res.status !== 200 || typeof res.data === 'undefined') throw Error("Error while retrieving latest version manifest.");

    axios({
        method: 'get',
        url: res.data.downloads.client.url,
        responseType: 'stream',
    }).then(res => {
        res.data.pipe(fs.createWriteStream('./data/external/client.jar'))
    });
})();
