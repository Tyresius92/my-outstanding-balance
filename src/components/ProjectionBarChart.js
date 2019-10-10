import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

const chartOptions = {
  scales: {
    xAxes: [
      {
        stacked: true
      }
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  maintainAspectRatio: true
};

const getDatasets = projections => [
  {
    label: "Balance",
    backgroundColor: "#85bb65",
    borderColor: "#000",
    borderWidth: 0,
    data: projections.map(projection => projection.balance)
  },
  {
    label: "Interest",
    backgroundColor: "#a0324c",
    borderColor: "#000",
    borderWidth: 0,
    data: projections.map(projection => projection.interest)
  }
];

const ProjectionBarChart = ({ projections }) => (
  <Bar
    data={{
      labels: projections.map(projection => projection.month),
      datasets: getDatasets(projections)
    }}
    options={chartOptions}
  />
);

ProjectionBarChart.propTypes = {
  projections: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      interest: PropTypes.number.isRequired
    })
  ).isRequired
};

export default ProjectionBarChart;
