from hive_agent import HiveAgent, ClaudeLLM, Config, llm_from_config, tools_from_funcs

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
)
