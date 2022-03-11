const express = require('express');
const UserRouter = require('./routes/UserRouter');
const LoginRouter = require('./routes/LoginRouter');
const PostsRouter = require('./routes/PostsRouter');
const CategoriesRouter = require('./routes/CategoryRouter');
const errorMiddleware = require('./controllers/error');

const app = express();

app.use(express.json());

app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/categories', CategoriesRouter);
app.use('/post', PostsRouter);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
