import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  colors: ['#fad949', '#fab949'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: { enabled: false },
  xaxis: { categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    markers: { radius: 99 },
  },
  fill: { opacity: 1 },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartTwo: React.FC = () => {
  // Set default week to "This Week"
  const [selectedWeek, setSelectedWeek] = useState('This Week');
  const [state, setState] = useState<ChartTwoState>({
    series: [
      { name: 'Last Week', data: [44, 55, 41, 67, 22, 43, 65] },
      { name: 'This Week', data: [13, 23, 20, 8, 13, 27, 15] },
    ],
  });

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const week = event.target.value;
    setSelectedWeek(week);
    
    if (week === 'Last Week') {
      setState({
        series: [{ name: 'Last Week', data: [44, 55, 41, 67, 22, 43, 65] }],
      });
    } else {
      setState({
        series: [{ name: 'This Week', data: [13, 23, 20, 8, 13, 27, 15] }],
      });
    }
  };

  useEffect(() => {
    // Ensure "This Week" is selected by default after page load
    setSelectedWeek('This Week');
    setState({
      series: [{ name: 'This Week', data: [13, 23, 20, 8, 13, 27, 15] }],
    });
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-customDarkGray xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Leads per week
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="week-selector"
              id="week-selector"
              value={selectedWeek}
              onChange={handleWeekChange}
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="This Week" className="dark:bg-boxdark">
                This Week
              </option>
              <option value="Last Week" className="dark:bg-boxdark">
                Last Week
              </option>
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
