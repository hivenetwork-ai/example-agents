import { ToolData } from "../index";
import ProfileCard, {
  ProfileCardProps,
} from "@/components/widgets/ProfileCard";
import { WeatherCard, WeatherData } from "../widgets/WeatherCard";
import CoinTable, { CoinTableProps } from "@/components/widgets/CoinTable";

// TODO: If needed, add displaying more tool outputs here
export default function ChatTools({ data }: { data: ToolData }) {
  if (!data) return null;
  const { toolCall, toolOutput } = data;

  if (toolOutput.isError) {
    return (
      <div className="border-l-2 border-red-400 pl-2">
        There was an error when calling the tool {toolCall.name} with input:{" "}
        <br />
        {JSON.stringify(toolCall.input)}
      </div>
    );
  }

  switch (toolCall.name) {
    case "get_weather_information":
      const weatherData = toolOutput.output as unknown as WeatherData;
      return <WeatherCard data={weatherData} />;
    case "get_profile_information":
      const profileData = toolOutput.output as unknown as ProfileCardProps;
      return <ProfileCard {...profileData} />;
    case "get_coin_information":
      const coinData = toolOutput.output as unknown as CoinTableProps;
      console.log("coinData", coinData)
      return <CoinTable {...coinData} />;
    default:
      return null;
  }
}
