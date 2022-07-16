const path = require('path')
require('dotenv').config();
const { NODE_ENV, DB_CONNECTION, DEV_DB, SECRET } = process.env;

let db_connection = NODE_ENV === 'development' ? DEV_DB : DB_CONNECTION;

export { db_connection, SECRET as secret };
