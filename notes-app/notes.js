const fs = require('fs');
const chalk = require('chalk');

const successMsg = chalk.bgKeyword('lightgreen').black.italic;
const warnMsg = chalk.bgKeyword('gold').black.italic;
const dangerMsg = chalk.bgKeyword('orangered').black.italic;

const getNotes = () => loadNotes();

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (!duplicateNotes.length) {
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
    console.log(dangerMsg(' Note removed! '));
    saveNotes(notesToKeep);
  } else {
    console.log(warnMsg(' Note not found! '));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length) {
    console.log(chalk.inverse('\n Your notes: '));
    notes.forEach((note) =>
      console.log(`${chalk.keyword('orange')('-')} ${chalk.italic(note.title)}`)
    );
    console.log();
  } else {
    console.log(warnMsg(' You dont have any notes! '));
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
  getNotes,
  addNote,
  removeNote,
  listNotes,
};
