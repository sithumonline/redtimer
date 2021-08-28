import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

function Home() {
  const [value, setValue] = useState("Loading");
  const [color, setColor] = useState("white");

  const { data, isFetched, isLoading, status } = useQuery(
    "getTime",
    () => async () => {
      const response = await axios.get(
        "https://red-timer-api.herokuapp.com/api/v1/time"
      );
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

  const resetTime = () => {
    axios.post("https://red-timer-api.herokuapp.com/api/v1/time");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ color: color }} className="Time">
          {value.split(".")[0]}
        </p>
        <button className="Button Red" onClick={resetTime}>
          Reset
        </button>
        <div className="row">
          <a href={"/post"}>
            <button className="Button">Read Post</button>
          </a>
          <a href="https://red-timer-api.herokuapp.com/chat" rel="noreferrer" target="_blank">
            <button className="Button Green">Chat</button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Home;
