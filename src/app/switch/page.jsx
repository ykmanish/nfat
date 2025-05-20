'use client';
import { useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function ProgramComparison() {
  // Program data
  const programs = {
    homeland: {
      name: "M.Sc. Homeland Security",
      school: "School of Police Science & Security Studies",
      duration: "2 Years",
      intake: "No NFAT (Direct Admission)",
      focus: ["National Security", "Law Enforcement", "Counterterrorism", "Disaster Management"],
      careerPaths: [
        "Government Security Agencies",
        "Intelligence Analyst",
        "Border Security Specialist",
        "Critical Infrastructure Protection",
        "Security Consultant"
      ],
      avgPackage: "₹6-8 LPA (Govt), ₹8-12 LPA (Private)",
      growth: "Steady in government sector, 15-20% in private security"
    },
    mbaCyber: {
      name: "MBA Cyber Security Management",
      school: "School of Management Studies",
      duration: "2 Years",
      intake: "15 seats (Through NFAT)",
      focus: ["Cyber Risk Management", "Digital Forensics", "Security Governance", "Business Administration"],
      careerPaths: [
        "Cyber Security Manager",
        "Chief Information Security Officer (CISO)",
        "Security Consultant",
        "Risk Analyst",
        "Security Auditor"
      ],
      avgPackage: "₹10-15 LPA (Entry), ₹20-30 LPA (Experienced)",
      growth: "25-30% annually due to digital transformation"
    }
  };

  // Comparison metrics
  const comparisonData = {
    labels: ['Government Opportunities', 'Private Sector Demand', 'Starting Salary', 'Career Growth', 'Technical Depth', 'Management Focus'],
    datasets: [
      {
        label: 'M.Sc. Homeland Security',
        data: [90, 60, 70, 75, 80, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)'
      },
      {
        label: 'MBA Cyber Security',
        data: [30, 95, 85, 90, 75, 95],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };

  const [activeTab, setActiveTab] = useState('comparison');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">NFSU Program Comparison</h1>
          <h2 className="text-xl text-indigo-600">M.Sc. Homeland Security vs MBA Cyber Security Management</h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-4 px-6 font-medium ${activeTab === 'comparison' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('comparison')}
          >
            Head-to-Head Comparison
          </button>
          <button
            className={`py-4 px-6 font-medium ${activeTab === 'homeland' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('homeland')}
          >
            M.Sc. Homeland Security
          </button>
          <button
            className={`py-4 px-6 font-medium ${activeTab === 'mbaCyber' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('mbaCyber')}
          >
            MBA Cyber Security
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'comparison' && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-6">Program Comparison Matrix</h3>
            <div className="h-96 mb-8">
              <Radar
                data={comparisonData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      angleLines: {
                        display: true
                      },
                      suggestedMin: 0,
                      suggestedMax: 100
                    }
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-indigo-700">M.Sc. Homeland Security Advantages</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Direct admission without entrance test</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Strong government sector placement (RAW, IB, NSG, BSF)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Broad coverage of national security aspects</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Job stability in government positions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 text-indigo-700">MBA Cyber Security Advantages</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Higher earning potential in private sector</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Faster career growth in corporate sector</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Management focus with technical specialization</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Global opportunities in cybersecurity</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-4 text-blue-800">Career Decision Guide</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                  <h5 className="font-semibold mb-2">Choose M.Sc. Homeland Security if:</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>You aspire for government security agencies</li>
                    <li>National security interests you more than corporate security</li>
                    <li>You prefer stable government jobs over high-growth private jobs</li>
                    <li>You want to work in policy-making or law enforcement</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h5 className="font-semibold mb-2">Choose MBA Cyber Security if:</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>You aim for corporate leadership roles in cybersecurity</li>
                    <li>Higher earning potential is important to you</li>
                    <li>You want flexibility to work globally</li>
                    <li>You're interested in both management and technical aspects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'homeland' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{programs.homeland.name}</h3>
            <p className="text-indigo-600 mb-6">{programs.homeland.school}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-3 border-b pb-2">Program Highlights</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span><strong>Duration:</strong> {programs.homeland.duration}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span><strong>Admission:</strong> {programs.homeland.intake}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span><strong>Focus Areas:</strong> {programs.homeland.focus.join(", ")}</span>
                  </li>
                </ul>

                <h4 className="font-bold text-lg mt-6 mb-3 border-b pb-2">Career Paths</h4>
                <ul className="space-y-2">
                  {programs.homeland.careerPaths.map((path, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{path}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3 border-b pb-2">Salary & Growth</h4>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold text-blue-800">Average Package: {programs.homeland.avgPackage}</p>
                  <p className="text-sm mt-1">(Government salaries follow pay commissions, private sector pays higher)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-green-800">Growth Potential: {programs.homeland.growth}</p>
                  <p className="text-sm mt-1">(Growing demand in private security consulting)</p>
                </div>

                <h4 className="font-bold text-lg mt-6 mb-3 border-b pb-2">Top Recruiters</h4>
                <div className="flex flex-wrap gap-2">
                  {["NSG", "RAW", "IB", "BSF", "CISF", "State Police", "Private Security Firms"].map((recruiter, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {recruiter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mbaCyber' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{programs.mbaCyber.name}</h3>
            <p className="text-indigo-600 mb-6">{programs.mbaCyber.school}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-3 border-b pb-2">Program Highlights</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span><strong>Duration:</strong> {programs.mbaCyber.duration}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span><strong>Admission:</strong> {programs.mbaCyber.intake}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span><strong>Focus Areas:</strong> {programs.mbaCyber.focus.join(", ")}</span>
                  </li>
                </ul>

                <h4 className="font-bold text-lg mt-6 mb-3 border-b pb-2">Career Paths</h4>
                <ul className="space-y-2">
                  {programs.mbaCyber.careerPaths.map((path, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{path}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3 border-b pb-2">Salary & Growth</h4>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold text-blue-800">Average Package: {programs.mbaCyber.avgPackage}</p>
                  <p className="text-sm mt-1">(CISOs in large companies can earn ₹50LPA+)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-green-800">Growth Potential: {programs.mbaCyber.growth}</p>
                  <p className="text-sm mt-1">(Global shortage of 3.4 million cybersecurity professionals)</p>
                </div>

                <h4 className="font-bold text-lg mt-6 mb-3 border-b pb-2">Top Recruiters</h4>
                <div className="flex flex-wrap gap-2">
                  {["Deloitte", "PwC", "KPMG", "EY", "TCS", "Wipro", "IBM", "Microsoft", "Amazon", "Zscaler"].map((recruiter, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {recruiter}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Final Recommendation</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  <strong>For maximum career opportunities:</strong> The MBA in Cyber Security Management offers better long-term prospects with higher earning potential and global opportunities. The management focus combined with technical specialization creates unique career paths in the rapidly growing cybersecurity field.
                </p>
                <p className="mt-2">
                  <strong>Choose Homeland Security if:</strong> You're passionate about national security and prefer government service. While salaries may start lower, the job security and pension benefits are attractive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}