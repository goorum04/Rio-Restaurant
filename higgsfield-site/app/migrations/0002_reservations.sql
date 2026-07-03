-- Reservation requests submitted from /reserves. Additive only — this D1
-- instance is shared by preview and production.
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  guests TEXT NOT NULL,
  email TEXT,
  notes TEXT,
  lang TEXT NOT NULL DEFAULT 'ca',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
