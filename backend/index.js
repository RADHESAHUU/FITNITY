const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const Sentry = require('@sentry/node');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config();

// Updated to ensure JWT_SECRET is loaded from .env
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set in the .env file. Exiting...');
  process.exit(1);
}

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
});

const app = express();

// Middleware
app.use(express.json());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Apply rate limiting to all routes
app.use(limiter);

// Winston logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Middleware to log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token is missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/fitnity', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

connectToDatabase();

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitnity API',
      version: '1.0.0',
      description: 'API documentation for Fitnity',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const userRoutes = require('./routes/userRoutes');
const progressRoutes = require('./routes/progressRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const assistantRoutes = require('./routes/assistantRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/progress', authenticateToken, progressRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/nutrition', nutritionRoutes);

app.get('/', (req, res) => {
  res.send('Fitnity Backend is running!');
});

// Middleware to capture errors and send to Sentry
app.use(Sentry.Handlers.errorHandler());

// Export mongoose connection and logger
module.exports = { app, mongoose, logger };

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}