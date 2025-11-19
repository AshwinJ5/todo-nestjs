// Moongose config
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://ashwinjoseph03_db_user:vaFeJYXdtE5BWL53@todo-basic.fswb9dp.mongodb.net/?appName=todo-basic';

const MONGO = {
  MONGO_URI,
};

/* Mongo Collections */
const MONGO_COLLECTIONS = {
  TODOS: 'todos',
};

const config = {
  MONGO,
  MONGO_COLLECTIONS,
};

export default config;
