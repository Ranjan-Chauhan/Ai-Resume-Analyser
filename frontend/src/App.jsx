import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./components/Home";
import JobList from "./components/JobList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        // <Route path="/job-list" element={<JobList />} />
      </Routes>
    </>
  );
}

export default App;
