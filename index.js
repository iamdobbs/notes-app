const NotesModel = require('./notesModel')
const NotesView = require('./notesView')
const NotesClient = require('./notesClient')


console.log('The notes app is running');
const client = new NotesClient();
const model = new NotesModel();
const view = new NotesView(model, client);

// let notemodel = new NotesModel;
// notemodel.addNote('Buy Milk');
// notemodel.addNote('Go to the Gym');
// console.log(notemodel.getNotes());

// const model = new NotesModel();
// model.addNote('This is an example note')
// const view = new NotesView(model);
// view.displayNotes(); 

// view.displayNotesFromApi();