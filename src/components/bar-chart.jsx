import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Últimos 7 Conteos',
      },
    },
  };

const labels = ['24/12', '25/12', '26/12', '27/12', '28/12', '29/12', '30/12'];
export const data = {
    labels,
    datasets: [
      {
        label: 'Pasajeros',
        data: [10,35,40,50,85,40,50],
        backgroundColor: 'rgba(26, 188, 156, 0.5)',
      }
    ],
  }; 
export default function BarChart(){

    return(
            <>
            <Bar options={options} data={data} />;
            </>
    );
}