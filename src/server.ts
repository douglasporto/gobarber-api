import express from 'express';

const app = express();

app.get('/', (req, resp) => resp.json('Hello World'));

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
