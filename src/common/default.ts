const MONGO_URI = process.env.MONGO_URI || 'MONGO_URI';

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
