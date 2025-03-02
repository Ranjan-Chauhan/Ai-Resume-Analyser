import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [parsing, setParsing] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setParsing(false);
      setMessage("");

      const response = await axios.post(`${BASE_URL}/api/v1/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      console.log("res: ", response);

      setUploading(false);
      setParsing(true);

      setTimeout(() => {
        setResumeData(response.data.data);
        setParsing(false);
        setMessage(`Upload successful: ${response.data.filename}`);
      }, 2000);
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
      setUploading(false);
      setParsing(false);
    } finally {
      setProgress(0);
    }
  };

  const handleViewJobs = () => {
    if (resumeData) {
      navigate("/job-list", {
        state: {
          skills: resumeData.keySkills,
          jobPreferences: resumeData.jobPreferences,
        },
      }); // Navigate to Job Listings page
    }
  };

  return (
    <div className="p-6 rounded-lg w-full max-w-[1280px] mx-auto flex flex-col justify-center items-center space-y-4">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
        Upload Your Resume
      </h2>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-x-6 sm:space-y-0 w-full">
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
          className="w-full sm:w-96 border p-2 rounded"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-600 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="my-2">
        {uploading && <p className="text-blue-500">Uploading... {progress}%</p>}
        {message && <p className="text-center">{message}</p>}

        {parsing && (
          <div className="flex items-center space-x-2 text-oran text-lg font-semibold">
            <ImSpinner2 className="animate-spin text-pink-600" size={28} />
            <span>Parsing Resume...</span>
          </div>
        )}
      </div>

      {/* Showing REsume data */}
      {resumeData && (
        <div className="w-[980px]">
          <div className="mt-4 p-4 px-6 w-auto border-2 max-w-auto rounded-lg flex flex-col space-y-2">
            <h3 className="text-xl sm:text-3xl text-lime-500 font-semibold mb-4 text-center">
              Your Resume Summary
            </h3>

            <p className="text-start">
              <strong>Name :</strong> {resumeData.candidateName}
            </p>
            <p className="text-start">
              <strong>Email :</strong> {resumeData.contact.email}
            </p>
            <p className="text-start">
              <strong>Phone :</strong> {resumeData.contact.phoneNumber}
            </p>

            {/* LinkedIn */}
            <p className="text-start">
              <strong>LinkedIn :</strong>{" "}
              <Link
                to={`https://${resumeData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 break-all"
              >
                {resumeData.linkedin}
              </Link>
            </p>

            {/* GitHub */}
            <p className="text-start">
              <strong>GitHub / Portfolio :</strong>{" "}
              <Link
                to={`https://${resumeData.portfolio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 break-all"
              >
                {resumeData.portfolio}
              </Link>
            </p>
            <p className="text-start">
              <strong>Key Skills :</strong> {resumeData.keySkills.join(", ")}
            </p>

            {/* job Role */}
            <p className="text-start">
              <strong>Preferred Job Roles :</strong>{" "}
              {resumeData.jobPreferences?.preferredJobRoles?.join(", ") || "Na"}
            </p>
            <p className="text-start">
              <strong>Preferred Locations :</strong>{" "}
              {resumeData.jobPreferences?.preferredLocations?.join(", ") ||
                "Na"}
            </p>
            {/* <p className="text-start">
            <strong>Preferred Industries :</strong>{" "}
            {resumeData.jobPreferences?.preferredIndustries?.join(", ") || "Na"}
          </p> */}

            {/* Work exp */}
            <h4 className="text-lg font-semibold">Work Experience</h4>
            {resumeData.workExperience.map((exp, index) => (
              <div
                key={index}
                className="flex space-x-2.5 border p-2.5 items-center rounded"
              >
                <p>
                  <strong>Company:</strong> {exp.companyName}
                </p>
                <p>
                  <strong>Role:</strong> {exp.jobTitle}
                </p>
                <p>
                  <strong>Duration:</strong> {exp.duration}
                </p>
              </div>
            ))}

            {/* <h4 className="text-lg font-semibold">Education:</h4>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="border p-3 rounded">
              <p>
                <strong>Degree:</strong> {edu.degree}
              </p>
              <p>
                <strong>Institution:</strong> {edu.institution}
              </p>
              <p>
                <strong>Graduation Date:</strong> {edu.graduationDate}
              </p>
            </div>
          ))} */}

            {/* <h4 className="text-lg font-semibold">Projects:</h4>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="border p-3 rounded">
              <p>
                <strong>Project Name:</strong> {project.projectName}
              </p>
              <p>
                <strong>Description:</strong> {project.projectDescription}
              </p>
            </div>
          ))}  */}

            {/* Button */}
            <div className="flex justify-center items-center">
              <button
                onClick={handleViewJobs}
                className="mt-4 bg-green-500 text-white px-4 py-2 flex justify-center items-center gap-3 rounded w-2/5 hover:bg-green-600"
              >
                See Relevant Jobs <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
