Clean Architecture Bootcamp API
This is the README file for the Clean Architecture Bootcamp API codebase. This API provides functionalities for users, publishers, and admins to manage bootcamps, courses, reviews, and users.

Getting Started
To get started with the API, follow the steps below:

Clone the repository:
git clone <repository-url>
Install the dependencies:
npm install
Set up the environment variables by creating a
.env
file in the root directory and adding the necessary variables.
Start the server:
npm start
Functionality
Users
Register
Endpoint:
POST /api/v1/users/register
Description: Allows users to register by providing their name, email, password, and role.
Access: Public
Login
Endpoint:
POST /api/v1/users/login
Description: Allows users to login by providing their email and password.
Access: Public
Get User Profile
Endpoint:
GET /api/v1/users/profile
Description: Retrieves the profile of the authenticated user.
Access: Private
Update User Profile
Endpoint:
PUT /api/v1/users/profile
Description: Updates the profile of the authenticated user.
Access: Private
Reset Password
Endpoint:
POST /api/v1/users/reset-password
Description: Sends a reset password email to the user's email address.
Access: Public
Bootcamps
Get All Bootcamps
Endpoint:
GET /api/v1/bootcamps
Description: Retrieves all bootcamps.
Access: Public
Get Single Bootcamp
Endpoint:
GET /api/v1/bootcamps/:id
Description: Retrieves a single bootcamp by its ID.
Access: Public
Create Bootcamp
Endpoint:
POST /api/v1/bootcamps
Description: Creates a new bootcamp.
Access: Private (Publisher, Admin)
Update Bootcamp
Endpoint:
PUT /api/v1/bootcamps/:id
Description: Updates an existing bootcamp by its ID.
Access: Private (Publisher, Admin)
Delete Bootcamp
Endpoint:
DELETE /api/v1/bootcamps/:id
Description: Deletes a bootcamp by its ID.
Access: Private (Publisher, Admin)
Courses
Get All Courses
Endpoint:
GET /api/v1/courses
Description: Retrieves all courses.
Access: Public
Get Single Course
Endpoint:
GET /api/v1/courses/:id
Description: Retrieves a single course by its ID.
Access: Public
Create Course
Endpoint:
POST /api/v1/courses
Description: Creates a new course.
Access: Private (Publisher, Admin)
Update Course
Endpoint:
PUT /api/v1/courses/:id
Description: Updates an existing course by its ID.
Access: Private (Publisher, Admin)
Delete Course
Endpoint:
DELETE /api/v1/courses/:id
Description: Deletes a course by its ID.
Access: Private (Publisher, Admin)
Reviews
Get All Reviews
Endpoint:
GET /api/v1/reviews
Description: Retrieves all reviews.
Access: Public
Get Single Review
Endpoint:
GET /api/v1/reviews/:id
Description: Retrieves a single review by its ID.
Access: Public
Create Review
Endpoint:
POST /api/v1/reviews
Description: Creates a new review.
Access: Private (User, Publisher, Admin)
Update Review
Endpoint:
PUT /api/v1/reviews/:id
Description: Updates an existing review by its ID.
Access: Private (User, Publisher, Admin)
Delete Review
Endpoint:
DELETE /api/v1/reviews/:id
Description: Deletes a review by its ID.
Access: Private (User, Publisher, Admin)
Authentication and Authorization
The API uses JSON Web Tokens (JWT) for authentication and authorization. Users can register and login to obtain a JWT token, which they can then use to access protected routes. The API supports different roles (user, publisher, admin), and certain routes are restricted to specific roles.

Error Handling
The API uses a custom error handling middleware to handle errors and return appropriate error responses. Errors are returned in a consistent format with a status code and error message.

Database
The API uses MongoDB as the database. The Mongoose library is used to interact with the database and define the data models.

Logging
The API uses the Morgan library for logging HTTP requests and responses. Logs are written to the console in a predefined format.
