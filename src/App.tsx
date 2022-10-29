import React, { useEffect, useState } from "react";
import "./App.scss";
import Chart from "./components/Chart";

export interface Data {
  real: [
    {
      timestamp: number;
      production: number;
      consumption: number;
      losses: null | number;
      frequency: number;
      system_balance: number;
      ac_balance: number;
      production_renewable: number;
      solar_energy_production: null | number;
    }
  ];
  plan: [
    {
      timestamp: number;
      production: number;
      consumption: number;
      losses: null | number;
      frequency: number;
      system_balance: number;
      ac_balance: number;
      production_renewable: number;
      production_renewable_operator: number;
      solar_energy_forecast: number;
      solar_energy_forecast_operator: number;
    }
  ];
}

interface Response {
  data: Data;
  success: boolean;
}

function App() {
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const start = yesterday.toISOString();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const end = tomorrow.toISOString();

    setIsLoading(true);
    fetch(
      `https://dashboard.elering.ee/api/system/with-plan?start=${start}&end=${end}`
    )
      .then((response) => response.json())
      .then((res: Response) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err, "Error fetching the api");
      });
  }, [data?.toString()]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error loading the page</div>;
  }

  return (
    <div className="wrapper-container">
      <h1>Cleanest renewable rates:</h1>
      <Chart data={data} />
    </div>
  );
}

export default App;
