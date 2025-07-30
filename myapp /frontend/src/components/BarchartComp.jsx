import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ metrics }) => {
  const data = [
    { name: "People Requested", value: metrics.people_requested },
    { name: "People Assigned", value: metrics.people_assigned },
    { name: "Quality Score", value: metrics.quality_score },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 40, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Bar dataKey="value" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
