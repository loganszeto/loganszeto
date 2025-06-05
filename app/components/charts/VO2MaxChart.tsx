import { VictoryLine, VictoryChart, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import { VO2MaxEntry } from '../health/HealthDataParser';

interface VO2MaxChartProps {
  data: VO2MaxEntry[];
}

export default function VO2MaxChart({ data }: VO2MaxChartProps) {
  const sortedData = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h3 className="text-[#e6c384] text-xl mb-4">VO₂ Max Over Time</h3>
      <div className="h-[300px]">
        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => `
                Date: ${new Date(datum.x).toLocaleDateString()}
                VO₂ Max: ${datum.y.toFixed(1)}
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
            style={{
              axis: { stroke: "#7c7c7c" },
              tickLabels: { fill: "#7c7c7c", fontSize: 10 }
            }}
          />
          <VictoryLine
            data={sortedData.map(d => ({ x: d.date, y: d.value }))}
            style={{
              data: { stroke: "#e6c384" }
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
} 