
process.on('unhandledRejection', error => {
  console.warn('unhandledRejection');
  console.error(error);
  process.exit(1);
});

process.on('uncaughtException', error => {
  console.warn('uncaughtException');
  console.error(error);
  process.exit(1);
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const expressApp = require('./app/app');
const port = process.env.PORT || 3000;

const httpServer = expressApp.listen(port);
console.log(`App listening on port ${port}`);

function shutdown() {
  httpServer.close();
  console.log('\nApp shutdown');
  process.exit(0);
}