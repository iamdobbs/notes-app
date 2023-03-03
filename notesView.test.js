/**
 * @jest-environment jsdom
 */
require('jest-fetch-mock').enableMocks()
const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');

jest.mock('./notesClient')

describe('Notes view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    NotesClient.mockClear();
  });

  it('displays note', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);

    model.addNote('Get Milk');
    model.addNote('Walk the dog');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it.skip('adds note to the model when clicked', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);

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
    const client = new NotesClient();
    const view = new NotesView(model, client);

    model.addNote('This is note one');
    model.addNote('This is note two');
    view.displayNotes();
    view.displayNotes();

    const noteEl = document.querySelectorAll('.note');
    expect(noteEl.length).toEqual(2);
  });

  it('fetch and display information from an API', (done) => {
    const fakeClient = {loadNotes: (callback) => callback(['This is another mock note'])}
    const model = new NotesModel();
    const view = new NotesView(model, fakeClient);

    
    view.displayNotesFromApi();
    const NoteEl = document.querySelector('.note');
    expect(NoteEl.textContent).toEqual('This is another mock note')
    done();
  });

  it('adds a new note to the server via POST', () => {
    // const fakeClient = {createNotes: (callback) => callback(['This is another POST mock note'])}
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);

    mockClient.createNote = jest.fn((note, callback) => callback([note]))

    view.addNewNote('This is another POST mock note')
    

    const noteEl = document.querySelectorAll('.note');
    expect(noteEl.length).toEqual(1);
    expect(noteEl[0].textContent).toEqual('This is another POST mock note');
  });

  it.only('can display an error message on the page', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);
    view.displayError();
    const mainCont = document.querySelector('#main-container');
    expect(mainCont.textContent).toContain('Oops, something went wrong!');
  });

  it('display an error message when there is an error', (done) => {
    const fakeClient = {loadNotes: (callback) => callback(['This is another mock note'])}
    const model = new NotesModel();
    const view = new NotesView(model, fakeClient);

    
    view.displayNotesFromApi();
    const NoteEl = document.querySelector('.note');
    expect(NoteEl.textContent).toEqual('This is another mock note')
    done();
  });

})