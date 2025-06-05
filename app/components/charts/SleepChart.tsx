import { VictoryStack, VictoryArea, VictoryChart, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import { SleepEntry } from '../health/HealthDataParser';

interface SleepChartProps {
  data: SleepEntry[];
}

interface ProcessedSleepData {
  date: Date;
  rem: number;
  deep: number;
  light: number;
}

export default function SleepChart({ data }: SleepChartProps) {
  // Process and aggregate sleep data by day
  const processedData: ProcessedSleepData[] = data.reduce((acc: ProcessedSleepData[], entry) => {
    const date = new Date(entry.startDate);
    date.setHours(0, 0, 0, 0);

    const existingDay = acc.find(d => d.date.getTime() === date.getTime());
    
    if (existingDay) {
      if (entry.value === 'ASLEEP') {
        // Distribute sleep time according to typical proportions
        existingDay.rem += entry.duration * 0.25;
        existingDay.deep += entry.duration * 0.2;
        existingDay.light += entry.duration * 0.55;
      }
    } else {
      if (entry.value === 'ASLEEP') {
        acc.push({
          date,
          rem: entry.duration * 0.25,
          deep: entry.duration * 0.2,
          light: entry.duration * 0.55
        });
      }
    }

    return acc;
  }, []).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h3 className="text-[#e6c384] text-xl mb-4">Sleep Stages</h3>
      <div className="h-[300px]">
        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => `
                Date: ${new Date(datum.x).toLocaleDateString()}
                ${datum.type}: ${datum.y.toFixed(1)} hours
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
            label="Hours"
            style={{
              axis: { stroke: "#7c7c7c" },
              tickLabels: { fill: "#7c7c7c", fontSize: 10 },
              axisLabel: { fill: "#7c7c7c", padding: 40 }
            }}
          />
          <VictoryStack>
            <VictoryArea
              data={processedData.map(d => ({ x: d.date, y: d.rem, type: 'REM Sleep' }))}
              style={{
                data: { fill: "#c4b5fd" }
              }}
            />
            <VictoryArea
              data={processedData.map(d => ({ x: d.date, y: d.deep, type: 'Deep Sleep' }))}
              style={{
                data: { fill: "#818cf8" }
              }}
            />
            <VictoryArea
              data={processedData.map(d => ({ x: d.date, y: d.light, type: 'Light Sleep' }))}
              style={{
                data: { fill: "#4f46e5" }
              }}
            />
          </VictoryStack>
        </VictoryChart>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#c4b5fd] mr-2"></div>
          <span className="text-sm text-gray-400">REM</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#818cf8] mr-2"></div>
          <span className="text-sm text-gray-400">Deep</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#4f46e5] mr-2"></div>
          <span className="text-sm text-gray-400">Light</span>
        </div>
      </div>
    </div>
  );
} 