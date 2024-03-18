import { openDB } from 'idb';

const initdb = async () => openDB('jate', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('jate')) {
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    } else {
      console.log('jate database already exists');
    }
  },
});

// Add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the database', result.value);
};

// Get all content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('Data retrieved from the database', result?.value);
  return result?.value;
};

initdb();