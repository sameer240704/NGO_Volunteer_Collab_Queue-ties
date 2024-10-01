import React from 'react';
import { Chart } from 'react-google-charts';
import { Link } from 'react-router-dom';
import ngo1 from "../../assets/images/ngo1.png";
import video1 from '../../assets/images/video1.mp4';

const DashboardOverview = () => {
  // Sample data for different chart types
  const barData = [
    ["Data", "Value"],
    ["Data 1", 400],
    ["Data 2", 300],
    ["Data 3", 500],
  ];

  const lineData = [
    ["Month", "Value 1", "Value 2"],
    ["Jan", 240, 100],
    ["Feb", 180, 200],
    ["Mar", 280, 150],
    ["Apr", 220, 250],
  ];

  const pieData = [
    ["Task", "Hours per Day"],
    ["Work", 8],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 3],
    ["Sleep", 9],
  ];

  const areaData = [
    ["Year", "Sales", "Expenses"],
    ["2017", 1000, 400],
    ["2018", 1170, 460],
    ["2019", 660, 1120],
    ["2020", 1030, 540],
  ];

  const barOptions = {
    chartArea: { width: "70%" },
    hAxis: {
      title: "Total Value",
      minValue: 0,
    },
    vAxis: {
      title: "Data",
    },
    backgroundColor: 'transparent', // Set graph background transparent
  };

  const lineOptions = {
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: 'transparent', // Set graph background transparent
  };

  const pieOptions = {
    title: "Daily Activities",
    pieHole: 0.4,
    backgroundColor: 'transparent', // Set graph background transparent
  };

  const areaOptions = {
    title: "Company Performance",
    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 },
    chartArea: { width: '70%', height: '70%' },
    backgroundColor: 'transparent', // Set graph background transparent
  };

  return (
    <div className="overflow-hidden z-[99]" >
      {/* Row 3: Analytics and Video */}

      <div className="flex">
        {/* 2x2 Grid of Charts */}
        <div className="grid grid-cols-2 gap-3 w-[60vw]">
          {/* Bar Chart */}
          <div className="bg-white z-[1] bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-2 rounded-lg shadow-lg shadow-blue-500/50" style={{ minHeight: '250px' }}>
            <Chart
              chartType="BarChart"
              className='z-[-1]'
              width="100%"
              height="100%"
              data={barData}
              options={barOptions}
            />
          </div>

          {/* Line Chart */}
          <div className="bg-white z-[99] bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-2 rounded-lg shadow-lg shadow-blue-500/50" style={{ minHeight: '250px' }}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="100%"
              data={lineData}
              options={lineOptions}
            />
          </div>

          {/* Pie Chart */}
          <div className="bg-white z-[99] bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-2 rounded-lg shadow-lg shadow-blue-500/50" style={{ minHeight: '250px' }}>
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={pieData}
              options={pieOptions}
            />
          </div>

          {/* Area Chart */}
          <div className="bg-white z-[99] bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-2 rounded-lg shadow-lg shadow-blue-500/50" style={{ minHeight: '250px' }}>
            <Chart
              chartType="AreaChart"
              width="100%"
              height="100%"
              data={areaData}
              options={areaOptions}
            />
          </div>
        </div>

        {/* Auto Play Video Positioned Vertically on the Right */}
        <div className="ml-4 bg-white z-[99] bg-opacity-25 backdrop-blur-md border border-white border-opacity-40 p-4 rounded-lg shadow-lg shadow-blue-500/50 flex items-center justify-center" style={{ minHeight: '100%', width: '18vw' }}>
          <video width="100%" height="100%" autoPlay loop muted style={{ borderRadius: '10px', objectFit: 'cover' }}>
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Row 2: Top Events and Top Volunteers in one line */}
      <div className="flex mt-3">
        {/* Top Events */}
        <div className="flex-1">
          <h2 className="text-2xl font-medium my-3">Top Events</h2>
          <div className="flex gap-4">
            {/* Example Event */}
            {Array(2).fill(0).map((_, index) => (
              <div key={index} className="bg-white z-[99] bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-4 rounded-lg shadow-lg shadow-blue-500/50 w-[22vw] h-[16vh]">
                <h3 className="text-lg font-semibold">Event Title {index + 1}</h3>
                <p className="text-gray-600">Event details and description.</p>
                <Link to="/event-details" className="text-blue-500 hover:underline">View Details</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Top Volunteer Profiles */}
        <div className="flex-1 ml-4">
          <h2 className="text-2xl font-medium my-3">Top Volunteer Profiles</h2>
          <div className="flex gap-4">
            {/* Example Volunteer Profile */}
            {Array(2).fill(0).map((_, index) => (
              <div key={index} className="bg-white z-[99] bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-4 rounded-lg shadow-lg shadow-blue-500/50 w-72">
                <img src={ngo1} alt={`Volunteer ${index + 1}`} className="rounded-full w-16 h-16" />
                <h3 className="text-lg font-semibold">Volunteer {index + 1}</h3>
                <p className="text-gray-600">Short Bio or Description</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
