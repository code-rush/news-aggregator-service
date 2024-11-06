
import axios from 'axios';
import { dbClient as client } from '../database/connection';
import { NewArticle } from '../database/schema';
import { v4 as uuidv4 } from 'uuid';

async function fetchArticles() {
  try {
    const page = 1; // TODO: make it such that it doesn't always retrieve the same page
    const pageSize = 25;
    const APIKEY = process.env.NEWSAPI_API_KEY

    const url = `https://newsapi.org/v2/everything?apiKey=${APIKEY}&q=state%20legislation&page=${page}&pageSize=${pageSize}`;

    const response = await axios.get(url);

    if (response.status === 200) {
      await importArticles(response.data);
    } else {
      console.error('Error fetching news: Unexpected status code', response.status);
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

async function importArticles(data: any) {
  /**
   * TODO:
   * 1. Processing Articles allows to implement custom logic for extracting relevant information from the articles and storing them in your database.
   */
  const { articles } = data;
  const states = ['CA', 'NY', 'FL'];
  const topics = ['Health', 'Education', 'Legislative']; 
  
  for (const article of articles) {
    const newArticle: NewArticle = {
      id: uuidv4(),
      title: article.title,
      source: 'newsapi',
      description: article.description,
      state: states[Math.floor(Math.random() * states.length)],
      topic: topics[Math.floor(Math.random() * topics.length)],
      published_on: new Date(article.publishedAt).toISOString(),
      link: article.url,
    };

    try {
      await client
        .insertInto('articles')
        .values(newArticle)
        // .onConflict((oc) => oc.column('link').doNothing())
        .execute();
    } catch (error) {
      console.error('Error inserting article:', error);
    }
  }

  console.log('Articles fetched and stored successfully');
}

export default fetchArticles;
