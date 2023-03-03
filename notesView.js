class NotesView {

  constructor (model, client) {
    this.mainContainerEl = document.querySelector('#main-container');
    this.model = model;
    this.client = client;

    this.buttonEl = document.querySelector('#add-note-button');

    this.buttonEl.addEventListener('click', () => {
      const input = document.querySelector('#note-input').value;
      this.addNewNote(input);
      
      this.displayNotes();
    });   
  }

  displayNotes = () => {
    document.querySelectorAll('.note').forEach(note => {
      note.remove();
    });

    const notes = this.model.getNotes()

    notes.forEach((note) => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    });
    document.querySelector('#note-input').value = "";
  }

   displayNotesFromApi = async () => {
    await this.client.loadNotes((data) => {
    this.model.setNotes(data);
    this.displayNotes();
  })
  }

  addNewNote = (note) => {
    this.client.createNote(note, (data) => {
      this.model.setNotes(data);
      this.displayNotes();
    });
  }
}

module.exports = NotesView;