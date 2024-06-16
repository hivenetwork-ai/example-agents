# __init__.py
from enum import Enum

from .models.database_span_attributes import DatabaseSpanAttributes
from .models.framework_span_attributes import FrameworkSpanAttributes
from .models.llm_span_attributes import LLMSpanAttributes


class Event(Enum):
    STREAM_START = "stream.start"
    STREAM_OUTPUT = "stream.output"
    STREAM_END = "stream.end"
    RESPONSE = "response"


class OpenAIMethods(Enum):
    CHAT_COMPLETION = "openai.chat.completions.create"
    IMAGES_GENERATION = "openai.images.generate"
    IMAGES_EDIT = "openai.images.edit"
    EMBEDDINGS_CREATE = "openai.embeddings.create"


class ChromaDBMethods(Enum):
    ADD = "chromadb.collection.add"
    GET = "chromadb.collection.get"
    QUERY = "chromadb.collection.query"
    DELETE = "chromadb.collection.delete"
    PEEK = "chromadb.collection.peek"
    UPDATE = "chromadb.collection.update"
    UPSERT = "chromadb.collection.upsert"
    MODIFY = "chromadb.collection.modify"
    COUNT = "chromadb.collection.count"


class QdrantDBMethods(Enum):
    ADD = "qdrantdb.add"
    GET_COLLECTION = "qdrantdb.get_collection"
    GET_COLLECTIONS = "qdrantdb.get_collections"
    QUERY = "qdrantdb.query"
    QUERY_BATCH = "qdrantdb.query_batch"
    DELETE = "qdrantdb.delete"
    DISCOVER = "qdrantdb.discover"
    DISCOVER_BATCH = "qdrantdb.discover_batch"
    RECOMMEND = "qdrantdb.recommend"
    RECOMMEND_BATCH = "qdrantdb.recommend_batch"
    RETRIEVE = "qdrantdb.retrieve"
    SEARCH = "qdrantdb.search"
    SEARCH_BATCH = "qdrantdb.search_batch"
    UPSERT = "qdrantdb.upsert"
    COUNT = "qdrantdb.count"
    UPDATE_COLLECTION = "qdrantdb.update_collection"
    UPDATE_VECTORS = "qdrantdb.update_vectors"


class PineconeMethods(Enum):
    UPSERT = "pinecone.index.upsert"
    QUERY = "pinecone.index.query"
    DELETE = "pinecone.index.delete"


class WeaviateMethods(Enum):
    QUERY_BM25 = "weaviate.collections.queries.bm25"
    QUERY_FETCH_OBJECT_BY_ID = "weaviate.collections.queries.fetch_object_by_id"
    QUERY_FETCH_OBJECTS = "weaviate.collections.queries.fetch_objects"
    QUERY_HYBRID = "weaviate.collections.queries.hybrid"
    QUERY_NEAR_IMAGE = "weaviate.collections.queries.near_image"
    QUERY_NEAR_MEDIA = "weaviate.collections.queries.near_media"
    QUERY_NEAR_OBJECT = "weaviate.collections.queries.near_object"
    QUERY_NEAR_TEXT = "weaviate.collections.queries.near_text"
    QUERY_NEAR_VECTOR = "weaviate.collections.queries.near_vector"
    COLLECTIONS_OPERATIONS = "weaviate.collections.collections"


# Export only what you want to be accessible directly through `import my_package`
__all__ = [
    "LLMSpanAttributes",
    "DatabaseSpanAttributes",
    "FrameworkSpanAttributes",
    "Event",
    "OpenAIMethods",
    "ChromaDBMethods",
    "PineconeMethods",
    "WeaviateMethods",
]
