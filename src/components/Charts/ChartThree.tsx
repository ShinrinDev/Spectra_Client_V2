import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext/AuthContext';

interface ChartThreeState {
  series: number[];
  labels: string[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#fad949', '#fab949', '#fcf7b4', '#d99c2b', '#f9e497', '#b78e1f', '#9d7a14'],
  labels: [],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({ series: [], labels: [] });
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const firestore = getFirestore();
        const docRef = doc(firestore, 'stats', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const industries = docSnap.data().industries;
          const labels = Object.keys(industries);
          const series = labels.map((label) => parseFloat(industries[label])); // Convert values to numbers

          setState({ labels, series });
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-customDarkGray xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Targeted Industries.
          </h5>
        </div>
      </div>
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={{ ...options, labels: state.labels }}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {state.labels.map((label, index) => (
          <div key={label} className="sm:w-1/2 w-full px-8">
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full`}
                style={{ backgroundColor: options.colors[index] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <strong>{label} :</strong>{state.series[index]}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
