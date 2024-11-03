import { Kysely } from 'kysely';
import { Database, Article, NewArticle } from '../database/schema';
import { v4 as uuidv4 } from 'uuid';

export function createArticleRepository(client: Kysely<Database>) {

  function create(article: NewArticle): Promise<Article> {
    const articleWithId = { ...article, id: uuidv4() };
      return client
        .insertInto('articles')
        .values(articleWithId)
        .returningAll()
        .executeTakeFirstOrThrow();
  }

  function get(): Promise<Article[]> {
    return client.selectFrom('articles').selectAll().execute();
  }

  function detail(id: string): Promise<Article | undefined> {
    return client
    .selectFrom('articles')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
  }

  return { create, detail, get };
}

export type ArticleRepository = ReturnType<typeof createArticleRepository>;
