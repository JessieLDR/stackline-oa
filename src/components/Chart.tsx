import { LineChart } from '@mui/x-charts/LineChart';
import { SalesData } from '../types/productTypes';

const dataset = [
  { day: 'Jan' },
  { day: 'Feb' },
  { day: 'Mar' },
  { day: 'Apr' },
  { day: 'Mai' },
  { day: 'Jun' },
  { day: 'Jul' },
  { day: 'Aug' },
  { day: 'Sept' },
  { day: 'Oct' },
  { day: 'Nov' },
  { day: 'Dec' },
];

interface ChartProps {
  salesData: SalesData[];
}

// TODO: revise the x axis values
//const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
export default function Chart({ salesData }: ChartProps) {
  const xValues = salesData.map((sale) => ({ day: sale.weekEnding }));
  const retailSales = salesData.map((sale) => sale.retailSales);
  const wholesaleSales = salesData.map((sale) => sale.wholesaleSales);
  
  return (
    <div className="chartRoot" style={{ background: 'white'}}>
      <div>
        <div style={{ textAlign: 'left', padding: '20px' }}>
          <span>Retail Sales</span>
        </div>
      </div>
      <div style={{height: 550, padding: '20px'}}>
        <LineChart
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'day',
              label: 'Day',
            },
          ]}
          series={[
            { curve: "linear", data: retailSales },
            { curve: "linear", data: wholesaleSales },
          ]}
          dataset={xValues ? xValues : dataset}
          margin={{ left: 70 }}        
        />
      </div>
    </div>
  );
}