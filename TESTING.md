# API Testing Guide

This guide explains how to test the User Backend API endpoints using Postman or any other API testing tool.

## Setup

1. Start the server:
```bash
npm start
```

2. Import the Postman collection:
   - Open Postman
   - Import `Contact_Management_API.postman_collection.json`

## Testing Flow

Follow this sequence to test all endpoints:

### 1. User Management

#### Register User
- **Endpoint**: `POST /api/users/register`
- **Body**:
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123"
}
```
- **Expected**: Returns user ID and email

#### Login User
- **Endpoint**: `POST /api/users/login`
- **Body**:
```json
{
    "email": "test@example.com",
    "password": "test123"
}
```
- **Expected**: Returns access token
- **Note**: Save the token for subsequent requests

#### Get Current User
- **Endpoint**: `GET /api/users/current`
- **Headers**: `Authorization: Bearer <your_token>`
- **Expected**: Returns user details

### 2. Contact Management

#### Create Contact
- **Endpoint**: `POST /api/contacts`
- **Headers**: `Authorization: Bearer <your_token>`
- **Body**:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890"
}
```
- **Expected**: Returns created contact

#### Get All Contacts
- **Endpoint**: `GET /api/contacts`
- **Headers**: `Authorization: Bearer <your_token>`
- **Expected**: Returns array of contacts

#### Get Single Contact
- **Endpoint**: `GET /api/contacts/:id`
- **Headers**: `Authorization: Bearer <your_token>`
- **Expected**: Returns contact details

#### Update Contact
- **Endpoint**: `PUT /api/contacts/:id`
- **Headers**: `Authorization: Bearer <your_token>`
- **Body**:
```json
{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "mobile": "0987654321"
}
```
- **Expected**: Returns updated contact

#### Delete Contact
- **Endpoint**: `DELETE /api/contacts/:id`
- **Headers**: `Authorization: Bearer <your_token>`
- **Expected**: Returns success message

### 3. Cleanup

#### Delete User
- **Endpoint**: `DELETE /api/users/delete-user`
- **Headers**: `Authorization: Bearer <your_token>`
- **Expected**: Returns success message

## Automated Testing

Run the automated test suite:
```bash
npm test
```

This will run all tests and show the results in the console.

## Common Issues

1. **401 Unauthorized**
   - Check if your token is valid
   - Make sure to include the token in the Authorization header
   - Token format should be: `Bearer <your_token>`

2. **404 Not Found**
   - Verify the endpoint URL
   - Check if the resource (user/contact) exists

3. **400 Bad Request**
   - Check if all required fields are provided
   - Verify the data format

4. **403 Forbidden**
   - You're trying to access/modify a resource that doesn't belong to you

## Tips

1. Keep the access token handy - you'll need it for most requests
2. Test endpoints in the order listed above
3. Save example responses for reference
4. Check error responses for helpful messages
