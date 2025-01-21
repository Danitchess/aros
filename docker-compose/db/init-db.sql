CREATE DATABASE aros;

\c aros

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table messages
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(100),
  text TEXT NOT NULL,
  date_envoie TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY, -- AUTO_INCREMENT est remplacé par SERIAL
  type VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL, -- DECIMAL est équivalent à NUMERIC en PostgreSQL
  imageUrl VARCHAR(255) NOT NULL
);

-- Table orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  userEmail VARCHAR(100) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'en traitement',
  CONSTRAINT fk_user_email FOREIGN KEY (userEmail) REFERENCES users(email)
);

CREATE TABLE IF NOT EXISTS order_details (
  id SERIAL PRIMARY KEY,
  orderId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_order_details_order FOREIGN KEY (orderId) REFERENCES orders(id),
  CONSTRAINT fk_order_details_product FOREIGN KEY (productId) REFERENCES products(id)
);

INSERT INTO products (id, type, name, price, imageUrl)
VALUES
(10, 'Bracelet', 'Bracelet argent mailles serrées', 16, '/img-bracelet/bracelet-seiko-argent-20mm.png'),
(11, 'Bracelet', 'Bracelet argent et or mailles serrées', 27, '/img-bracelet/bracelet-seiko-argent-or-20mm.png'),
(12, 'Bracelet', 'Bracelet argent et or', 27, '/img-bracelet/bracelet-argent-or-20mm.png'),
(121, 'Bracelet', 'Bracelet argent et or', 27, '/img-bracelet/bracelet-argent-or-20mm-12.1.png'),
(13, 'Bracelet', 'Bracelet argent et rose mailles serrées', 27, '/img-bracelet/bracelet-seiko-argent-rose-20mm.png'),
(14, 'Bracelet', 'Bracelet argent', 16, '/img-bracelet/bracelet-argent-20mm.png'),
(141, 'Bracelet', 'Bracelet argent', 16, '/img-bracelet/bracelet-argent-20mm-14.1.png'),
(20, 'Boitier', 'Boitier argent, lunette entaillée', 30, '/img-boitier/boitier-seiko-argent-39mm.1.png'),
(21, 'Boitier', 'Boitier argent avec lunette', 30, '/img-boitier/boitier-argent-bezel.png'),
(22, 'Boitier', 'Boitier argent et or, lunette entaillée', 45, '/img-boitier/boitier-seiko-argent-or-39mm.png'),
(23, 'Boitier', 'Boitier argent et or, lunette lisse', 45, '/img-boitier/boitier-lisse-argent-or-39mm.png'),
(24, 'Boitier', 'Boitier argent et rose, lunette entaillée 39mm', 45, '/img-boitier/boitier-seiko-argent-rose-39mm.png'),
(30, 'Cadran', 'Cadran noir', 23, '/img-cadrans/cadran-noir.png'),
(31, 'Cadran', 'Cadran blanc', 23, '/img-cadrans/cadran-blanc.png'),
(32, 'Cadran', 'Cadran bleu', 23, '/img-cadrans/cadran-bleu.png'),
(33, 'Cadran', 'Cadran nautilus vert', 23, '/img-cadrans/cadran-nautilus-vert.png'),
(34, 'Cadran', 'Cadran minutetime vert', 23, '/img-cadrans/cadran-minutetime-vert.png'),
(40, 'Couleur Logo', 'Logo noir', 0, '/img-logos/logo-noir.png'),
(41, 'Couleur Logo', 'Logo blanc', 0, '/img-logos/logo-blanc.png'),
(42, 'Couleur Logo', 'Logo doré', 0, '/img-logos/logo-or.png'),
(50, 'Aiguille', 'Aiguilles argent flèchée', 4, '/img-aiguilles/aiguilles-argent-fleche.png'),
(51, 'Aiguille', 'Aiguilles argent rectangulaire', 4, '/img-aiguilles/aiguilles-argent-rectangle.png'),
(52, 'Aiguille', 'Aiguilles or bouts ronds', 4, '/img-aiguilles/aiguilles-rond-or.png'),
(60, 'Trotteuse', 'Trotteuse argent', 2, '/img-trotteuses/trotteuse-argent.png'),
(61, 'Trotteuse', 'Trotteuse argent très fine', 2, '/img-trotteuses/trotteuse-argent-fine.png'),
(62, 'Trotteuse', 'Trotteuse or très fine', 2, '/img-trotteuses/trotteuse-rond-or.png'),
(70, 'Couleur Date', 'Mouvement NH35 blanc', 58, 'date-blanc.png'),
(71, 'Couleur Date', 'Mouvement NH35 noir', 58, 'date-noir.png'),
(80, 'Loupe', 'Sans loupe', 0, 'vide.png'),
(81, 'Loupe', 'Loupe', 0, 'loupe.png'),
(90, 'Lunette', 'Lunette blanche chiffres en relief', 6, '/img-lunettes/lunette-blanc-relief.png'),
(91, 'Lunette', 'Lunette noire chiffres blancs', 6, '/img-lunettes/lunette-noir-blanc.png'),
(92, 'Lunette', 'Lunette rouge et bleue', 6, '/img-lunettes/lunette-rouge-bleu.png'),
(93, 'Lunette', 'Lunette rouge et noire', 6, '/img-lunettes/lunette-rouge-noir.png'),
(94, 'Lunette', 'Lunette bleue et noire', 6, '/img-lunettes/lunette-bleu-noir.png'),
(95, 'Lunette', 'Lunette verte et noire', 6, '/img-lunettes/lunette-vert-noir.png'),
(96, 'Lunette', 'Lunette noire chiffres noirs', 6, '/img-lunettes/lunette-noir.png'),
(15, 'Bracelet', 'Bracelet argent et rose 13mm', 18.15, '/img-bracelet/bracelet-seiko-argent-rose-13mm.png'),
(16, 'Bracelet', 'Bracelet argent 13mm', 18.15, '/img-bracelet/bracelet-argent-13mm.png'),
(25, 'Boitier', 'Boitier argent et rose, lunette entaillée 26mm', 27.25, '/img-boitier/boitier-seiko-argent-rose-26mm.png');


