"""
FirecrawlApp Module

This module provides a class `FirecrawlApp` for interacting with the Firecrawl API.
It includes methods to scrape URLs, perform searches, initiate and monitor crawl jobs,
and check the status of these jobs. The module uses requests for HTTP communication
and handles retries for certain HTTP status codes.

Classes:
    - FirecrawlApp: Main class for interacting with the Firecrawl API.
"""
import logging, os, time, json ,argparse
from typing import Any, Dict, Optional
from openai import OpenAI  # type: ignore
from dotenv import load_dotenv, get_key  # type: ignore

from datetime import datetime

from llama_index.readers.web import FireCrawlWebReader
from llama_index.core import SummaryIndex 
from hive_agent import HiveAgent

def get_config_path(filename):
    return os.path.abspath(os.path.join(os.path.dirname(__file__), filename))


logger : logging.Logger = logging.getLogger("firecrawl")
load_dotenv()

class FirecrawlApp:
    """
    Initialize the FirecrawlApp instance.

    Args:
        api_key (Optional[str]): API key for authenticating with the Firecrawl API.
        api_url (Optional[str]): Base URL for the Firecrawl API.
    """
    def __init__(self, api_key: Optional[str] = None, api_url: Optional[str] = None) -> None:
        self.api_key = api_key or os.getenv('FIRECRAWL_API_KEY')
        if self.api_key is None:
            logger.warning("No API key provided")
            raise ValueError('No API key provided')
        else:
            logger.debug("Initialized FirecrawlApp with API key: %s", self.api_key)

        self.api_url = api_url or os.getenv('FIRECRAWL_API_URL', 'https://api.firecrawl.dev')
        if self.api_url != 'https://api.firecrawl.dev':
            logger.debug("Initialized FirecrawlApp with API URL: %s", self.api_url)

        
    def scrape_data(self,url: str, query_str: str, params: Optional[Dict[str, Any]] = None) -> Any:
            """
            Scrape the specified URL using the Firecrawl API.

            Args:
                    url (str): The URL to scrape.
                    params (Optional[Dict[str, Any]]): Additional parameters for the scrape request.

            Returns:
                    Any: The scraped data if the request is successful.

            Raises:
                    Exception: If the scrape request fails.
            """

            
              # to load .env file

            try:
            # Initialize FireCrawlWebReader with API key
                app = FireCrawlWebReader(
                    api_key=self.api_key,
                    mode="scrape",
                    params=params or {}
                )

                # Scrape data from URL
                scraped_data = app.load_data(url)
                index = SummaryIndex.from_documents(scraped_data)
                index.storage_context.persist()

                query_engine = index.as_query_engine()
                return query_engine.query(query_str)
        
            except Exception as e:
                logger.error(f"Error while scraping data: {e}")
                raise
   
if __name__ == "__main__":
    # Scrape single URL
    # url = "http://paulgraham.com/worked.html"
    # query="What did the author do growing up?"
    
    # parser = argparse.ArgumentParser(
    #     description="Run Firecrawl scraping job."
    # )
    # parser.add_argument(
    #     "--url", type=str, required=True, help="The input url  path"
    # )
    
    # parser.add_argument(
    #     "--query", type=str, required=True, help="The input query  path"
    # )
    
    
    # args = parser.parse_args()
    # url = args.url
    # query = args.query

    # # Retrieve the image from the file path
    # with open(image_path, "rb") as f:
    #     image = f.read()

    try:
        # Generate timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        firecrawl_app = FirecrawlApp()

        # # Scrape data
        # raw_data = firecrawl_app.scrape_data(url=url,query_str=query)
        # print(f"Scraped data: {raw_data}")
        
        firecrawl_scrape_agent = HiveAgent(
        name="firecrawl_scrape_agent",
        functions=[firecrawl_app.scrape_data],
        instruction="scrape data from url using the Firecrawl AI service",
        port=8003,
        config_path=get_config_path("hive_config.toml")
    )
        
        firecrawl_scrape_agent.run()


    except Exception as e:
        print(f"An error occurred: {e}")            