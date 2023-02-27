const NotesModel = require('./notesModel')

console.log('The notes app is running');


let notemodel = new NotesModel;
notemodel.addNote('Buy Milk');
notemodel.addNote('Go to the Gym');
console.log(notemodel.getNotes());