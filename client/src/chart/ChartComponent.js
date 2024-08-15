import React, { useEffect , useRef} from 'react';
import Chart from 'chart.js/auto';
const ChartComponent = ({ monthlyApplications }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);
  useEffect(() => {
    if (monthlyApplications && monthlyApplications.length > 0) {
      const labels = monthlyApplications.map(app => app.date);
      const counts = monthlyApplications.map(app => app.count);

      const ctx = chartRef.current.getContext('2d');

      // Destroy previous chart instance if it exists
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }

      // Create new chart instance
      myChartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Monthly Applications',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            barThickness: 100, // Set the bar thickness
            maxBarThickness: 100 // Maximum bar thickness
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            ticks: {
                stepSize: Math.ceil(Math.max(...counts) / 12) 
            }
            }
          }
        }
      });
    }
  }, [monthlyApplications]);
  return (
    <>
      <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <canvas ref={chartRef} className="w-full h-96"></canvas>
      </div>
    </div>
    </>
  )
}

export default ChartComponent
