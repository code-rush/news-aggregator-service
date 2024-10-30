import { ArticleRepository } from '../repo/article';
import { Article, NewArticle } from '../database/schema';

export function createArticleService(articleRepository: ArticleRepository) {
  return {
    getAllArticles: async (): Promise<Article[]> => {
      return articleRepository.findAll();
    },

    getArticleById: async (id: string): Promise<Article | undefined> => {
      return articleRepository.findById(id);
    },

    createArticle: async (article: NewArticle): Promise<Article> => {
      return articleRepository.create(article);
    },
  };
}

export type ArticleService = ReturnType<typeof createArticleService>;
