"use client";

import { useState } from "react";

const fields = {
  Technology: ["Web Development", "Data Science", "Cybersecurity"],
  Design: ["Graphic Design", "UI/UX", "3D Modeling"],
  Business: ["Marketing", "Entrepreneurship", "Finance"],
  Arts: ["Painting", "Photography", "Writing"],
};

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function SkillSelection() {
  const [selectedField, setSelectedField] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState({});

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      const newSkills = { ...prev };
      if (newSkills[skill]) delete newSkills[skill];
      else newSkills[skill] = "Beginner";
      return newSkills;
    });
  };

  const updateSkillLevel = (skill, level) => {
    setSelectedSkills((prev) => ({ ...prev, [skill]: level }));
  };

  return (
    <div className="min-h-screen bg-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5 text-black">Select Your Interests</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(fields).map((field) => (
          <button
            key={field}
            className="p-4 bg-blue-500 text-black rounded-xl shadow-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedField(field)}
          >
            {field}
          </button>
        ))}
      </div>

      {selectedField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-black">{selectedField}</h2>
            <div className="grid gap-3">
              {fields[selectedField].map((skill) => (
                <div key={skill} className="flex justify-between items-center p-2 border-b">
                  <span className="text-black">{skill}</span>
                  <button
                    className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => toggleSkill(skill)}
                  >
                    {selectedSkills[skill] ? "Remove" : "Add"}
                  </button>
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600 transition w-full"
              onClick={() => setSelectedField(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {Object.keys(selectedSkills).length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">Your Selected Skills</h2>
          <div className="grid gap-3">
            {Object.entries(selectedSkills).map(([skill, level]) => (
              <div key={skill} className="p-3 bg-gray-200 rounded-lg flex justify-between">
                <span className="text-black">{skill}</span>
                <select
                  className="border rounded p-1 text-black"
                  value={level}
                  onChange={(e) => updateSkillLevel(skill, e.target.value)}
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl} className="text-black">{lvl}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
