const fs = require('fs');
const chalk = require('chalk');

const successMsg = chalk.bgKeyword('lightgreen').black.italic;
const warnMsg = chalk.bgYellow.black.italic;
const dangerMsg = chalk.bgRed.black.italic;
const titleMsg = chalk.bgKeyword('orange').black.italic;
const titleAccent = chalk.keyword('orange').italic;
const italicMsg = chalk.italic;

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title,
      body,
      timestamp: new Date(),
    });
    saveNotes(notes);
    console.log(successMsg(' New note added! '));
  } else {
    console.log(warnMsg(' Note title already taken! '));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(successMsg(' Note removed! '));
    saveNotes(notesToKeep);
  } else {
    console.log(dangerMsg(' Note not found! '));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length) {
    console.log(titleMsg('\n Your notes: '));
    notes.forEach((note) =>
      console.log(`${titleAccent('-')} ${italicMsg(note.title)}`)
    );
    console.log();
  } else {
    console.log(warnMsg(' You dont have any notes! '));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(titleMsg(`\n ${note.title} `));
    console.log(!!note.body ? `${italicMsg(note.body)}\n` : '');
  } else {
    console.log(dangerMsg(' Note not found! '));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes, null, 2);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
