import React from "react";
import FileUpload from "./FileUpload";
// import JobList from "./jobList";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col space-y-10">
        <FileUpload />

        {/* <JobList /> */}
      </div>
    </div>
  );
};

export default Home;
