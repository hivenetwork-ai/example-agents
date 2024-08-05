from hive_agent import HiveAgent, ClaudeLLM

from hive_swarm.tools import save_to_file
from hive_swarm.agents.instructions import SMART_CONTRACTS_DEVELOPER_INSTRUCTION

claude = ClaudeLLM()

solidity_developer_agent = HiveAgent(
    name="Smart Contract Engineer Agent",
    description="This agent acts like a Solidity Engineer on a team developing Solidity code.",
    instruction=SMART_CONTRACTS_DEVELOPER_INSTRUCTION,
    role="smart contract developer",
    functions=[save_to_file],
    llm=claude,
    config_path="./hive_swarm/agents/smart_contracts_engineer/hive_config.toml",
)
