from hive_agent import HiveAgent
from hive_swarm.agents.instructions import QA_ENGINEER_INSTRUCTION

def get_qa_agent(sdk_context):

    sdk_context.add_agent_config("./hive_swarm/agents/qa_engineer/hive_config.toml")

    qa_agent = HiveAgent(
        name="Quality Assurance Engineer Agent",
        description="This agent acts like a QA Engineer on a team and can review code.",
        instruction=QA_ENGINEER_INSTRUCTION,
        role="QA engineer",
        functions=[],
        swarm_mode=True,
        sdk_context=sdk_context,
    )

    return qa_agent
