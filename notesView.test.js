/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel')

describe('Notes view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it('displays notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('Get Milk');
    model.addNote('Walk the dog');
    console.log(model.notes.length)
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });
})