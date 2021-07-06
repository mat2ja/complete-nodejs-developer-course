const getNotes = require('./notes.js');
const chalk = require('chalk');

const notesMsg = getNotes();
const greenMsg = chalk.bgYellow.black.italic(notesMsg);

console.log('process.argv :>> ', process.argv);
console.log(`${greenMsg} for ${process.argv[2] || 'nepoznati boyo'}`);
