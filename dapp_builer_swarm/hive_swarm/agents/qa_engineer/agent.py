from hive_agent import HiveAgent
from hive_agent.llms.mistral import MistralLLM


from hive_swarm.agents.instructions import QA_ENGINEER_INSTRUCTION

from dotenv import load_dotenv

load_dotenv()

mistral = MistralLLM()

qa_agent = HiveAgent(
    name="Quality Assurance Engineer Agent",
    description="This agent acts like a QA Engineer on a team and can review code.",
    instruction=QA_ENGINEER_INSTRUCTION,
    role="QA engineer",
    functions=[],
    llm=mistral,
    config_path="./hive_swarm/agents/qa_engineer/hive_config.toml",
    swarm_mode=True,
)
