import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

function openDb(): Promise<Database> {
  return open({
    filename: './mydb.sqlite3',
    driver: sqlite3.Database,
  });
}

async function createTable() {
  const db = await openDb();
  await db.exec(`
        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            phone TEXT UNIQUE,
            remark TEXT,
            address TEXT
        )
    `);
}

createTable().catch((err) => console.error(err));

export default openDb;
