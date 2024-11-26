const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import { User } from './models/user.js';
const app = express();
const PORT = process.env.PORT || 3001;
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(routes);
// Test database connection and check users
sequelize.authenticate()
    .then(() => {
    console.log('✅ Database connected successfully');
    return User.findAll();
})
    .then(users => {
    console.log('👥 Users in database:', users.map(user => user.username));
    return sequelize.sync({ force: forceDatabaseRefresh });
})
    .then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is listening on port ${PORT}`);
    });
})
    .catch(err => {
    console.error('❌ Database connection error:', err);
});
