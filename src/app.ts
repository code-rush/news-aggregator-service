import express, { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { container } from './container';
import runScheduledTasks from './scripts/scheduledTasks';
import { ArticleRequestSchema } from './models/article.request';

const app = express();
app.use(express.json());

// Create a Redis client
const redis = new Redis({
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  host: process.env.REDIS_HOST || 'redis',
  password: process.env.REDIS_PASSWORD || 'redis',
  db: parseInt(process.env.REDIS_DB || '0', 10)
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

app.use(function(_, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const checkCache = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const cachedData = await redis.get(id);

  if (cachedData) {
    res.send(JSON.parse(cachedData));
  } else {
    next();
  }
};


const { articleService } = container;

/**
 * TODO:  1. Requestion validation and setting up middleware
 *        2. Query Validation
 */

app.get('/news', async (req: Request, res: Response) => {
  const { state, topic, keyword } = req.query;
  const articles = await articleService.get({ state, topic, keyword } as ArticleRequestSchema);
  res.json(articles);
});

app.get('/news/:id', checkCache, async (req: Request, res: Response) => {
  const { id } = req.params;
  const article = await articleService.detail(id);
  if (article) {
    // Cache the data with an expiration time of 10 hour
    await redis.set(id, JSON.stringify(article), 'EX', 36000);

    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.post('/news', async (req: Request, res: Response) => {
  const newArticle = await articleService.create(req.body);
  res.status(201).json(newArticle);
});

// scheduler to fetch articles periodically
runScheduledTasks();

export default app;
