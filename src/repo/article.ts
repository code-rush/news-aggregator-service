import { Kysely } from 'kysely';
import { Database, Article, NewArticle } from '../database/schema';
import { v4 as uuidv4 } from 'uuid';
import { ArticleRequestSchema } from 'src/models/article.request';

export function createArticleRepository(client: Kysely<Database>) {

  function create(article: NewArticle): Promise<Article> {
    const articleWithId = { ...article, id: uuidv4() };
      return client
        .insertInto('articles')
        .values(articleWithId)
        .returningAll()
        .executeTakeFirstOrThrow();
  }

  function get(params: ArticleRequestSchema): Promise<Article[]> {
    const { state, topic, keyword } = params
    let q = client.selectFrom('articles').selectAll();
    
    if (state) {
      q = q.where('state', '=', state);
    }

    if (topic) {
      q = q.where('topic', '=', topic);
    }

    if (keyword) {
      q = q.where(({ or, eb }) => 
        or([
          eb('title', 'ilike', `%${keyword}%`),
          eb('description', 'ilike', `%${keyword}%`)
        ])
      );
    }
    /**
     * TODO: 
     *    1. Serialize data for the client
     *    2. Return metadata that includes the page number, total results for 
     *        client to chain requests to retrieve additional data.
     */
    return q.execute();
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
