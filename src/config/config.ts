import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

const SERVER = {
  port: SERVER_PORT,
};

const DATABASE_URI = process.env.DATABASE_URI as string;

const DATABASE = {
  uri: DATABASE_URI,
  options: {
    // these options are all needed the others are either deprecated or already set by default
    autoIndex: true, // Automatically build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv65000,
  },
};

const config = {
  server: SERVER,
  database: DATABASE,
};

export default config;
