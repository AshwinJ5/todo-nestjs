// Moongose config
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://ashwinjoseph03_db_user:vaFeJYXdtE5BWL53@todo-basic.fswb9dp.mongodb.net/?appName=todo-basic';

const MONGO = {
  MONGO_URI,
};
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'secret';

const JWT = {
  JWT_ACCESS_TOKEN_SECRET,
};

const config = {
  MONGO,
  JWT,
};

export default config;
