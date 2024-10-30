import { Kysely } from 'kysely';
import { Database } from './database/schema';
import { db } from './database/connection';
import { createArticleRepository, ArticleRepository } from './repo/article';
import { createArticleService, ArticleService } from './services/article';

export interface Container {
  db: Kysely<Database>;
  articleRepository: ArticleRepository;
  articleService: ArticleService;
}

export const container: Container = {
  db,
  articleRepository: createArticleRepository(db),
  articleService: createArticleService(createArticleRepository(db)),
};
