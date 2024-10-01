import React from 'react';
import { Chart } from 'react-google-charts';
import { Link } from 'react-router-dom';
import ngo1 from "../../assets/images/ngo1.png";
import ngo2 from "../../assets/images/ngo2.png";
import video1 from '../../assets/images/video1.mp4';

const DashboardOverview = () => {
  // Sample data for different chart types
  const barData = [
    ["Month", "Funds"],
    ["Jan", 4000],
    ["Feb", 3000],
    ["Mar", 5500],
    ["Apr", 2800],
    ["June", 4300],
  ];

  const lineData = [
    ["Month", "Donation Drive", "Workshops"],
    ["Jan", 240, 100],
    ["Feb", 180, 200],
    ["Mar", 280, 200],
    ["Apr", 200, 250],
  ];

  const pieData = [
    ["Volunteers", "Total Contribution"],
    ["Parth", 8],
    ["Aditi", 6],
    ["Sameer", 5],
    ["Dnyanesh", 3],
  ];

  const areaData = [
    ["Year", "Total Growth", "Total Expenses"],
    ["2017", 100, 40],
    ["2018", 70, 60],
    ["2019", 60, 20],
    ["2020", 30, 50],
  ];

  const barOptions = {
    chartArea: { width: "70%" },
    hAxis: {
      title: "Funds Raised",
      minValue: 0,
    },
    vAxis: {
      title: "Month",
    },
    backgroundColor: 'transparent',
    title: 'Fund Raiser' // Set graph background transparent
  };
  
  const lineOptions = {
    title: 'Drive Analysis', // Set graph background transparent
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: 'transparent', // Set graph background transparent
  };

  const pieOptions = {
    title: "Volunteer Contribution",
    pieHole: 0.4,
    backgroundColor: 'transparent', // Set graph background transparent
  };

  const areaOptions = {
    title: "NGO Performance",
    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
    vAxis: { title: 'Percentage(100%)', minValue: 0 },
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
              style={{fontSize: '2rem'}}
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
          <h2 className="text-2xl font-medium my-3">Upcoming Events</h2>
          <div className="flex gap-4">
            {/* Example Event */}
              <div className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-4 rounded-lg shadow-lg shadow-blue-500/50 w-[22vw] h-[16vh]">
                <h3 className="text-lg font-semibold">Charity Marathon</h3>
                <p className="text-gray-600">A walkathon event for charity so that money earned will be used for a noble cause.</p>
                <Link to="/event-details" className="text-blue-500 hover:underline">View Details</Link>
              </div>
              <div className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-4 rounded-lg shadow-lg shadow-blue-500/50 w-[22vw] h-[16vh]">
                <h3 className="text-lg font-semibold">Volunteer Workshops</h3>
                <p className="text-gray-600">A workshops for volunteer for detailed knowledge of how a community works.</p>
                <Link to="/event-details" className="text-blue-500 hover:underline">View Details</Link>
              </div>
          </div>
        </div>

        {/* Top Volunteer Profiles */}
        <div className="flex-1 ml-4">
          <h2 className="text-2xl font-medium my-3">Top Volunteer Profiles</h2>
          <div className="flex gap-4">
            {/* Example Volunteer Profile */}
              <div className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-4 rounded-lg shadow-lg shadow-blue-500/50 w-72">
                <img src={ngo1} alt='Volunteer' className="rounded-full w-16 h-16" />
                <h3 className="text-lg font-semibold"> #1 Aditi Ambasta </h3>
                <p className="text-gray-600">Rookie volunteer who is enthusiast for donation</p>
              </div>
              <div className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-4 rounded-lg shadow-lg shadow-blue-500/50 w-72">
                <img src={ngo2} alt='Volunteer' className="rounded-full w-16 h-16" />
                <h3 className="text-lg font-semibold">#2 Dnyanesh Sawant </h3>
                <p className="text-gray-600 text-wrap">Experienced Volunteer who is well known by people.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
