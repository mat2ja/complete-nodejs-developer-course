const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

const titleMsg = chalk.bgKeyword('orange').black.italic;
const bodyMsg = chalk.yellow.italic;

// Customize yargs version
yargs.version('1.0.0');

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
    notes.addNote(argv.title, argv.body);
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
  handler: () => {
    const allNotes = notes.getNotes();
    console.log(allNotes);
  },
});

// Read
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: () => {
    console.log('Reading a note!');
  },
});

yargs.parse();