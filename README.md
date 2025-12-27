# Environmental Survey

## Overview

An educational institution aims to promote environmental awareness among its students by educating them on environmental protection and public health. Traditionally, this awareness was driven through seminars, lectures, and paper-based surveys.

To engage students more effectively, the institution conducts surveys and rewards top-performing participants. However, the paper-based approach resulted in high paper consumption, manual processing, and limited scalability.

The Environmental Survey API was developed to digitize this process by providing a centralized, paperless survey platform. The system enables administrators to create and manage surveys, allows students to participate online, and supports automated evaluation and result tracking. This approach reduces paper usage, improves efficiency, and increases student engagement through a modern, accessible survey experience.

## Features

### User Management and Authentication

- Role-based acess control (Admin,Faculty,Student)
- Secure user authentication and authorization
- Admin ability to create, update, and delete users
- Separate access levels for survey creation and participation

### Suvey Management

- Create, edit, and delete surveys
- Support for multiple questions per survey
- Centralized management of all surveys by authorized users

### Suvey Participation

- Students, or Staffs can view and attempt active surveys
- One submission per student/Staff per survey

### Evaluation & Results

- Automated calculation of survey scores
- Storage of student responses and results
- Ranking of participants based on scores

## Running the project

### Clone the repo

git clone <repository-url>
cd environmental-survey-api

### Install Dependencies

npm install

### Setup Environment

Create a .env file in the root directory and configure the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

### Start the server

npm run dev

## API ENDPOINTS

### Authentication

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/register` | Register a new user            |
| POST   | `/auth/login`    | Authenticate user & return JWT |
| GET    | `/auth/profile`  | Get authenticated user profile |

---

### User Management

| Method | Endpoint                       | Description        |
| ------ | ------------------------------ | ------------------ |
| GET    | `/admin/users/pending`         | List regs requests |
| PUT    | `/admin/users/:userId/approve` | Arrove a user      |
| PUT    | `/users/:userId`               | Update user        |
| DELETE | `/users/:userId`               | Delete user        |

---

### Survey Management

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/admin/surveys`           | Create a new survey |
| PUT    | `/admin/surveys/:surveyId` | Update survey       |
| DELETE | `/admin/surveys/:surveyId` | Delete survey       |

## DEPENDENCIES

- bcryptjs
- bcryptjs
- cors
- dotenv
- express
- jsonwebtoken:
- mongodb:
- mongoose
