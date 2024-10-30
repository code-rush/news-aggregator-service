import express from 'express';
import { container } from './container';

const app = express();
app.use(express.json());

const { articleService } = container;

app.get('/articles', async (req, res) => {
  // const articles = await articleService.getAllArticles();
  // res.json(articles);
  res.send('Hello World!');
});

app.get('/articles/:id', async (req, res) => {
  const article = await articleService.getArticleById(req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.post('/articles', async (req, res) => {
  const newArticle = await articleService.createArticle(req.body);
  res.status(201).json(newArticle);
});

export default app;
