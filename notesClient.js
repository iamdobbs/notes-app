class NotesClient {
  
  loadNotes (callback, displayError) {
    fetch('http://localhost:3000/notes')
    .then(response => response.json())
    .then(data => 
      callback(data))
    .catch(error => {
      displayError(error);
    });
  }
  
  createNote (note, callback, displayError) {
    const data = { content: note };

    fetch('http://localhost:3000/notes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => 
      callback(data))
      .catch(error => {
        displayError(error);
    });
  }  
}  


module.exports = NotesClient;