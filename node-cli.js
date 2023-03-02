#!/usr/bin/env node

const readline = require('node:readline');
const path = require('node:path');
const { writeFile, rm } = require('node:fs/promises');


const mode = process.argv[2];

// TODO: Improve error handling.
async function init() {
    let transform = (line) => console.log(line);

    if (mode == '-i') {
        const TMP_FILE = path.resolve('./node-cli-tmp.js');
        await writeFile(TMP_FILE, `module.exports=(line)=>{ ${process.argv[3]} }`);
        const transformerFunc = require(TMP_FILE);
        await rm(TMP_FILE);
        transform = (line) => console.log(transformerFunc(line));

    } else {

        console.log(`loading file ${process.argv[3]}`)
        const transformerFunc = require(path.resolve(process.argv[3]));
        transform = async (line) => {
            const data = await transformerFunc(line);
            console.log(data);
        }
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
    rl.on('line', (line) => {
        transform(line)
    });
    rl.once('close', () => { });
}



if (mode == '-i' || mode == '-f') {
    init();
} else if (mode == '--help') {
    console.log(`
        You can use this node-cli to transform each line coming from stdin and send back transformed lines to stdout
        ex: 
            cat file.txt | node-cli -e 'return line.toUpperCase()';

    `);
} else {
    console.error("Please provide appropriate parameters. You can refer to node-cli --help");
}

