import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("Loading");
  const [color, setColor] = useState("white");

  const { data, isFetched, isLoading, status } = useQuery(
    "getTime",
    () => async () => {
      const response = await axios.get("http://localhost:3080/api/v1/time");
      return response.data;
    },
    {
      refetchInterval: 1000,
    }
  );

  if (isFetched && status === "success" && !isLoading && data) {
    data.then((data) => {
      setValue(data.data.duration);
      setColor(data.data.color);
    });
  }

  console.log(`${value}-${color}-${status}`);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p color={color}>{value}</p>
      </header>
    </div>
  );
}

export default App;
