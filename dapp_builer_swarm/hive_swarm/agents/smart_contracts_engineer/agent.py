from hive_agent import HiveAgent
from hive_agent.llms.claude import ClaudeLLM
from hive_agent.config import Config
from hive_agent.llms.utils import llm_from_config
from hive_agent.utils import tools_from_funcs

from hive_swarm.tools import save_to_file
from hive_swarm.agents.instructions import SMART_CONTRACTS_DEVELOPER_INSTRUCTION


from dotenv import load_dotenv
load_dotenv()

config_path = "./hive_swarm/agents/smart_contracts_engineer/hive_config.toml"
config = Config(config_path=config_path)
llm = llm_from_config(config)
print(f"in hive_swarm/agents/smart_contracts_engineer, llm is {type(llm)}")
tools = tools_from_funcs([save_to_file])
claude = ClaudeLLM(llm=llm, tools=tools)

solidity_developer_agent = HiveAgent(
    name="Smart Contract Engineer Agent",
    description="This agent acts like a Solidity Engineer on a team developing Solidity code.",
    instruction=SMART_CONTRACTS_DEVELOPER_INSTRUCTION,
    role="smart contract developer",
    functions=[save_to_file],
    llm=claude,
    config_path=config_path,
    swarm_mode=True,
)
