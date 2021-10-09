const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body)=>{
  const notes = loadNotes();

  const duplicateNote = notes.find((note)=>note.title === title
  );

  debugger

  if(!duplicateNote){
    notes.push({
      title: title,
      body: body,
    })
  
    saveNotes(notes);
    console.log(chalk.bgGreen('New note added'));
  } else {
    console.log(chalk.bgRed('Note title taken'));
  }
}

const removeNote = (title)=>{
  const notes = loadNotes();
  const unmatchedNotes = notes.filter((note)=>note.title !== title);

  if(unmatchedNotes.length!=notes.length){
    saveNotes(unmatchedNotes);
    console.log(chalk.bgGreen('removed the note'));
  }else{
    console.log(chalk.bgRed('No note found'));
  }
}

const saveNotes = (notes)=>{
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = ()=>{
  // if there is no file then it's gonna fail
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch(e){
      return [];
  }
  
}

const readNote = (title)=>{
  const notes = loadNotes();
  const matchedNote = notes.find((note)=>note.title === title);
  if(matchedNote){
    console.log(chalk.blue.inverse(matchedNote.title));
    console.log(matchedNote.body);
  } else{
    console.log(chalk.red.inverse('invalid title'));
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  loadNotes: loadNotes,
  readNote: readNote,
}