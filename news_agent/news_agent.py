import requests
from typing import Optional, Dict
from hive_agent import HiveAgent
from dotenv import load_dotenv

load_dotenv()

def fetch_latest_news(query: str) -> Optional[str]:
    """
    Fetches the latest news articles based on the user query.

    :param query: The query to search for in the news articles.
    :return: A summary of the latest news articles, or None if an error occurs or the articles cannot be found.
    """
    url = f"https://api.gdeltproject.org/api/v2/doc/doc?query={query}&mode=artlist&format=json"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        articles = data.get("articles", [])
        if articles:
            summary = "\n\n".join([f"Title: {article.get('title')}\nLink: {article.get('url')}" for article in articles[:5]])
            return summary.strip()
        else:
            return "No articles found."
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == "__main__":
    my_agent = HiveAgent(
       name="news_agent",
       functions=[fetch_latest_news],
       config_path="/Users/Tian/Desktop/hive-agent/hive-agent-py/hive_config_example.toml",
       instruction="Use appropriate news sources to answer the questions.",
    )
    
    my_agent.run()
