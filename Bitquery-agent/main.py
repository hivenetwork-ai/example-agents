from hive_agent import HiveAgent
from tools.inspect import inspect_with_llama

from dotenv import load_dotenv
import os
load_dotenv()

def get_config_path(filename):
    return os.path.abspath(os.path.join(os.path.dirname(__file__), filename))

# print(inspect_with_llama("Examine the top 10 DEX trades for potential arbitrage opportunities by comparing prices of the same token across different platforms"))
if __name__ == "__main__":
    bitquery_agent = HiveAgent(
        name="bitquery_agent",
        functions=[inspect_with_llama],
        # port=8001,
        instruction="""You are an assistant that helps users analyze blockchain data using the Bitquery API. You can process 
        user queries that include a blockchain address (URL) and a GraphQL query. The assistant extracts the address from the URL
        and uses it, along with the user's GraphQL query, to potentially retrieve data from the Bitquery API. This data can then
        be used for further analysis or exploration""",
        config_path=get_config_path("hive_config.toml")
    )
    bitquery_agent.run()