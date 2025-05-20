'use client'
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function NFATAdmissionProbability() {
  // Given data
  const totalRegistered = 435;
  const totalAppeared = 275;
  const totalSeats = 15; // Updated to 15 seats
  const totalQuestions = 100;
  const qualifyingMark = 60;
  const programs = [
    "Business Analytics",
    "Cyber Security",
    "Forensic Accounting",
    "Hospital Management"
  ];

  // State for assumptions
  const [appearedDistribution, setAppearedDistribution] = useState([68.75, 68.75, 68.75, 68.75]); // 275/4
  const [passRate, setPassRate] = useState(60); // Percentage of students who score >= 60

  // Calculate probabilities
  const calculateProbabilities = () => {
    // Estimated number of students appearing for Cyber Security
    const cyberAppeared = appearedDistribution[1];
    
    // Estimated number of students who will qualify (score >= 60)
    const cyberQualified = Math.round(cyberAppeared * (passRate / 100));
    
    // Admission probability (min of 100%)
    const probability = cyberQualified > 0 
      ? Math.min(100, (totalSeats / cyberQualified) * 100)
      : 0;
    
    return {
      cyberAppeared,
      cyberQualified,
      probability: probability.toFixed(2)
    };
  };

  const results = calculateProbabilities();

  // Charts data
  const registrationData = {
    labels: ['Registered', 'Appeared'],
    datasets: [
      {
        label: 'Students',
        data: [totalRegistered, totalAppeared],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const programDistributionData = {
    labels: programs,
    datasets: [
      {
        label: 'Estimated Appeared Students',
        data: appearedDistribution,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const admissionData = {
    labels: ['Seats Available', 'Estimated Qualified Students'],
    datasets: [
      {
        label: 'Admission Ratio',
        data: [totalSeats, results.cyberQualified],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">NFAT 2025 Admission Probability</h1>
          <h2 className="text-xl text-indigo-600">MBA Cyber Security Management (15 seats)</h2>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Seats</h3>
            <p className="text-3xl font-bold text-indigo-600">{totalSeats}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Estimated Appeared</h3>
            <p className="text-3xl font-bold text-indigo-600">{results.cyberAppeared}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Admission Probability</h3>
            <p className="text-3xl font-bold text-indigo-600">{results.probability}%</p>
          </div>
        </div>

        {/* Registration vs Appeared */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Registration vs Appeared Students</h3>
          <div className="h-64">
            <Bar
              data={registrationData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Students'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Program Distribution */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Estimated Appeared Students by Program</h3>
          <div className="h-64">
            <Pie
              data={programDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right'
                  }
                }
              }}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="distribution" className="block text-sm font-medium text-gray-700">
              Adjust Cyber Security Appeared Students
            </label>
            <input
              type="range"
              id="distribution"
              min="1"
              max="150"
              value={appearedDistribution[1]}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                const newDistribution = [...appearedDistribution];
                newDistribution[1] = newValue;
                setAppearedDistribution(newDistribution);
              }}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>75</span>
              <span>150</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Currently: {appearedDistribution[1]} students
            </p>
          </div>
        </div>

        {/* Pass Rate Adjustment */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Qualification Rate</h3>
          <p className="text-sm text-gray-600 mb-4">
            Percentage of students who score ≥{qualifyingMark}/{totalQuestions}
          </p>
          <div>
            <label htmlFor="passRate" className="block text-sm font-medium text-gray-700">
              Pass Rate: {passRate}%
            </label>
            <input
              type="range"
              id="passRate"
              min="10"
              max="100"
              value={passRate}
              onChange={(e) => setPassRate(parseInt(e.target.value))}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10%</span>
              <span>55%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Admission Probability */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Admission Probability Breakdown</h3>
          <div className="h-64">
            <Bar
              data={admissionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Students'
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-800">Competition Ratio</h4>
              <p className="text-2xl font-bold text-indigo-600">
                1 seat : {(results.cyberQualified / totalSeats).toFixed(1)} applicants
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800">Your Admission Chance</h4>
              <p className="text-2xl font-bold text-green-600">
                {results.probability}%
              </p>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Important Notes</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Actual probability may vary based on program popularity</li>
                  <li>This assumes all qualified students accept the offer</li>
                  <li>With {results.cyberQualified} qualified applicants for {totalSeats} seats, competition is intense</li>
                  <li>Aim to score significantly above the 60 mark minimum</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}