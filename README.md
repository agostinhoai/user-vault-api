# User Backend API

A robust REST API built with Express.js and MongoDB for user management and contact storage.

## Features

- User Authentication (Register, Login, JWT)
- Contact Management (CRUD operations)
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
git clone https://github.com/yourusername/userBackendAPI.git
cd userBackendAPI
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

The API includes comprehensive test suites:
- User authentication tests
- Contact management tests
- Error handling tests

Run tests with:
```bash
npm test
```

## Documentation

- Postman collection included for API testing

## Error Handling

The API implements proper error handling with appropriate HTTP status codes and error messages.

## License

MIT License