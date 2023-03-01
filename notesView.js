class NotesView {

  constructor (model) {
    this.mainContainerEl = document.querySelector('#main-container');
    this.model = model;

    this.buttonEl = document.querySelector('#add-note-button');

    this.buttonEl.addEventListener('click', () => {
      const input = document.querySelector('#note-input').value;
      this.model.addNote(input);
      this.displayNotes();
    });   
  }

  displayNotes () {
    const notes = this.model.getNotes()

    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }
}

module.exports = NotesView;