import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Data } from "../App";
import moment from "moment";

export default function Chart({ data }: { data: Data | undefined }) {
  const dateFormatter = (date: any) => {
    // return moment(date).unix();

    return moment(date).format(" HH:mm");
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data?.real}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="category"
          dataKey="timestamp"
          scale="time"
          tickFormatter={(tick) => dateFormatter(tick)}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="production_renewable"
          stroke="#4bc8e2"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
