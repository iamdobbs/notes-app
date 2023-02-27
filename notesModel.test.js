const NotesModel = require('./notesModel')

describe('NotesModel', () => {
  it('constructs with an empty array', () => {
    const notemodel = new NotesModel;
    expect(notemodel.notes).toEqual([]);
  });

  it('can add a note', () => {
    const notemodel = new NotesModel;
    notemodel.addNote('Buy Milk');
    expect(notemodel.getNotes()).toEqual(['Buy Milk']);
  });

  it('can add multiple notes', () => {
    const notemodel = new NotesModel;
    notemodel.addNote('Buy Milk');
    notemodel.addNote('Go to the Gym');
    expect(notemodel.getNotes()).toEqual(['Buy Milk', 'Go to the Gym']);
  });

  it('resets list of notes to empty', () => {
    const notemodel = new NotesModel;
    notemodel.addNote('Buy Milk');
    notemodel.addNote('Go to the Gym');
    notemodel.reset();
    expect(notemodel.getNotes()).toEqual([]);
  });
})