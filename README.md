# Mamma Mia (or the Recipenator not sure yet)

A recipe planner that helps you work with what you have in your pantry.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


### Get started
To Mamma Mia you will need: React, and TailwindCSS for front-end, and Rust and its libraries, diesel for ORM and Actix for handling of HTTP requests for back-end.

### Installation

#### Front-end
1. Install Node.js and npm:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).
   - Verify the installation by running:
     ```
     node -v
     npm -v
     ```
2. Clone the repository:
    ```
    git clone <repository-url>
    cd <repository-name>
    ```
3. Navigate to the front-end directory:
    `cd client`

4. Install project dependencies:
    `npm install`
5. Start the React development server:
    `npm start`
6. Access the front-end at [http://localhost:3000](http://localhost:3000) in your web browser.

## Back-end (Rust, Diesel, Actix)

1. Install Rust:
- Install Rust by following the instructions at [rust-lang.org](https://www.rust-lang.org/tools/install).

2. Clone the repository (if not done already):
    ```
    git clone <repository-url>
    cd <repository-name>
    ```
3. Navigate to the back-end directory:
    `cd server`
4. Install Diesel CLI (for managing database migrations):
`cargo install diesel_cli --no-default-features --features postgres`

5. Install PostgreSQL:
- Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/) and set up a database.

6. Create a `.env` file in the `server` directory with your database connection details:
`DATABASE_URL=postgres:/username:password@localhost/database_name` note that in my example I am using postgreSQL however you can set up whatever you prefer

7. Run database migrations to set up the initial schema:
    `diesel migration run`
8. Start the Actix server:
cargo run
9. Access the back-end API at http://localhost:8080

## About

A reason i started this project is for me to sharpen my skills as a web developer but also to learn Rust, while I get its not as popular or optimal as far as programming languages for web development go, I really don't care.

The main goal of this project is going to be to provide an easy and simple way for a lazy person that is bad at cooking (eg. me) to schedule when and how to cook 3 meals a day for a set amount of days with just the ingredients inside of your pantry. 


## License

MIT