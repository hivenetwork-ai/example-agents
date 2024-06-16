import os
import unittest

from unittest.mock import patch
from hive_agent import HiveAgent
from main import FirecrawlApp

def get_config_path(filename):
    return os.path.abspath(os.path.join(os.path.dirname(__file__), filename))

@patch.dict(os.environ, {"OPENAI_API_KEY": "test_key", "FIRECRAWL_API_KEY": "test_key", "FIRECRAWL_API_URL": "https://api.firecrawl.dev"})
@patch('main.HiveAgent.run')
def test_hive_agent_run(mock_run):
    firecrawl_app = FirecrawlApp()
    crawl_agent =  HiveAgent(
        name="firecrawl_scrape_agent",
        functions=[ firecrawl_app.scrape_data],
        instruction="Convert text to image using the Firecrawl AI service",
        port=8003,
        config_path=get_config_path("../hive_config.toml")
    )

    crawl_agent.run()

    mock_run.assert_called_once()


if __name__ == "__main__":
    unittest.main()