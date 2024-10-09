import { Fragment } from "react";
import { Check, Copy, SendHorizontal } from "lucide-react";

import { JSONValue, Message } from "ai";
import { useSharedRef } from "@/context/RefProvider";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import ChatAvatar from "./chat-avatar";
import { Button } from "../../button";
import Markdown from "./markdown";

import {
  AgentEventData,
  ChatHandler,
  DocumentFileData,
  EventData,
  ImageData,
  MessageAnnotation,
  MessageAnnotationType,
  SuggestedQuestionsData,
  ToolData,
  getAnnotationData,
  getSourceAnnotationData,
} from "..";
import { ChatImage } from "./chat-image";
import { ChatEvents } from "./chat-events";
import { ChatAgentEvents } from "./chat-agent-events";
import { ChatFiles } from "./chat-files";
import ChatTools from "./chat-tools";
import { ChatSources } from "./chat-sources";
import { SuggestedQuestions } from "./chat-suggestedQuestions";
import { extractData, isValidJsonString } from "../../lib/utils";

type ContentDisplayConfig = {
  order: number;
  component: JSX.Element | null;
};

function ChatMessageContent({
  message,
  isLoading,
  append,
  isLastMessage,
}: {
  message: Message;
  isLoading: boolean;
  append: Pick<ChatHandler, "append">["append"];
  isLastMessage: boolean;
}) {
  console.log("chatMessage", message);

  const annotations = message.annotations as MessageAnnotation[] | undefined;
  if (!annotations?.length) return <Markdown content={message.content} />;

  const imageData = getAnnotationData<ImageData>(
    annotations,
    MessageAnnotationType.IMAGE
  );
  const contentFileData = getAnnotationData<DocumentFileData>(
    annotations,
    MessageAnnotationType.DOCUMENT_FILE
  );
  const eventData = getAnnotationData<EventData>(
    annotations,
    MessageAnnotationType.EVENTS
  );
  const agentEventData = getAnnotationData<AgentEventData>(
    annotations,
    MessageAnnotationType.AGENT_EVENTS
  );

  const sourceData = getSourceAnnotationData(annotations);

  const toolData = getAnnotationData<ToolData>(
    annotations,
    MessageAnnotationType.TOOLS
  );
  const suggestedQuestionsData = getAnnotationData<SuggestedQuestionsData>(
    annotations,
    MessageAnnotationType.SUGGESTED_QUESTIONS
  );

  const contents: ContentDisplayConfig[] = [
    {
      order: 1,
      component: imageData[0] ? <ChatImage data={imageData[0]} /> : null,
    },
    {
      order: -3,
      component:
        eventData.length > 0 ? (
          <ChatEvents isLoading={isLoading} data={eventData} />
        ) : null,
    },
    {
      order: -2,
      component:
        agentEventData.length > 0 ? (
          <ChatAgentEvents
            data={agentEventData}
            isFinished={!!message.content}
          />
        ) : null,
    },
    {
      order: 2,
      component: contentFileData[0] ? (
        <ChatFiles data={contentFileData[0]} />
      ) : null,
    },
    {
      order: -1,
      component: toolData[0] ? <ChatTools data={toolData[0]} /> : null,
    },
    {
      order: 0,
      component: <Markdown content={message.content} sources={sourceData[0]} />,
    },
    {
      order: 3,
      component: sourceData[0] ? <ChatSources data={sourceData[0]} /> : null,
    },
    {
      order: 4,
      component: suggestedQuestionsData[0] ? (
        <SuggestedQuestions
          questions={suggestedQuestionsData[0]}
          append={append}
          isLastMessage={isLastMessage}
        />
      ) : null,
    },
  ];

  return (
    <div className="flex-1 gap-4 flex flex-col">
      {contents
        .sort((a, b) => a.order - b.order)
        .map((content, index) => (
          <Fragment key={index}>{content.component}</Fragment>
        ))}
    </div>
  );
}

export default function ChatMessage({
  chatMessage,
  isLoading,
  append,
  isLastMessage,
}: {
  chatMessage: Message;
  isLoading: boolean;
  append: Pick<ChatHandler, "append">["append"];
  isLastMessage: boolean;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  const inputRef = useSharedRef();

  const handleClickSuggestedQuestion = (question: string) => {
    if (inputRef?.current) {
      inputRef.current.value = question;
      inputRef.current.dispatchEvent(new Event("input"));
    }
  };

  // Mockup chat message data
  const imageMockUpMessage = {
    ...chatMessage,
    annotations:
      chatMessage.role !== "user"
        ? [
            {
              type: "image",
              data: {
                url: "https://picsum.photos/300/200",
              },
            },
          ]
        : undefined,
  };

  const documentFileMockUpMessage = {
    ...chatMessage,
    annotations:
      chatMessage.role !== "user"
        ? [
            {
              type: "document_file",
              data: {
                files: [
                  {
                    id: "44bdbaa7-3c48-4f5c-ae66-02c20a0428e8",
                    filename: "sample-data.csv",
                    filesize: 4748,
                    filetype: "csv",
                    content: {
                      type: "text",
                      value:
                        "172-32-1176, m, 1958/04/21, Smith, White, Johnson, 10932 Bigge Rd, Menlo Park, CA, 94025, 408 496-7223, jwhite@domain.com, m, 5270 4267 6450 5516, 123, 2010/06/25\n514-14-8905, f, 1944/12/22, Amaker, Borden, Ashley, 4469 Sherman Street, Goff, KS, 66428, 785-939-6046, aborden@domain.com, m, 5370 4638 8881 3020, 713, 2011/02/01\n213-46-8915, f, 1958/04/21, Pinson, Green, Marjorie, 309 63rd St. #411, Oakland, CA, 94618, 415 986-7020, mgreen@domain.com, v, 4916 9766 5240 6147, 258, 2009/02/25\n524-02-7657, m, 1962/03/25, Hall, Munsch, Jerome, 2183 Roy Alley, Centennial, CO, 80112, 303-901-6123, jmunsch@domain.com, m, 5180 3807 3679 8221, 612, 2010/03/01\n489-36-8350, m, 1964/09/06, Porter, Aragon, Robert, 3181 White Oak Drive, Kansas City, MO, 66215, 816-645-6936, raragon@domain.com, v, 4929 3813 3266 4295, 911, 2011/12/01\n514-30-2668, f, 1986/05/27, Nicholson, Russell, Jacki, 3097 Better Street, Kansas City, MO, 66215, 913-227-6106, jrussell@domain.com, a, 345389698201044, 232, 2010/01/01\n505-88-5714, f, 1963/09/23, Mcclain, Venson, Lillian, 539 Kyle Street, Wood River, NE, 68883, 308-583-8759, lvenson@domain.com, d, 30204861594838, 471, 2011/12/01\n690-05-5315, m, 1969/10/02, Kings, Conley, Thomas, 570 Nancy Street, Morrisville, NC, 27560, 919-656-6779, tconley@domain.com, v, 4916 4811 5814 8111, 731, 2010/10/01\n646-44-9061, M, 1978/01/12, Kurtz, Jackson, Charles, 1074 Small Street, New York, NY, 10011, 212-847-4915, cjackson@domain.com, m, 5218 0144 2703 9266, 892, 2011/11/01\n421-37-1396, f, 1980/04/09, Linden, Davis, Susan, 4222 Bedford Street, Jasper, AL, 35501, 205-221-9156, sdavis@domain.com, v, 4916 4034 9269 8783, 33, 2011/04/01\n461-97-5660, f, 1975/01/04, Kingdon, Watson, Gail, 3414 Gore Street, Houston, TX, 77002, 713-547-3414, gwatson@domain.com, v, 4532 1753 6071 1112, 694, 2011/09/01\n660-03-8360, f, 1953/07/11, Onwunli, Garrison, Lisa, 515 Hillside Drive, Lake Charles, LA, 70629, 337-965-2982, lgarrison@domain.com, v, 4539 5385 7425 5825, 680, 2011/06/01\n751-01-2327, f, 1968/02/16, Simpson, Renfro, Julie, 4032 Arron Smith Drive,",
                    },
                  },
                ],
              },
            },
          ]
        : undefined,
  };

  const eventsMockUpMessage = {
    ...chatMessage,
    annotations:
      chatMessage.role !== "user"
        ? [
            {
              type: "events",
              data: {
                title: "Retrieving context for query: 'Check this file'\n",
              },
            },
            {
              type: "events",
              data: {
                title: "Retrieved 2 sources to use as context for the query",
              },
            },
          ]
        : undefined,
  };

  const agentEventsMockUpMessage = {
    ...chatMessage,
    annotations:
      chatMessage.role !== "user"
        ? [
            {
              type: "agent",
              data: {
                agent: "bot agent",
                text: "file analyzer agent",
              },
            },
            {
              type: "agent",
              data: {
                agent: "bot agent",
                text: "csv content analyzer agent",
              },
            },
            {
              type: "agent",
              data: {
                agent: "orchestrator",
                text: "Plan created: Let's do: Research prosidential elections",
              },
            },
            {
              type: "agent",
              data: {
                agent: "Researcher",
                text: "Start to work on: upcoming predisential elections",
              },
            },
            {
              type: "agent",
              data: {
                agent: "Researcher",
                text: "Finished task",
              },
            },
            {
              type: "agent",
              data: {
                agent: "Analyst",
                text: "Start to work on: Analyze the gathered information about the ...",
              },
            },
          ]
        : undefined,
  };

  const sourceMockUpMessage = {
    ...chatMessage,
    annotations:
      chatMessage.role !== "user"
        ? [
            {
              type: "sources",
              data: {
                nodes: [
                  {
                    id: "44bdbaa7-3c48-4f5c-ae66-02c20a0428e8",
                    metadata: {
                      file_path:
                        "D:\\dev\\tutor\\llama\\my-fast-api-app\\backend\\data\\sample-data.csv",
                      file_name: "sample-data.csv",
                      file_type: "application/vnd.ms-excel",
                      file_size: 4748,
                      creation_date: "2024-09-10",
                      last_modified_date: "2024-09-09",
                      private: "false",
                      node_id: "44bdbaa7-3c48-4f5c-ae66-02c20a0428e8",
                    },
                    score: 0.25387767677611482,
                    text: "f, 1964/06/20, Summers, Kaminski, Teresa, 1517 Gambler Lane, Houston, TX, 77006, 281-906-2148, tkaminski@domain.com, m, 5399 0706 4128 0178, 721, 2009/10/01\n612-20-6832, m, 1979/08/18, Banas, Edwards, Rick, 4254 Walkers Ridge Way, Gardena, CA, 90248, 626-991-3620, redwards@domain.com, m, 5293 8502 0071 3058, 701, 2010/08/01\n687-05-8365, f, 1976/05/24, Robbins, Peacock, Stacey, 3396 Nancy Street, Raleigh, NC, 27612, 919-571-2339, speacock@domain.com, m, 5495 8602 4508 6804, 436, 2011/02/01\n205-52-0027, f, 1950/03/26, Sanford, Nelson, Agnes, 4213 High Meadow Lane, Avoca, PA, 18641, 570-480-8704, anelson@domain.com, m, 5413 4428 0145 0036, 496, 2010/02/01\n404-12-2154, f, 1984/09/21, Garcia, Townsend, Mireille, 2877 Glen Street, Paducah, KY, 42003, 270-408-7254, mtownsend@domain.com, v, 4539 8219 0484 7598, 710, 2011/03/01\n151-32-2558, f, 1952/11/19, Stockdale, Zwick, Rebecca, 784 Beechwood Avenue, Piscataway, NJ, 8854, 908-814-6733, rzwick@domain.com, v, 5252 5971 4219 4116, 173, 2011/02/01",
                    url: "http://localhost:8000/api/files/data/sample-data.csv",
                  },
                ],
              },
            },
          ]
        : undefined,
  };

  // const toolEventsMockUpMessage = {
  //   ...chatMessage,
  //   annotations:
  //     chatMessage.role !== "user"
  //       ? [
  //           {
  //             type: "tools",
  //             data: {
  //               toolCall: {
  //                 id: "44bdbaa7-3c48-4f5c-ae66-02c20a0428e8",
  //                 name: "get_weather_information",
  //                 input: {},
  //               },
  //               toolOutput: {
  //                 output: {
  //                   latitude: 45.512794,
  //                   longitude: -122.679565,
  //                   generationtime_ms: 12.45,
  //                   utc_offset_seconds: -28800,
  //                   timezone: "America/Los_Angeles",
  //                   timezone_abbreviation: "PDT",
  //                   elevation: 50,
  //                   current_units: {
  //                     time: "iso8601",
  //                     interval: "minutes",
  //                     temperature_2m: "Celsius",
  //                     weather_code: "code",
  //                   },
  //                   current: {
  //                     time: "2024-09-11T12:00:00Z",
  //                     interval: 10,
  //                     temperature_2m: 22.5,
  //                     weather_code: 0, // Clear sky
  //                   },
  //                   hourly_units: {
  //                     time: "iso8601",
  //                     temperature_2m: "Celsius",
  //                     weather_code: "code",
  //                   },
  //                   hourly: {
  //                     time: [
  //                       "2024-09-11T12:00:00Z",
  //                       "2024-09-11T13:00:00Z",
  //                       "2024-09-11T14:00:00Z",
  //                       "2024-09-11T15:00:00Z",
  //                     ],
  //                     temperature_2m: [22.5, 23.0, 23.2, 24.0],
  //                     weather_code: [1, 2, 3, 45], // Mainly clear, Partly cloudy, Overcast, Fog
  //                   },
  //                   daily_units: {
  //                     time: "iso8601",
  //                     weather_code: "code",
  //                   },
  //                   daily: {
  //                     time: ["2024-09-11", "2024-09-12", "2024-09-13"],
  //                     weather_code: [51, 61, 71], // Drizzle, Rain, Snow fall
  //                   },
  //                 },
  //                 isError: false,
  //               },
  //             },
  //           },
  //         ]
  //       : undefined,
  // };

  const toolEventsMockUpMessage: Message = isValidJsonString(
    chatMessage.content
  )
    ? {
        id: "1",
        content: "",
        annotations:
          chatMessage.role !== "user"
            ? [
                {
                  type: "tools",
                  data: {
                    toolCall: {
                      id: "44bdbaa7-3c48-4f5c-ae66-02c20a0428e8",
                      name: "get_coin_information",
                      input: {},
                    },
                    toolOutput: {
                      output: extractData(chatMessage.content),
                      isError: false,
                    },
                  },
                },
              ]
            : undefined,
        role: "function",
      }
    : chatMessage;

  const suggestedQuestionsMockMessage = {
    ...chatMessage,
    annotations:
      chatMessage.role !== "user"
        ? [
            {
              type: "suggested_questions",
              data: [
                "What can you help me with?",
                "What tools do you have access to?",
                "What’s an example of your capabilities?",
              ],
            },
          ]
        : undefined,
  };

  return (
    <div className="flex items-start gap-2 md:gap-4 pr-2 md:pr-5 pt-2 md:pt-5">
      <ChatAvatar role={chatMessage.role} />
      <div className="group flex flex-1 justify-between gap-2">
        <div className="flex-1 space-y-4">
          <ChatMessageContent
            message={toolEventsMockUpMessage}
            isLoading={isLoading}
            append={append}
            isLastMessage={isLastMessage}
          />
          {/* {chatMessage.role !== "user" && (
            <div className="flex flex-col gap-2">
              <div className="font-semibold flex items-center gap-1">
                <SendHorizontal size={16} /> Suggested questions:
              </div>
              <div className="flex flex-col gap-1 ml-4">
                <p
                  className="w-fit text-sm hover:underline cursor-pointer"
                  onClick={() =>
                    handleClickSuggestedQuestion("What can you help me with?")
                  }
                >
                  • What can you help me with?
                </p>
                <p
                  className="w-fit text-sm hover:underline cursor-pointer"
                  onClick={() =>
                    handleClickSuggestedQuestion(
                      "What tools do you have access to?"
                    )
                  }
                >
                  • What tools do you have access to?
                </p>
                <p
                  className="w-fit text-sm hover:underline cursor-pointer"
                  onClick={() =>
                    handleClickSuggestedQuestion(
                      "What’s an example of your capabilities?"
                    )
                  }
                >
                  • What’s an example of your capabilities?
                </p>
              </div>
            </div>
          )} */}
        </div>
        <Button
          onClick={() => copyToClipboard(chatMessage.content)}
          size="icon"
          variant="ghost"
          className="h-8 w-8 opacity-0 group-hover:opacity-100"
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
