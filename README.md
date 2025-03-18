# USER LISTING API

This system is a user management API. The CRUD operations allow creating users, listing all or just a single user, updating, and deleting users. The API was developed using technologies such as TypeScript, Node.js, Express, Sequelize, SQLite, and Nodemon. The Joi library was used for data validation. The project follows a layered architecture, containing the following directories:

- Configs: Contains database configuration and environment variables.

- Routes: Contains the API endpoints.

- Controllers: Handles communication between routes and services.

- Services: Contains the business logic, processing data and applying specific rules.

- Repository: Abstracts database access, encapsulating persistence operations.

- Middlewares: Contains data validation logic.

- Schemas: Defines object schemas.

### How to Run the Application Locally

1. Clone the repository using SSH or download it as a ZIP file:
```
git clone git@github.com:BrendaRSS/list-user-api.git
```
2. Open the project in an IDE (e.g., VS Code).

3. Install dependencies:
```
npm install
```
4. Create a .env file and add the following variables:
```
PORT=5000
```

5. Start the application:
```
npm run dev
```

6. To test the API, use a tool such as Thunder Client (a VS Code extension) and access:
```
http://localhost:5000/users
```

7. To create a user, send a POST request to /users with a valid JSON body:
```
  "nome": A string with more than 3 characters,
  "idade": An integer greater than zero,
  "email": A unique and valid email

  Ex.:
  {
    "nome": "Jão Pedro",
    "idade": 50,
    "email": "joao@gmail.com"
  }
```

> Note: All fields are required. If the email already exists, an error message will be returned.

8. To list all users, send a GET request to /users:
```
http://localhost:5000/users
```
9. To retrieve a single user, send a GET request to /users/:id with a valid ID:
```
http://localhost:5000/users/1
```
10. To update a user, send a PUT request to /users/:id with a valid ID and JSON body:
```
http://localhost:5000/users/1

{
  "nome": "A string with more than 3 characters",
  "idade": "An integer greater than zero",
  "email": "A unique and valid email"
}
```
11. To delete a user, send a DELETE request to /users/:id with a valid ID:

```
http://localhost:5000/users/2
```

### route summary
```
POST: http://localhost:5000/users
GET: http://localhost:5000/users
GET: http://localhost:5000/users/:id
PUT: http://localhost:5000/users/:id
DELETE: http://localhost:5000/users/:id


JSON body:
{
    "nome": "A string with more than 3 characters",
    "idade": "An integer greater than zero",
    "email": "A unique and valid email"
}
```


# Automated Tests

This application includes both manual and automated tests. For automated testing (unit and integration tests), Jest, Supertest, and Faker were used.

### Running Tests

1. First, create a .env.test file and add the following variable:
```
PORT=3000
```
2. To run all tests:
```
npm run test
```
3. To run integration tests:
```
npm run test:integration
```
4. To run unit tests:
```
npm run test:unit
```
# DEPLOYMENT ON RENDER

This API is deployed on Render, and can be accessed at:
https://list-user-api.onrender.com

