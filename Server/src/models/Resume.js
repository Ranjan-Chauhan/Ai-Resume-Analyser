const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    candidateName: { type: String, required: true },
    contact: {
      email: { type: String, default: "Not provided" },
      phoneNumber: { type: String, default: "Not provided" },
    },
    keySkills: [{ type: String }],

    jobPreferences: {
      preferredJobRoles: [{ type: String }],
      preferredIndustries: [{ type: String }],
      preferredLocations: [{ type: String }],
    },

    workExperience: [
      {
        jobTitle: { type: String, default: "Not specified" },
        companyName: { type: String, default: "Not specified" },
        duration: { type: String, default: "Not specified" },
      },
    ],

    linkedin: { type: String },
    portfolio: { type: String },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", ResumeSchema);
module.exports = Resume;
