const fs = require('fs');


async function readFile(path) {
    return new Promise((r, j) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return j(err);
            return r(data);
        })
    })
}

async function append(text, path) {
    return new Promise((r, j) => {
        fs.appendFile(path, text, err => {
            if (err) return j(err);
            return r();
        });
    });
}

async function removeFile(path) {
    return new Promise((r, j) => {
        fs.unlink(path, err => {
            if (err) return j(err);
            return r()
        });
    });
}

async function main() {
    let lists = await convertSpells();
    await write(lists);
}

module.exports = {
    readFile,
    removeFile,
    _append: append,
}