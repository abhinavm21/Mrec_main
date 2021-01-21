#!/usr/bin/python
from libs.db_sqlite import SqliteDatabase

if __name__ == '__main__':
  db = SqliteDatabase()

  #
  # songs table

  db.query("DROP TABLE IF EXISTS songs;")
  print('removed db.songs');

  db.query("""
    CREATE TABLE songs (
      id  INTEGER PRIMARY KEY AUTOINCREMENT,
      name  TEXT,
      filehash  TEXT
    );
  """)
  print('created db.songs');

  #
  # fingerprints table

  db.query("DROP TABLE IF EXISTS fingerprints;")
  print('removed db.fingerprints');

  db.query("""
    CREATE TABLE `fingerprints` (
      `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
      `song_fk` INTEGER,
      `hash`  TEXT,
      `offset`  INTEGER
    );
  """)
  print('created db.fingerprints');
  
  
  # results table
  db.query("DROP TABLE IF EXISTS results;")
  print('removed db.results');

  db.query("""
    CREATE TABLE results (
       id  INTEGER PRIMARY KEY AUTOINCREMENT,
       rname TEXT
    );
  """)
  print('created db.results');

  print('done');
