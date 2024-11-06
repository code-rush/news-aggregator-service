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
    /**
     * TODO: based on the explained implementation for most optimal solution, the query will change here.
     *       We will need to LEFT JOIN `states` and `topics` table with `articles.id` and retrieve a list
     *       of articles for any search keywords.
     * Perhaps the query may look like this:
     * SELECT DISTINCT a.* FROM articles a
     * LEFT JOIN article_states as ON as.article_id = a.id
     * LEFT JOIN states s ON s.id = as.state_id
     * LEFT JOIN article_topics at ON at.article_id = a.id
     * LEFT JOIN topics t ON t.id = at.topic_id
     * WHERE (state IS NULL OR s.name = state)
     *  OR (topic IS NULL OR t.name = topic)
     *  OR (keyword IS NULL OR 
     *     to_tsvector('english', a.title || ' ' || a.content) @@ to_tsquery('english', keyword))
     * ORDER BY a.published_at DESC
     */
    const { state, topic, keyword } = params
    let q = client.selectFrom('articles').selectAll();
    // Kysely already uses parameterized queries by default, which is one of the best defenses against SQL injection. 
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
