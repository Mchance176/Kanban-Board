import express from 'express';
import session from 'express-session';
import { Sequelize } from 'sequelize';
import { UserFactory } from './models/user';
import { seedUsers } from './seeds/user-seeds';
import authRoutes from './controllers/auth.controller';
import cors from 'cors';

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Database configuration
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/your_database', {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

// Initialize models
const User = UserFactory(sequelize);

// Initialize database and seed data
const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');
    await sequelize.sync({ force: true }); // Be careful with force: true in production
    await seedUsers();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Routes
app.use('/auth', authRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`�����������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������