import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import GraphIntro from "../components/GraphIntro";

const WeeklyGraph = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [previousTotalEmission, setPreviousTotalEmission] = useState(null);

  const emissionTarget = 15;
  const greenPointsGoal = 140;

  useEffect(() => {
    const fetchWeeklyReport = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.id;
        if (!userId) throw new Error("User ID not found");

        const response = await fetch(
          `http://localhost:5000/api/carbon-footprint/${userId}/weekly-report`
        );
        const data = await response.json();
        if (data.success) {
          setReport(data);
          setPreviousTotalEmission(data?.previousWeekTotalEmission || null);
        }
      } catch (error) {
        console.error("Error fetching weekly report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyReport();
  }, []);

  const themeClasses = darkMode ? "bg-black text-white" : "bg-white text-gray-800";
  const COLORS = ["#ec4899", "#f43f5e", "#a855f7", "#06b6d4", "#f59e0b", "#10b981"];
  const EMOJI_MAP = {
    transport: "🚌",
    food: "🍔",
    energy: "💡",
    water: "🚿",
    waste: "🗑️",
    sustainability: "🌱",
  };

  const formatData = (greenPoints, emissions) =>
    greenPoints.map((point, idx) => ({
      date: point.date,
      greenPoints: point.points,
      emission: emissions[idx]?.emission || 0,
    }));

  const getBreakdownTotals = () => {
    const totals = {
      transport: 0,
      food: 0,
      energy: 0,
      water: 0,
      waste: 0,
      sustainability: 0,
    };
    report.breakdowns.forEach((day) => {
      Object.keys(totals).forEach((key) => {
        totals[key] += day[key] || 0;
      });
    });
    return Object.entries(totals).map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2)),
    }));
  };

  const chartData = report ? formatData(report.greenPoints, report.emissions) : [];
  const bestDay = report?.greenPoints.reduce(
    (best, day) => (day.points > best.points ? day : best),
    { date: "", points: 0 }
  );
  const worstDay = report?.emissions.reduce(
    (worst, day) => (day.emission > worst.emission ? day : worst),
    { date: "", emission: 0 }
  );

  const progressBar = (label, value, goal, color) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-2"
    >
      <motion.div whileHover={{ scale: 1.1 }} className="w-24 h-24">
        <CircularProgressbar
          value={value}
          maxValue={goal}
          text={`${Math.round((value / goal) * 100)}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: darkMode ? "#fff" : "#000",
            trailColor: darkMode ? "#333" : "#ddd",
          })}
        />
      </motion.div>
      <p className="text-xs text-center text-pink-300">{label}</p>
    </motion.div>
  );

  const renderBadge = () => {
    if (report.totalPoints >= 140 && report.totalEmissions <= 15) return "🏅 Eco Champion";
    if (report.totalPoints >= 100) return "🌟 Consistent Contributor";
    if (report.totalEmissions <= 10) return "🍃 Low Emission Leader";
    return "👍 Keep Going!";
  };

  const getEmissionTrend = () => {
    if (!previousTotalEmission || previousTotalEmission === 0) return null;
    const diff = report.totalEmissions - previousTotalEmission;
    const percentage = ((diff / previousTotalEmission) * 100).toFixed(1);
    return diff > 0
      ? `🔺 +${percentage}% from last week`
      : `🟢 ${Math.abs(percentage)}% lower than last week`;
  };

  const insights = () => {
    const totals = getBreakdownTotals();
    const highest = totals.reduce((max, cat) => (cat.value > max.value ? cat : max), {
      value: 0,
    });
    return `Most of your emissions came from ${highest.name}. Consider small changes to reduce its impact.`;
  };

  const smartTips = [
    "Switch to short showers instead of long ones to save water and energy.",
    "Walk or bike short distances — it’s zero-emission and healthy!",
    "Unplug devices when not in use — phantom energy is real!",
    "Choose seasonal, local produce to cut down on emissions.",
    "Carpool or take public transport to reduce your footprint.",
  ];

  // ✅ Intro Animation First
  if (showIntro) return <GraphIntro onFinish={() => setShowIntro(false)} />;

  // ✅ Full Dashboard
  return (
    <div
      className={`min-h-screen mt-20 transition-colors duration-500 ease-in-out ${themeClasses} pt-16 px-6 md:px-16 flex flex-col items-center`}
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-2 text-center text-pink-400"
      >
        🌍 Weekly Overview
      </motion.h2>
      <p className="text-pink-200 text-sm mb-6 text-center">
        Your environmental journey at a glance
      </p>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading report...</p>
      ) : report ? (
        <>
          {/* Top Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mb-8">
            <div className="text-sm text-center bg-gray-800 rounded-lg p-4 shadow-md">
              <p className="text-pink-300 mb-1">🎖️ Badge</p>
              <p className="text-lg font-bold text-white">{renderBadge()}</p>
            </div>
            <div className="text-sm text-center bg-gray-800 rounded-lg p-4 shadow-md">
              <p className="text-pink-300 mb-1">📊 Emission Change</p>
              <p className="text-lg font-bold text-white">{getEmissionTrend()}</p>
            </div>
            <div className="text-sm text-center bg-gray-800 rounded-lg p-4 shadow-md">
              <p className="text-pink-300 mb-1">💡 Smart Tip</p>
              <p className="text-white italic">
                {smartTips[Math.floor(Math.random() * smartTips.length)]}
              </p>
            </div>
          </div>

          {/* Progress + Best/Worst */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl mb-8">
            {progressBar("Green Points", report.totalPoints, greenPointsGoal, "#a855f7")}
            {progressBar("Emissions", report.totalEmissions, emissionTarget, "#ef4444")}
            <div className="text-sm text-center bg-gray-800 rounded-lg p-4 shadow-md">
              <p className="text-pink-300">Best Green Day</p>
              <p className="text-white font-bold text-lg">
                {new Date(bestDay.date).toLocaleDateString("en-GB")}
              </p>
              <p className="text-pink-200 font-medium">{bestDay.points} pts</p>
            </div>
            <div className="text-sm text-center bg-gray-800 rounded-lg p-4 shadow-md">
              <p className="text-pink-300">Highest Emission</p>
              <p className="text-white font-bold text-lg">
                {new Date(worstDay.date).toLocaleDateString("en-GB")}
              </p>
              <p className="text-pink-200 font-medium">
                {worstDay.emission.toFixed(2)} kg
              </p>
            </div>
          </div>

          {/* Line Chart & Pie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-8">
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-pink-400 mb-4 text-center">
                📈 Weekly Line Chart
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis
                    dataKey="date"
                    stroke="#ccc"
                    tickFormatter={(date) =>
                      new Date(date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                      })
                    }
                  />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="greenPoints"
                    stroke="#3B82F6"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="emission"
                    stroke="#EF4444"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-pink-400 mb-4 text-center">
                🧩 Category-wise Emissions
              </h3>
              <div className="flex md:flex-row flex-col w-full">
                <div className="w-full md:w-1/2 flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={getBreakdownTotals()}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        labelLine={false}
                      >
                        {getBreakdownTotals().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            style={{
                              filter:
                                "drop-shadow(0 0 4px rgba(255,255,255,0.3))",
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [
                          `${value.toFixed(2)} kg`,
                          `${EMOJI_MAP[name]} ${name}`,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="w-full md:w-1/2 flex flex-col justify-center space-y-2 pl-6">
                  {getBreakdownTotals().map((entry, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span
                        className="w-3 h-3 rounded-full inline-block"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></span>
                      <span className="capitalize text-sm">
                        {EMOJI_MAP[entry.name]} {entry.name}:{" "}
                        {entry.value.toFixed(2)} kg
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-6xl mb-8">
            <h3 className="text-lg font-bold text-pink-400 mb-4 text-center">
              📊 Green Points Per Day
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={report.greenPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="date"
                  stroke="#ccc"
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                    })
                  }
                />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="points" fill="#22d3ee" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Smart Insight */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-6xl">
            <h3 className="text-lg font-bold text-pink-400 mb-2 text-center">
              💡 Smart Insight
            </h3>
            <p className="text-sm text-pink-200 italic text-center">
              {insights()}
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No report found.</p>
      )}
    </div>
  );
};

export default WeeklyGraph;
