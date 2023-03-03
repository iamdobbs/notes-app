const NotesClient = require('./notesClient');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {
  it('calls fetch and loads data', (done) => {

    const client = new NotesClient();
    fetch.mockResponseOnce(JSON.stringify({
      note: "This is a mock note",
    }));

    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.note).toBe("This is a mock note");
      done();
    });
  });

  it('posts data to the API', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify({
      note: "This is a posted mock note",
    }));

    client.createNote("This is a posted mock note", (returnedDataFromApi) => {
      expect(returnedDataFromApi.note).toBe("This is a posted mock note");
      done();
    });
  });  
});