CREATE OR REPLACE DATABASE king_store;
USE king_store;

CREATE OR REPLACE TABLE admin (
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(36),
PASSWORD VARCHAR(36)
);
INSERT  INTO `admin`(`username`,`password`) VALUES 
('admin','123');


CREATE OR REPLACE TABLE pakaian (
kode_pakaian INT PRIMARY KEY AUTO_INCREMENT,
nama_pakaian VARCHAR(36),
harga VARCHAR(20),
stok INT,
foto VARCHAR(100)
);

