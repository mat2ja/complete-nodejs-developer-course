const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes.js');

const titleMsg = chalk.bgKeyword('orange').black.italic;
const bodyMsg = chalk.yellow.italic;

yargs.version('1.1.0');

// Add
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note description',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    console.log(titleMsg(` ${argv.title} `));
    console.log(bodyMsg(argv.body));
  },
});

// Remove
yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  handler(arg) {
    console.log('Removing a note!');
  },
});

// List
yargs.command({
  command: 'list',
  describe: 'List notes',
  handler() {
    console.log('Listing notes!');
  },
});

// Read
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler() {
    console.log('Reading a note!');
  },
});

yargs.parse();
