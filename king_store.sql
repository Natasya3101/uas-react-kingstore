CREATE OR REPLACE DATABASE king_store;
USE king_store;

CREATE OR REPLACE TABLE admin (
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(255),
	PASSWORD VARCHAR(255)
);

# username : natasya
# password : acaa
INSERT INTO admin VALUES (NULL, 'natasya', '$2b$10$DPy.qKhbKsOgjq4pUXLxvus5PLpFFG5Ygt544t6Qatz/r/yzuq5KG');

CREATE OR REPLACE TABLE kategori (
	id INT PRIMARY KEY AUTO_INCREMENT,
	kategori VARCHAR (255)
);

INSERT  INTO kategori VALUES (1,'Men'), (2,'Woman'), (3,'Unisex');

CREATE OR REPLACE TABLE pakaian (
  kode_pakaian INT PRIMARY KEY AUTO_INCREMENT,
  kategori INT,
  nama_pakaian VARCHAR (255),
  jenis VARCHAR (255),
  harga INT,
  stok INT,
  foto VARCHAR (255),
  CONSTRAINT fk FOREIGN KEY (kategori) REFERENCES kategori (id)
);

INSERT INTO pakaian VALUES 
         ( 1      ,  3 , 'Holiday Naetaiy'  , 'T-Shirt'  , 35000   ,   10 , 'https://i.pinimg.com/564x/52/93/08/5293084567a69929bb96d401b0f21d32.jpg' ),
         ( 2      ,  2 , 'Msicrow Artis Club' , 'Sweater'  , 75000   ,  10 , 'https://i.pinimg.com/564x/0b/8f/95/0b8f95cb5c84e848fd7fe875b2085a5c.jpg' ),
         ( 3      ,  2 , 'Rose Themed'       , 'Hoodie'  ,150000  ,    10 , 'https://i.pinimg.com/564x/99/25/05/9925058c4ac02af8587db409b1ff2aa4.jpg' ), 
         ( 4      ,  1 , 'Happiness 07'         , 'Hoodie' , 150000 ,     10 , 'https://i.pinimg.com/564x/48/ee/7a/48ee7a8466eb7d1786f10b9c1daa9029.jpg'),
         ( 5      ,  3 , 'Butterfly Seeker'   , 'Sweater'  , 75000     , 10  ,'https://i.pinimg.com/736x/5d/9c/89/5d9c897063f8e71a508ff1283eb214ef.jpg'), 
         ( 6      ,  1 , 'Thestory'            ,'T-Shirt',   40000  ,    10  ,'https://i.pinimg.com/564x/b4/21/90/b42190272c7d0e6ef4b24c64fee0eb7e.jpg') 