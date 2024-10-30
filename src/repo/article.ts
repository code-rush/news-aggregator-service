import { Kysely } from 'kysely';
import { Database, Article, NewArticle } from '../database/schema';
import { v4 as uuidv4 } from 'uuid';

export function createArticleRepository(db: Kysely<Database>) {
  return {
    findAll: async (): Promise<Article[]> => {
      return db.selectFrom('articles').selectAll().execute();
    },

    findById: async (id: string): Promise<Article | undefined> => {
      return db
        .selectFrom('articles')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();
    },

    create: async (article: NewArticle): Promise<Article> => {
      const articleWithId = { ...article, id: uuidv4() };
      return db
        .insertInto('articles')
        .values(articleWithId)
        .returningAll()
        .executeTakeFirstOrThrow();
    },
  };
}

export type ArticleRepository = ReturnType<typeof createArticleRepository>;
