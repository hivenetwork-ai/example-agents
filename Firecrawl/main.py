from hive_agent import HiveAgent
from tools.inspect import FirecrawlApp

from dotenv import load_dotenv
import os
load_dotenv()

def get_config_path(filename):
    return os.path.abspath(os.path.join(os.path.dirname(__file__), filename))

firecrawl_app = FirecrawlApp()

# print(firecrawl_app.scrape_data("What did the author do growing up?"))         
if __name__ == "__main__":
    firecrawl_scrape_agent = HiveAgent(
    name="firecrawl_scrape_agent",
    functions=[firecrawl_app.scrape_data],
    instruction="you're an assistant that can answer questions based on content on a webpage/website. Use the URL and function tools provided to answer the question",
    port=8003,
    config_path=get_config_path("hive_config.toml")
    )
    firecrawl_scrape_agent.run()