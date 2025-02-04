"use client";

import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";

// Skill fields and levels
const fields = {
  Technology: ["Web Development", "Data Science", "Cybersecurity"],
  Design: ["Graphic Design", "UI/UX", "3D Modeling"],
  Business: ["Marketing", "Entrepreneurship", "Finance"],
  Arts: ["Painting", "Photography", "Writing"],
};

const levels = ["Beginner", "Intermediate", "Advanced"];

// AI-powered test generation function
async function generateSkillTest(hf, skills) {
  const generatedQuestions = await Promise.all(
    Object.entries(skills).map(async ([skill, level]) => {
      const context = `Generate a ${level.toLowerCase()} level ${skill} quiz question`;
      
      try {
        const questionResponse = await hf.textGeneration({
          model: "google/flan-t5-base",
          inputs: context,
          parameters: { max_length: 100 }
        });

        const optionsResponse = await hf.textGeneration({
          model: "google/flan-t5-base", 
          inputs: `Generate 4 multiple choice options for this question: ${questionResponse.generated_text}`,
          parameters: { max_length: 200 }
        });

        const options = optionsResponse.generated_text
          .split('\n')
          .filter(option => option.trim() !== '')
          .slice(0, 4);

        return {
          skill,
          level,
          question: questionResponse.generated_text,
          options: options,
          correctAnswer: options[0]
        };
      } catch (error) {
        console.error(`Error generating test for ${skill}:`, error);
        return null;
      }
    })
  );

  return generatedQuestions.filter(q => q !== null);
}

// Main Page Component
export default function SkillTestPage() {
  const [currentStep, setCurrentStep] = useState('skills-selection');
  const [selectedSkills, setSelectedSkills] = useState({});
  const [generatedTest, setGeneratedTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hf = new HfInference("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");

  const handleSkillsSelected = async (skills) => {
    setSelectedSkills(skills);
    setLoading(true);
    setError("");
    try {
      const test = await generateSkillTest(hf, skills);
      setGeneratedTest(test);
      setCurrentStep('test-preview');
    } catch (err) {
      console.error("Error generating test:", err);
      setError("Failed to generate test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  switch (currentStep) {
    case 'skills-selection':
      return (
        <SkillSelection 
          onSkillsSelected={handleSkillsSelected}
          loading={loading}
          error={error}
        />
      );

    case 'test-preview':
      return (
        <SkillTestPreview 
          selectedSkills={selectedSkills}
          generatedTest={generatedTest}
          onStartTest={() => setCurrentStep('test')}
          onBack={() => setCurrentStep('skills-selection')}
        />
      );

    case 'test':
      return (
        <SkillTest 
          generatedTest={generatedTest}
          onComplete={() => setCurrentStep('skills-selection')} 
        />
      );

    default:
      return null;
  }
}

// Skill Selection Component
function SkillSelection({ onSkillsSelected, loading, error }) {
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

  const handleSubmit = () => {
    if (Object.keys(selectedSkills).length > 0) {
      onSkillsSelected(selectedSkills);
    }
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
          <button
            className={`mt-4 px-4 py-2 rounded w-full transition ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Generating Test...' : 'Continue to Test'}
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
}

// Skill Test Preview Component
function SkillTestPreview({ generatedTest, onStartTest, onBack }) {
  if (!generatedTest || generatedTest.length === 0) {
    return (
      <div className="min-h-screen bg-white p-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-5 text-black">No Test Generated</h1>
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          onClick={onBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-black">Test Preview</h1>
      
      <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-black">AI Generated Test</h2>
        
        <div className="space-y-4">
          {generatedTest.map((testItem) => (
            <div 
              key={testItem.skill} 
              className="bg-white border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-medium text-black">{testItem.skill}</h3>
                <p className="text-gray-600">Level: {testItem.level}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-semibold text-black mb-2">Test Details</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Total Skills: {generatedTest.length}</li>
            <li>Questions per Skill: 1</li>
            <li>Total Questions: {generatedTest.length}</li>
          </ul>
        </div>

        <div className="mt-6 flex space-x-4">
          <button 
            className="w-full bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-400 transition"
            onClick={onBack}
          >
            Back to Skills
          </button>
          <button 
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            onClick={onStartTest}
          >
            Start AI Generated Test
          </button>
        </div>
      </div>
    </div>
  );
}

// Skill Test Component
function SkillTest({ generatedTest, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === generatedTest[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestionIndex < generatedTest.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setTestCompleted(true);
    }
  };

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-white p-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-5 text-black">Test Completed!</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p className="text-xl text-black mb-4">
            Your Total Score: {score} / {generatedTest.length}
          </p>
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            onClick={onComplete}
          >
            Next Step to Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5 text-black">
        Skill Test: {generatedTest[currentQuestionIndex].skill}
      </h1>
      
      <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="mb-4 text-black">
          <p className="text-xl font-semibold">
            Question {currentQuestionIndex + 1} of {generatedTest.length}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium text-black mb-4">
            {generatedTest[currentQuestionIndex].question}
          </h2>
          
          <div className="grid gap-3">
            {generatedTest[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                className={`
                  w-full p-3 text-left rounded-lg transition
                  ${selectedAnswer === option 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-black border hover:bg-gray-100'}
                `}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`
            w-full p-3 rounded-lg transition
            ${selectedAnswer 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex < generatedTest.length - 1 ? 'Next Question' : 'Finish Test'}
        </button>
      </div>
    </div>
  );
}