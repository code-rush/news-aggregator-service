import { ArticleRepository } from '../repo/article';
import { Article, NewArticle } from '../database/schema';

export function createArticleService(articleRepository: ArticleRepository) {
  function create(article: NewArticle): Promise<Article> {
    return articleRepository.create(article);
  }

  function detail(id: string): Promise<Article | undefined> {
    return articleRepository.detail(id);
  }

  function get(): Promise<Article[]> {
    return articleRepository.get();
  }

  return { create, detail, get };
}

export type ArticleService = ReturnType<typeof createArticleService>;
