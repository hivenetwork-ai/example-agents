import requests
import os
import asyncio
import os
import openai
import logging


from typing import Optional, Union,Sequence
from datetime import datetime, timedelta
import json


from dotenv import load_dotenv

from llama_index.agent.openai import OpenAIAgent
from llama_index.tools.graphql import GraphQLToolSpec



from llama_index.llms.openai import OpenAI as OpenAI_LLM
from llama_index.core.tools import BaseTool, FunctionTool
# from langchain.tools import BaseTool, StructuredTool



load_dotenv()


BITQUERY_API_KEY = os.getenv('BITQUERY_API_KEY')
openai_key =os.getenv('OPENAI_API_KEY')
BITQUERY_API_URL = os.getenv('BITQUERY_API_URL')



def introspect_schema() -> str:
    """Introspects the subgraph and summarizes its schema."""

    introspection_query = """
    {
      EVM(dataset: archive, network: eth) {
        DEXTrades(limit: {count: 10}, orderBy: {descending: Block_Time}) {
          Block {
            Number
            Time
          }
          Transaction {
            From
            To
            Hash
          }
          Trade {
            Buy {
              Amount
              Buyer
              Currency {
                Name
                Symbol
                SmartContract
              }
              Seller
              Price
              PriceInUSD
            }
            Sell {
              Amount
              Buyer
              Currency {
                Name
                SmartContract
                Symbol
              }
              Seller
              Price
            }
            Dex {
              ProtocolFamily
              ProtocolName
              SmartContract
              Pair {
                SmartContract
              }
            }
          }
        }
      }
    }
    """

    url = BITQUERY_API_URL
    headers = {
        "Authorization": "Bearer BITQUERY_API_KEY",  
        "Content-Type": "application/json",
    }

    response = requests.post(url, json={"query": introspection_query}, headers=headers)
    data = response.json()

    if "data" in data:
        result = data["data"]["EVM"]["DEXTrades"]
        processed_subgraph = _process_subgraph(result)
        return subgraph_to_text(processed_subgraph)
    else:
        return "Error during introspection."


def _process_subgraph(result: list) -> dict:
    """Processes the DEXTrades results into categories."""

    processed_subgraph = {
        "list_entity_queries": {"DEXTrades": []},
        "other_entities": {},
    }

    if not result:
        return processed_subgraph

    for field in result[0]:
        if field not in ["__typename", "Block", "Transaction", "Trade"]:
            processed_subgraph["other_entities"][field] = None

    trade_fields = result[0]["Trade"]
    for trade_type in ["Buy", "Sell"]:
        for field in trade_fields[trade_type]:
            if field != "__typename":
                processed_subgraph["other_entities"][trade_type] = {field: None}

                if field == "Currency":
                    for currency_field in trade_fields[trade_type]["Currency"]:
                        if currency_field != "__typename":
                            processed_subgraph["other_entities"][trade_type][field][currency_field] = None

    dex_fields = result[0]["Trade"]["Dex"]
    for field in dex_fields:
        if field != "__typename":
            processed_subgraph["other_entities"]["Dex"] = {field: None}

            if field == "Pair":
                for pair_field in dex_fields["Pair"]:
                    if pair_field != "__typename":
                        processed_subgraph["other_entities"]["Dex"][field][pair_field] = None
                        
    return processed_subgraph


def subgraph_to_text(subgraph: dict) -> str:
    """Converts the processed subgraph to text, focusing on list queries and nested structures."""

    sections = [
        (
            "List Entity Query (DEXTrades)",
            "This query fetches a list of decentralized exchange trades. It accepts optional arguments for filtering, sorting, and pagination.",
            """
            {
              EVM(dataset: archive, network: eth) {
                DEXTrades(limit: 10, orderBy: {descending: Block_Time}) { 
                  # ... (Select the fields you want) ...
                }
              }
            }
            """,
            subgraph["list_entity_queries"],
        ),
        (
            "Nested Entities",
            "These are entities nested within the DEXTrades query, representing different aspects of a trade.",
            "",
            subgraph["other_entities"],
        ),
    ]

    result_lines = []
    for category, desc, example, entities in sections:
        result_lines.append(format_section(category, desc, example, entities))

    return "\n".join(result_lines)

def _get_fields(type_info: dict, parent_entity: str = "") -> list:
    """Extracts fields recursively, handling nested structures."""
    fields = []

    for field_name, field_type in type_info["fields"].items():
        if field_name != "__typename":
            field_path = f"{parent_entity}.{field_name}" if parent_entity else field_name
            field_info = {"name": field_path}

            # Check for nested types (objects or lists)
            if field_type.get("kind") == "OBJECT" or (
                field_type.get("kind") == "NON_NULL" 
                and field_type.get("ofType", {}).get("kind") == "OBJECT"
            ):
                fields.extend(_get_fields(field_type["ofType"], field_path))
            elif field_type.get("kind") == "LIST" or (
                field_type.get("kind") == "NON_NULL"
                and field_type.get("ofType", {}).get("kind") == "LIST"
            ):
                inner_type = field_type.get("ofType", {})
                if inner_type.get("ofType", {}).get("kind") == "OBJECT":
                    fields.extend(_get_fields(inner_type["ofType"], field_path))
            else:
                # Handle scalar types (String, Int, etc.) and enums
                fields.append(field_info)

    return fields


def format_section(category, description, example, entities):
    """Formats the section, handling nested entities."""
    section = [
        f"Category: {category}",
        f"Description: {description}",
        "Generic Example:",
        example,
        "\nDetailed Breakdown:",
    ]

    # Handle both flat lists and nested dictionaries
    if isinstance(entities, list):
        for field_info in entities:
            section.append(f"  - {field_info['name']}")
    else:  # Nested dictionaries (e.g., "Buy", "Sell", "Dex")
        for entity, fields in entities.items():
            section.append(f"  Entity: {entity}")
            for field_info in fields.values():  # Iterate over field values (dictionaries)
                if isinstance(field_info, dict):  # Another nested level (e.g., Currency)
                    for subfield, _ in field_info.items():
                        section.append(f"    - {entity}.{subfield}")
                else:
                    section.append(f"    - {entity}.{field_info}")

    section.append("")
    return "\n".join(section)


def graphql_request(query: str) -> Union[dict, str]:
    """Make a GraphQL query to Bitquery."""

    url = BITQUERY_API_URL
    headers = {
        "Authorization": "Bearer BITQUERY_API_KEY",
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(url, json={"query": query}, headers=headers)
        response.raise_for_status()  
        return response.json()
    except requests.RequestException as e:
        return str(e)


def sort_by_date(response: Union[dict, str]) -> Union[dict, str]:
    """Sorts the response by Block Time."""
    if isinstance(response, dict) and "data" in response and "EVM" in response["data"]:
        trades = response["data"]["EVM"]["DEXTrades"]
        if trades:
            trades.sort(key=lambda x: int(x["Block"]["Time"]), reverse=True)
        return response
    else:
        return response

def inspect_with_llama(prompt):
    query_tool = FunctionTool.from_defaults(fn=graphql_request)
    introspect_tool = FunctionTool.from_defaults(fn=introspect_schema)
    openai.api_key = openai_key
    llm = OpenAI_LLM(model="gpt-4",openai_key=openai_key)
    agent = OpenAIAgent.from_tools([query_tool, introspect_tool], llm=llm, verbose=True)
    
    print(agent.chat(prompt)) 
