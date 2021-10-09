const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// i can create the same version of this by using lichess api and saving the postion of a game or that file format of chess games in json.
// https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/
// custom version
yargs.version('1.1.0');

// add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: "Note content",
      demandOption: true,
      type: 'string',
    }
  },
  handler (argv){
    notes.addNote(argv.title, argv.body);
  }
})

// remove command
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    }
  },
  handler (argv){
    notes.removeNote(argv.title);
  }
})
// list command
yargs.command({
  command: 'list',
  describe: 'list notes',
  handler (){
    const notesList = notes.loadNotes();
    console.log(chalk.blue.inverse('Your notes'));
    notesList.forEach(note => {
      console.log(note.title);
    });
  }
})
// read command
yargs.command({
  command: 'read',
  describe: 'read notes',
  builder: {
    title: {
      describe: 'note title',
      demandOption: 'true',
      type: 'string',
    }
  },
  handler (argv){
    notes.readNote(argv.title);
  }
})

yargs.parse();