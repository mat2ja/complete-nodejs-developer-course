const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes.js');

// const cyanMsg = chalk.keyword('cyan').italic;
// const orangeMsg = chalk.keyword('orange').italic;
// const redMsg = chalk.keyword('red').italic;

yargs.version('1.1.0')

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  handler() {
    console.log('Adding a new note!');
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  handler() {
    console.log('Removing a note!');
  }
})

yargs.command({
  command: 'list',
  describe: 'List notes',
  handler() {
    console.log('Listing notes!');
  }
})

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler() {
    console.log('Reading a note!');
  }
})

// yargs.command('read', 'Read a note', () => {
//   console.log('Reading a note!');
// })


console.log(yargs.argv);