<h1 align="center">Ankasafy_BE</h1>

Ankasafy_BE is a backend repository and API for <a href="https://github.com/yosuanovry/ankasafy_fe>Ankasafy_FE<a/>" website. The API handles users, tickets, bookings, and airlines that has been fitted to Ankasafy_FE requirements. This API is built with <a href="https://expressjs.com">ExpressJs</a> and <a href="https://www.postgresql.org/">PostgreSQL</a> which is a simple and flexible web application framework that uses <a href="https://nodejs.org/en/about/">Node JS<a/>.

![DB Diagram](/public/db.png)

## Requirements

    1. Node JS
    2. Express JS
    3. Postman
    4. Database (PostgreSQL or PhpMyAdmin)
    5. Server (Localhost or Online Server (in this project i use nodemon))
    6. Cloudinary (for photo storage)

## Installation

1. Clone this repository to your project directory

```bash
  git clone https://github.com/yosuanovry/Ankasafy_BE.git
```
2. Open your project directory in CMD or terminal
3. Run command 'npm i' or 'npm install' to download the package on this API
```bash
  npm install
```
4. Make a <a href='https://cloudinary.com'>Cloudinary</a> account to get cloud storage for photo storage
5. Turn on your server like Xampp or nodemon for localhost
6. Create the database required in your database
7. Make a new file environment for your project '.env' and copy these code: [how to install env](https://www.npmjs.com/package/dotenv)
```bash
  DB_USER= //Your User Database name
  DB_HOST=localhost //Your Database Server
  DB_NAME= //Your Database Name
  DB_PASS= //Your User Database Password
  DB_PORT=4000

  JWT_KEY= //Your JWT key or Random Number

  EMAIL_NAME= //Your Admin Email
  EMAIL_PASSWORD= //Your Admin Email Password

  PHOTO_NAME= //Your Cloudinary CLoud Name
  PHOTO_KEY= //Your Cloudinary API Key
  PHOTO_SECRET= //Your Cloudinary API Secret
```
8. Open <a href='https://www.postman.com'>Postman</a>, choose HTTP request method and request URL like localhost:4000/
## Route

* **Users**

    * **GET /users** → Get all users

    * **GET /users/profile** → Get user profile by token (Need Bearer Token)

    * **GET /users/:email** → Get spesific user by email (Need email in params query)

    * **PUT /users/update-profile-photo** → Update user photo (Need Bearer Token) 
        
        ```Body{photo}```

    * **PUT /users/update-profile-information** → Update user information (Need Bearer Token)
  
        ```Body{fullname, phone, city, address, postcode}```
  
* **Tickets**
    * **GET /tickets** → Get all tickets information

    * **GET /tickets/:id** → Get spesific ticket information by id (Need id params query)
 
    * **POST /tickets** → Insert flight tickets
  
        ```Body{departure_time, departure_city, departure_nationality, arrival_time, arrival_city, arrival_nationality, price, transits, facilities, gate, terminal, class_type, code_type, airlies_id}```

* **Bookings**
    * **GET /mybookings** → Get user bookings by token (Need Bearer Token)

    * **GET /detail/:id** → Get detail by User id (Need Bearer Token and id params query)

    * **POST /bookings** → Insert bookings information (Need Bearer Token)
  
        ```Body{fullname, nationality, tickets_id, insurance, total_price, is_paid}```

    * **PUT /bookings/is_paid/:id** →  Update paid status for the booking (Need Bearer Token and id params query) 
        
        ```Body{is_paid}```

* **Airlines**
    * **POST /airlines** → Insert airlines 
  
        ```Body{airlines_name, photo}```
  
* **Authorization**
    * **POST /auth/login** → User login
  
        ```Body{email, password}```

    * **POST /auth/register** → User register
  
        ```Body{fullname, email, password}```

    * **GET /users/verification/:id/:code** → User verification by email (Need id & otp code params query)

    * **GET /users/verification/:email/:code** → User verification manually (Need email & otp code params query)

## API Link for Demo

[API](https://drab-gray-bull-ring.cyclic.app)
