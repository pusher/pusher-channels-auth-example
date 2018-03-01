const DEFAULT_ENDPOINT = '/pusher/auth';
const {APP_ID, APP_KEY, APP_SECRET, CLUSTER, PORT, DEBUG} = process.env;
const ENDPOINT = process.env.ENDPOINT || DEFAULT_ENDPOINT;
const config = {APP_ID, APP_KEY, APP_SECRET, CLUSTER, PORT, DEBUG, ENDPOINT};

const requiredKeys = ['APP_ID', 'APP_KEY', 'APP_SECRET', 'CLUSTER'];
requiredKeys.forEach(key => {
  if (config[key]) return;
  throw new Error(getMissingKeyErrorString(key));
});

module.exports = config;

function getMissingKeyErrorString(keyName) {
  const errorStr =
    `Unable to find environment variable: ${keyName}! ` +
    `Did you remember to set the ${keyName} value in your .env file?`;
  return errorStr;
}
