// pages/mock-test/index.js
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { questions as qdata } from "./qdata";
import { questions as qdatatwo } from "./qdatatwo";
import { questions as qdatathree } from "./qdatathree";
import { questions as qdatafour } from "./qdatafour";
import { questions as qdatafive } from "./qdatafive";

// Define available question sets
const questionSets = [
  { id: "set1", name: "Set 1", questions: qdata },
  { id: "set2", name: "Set 2", questions: qdatatwo },
  { id: "set3", name: "Set 3", questions: qdatathree },
  { id: "set4", name: "Set 4", questions: qdatafour },
  { id: "set5", name: "Set 5", questions: qdatafive },
];

const MockTest = () => {
  const [selectedSet, setSelectedSet] = useState(questionSets[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questionSets[0].questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(5400);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [result, setResult] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  // Update selectedAnswers and reset explanation visibility when question set changes
  useEffect(() => {
    setSelectedAnswers(Array(selectedSet.questions.length).fill(null));
    setFlaggedQuestions([]);
    setCurrentQuestionIndex(0);
    setExpandedSection(null);
    setIsExplanationVisible(false);
  }, [selectedSet]);

  // Reset explanation visibility when navigating to a new question
  useEffect(() => {
    setIsExplanationVisible(false);
  }, [currentQuestionIndex]);

  // Group questions by section (domain)
  const groupQuestionsBySection = () => {
    const sections = {};
    selectedSet.questions.forEach((question, index) => {
      const domain = question.domain || "Uncategorized";
      if (!sections[domain]) {
        sections[domain] = [];
      }
      sections[domain].push({ question, index });
    });
    return sections;
  };

  const sections = groupQuestionsBySection();

  const isSectionCompleted = (sectionQuestions) => {
    return sectionQuestions.every(
      ({ index }) => selectedAnswers[index] !== null
    );
  };

  const currentSection =
    selectedSet.questions[currentQuestionIndex].domain || "Uncategorized";

  // Timer effect with auto-submit
  useEffect(() => {
    if (!isTestStarted || timeLeft <= 0) {
      if (timeLeft <= 0 && isTestStarted && !isSubmitting) {
        console.log("Time is up! Auto-submitting...");
        handleSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestStarted, timeLeft, isSubmitting]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const allQuestionsAnswered = () => {
    return selectedAnswers.every((answer) => answer !== null);
  };

  const handleQuestionNavigation = (index) => {
    const targetSection =
      selectedSet.questions[index].domain || "Uncategorized";
    if (expandedSection && targetSection !== expandedSection) {
      setExpandedSection(null);
    }
    setCurrentQuestionIndex(index);
  };

  const toggleFlagQuestion = (questionId) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter((id) => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };

  const calculateScore = () => {
    let overallScore = 0;
    const domainPerformance = {};

    Object.keys(sections).forEach((domain) => {
      domainPerformance[domain] = {
        total: sections[domain].length,
        correct: 0,
        incorrect: 0,
        percentage: 0,
      };
    });

    selectedSet.questions.forEach((question, index) => {
      const domain = question.domain || "Uncategorized";
      if (selectedAnswers[index] === question.correctAnswer) {
        overallScore += 1;
        domainPerformance[domain].correct += 1;
      } else if (
        selectedAnswers[index] !== null &&
        selectedAnswers[index] !== question.correctAnswer
      ) {
        overallScore -= 0.25;
        domainPerformance[domain].incorrect += 1;
      }
    });

    Object.keys(domainPerformance).forEach((domain) => {
      const { correct, total } = domainPerformance[domain];
      domainPerformance[domain].percentage = ((correct / total) * 100).toFixed(2);
    });

    return {
      overallScore: Math.max(0, overallScore),
      domainPerformance,
    };
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      const { overallScore, domainPerformance } = calculateScore();
      const percentage = (overallScore / selectedSet.questions.length) * 100;
      const passed = percentage >= 60;

      setResult({
        score: overallScore.toFixed(2),
        total: selectedSet.questions.length,
        correct: Math.round(overallScore),
        incorrect: selectedSet.questions.length - Math.round(overallScore),
        percentage: percentage.toFixed(2),
        passed: passed,
        domains: domainPerformance,
      });
      setShowResultModal(true);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startTest = () => {
    console.log(`Starting test with ${selectedSet.name}...`);
    setIsTestStarted(true);
  };

  const closeModal = () => {
    setShowResultModal(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(selectedSet.questions.length).fill(null));
    setTimeLeft(5400);
    setIsTestStarted(false);
    setFlaggedQuestions([]);
    setResult(null);
    setExpandedSection(null);
    setIsExplanationVisible(false);
  };

  const handleSectionCardClick = (domain) => {
    if (expandedSection === domain) {
      setExpandedSection(null);
    } else {
      setExpandedSection(domain);
      handleQuestionNavigation(sections[domain][0].index);
    }
  };

  const toggleExplanationVisibility = () => {
    setIsExplanationVisible((prev) => !prev);
  };

  if (!isTestStarted) {
    return (
      <div className="min-h-screen small bg-[#CDAD68] flex items-center justify-center p-6">
        <Head>
          <title>NFAT Mock Test - Instructions</title>
        </Head>
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              NFAT MBA Cyber Security Mock Test
            </h1>
            <p className="text-lg text-gray-600">
              Designed for Srishti Meena
            </p>
          </div>

          {/* Question Set Selector */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Select Question Set
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {questionSets.map((set) => (
                <button
                  key={set.id}
                  onClick={() => setSelectedSet(set)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105
                    ${
                      selectedSet.id === set.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {set.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Test Instructions
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-medium">Total Questions:</span>{" "}
                  {selectedSet.questions.length}
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-medium">Time Limit:</span> 90 minutes
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-medium">Marking Scheme:</span> +1 for
                  correct answer, -0.25 for incorrect answer
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-medium">Passing Score:</span> 60% (
                  {Math.ceil(selectedSet.questions.length * 0.6)} correct answers)
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startTest}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Start Test Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen small bg-gray-50">
      <Head>
        <title>NFAT Mock Test - Question {currentQuestionIndex + 1}</title>
      </Head>

      {/* Warning Strip */}
      <div className="bg-red-600 text-white text-center py-2">
        <p className="font-medium">
          Warning: Do not refresh the page. Your progress will be lost if you do.
        </p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            NFAT Mock Test - {selectedSet.name}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium text-blue-800">
                {formatTime(timeLeft)}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md transition flex items-center 
                ${
                  allQuestionsAnswered()
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
                ${isSubmitting ? "opacity-50" : ""}
              `}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Submit Test
                </>
              )}
            </button>
          </div>
        </div>
      </header>
      <div
        className={`max-w-7xl mx-auto px-4 py-2 ${
          allQuestionsAnswered() ? "bg-green-100" : "bg-yellow-100"
        }`}
      >
        <p className="text-center text-sm font-medium">
          {allQuestionsAnswered()
            ? "All questions answered - Ready to submit!"
            : `${
                selectedSet.questions.length -
                selectedAnswers.filter((a) => a !== null).length
              } questions remaining`}
        </p>
      </div>

      {/* Result Modal */}
      {showResultModal && result && (
        <div className="fixed inset-0 scrollbar-hide bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl scrollbar-hide p-8 max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Test Results - {selectedSet.name}
            </h2>

            {/* Overall Result */}
            <div className="grid grid-cols-2 scrollbar-hide gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-1">Score</h3>
                <p className="text-2xl font-bold">
                  {result.score} <span className="text-lg">/ {result.total}</span>
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-1">Percentage</h3>
                <p className="text-2xl font-bold">
                  {result.percentage}%
                  <span
                    className={`ml-2 text-lg ${
                      result.passed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ({result.passed ? "Passed" : "Failed"})
                  </span>
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 mb-1">
                  Correct Answers
                </h3>
                <p className="text-2xl font-bold">{result.correct}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-medium text-red-800 mb-1">
                  Incorrect Answers
                </h3>
                <p className="text-2xl font-bold">{result.incorrect}</p>
              </div>
            </div>

            {/* Domain-wise Performance */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Domain-wise Performance
              </h3>
              <div className="space-y-4">
                {Object.keys(sections).map((domain) => {
                  const domainQuestions = sections[domain];
                  const totalQuestions = domainQuestions.length;
                  const correctAnswers = domainQuestions.filter(
                    ({ index }) =>
                      selectedAnswers[index] ===
                      selectedSet.questions[index].correctAnswer
                  ).length;
                  const incorrectAnswers = domainQuestions.filter(
                    ({ index }) =>
                      selectedAnswers[index] !== null &&
                      selectedAnswers[index] !==
                        selectedSet.questions[index].correctAnswer
                  ).length;
                  const unanswered =
                    totalQuestions - correctAnswers - incorrectAnswers;
                  const percentage = Math.round(
                    (correctAnswers / totalQuestions) * 100
                  );

                  return (
                    <div key={domain} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">{domain}</h4>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            percentage >= 60
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {percentage}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Correct: {correctAnswers}</span>
                        <span>Incorrect: {incorrectAnswers}</span>
                        <span>Unanswered: {unanswered}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            percentage >= 60 ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Detailed Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total Questions</span>
                  <span className="font-medium">{result.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Attempted Questions</span>
                  <span className="font-medium">
                    {result.correct + result.incorrect}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Unattempted Questions</span>
                  <span className="font-medium">
                    {result.total - result.correct - result.incorrect}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Marks Obtained</span>
                  <span className="font-medium">{result.score}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Negative Marks</span>
                  <span className="font-medium">
                    -{(result.incorrect * 0.25).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Question Navigation Panel */}
          <div className="lg:w-1/4 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg mb-4 text-gray-800">
              Question Navigation
            </h2>
            <div className="space-y-4">
              {Object.keys(sections).map((domain) => {
                const isCurrentSection = domain === currentSection;
                const isCompleted = isSectionCompleted(sections[domain]);
                const isExpanded = expandedSection === domain;

                if (isCompleted && !isExpanded) {
                  return (
                    <div
                      key={domain}
                      className="p-3 bg-green-50 border border-green-200 rounded-md cursor-pointer hover:bg-green-100 transition"
                      onClick={() => handleSectionCardClick(domain)}
                    >
                      <h3 className="text-sm font-medium text-green-800">
                        {domain} (Completed)
                      </h3>
                    </div>
                  );
                } else if (isCurrentSection || isExpanded) {
                  return (
                    <div key={domain} className="mb-4">
                      <h3
                        className="text-sm font-medium text-gray-700 mb-2 cursor-pointer hover:text-gray-900"
                        onClick={() => {
                          if (isCompleted) {
                            handleSectionCardClick(domain);
                          }
                        }}
                      >
                        {domain} {isCompleted ? "(Completed)" : ""}
                      </h3>
                      <div className="grid grid-cols-5 gap-2">
                        {sections[domain].map(
                          ({ question, index }, sectionIndex) => (
                            <button
                              key={question.id}
                              onClick={() => handleQuestionNavigation(index)}
                              className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium
                                ${
                                  currentQuestionIndex === index
                                    ? "bg-blue-600 text-white"
                                    : ""
                                }
                                ${
                                  selectedAnswers[index] !== null
                                    ? "bg-green-100 text-green-800"
                                    : ""
                                }
                                ${
                                  flaggedQuestions.includes(question.id)
                                    ? "bg-yellow-100 text-yellow-800"
                                    : ""
                                }
                                ${
                                  currentQuestionIndex !== index &&
                                  selectedAnswers[index] === null
                                    ? "bg-gray-100 text-gray-800"
                                    : ""
                                }
                                hover:bg-blue-100 hover:text-blue-800 transition
                              `}
                            >
                              {sectionIndex + 1}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-blue-600 mr-2"></div>
                <span className="text-sm text-gray-600">Current Question</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-green-100 mr-2"></div>
                <span className="text-sm text-gray-600">Answered</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-yellow-100 mr-2"></div>
                <span className="text-sm text-gray-600">Flagged</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-gray-100 mr-2"></div>
                <span className="text-sm text-gray-600">Unanswered</span>
              </div>
            </div>
          </div>

          {/* Question Panel */}
          <div className="lg:w-2/4 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {selectedSet.questions[currentQuestionIndex].domain}
              </span>
              <button
                onClick={() =>
                  toggleFlagQuestion(selectedSet.questions[currentQuestionIndex].id)
                }
                className={`flex items-center text-sm ${
                  flaggedQuestions.includes(
                    selectedSet.questions[currentQuestionIndex].id
                  )
                    ? "text-yellow-600"
                    : "text-gray-500"
                } hover:text-yellow-600`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                {flaggedQuestions.includes(
                  selectedSet.questions[currentQuestionIndex].id
                )
                  ? "Flagged"
                  : "Flag"}
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="text-gray-700">
                {selectedSet.questions[currentQuestionIndex].question}
              </p>
            </div>

            <div className="space-y-3">
              {selectedSet.questions[currentQuestionIndex].options.map(
                (option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 border rounded-lg cursor-pointer transition
                    ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }
                  `}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border mr-3 flex-shrink-0 flex items-center justify-center
                      ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }
                    `}
                      >
                        {selectedAnswers[currentQuestionIndex] === index && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition flex items-center disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(selectedSet.questions.length - 1, prev + 1)
                  )
                }
                disabled={currentQuestionIndex === selectedSet.questions.length - 1}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition flex items-center disabled:opacity-50"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Explanation Panel */}
          <div className="lg:w-1/4 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg mb-4 text-gray-800">
              Explanation
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-blue-800 mb-2">Current Status</h3>
              <p className="text-gray-700">
                {selectedAnswers[currentQuestionIndex] !== null
                  ? "You have answered this question"
                  : "You have not answered this question yet"}
              </p>
            </div>
            <div
              className="bg-yellow-50 p-4 rounded-lg cursor-pointer hover:bg-yellow-100 transition"
              onClick={toggleExplanationVisibility}
            >
              <h3 className="font-medium text-yellow-800 mb-2">
                {isExplanationVisible ? "Hide Hint" : "Show Hint"}
              </h3>
              {isExplanationVisible && (
                <p className="text-gray-700">
                  {selectedSet.questions[currentQuestionIndex].explanation ||
                    "Explanation will appear here after you submit the test."}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MockTest;