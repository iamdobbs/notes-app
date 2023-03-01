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

  it('displays note', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('Get Milk');
    model.addNote('Walk the dog');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('adds note to the model when clicked', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const note = 'This is a note';
    const inputEl = document.querySelector('#note-input');
    inputEl.value = note;
    const buttonEl = document.querySelector('#add-note-button')
    buttonEl.click();
    

    const noteEl = document.querySelectorAll('.note');
    expect(noteEl.length).toEqual(1);
    expect(noteEl[0].textContent).toEqual('This is a note');
  });

  it('clears existing displayed notes before displaying again with new note added', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote('This is note one');
    model.addNote('This is note two');
    view.displayNotes();
    view.displayNotes();

    const noteEl = document.querySelectorAll('.note');
    expect(noteEl.length).toEqual(2);
  });
})