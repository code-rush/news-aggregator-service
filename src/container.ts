/**
 * dependency injection container
 */

import { Kysely } from 'kysely';
import { Database } from './database/schema';
import { dbClient } from './database/connection';
import { createArticleRepository, ArticleRepository } from './repo/article';
import { createArticleService, ArticleService } from './services/article';

export interface Container {
  dbClient: Kysely<Database>;
  articleRepository: ArticleRepository;
  articleService: ArticleService;
}

export const container: Container = {
  dbClient,
  articleRepository: createArticleRepository(dbClient),
  articleService: createArticleService(createArticleRepository(dbClient)),
};
