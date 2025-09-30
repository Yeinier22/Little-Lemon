CREATE TABLE IF NOT EXISTS tables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seats INT NOT NULL,
  location ENUM('inside','outside') NOT NULL,
  label VARCHAR(30) NULL
);

CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  people INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  table_number INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_table_slot (table_number, date, time),
  FOREIGN KEY (table_number) REFERENCES tables(id)
);
