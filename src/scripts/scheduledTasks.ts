import fetchArticles from '../tasks/fetchArticles';

function runScheduledTasks() {
  // Run immediately on startup
  if (process.env.TASK_SCHEDULER_ENABLED === 'true') {
    console.log('fetching articles');
    fetchArticles();
  } else {
    console.log('skipped fetching articles');
  };

  // Then run every 15 minutes
  setInterval(fetchArticles, 15 * 60 * 1000);
}

export default runScheduledTasks;
