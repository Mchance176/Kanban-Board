import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import authRouter from './controllers/auth.controller';

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your client URL
  credentials: true
}));

app.use(express.json());

// Configure session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true if using https
}));

// Database setup
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/your_database_name', {
  dialect: 'postgres',
  logging: false
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;