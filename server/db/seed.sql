INSERT INTO tables (seats, location, label) VALUES
 (2,'inside','I-1'), (2,'inside','I-2'), (4,'inside','I-3'),
 (4,'inside','I-4'), (6,'inside','I-5'),
 (2,'outside','O-1'), (4,'outside','O-2'), (4,'outside','O-3'), (6,'outside','O-4');

INSERT INTO reservations (name,email,people,date,time,table_number) VALUES
 ('Alice','alice@example.com',2,'2025-09-30','14:00:00',1),
 ('Bob','bob@example.com',4,'2025-09-30','14:00:00',3);
