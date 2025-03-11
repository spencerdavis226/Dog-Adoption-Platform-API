This project is an API for a Dog Adoption Platform. It provides endpoints for user registration, authentication, and managing dog-related functionalities such as registering a dog, adopting a dog, removing a dog (if it hasn't been adopted), and listing both registered and adopted dogs. The API follows an MVC architecture and integrates with MongoDB via Mongoose.

## Features

- **User Registration:**
  New users can register with their name, email, and password. Passwords are securely hashed before storing.

- **User Authentication:**
  Registered users can log in using valid credentials. A JSON Web Token (JWT) is issued for authentication, valid for 24 hours.

- **Dog Registration:**
  Authenticated users can register their dogs by providing a name and description. Each dog is linked to its owner.

- **Dog Adoption:**
  Users can adopt a dog. Adoption is restricted so that a dog cannot be adopted more than once.

- **Dog Removal:**
  Dog owners can remove their dog from the platform, but only if the dog hasn't been adopted.

- **Dog Listing with Pagination:**
  The API provides endpoints to list both registered and adopted dogs for a user, with support for pagination via 'page' and 'limit' query parameters.

## Technologies Used

- Node.js & Express: Server and routing framework.
- MongoDB & Mongoose: Database and ODM for data modeling.
- JWT (jsonwebtoken): Authentication token generation.
- bcrypt: Password hashing.
- Mocha, Chai, and Supertest: For API endpoint testing.
- dotenv: Environment variable management.

## Installation

1. Clone the Repository:
   git clone https://github.com/spencerdavis226/Dog-Adoption-Platform-API.git
   cd Dog-Adoption-Platform-API

2. Install Dependencies:
   npm install

3. Set Up Environment Variables:
   Create a .env file in the root directory with the following content (adjust values as needed):
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/dog_adoption_platform
   JWT_SECRET=your_jwt_secret_here

Note: Be sure to add .env to your .gitignore to protect your sensitive information.

## Running the API

Start the server using:
npm start

For development with auto-reloading, use:
npm run dev

The API should be accessible at http://localhost:5000.

## API Endpoints

### User Endpoints

- POST /api/users/register: Register a new user.
- POST /api/users/login: Log in an existing user and receive a JWT token.

### Dog Endpoints (Authentication Required)

- POST /api/dogs/register: Register a new dog.
- POST /api/dogs/adopt/:dogId: Adopt a dog by its ID.
- DELETE /api/dogs/remove/:dogId: Remove a dog (if not adopted and only if you're the owner).
- GET /api/dogs/registered: List all dogs registered by the user, with pagination.
- GET /api/dogs/adopted: List all dogs adopted by the user, with pagination.

## Testing

Tests are written using Mocha, Chai, and Supertest. To run the tests, execute:
npm test

Ensure your MongoDB instance is running before executing tests. The tests cover both user and dog endpoints, including authentication and pagination.

## Project Structure

- controllers/: Contains controller files that handle business logic.
- models/: Contains Mongoose models for Users and Dogs.
- routes/: Defines API routes mapped to controllers.
- middleware/: Contains middleware such as authentication.
- test/: Contains test files for API endpoints.
- server.js (or app.js): Entry point of the application.
- .env: Environment configuration (not committed to GitHub).

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements.

## License

This project is licensed under the MIT License.
