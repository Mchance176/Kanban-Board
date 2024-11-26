# Kanban Board with JWT Authentication

## Description
A full-stack Kanban board application with secure JWT authentication. Users can manage tasks across different status columns after logging in through a secure authentication system.

## Features
- Secure JWT-based authentication
- Login/Logout functionality
- Protected routes requiring authentication
- Session expiration handling
- Task management interface
- PostgreSQL database integration
- Responsive design

## Technologies Used
- **Frontend:**
  - React
  - TypeScript
  - Vite
  - Axios
  - JWT-decode

- **Backend:**
  - Node.js
  - Express
  - TypeScript
  - Sequelize ORM
  - PostgreSQL
  - JSON Web Tokens (JWT)
  - bcrypt

- **Deployment:**
  - Render
  - PostgreSQL (Render)

## Installation

1. Clone the repository:
```bash
git clone [https://github.com/Mchance176/Kanban-Board.git]
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in server directory:
```env
DB_NAME='kanban_db'
DB_USER='your_username'
DB_PASSWORD='your_password'
JWT_SECRET_KEY='your_secret_key'
```

4. Start development servers:
```bash
npm run start:dev
```

## Deployment
This application is deployed on Render with a PostgreSQL database. The deployment process includes:

1. Creating a PostgreSQL instance on Render
2. Setting up environment variables
3. Configuring build and start commands
4. Connecting to the Render PostgreSQL database

## Usage
1. Navigate to the login page
2. Enter credentials to authenticate
3. Access the Kanban board
4. Manage tasks across different status columns
5. Logout when finished

## Security Features
- JWT-based authentication
- Secure password hashing
- Protected API routes
- Session expiration
- Secure database connections

## Screenshots
![Login Page](./Assets/14-01-login-page.png)
![Main Kanban Board](./Assets/14-02-main-page.png)


## License
This project is licensed under the MIT License.

## Questions
Matthew Chance - [GitHub](https://github.com/Mchance176)
Email: matthewchance176@gmail.com

## Links
- [Deployed Application](https://kanban-board-sz20.onrender.com/)
- [GitHub Repository](https://github.com/Mchance176/Kanban-Board.git)
