import { openDB } from 'idb';

const initdb = async () => {
  try {
    return await openDB('jate', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('jate')) {
          db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
          console.log('jate database created');
        } else {
          console.log('jate database already exists');
        }
      },
    });
  } catch (error) {
    console.error("Error initializing the database:", error);
    throw error;
  }
};

let dbPromise = initdb();

export const putDb = async (content) => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // Use put instead of add to either add new content or update existing content
  await store.put({ content: content });
  return tx.done;
};

export const getDb = async () => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Get all entries and return only the latest one
  const allEntries = await store.getAll();
  if (allEntries.length > 0) {
    // Return the latest entry
    return allEntries[allEntries.length - 1].content;
  }
  // Return undefined if there are no entries
  return undefined;
};
