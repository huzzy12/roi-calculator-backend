import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ROIChartProps {
  monthlySavings: number;
  annualSavings: number;
}

export function ROIChart({ monthlySavings, annualSavings }: ROIChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Projected Cost Savings with AI Automation',
      },
    },
  };

  const data = {
    labels: ['Monthly Savings', 'Annual Savings'],
    datasets: [
      {
        label: 'Cost Savings ($)',
        data: [monthlySavings, annualSavings],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-lg">
      <Bar options={options} data={data} />
    </div>
  );
}