import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import { EnergyEntry } from '../health/HealthDataParser';

interface CaloriesChartProps {
  data: EnergyEntry[];
}

interface DailyCalories {
  date: Date;
  calories: number;
}

export default function CaloriesChart({ data }: CaloriesChartProps) {
  // Aggregate calories by day
  const dailyCalories: DailyCalories[] = data.reduce((acc: DailyCalories[], entry) => {
    const date = new Date(entry.date);
    date.setHours(0, 0, 0, 0);

    const existingDay = acc.find(d => d.date.getTime() === date.getTime());
    
    if (existingDay) {
      existingDay.calories += entry.value;
    } else {
      acc.push({
        date,
        calories: entry.value
      });
    }

    return acc;
  }, []).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h3 className="text-[#e6c384] text-xl mb-4">Daily Active Calories</h3>
      <div className="h-[300px]">
        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => `
                Date: ${new Date(datum.x).toLocaleDateString()}
                Calories: ${Math.round(datum.y)}
              `}
              labelComponent={
                <VictoryTooltip
                  style={{ fill: '#e6c384' }}
                  flyoutStyle={{ fill: 'black', stroke: '#e6c384' }}
                />
              }
            />
          }
          height={300}
          padding={{ top: 20, bottom: 40, left: 60, right: 40 }}
          style={{
            parent: {
              backgroundColor: "#1a1a1a"
            }
          }}
        >
          <VictoryAxis
            tickFormat={(date) => new Date(date).toLocaleDateString()}
            style={{
              axis: { stroke: "#7c7c7c" },
              tickLabels: { fill: "#7c7c7c", fontSize: 8, angle: -45 }
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Calories"
            style={{
              axis: { stroke: "#7c7c7c" },
              tickLabels: { fill: "#7c7c7c", fontSize: 10 },
              axisLabel: { fill: "#7c7c7c", padding: 40 }
            }}
          />
          <VictoryBar
            data={dailyCalories.map(d => ({ x: d.date, y: d.calories }))}
            style={{
              data: { fill: "#e6c384" }
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
} 