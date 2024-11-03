import express from 'express';
import { container } from './container';
import runScheduledTasks from './scripts/scheduledTasks';

const app = express();
app.use(express.json());

const { articleService } = container;

app.get('/articles', async (req, res) => {
  const articles = await articleService.get();
  res.json(articles);
});

app.get('/articles/:id', async (req, res) => {
  const article = await articleService.detail(req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.post('/articles', async (req, res) => {
  const newArticle = await articleService.create(req.body);
  res.status(201).json(newArticle);
});

// scheduler to fetch articles periodically
runScheduledTasks();

export default app;
