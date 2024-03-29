CREATE OR REPLACE DATABASE king_store;
USE king_store;

CREATE OR REPLACE TABLE admin (
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(36),
PASS VARCHAR(36)
);
INSERT  INTO admin( username , pass ) VALUES 
('admin','$argon2id$v=19$m=65536,t=3,p=4$aZFov');


CREATE OR REPLACE TABLE kategori (
id INT PRIMARY KEY AUTO_INCREMENT,
kategori VARCHAR (36)
);

INSERT  INTO kategori VALUES 

(1,'Men'),
(2,'Woman'),
(3,'Unisex')

CREATE OR REPLACE TABLE pakaian (
  kode_pakaian INT PRIMARY KEY AUTO_INCREMENT,
  kategori INT,
  nama_pakaian VARCHAR (36),
  jenis VARCHAR (36),
  harga INT,
  stok INT,
  foto VARCHAR (200),
  CONSTRAINT fk FOREIGN KEY (kategori) REFERENCES kategori (id)
);
INSERT  INTO pakaian VALUES
(1  ,       2 , 'Sleeve Bear'     ,    'T-Shirt'  ,50000  ,10 , '62704724a8374bd171180b03e67c8d4b ') ,
(2  ,      3  , 'Dual Match'       ,   'T-Shirt'  ,50000  , 10 , '76ef95db2bf1262a1a3dda1dbf00fe12 ') ,
(3  ,       1 , 'Letter Grapic'     ,   'Sweater' ,150000  , 10 , '6bffaa7f4c1052c2cb74a556afcea054 ') ,
(4  ,       1  , 'Privathinker Gothic' , 'Hoodie'  ,170000 ,  10, 'd01a0baea8c8ea70e64ce78deebc3849 ' )


