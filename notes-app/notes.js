const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return loadNotes();
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (!duplicateNotes.length) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.keyword('lightgreen').italic('New note added'));
  } else {
    // todo: list note & offer overwrite
    console.log(chalk.keyword('pink').italic('Note title taken'));
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
};
