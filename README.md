# User Vault API

A modern RESTful API built with Express.js and MongoDB that combines secure user account management with comprehensive contact operations. Features JWT authentication, user profiles, contact management, and automated testing suite.

## Features

- User Authentication (Register, Login, JWT)
- Contact Management 
- MongoDB Integration
- Error Handling
- Input Validation
- Automated Testing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/user-vault-api.git
cd user-vault-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to create your `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Update the values in `.env` with your configuration:
     - `PORT`: API server port (default: 3000)
     - `MONGODB_URI`: Your MongoDB connection string
     - `ACCESS_TOKEN_SECRET`: JWT signing secret (generate a secure random string)
     - `JWT_SECRET`: Backup JWT secret (generate a secure random string)
     - `NODE_ENV`: Environment setting (development/test/production)

## Running the Application

Development mode:
```bash
npm start
```

Run tests:
```bash
npm test
```

## API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/current` - Get current user (Protected)
- `DELETE /api/users/delete-user` - Delete user (Protected)

### Contacts
- `GET /api/contacts` - Get all contacts (Protected)
- `POST /api/contacts` - Create contact (Protected)
- `GET /api/contacts/:id` - Get single contact (Protected)
- `PUT /api/contacts/:id` - Update contact (Protected)
- `DELETE /api/contacts/:id` - Delete contact (Protected)

## Testing

The API includes comprehensive test suites and a detailed testing guide:
- See `TESTING.md` for API testing instructions
- Postman collection included for API testing
- Automated tests for all endpoints
- Error handling tests

Run automated tests with:
```bash
npm test
```

## Error Handling

The API implements proper error handling with appropriate HTTP status codes and error messages.

## License

MIT License