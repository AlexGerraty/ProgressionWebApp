import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add content to the database
export const putDb = async (content) => {
  // Open the database
  const jateDb = await openDB('jate', 1);

  // Create a transaction
  const tx = jateDb.transaction('jate', 'readwrite');

  // Get the object store
  const store = tx.objectStore('jate');

  // Add the content to the object store
  const request = store.put({ id: 1, value: content });

  // Wait for the request to complete
  const result = await request;
  console.log('Data saved to the database', result);
};

// Get all content from the database
export const getDb = async () => {
  // Open the database
  const jateDb = await openDB('jate', 1);

  // Create a transaction
  const tx = jateDb.transaction('jate', 'readonly');

  // Get the object store
  const store = tx.objectStore('jate');

  // Get all the data from the object store
  const request = store.getAll();

  // Wait for the request to complete
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result;
};

initdb();