// src/components/LineChart.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const [data, setData] = useState({
    labels: ['Cases', 'Deaths', 'Recovered'],
    datasets: [
      {
        label: 'COVID-19 Data',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [0, 0, 0], // Initialize with default values
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all')
      .then(response => {
        const chartData = {
          labels: ['Cases', 'Deaths', 'Recovered'],
          datasets: [
            {
              label: 'COVID-19 Data',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.4)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: [response.data.cases, response.data.deaths, response.data.recovered],
            },
          ],
        };
        setData(chartData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>COVID-19 Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Line data={data} />
      )}
    </div>
  );
};

export default LineChart;
