CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    fullname VARCHAR,
    email VARCHAR,
    password VARCHAR,
    phone VARCHAR DEFAULT NULL,
    city VARCHAR DEFAULT NULL,
    address VARCHAR DEFAULT NULL,
    postcode VARCHAR DEFAULT NULL,
    photo VARCHAR DEFAULT 'https://res.cloudinary.com/dzvtizxtq/image/upload/v1682490851/ankasafy/pngtree-character-default-avatar-image_2237203_btsaoh.jpg',
    role VARCHAR DEFAULT 'customer',
    otp VARCHAR,
    status VARCHAR DEFAULT '0'
);

DROP TABLE users;