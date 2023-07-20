<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# API using Nest.js, TypeORM, PostgreSQL, and JWT

This API is built using Nest.js, TypeORM, PostgreSQL, and JWT, providing various functionalities such as user signup, login, and CRUD operations for managing products. The API also includes unit testing files using Jest to ensure the reliability and stability of the application.

## Features

1. User Signup: Allows users to create a new account by providing a unique username and password.

2. User Login: Enables users to authenticate and obtain a JSON Web Token (JWT) for accessing protected routes.

3. Get All Products: Retrieves a list of all products available in the system.

4. Get Single Product: Fetches details of a specific product using its unique identifier.

5. Add Product: Allows authorized users to add new products to the database.

6. Delete Product: Authorized users can delete products based on their unique identifiers.

7. Update Product: Authorized users can update product information.

## Prerequisites

Before running the API, ensure you have the following installed:

- Node.js (at least version 12)
- PostgreSQL database
- npm or yarn (npm is included with Node.js)

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

2. Install dependencies:

```
npm install
# or
yarn install
```

3. Set up the database:

   - Create a new PostgreSQL database.
   - Configure the database connection settings in `src/config/database.ts`.

4. Run Migrations:

```
npm run migration:run
# or
yarn migration:run
```

## Usage

1. Run the API:

```
npm run start:dev
# or
yarn start:dev
```

2. The API will be accessible at `http://localhost:3000` by default.

3. Endpoints:

   - **POST** `/auth/signup`: Create a new user account.
   - **POST** `/auth/login`: Authenticate and receive a JWT token.
   - **GET** `/products`: Get all products.
   - **GET** `/products/:id`: Get a specific product by its ID.
   - **POST** `/products`: Add a new product (requires JWT token).
   - **DELETE** `/products/:id`: Delete a product by its ID (requires JWT token).
   - **PATCH** `/products/:id`: Update product information (requires JWT token).

## Testing

The API comes with unit testing files using Jest to ensure its correctness. To run the tests:

```
npm run test
# or
yarn test
```

## Security

Please note that this API uses JWT for authentication, and it's essential to handle and store JWT tokens securely to prevent unauthorized access.

## Contributions

Contributions to the project are welcome! Feel free to open issues or submit pull requests for enhancements, bug fixes, or additional features.

## License

This API is open-source and available under the [MIT License](LICENSE).

---

Thank you for using our API! If you have any questions or need further assistance, please don't hesitate to contact us. Happy coding!
