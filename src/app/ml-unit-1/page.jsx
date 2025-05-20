'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Chart as ChartJS, CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { Bar, Line, Scatter, Pie } from 'react-chartjs-2';
import { Tab } from '@headlessui/react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

// gsap.registerPlugin(ScrollTrigger);

const MachineLearningVisualization = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP animations for the main container
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });

    // ScrollTrigger animations for sections
    gsap.utils.toArray(".concept-section").forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8
      });
    });
  }, []);

  // Data for visualizations
  const mlGrowthData = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'ML Research Papers Published',
        data: [1200, 1800, 2500, 3500, 5000, 7500, 10000, 14000, 18000],
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
      }
    ]
  };

  const mlTypesData = {
    labels: ['Supervised', 'Unsupervised', 'Semi-supervised', 'Reinforcement'],
    datasets: [
      {
        label: 'Usage Percentage',
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(129, 140, 248, 0.7)',
          'rgba(165, 180, 252, 0.7)'
        ],
      }
    ]
  };

  const linearRegressionData = {
    datasets: [{
      label: 'Linear Regression Example',
      data: [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 4.5 },
        { x: 4, y: 5.5 },
        { x: 5, y: 7 },
        { x: 6, y: 8.5 },
        { x: 7, y: 9.5 },
        { x: 8, y: 11 }
      ],
      backgroundColor: 'rgba(79, 70, 229, 0.6)',
      showLine: true
    }]
  };

  const clusteringData = {
    datasets: [
      {
        label: 'Cluster 1',
        data: [
          { x: 1, y: 2 },
          { x: 1.5, y: 2.5 },
          { x: 1.2, y: 2.1 },
          { x: 1.7, y: 2.8 }
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Cluster 2',
        data: [
          { x: 5, y: 6 },
          { x: 5.5, y: 6.5 },
          { x: 5.2, y: 6.1 },
          { x: 5.7, y: 6.8 }
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Cluster 3',
        data: [
          { x: 3, y: 8 },
          { x: 3.5, y: 8.5 },
          { x: 3.2, y: 8.1 },
          { x: 3.7, y: 8.8 }
        ],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      }
    ]
  };

  const aiVsMlData = {
    labels: ['Adaptability', 'Decision Making', 'Pattern Recognition', 'Learning Ability'],
    datasets: [
      {
        label: 'Traditional AI',
        data: [40, 70, 50, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Machine Learning',
        data: [80, 60, 90, 85],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ]
  };

  const issuesImpactData = {
    labels: ['Bias', 'Overfitting', 'Data Privacy', 'Computational Cost'],
    datasets: [
      {
        label: 'Impact on ML Systems (%)',
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
           <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
           Machine Learning - Unit 1
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-sm text-gray-500">
            Specially Designed for Sri
          </p>
        </motion.div>

        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1 mb-12 w-fit mx-auto flex-wrap">
            {['Overview', 'Applications', 'Types', 'Concepts', 'Examples', 'AI vs ML', 'Issues'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full sm:w-auto rounded-lg py-2.5 px-4 text-sm font-medium leading-5 text-indigo-700
                   ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2
                   ${selected
                    ? 'bg-white shadow'
                    : 'text-indigo-100 hover:bg-white/[0.12] hover:text-white'
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>

        {/* Overview Section */}
        <div className={`concept-section ${activeTab !== 0 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Machine Learning?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-semibold text-indigo-600">Simple Definition:</span> Machine Learning is a branch of AI that enables computers to learn from data and improve their performance without being explicitly programmed.
                </p>
                
                <p className="text-lg text-gray-600 mb-6">
                  <span className="font-semibold text-indigo-600">Real-life Example:</span> When Netflix recommends shows you might like, it's using machine learning. The system learns from your viewing history and compares it with millions of other users to predict what you'll enjoy next.
                </p>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                  <h3 className="font-semibold text-indigo-800 mb-2">Key Characteristics:</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-1">Learns patterns from data</li>
                    <li className="mb-1">Improves with more data</li>
                    <li className="mb-1">Makes predictions or decisions</li>
                    <li>Adapts to new information</li>
                  </ul>
                </div>
              </div>
              
              <div className="h-64 md:h-80">
                <Line 
                  data={mlGrowthData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Growth of Machine Learning (Research Papers Published)',
                        font: { size: 16 }
                      },
                    },
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Applications Section */}
        <div className={`concept-section ${activeTab !== 1 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications of Machine Learning</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Healthcare",
                  description: "Disease detection from medical images, drug discovery",
                  example: "AI detecting tumors in X-rays more accurately than some radiologists",
                  icon: "🩺"
                },
                {
                  title: "Finance",
                  description: "Fraud detection, algorithmic trading",
                  example: "Credit card companies spotting fraudulent transactions in real-time",
                  icon: "💳"
                },
                {
                  title: "Retail",
                  description: "Recommendation systems, demand forecasting",
                  example: "Amazon's product recommendations based on your browsing history",
                  icon: "🛒"
                },
                {
                  title: "Transportation",
                  description: "Self-driving cars, route optimization",
                  example: "Tesla's Autopilot navigating complex road conditions",
                  icon: "🚗"
                },
                {
                  title: "Entertainment",
                  description: "Content recommendation, game AI",
                  example: "Spotify's Discover Weekly playlist tailored to your taste",
                  icon: "🎵"
                },
                {
                  title: "Manufacturing",
                  description: "Predictive maintenance, quality control",
                  example: "Factories predicting when machines need maintenance before they fail",
                  icon: "🏭"
                }
              ].map((app, index) => (
                <motion.div
                  key={app.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-3">{app.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{app.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{app.description}</p>
                  <p className="text-gray-500 text-xs italic">Example: {app.example}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Types of ML Section */}
        <div className={`concept-section ${activeTab !== 2 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Machine Learning</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="h-64 md:h-80">
                <Pie 
                  data={mlTypesData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Distribution of ML Types in Industry',
                        font: { size: 16 }
                      },
                    },
                  }}
                />
              </div>
              
              <div>
                <p className="text-lg text-gray-600 mb-6">
                  Machine learning can be categorized based on how the algorithm learns from data. The four main types each have distinct approaches and use cases.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  type: "Supervised Learning",
                  definition: "The algorithm learns from labeled training data, and predicts outcomes for unseen data",
                  example: "Spam filters learning from emails marked as spam/not spam",
                  visualization: (
                    <div className="h-48 mt-4">
                      <Scatter 
                        data={linearRegressionData}
                        options={{
                          scales: {
                            x: { title: { display: true, text: 'Input Feature' } },
                            y: { title: { display: true, text: 'Output Label' } }
                          },
                          plugins: {
                            title: {
                              display: true,
                              text: 'Supervised Learning: Predicts outputs from inputs',
                              font: { size: 14 }
                            },
                          },
                        }}
                      />
                    </div>
                  )
                },
                {
                  type: "Unsupervised Learning",
                  definition: "The algorithm finds hidden patterns or groupings in unlabeled data",
                  example: "Customer segmentation for marketing without predefined categories",
                  visualization: (
                    <div className="h-48 mt-4">
                      <Scatter 
                        data={clusteringData}
                        options={{
                          scales: {
                            x: { title: { display: true, text: 'Feature 1' } },
                            y: { title: { display: true, text: 'Feature 2' } }
                          },
                          plugins: {
                            title: {
                              display: true,
                              text: 'Unsupervised Learning: Finds natural groupings',
                              font: { size: 14 }
                            },
                          },
                        }}
                      />
                    </div>
                  )
                },
                {
                  type: "Semi-supervised Learning",
                  definition: "Uses a small amount of labeled data with a large amount of unlabeled data",
                  example: "Medical image analysis where labeling all images is expensive",
                  visualization: (
                    <div className="h-48 mt-4 bg-gray-100 flex items-center justify-center rounded-lg">
                      <div className="text-center p-4">
                        <div className="flex justify-center space-x-2 mb-3">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full ${i < 3 ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-700">
                          Some labeled (colored) and many unlabeled (gray) data points
                        </p>
                      </div>
                    </div>
                  )
                },
                {
                  type: "Reinforcement Learning",
                  definition: "Learns by interacting with an environment and receiving rewards/penalties",
                  example: "Game AI learning to play chess by trial and error",
                  visualization: (
                    <div className="h-48 mt-4 bg-gray-100 flex items-center justify-center rounded-lg">
                      <div className="text-center p-4">
                        <div className="flex justify-center mb-3">
                          <div className="relative">
                            <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🤖</span>
                            </div>
                            <div className="absolute -right-2 -top-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold">
                              +1
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Agent takes actions and receives rewards from environment
                        </p>
                      </div>
                    </div>
                  )
                }
              ].map((item, index) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2 text-indigo-700">{item.type}</h3>
                  <p className="text-gray-600 mb-3">{item.definition}</p>
                  <p className="text-sm text-gray-500 italic mb-3">Example: {item.example}</p>
                  {item.visualization}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Basic Concepts Section */}
        <div className={`concept-section ${activeTab !== 3 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Concepts in Machine Learning</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Features and Labels</h3>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Features</span> are the input variables used to make predictions. 
                  <span className="font-medium"> Labels</span> are the output variables we want to predict.
                </p>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-2">House Price Prediction Example:</h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Size (sqft)</th>
                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Bedrooms</th>
                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Age (years)</th>
                        <th className="px-2 py-1 text-left text-xs font-medium text-gray-500">Price ($)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-2 py-1 text-sm text-gray-500">1500</td>
                        <td className="px-2 py-1 text-sm text-gray-500">3</td>
                        <td className="px-2 py-1 text-sm text-gray-500">10</td>
                        <td className="px-2 py-1 text-sm font-medium text-indigo-600">300,000</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 text-sm text-gray-500">2100</td>
                        <td className="px-2 py-1 text-sm text-gray-500">4</td>
                        <td className="px-2 py-1 text-sm text-gray-500">5</td>
                        <td className="px-2 py-1 text-sm font-medium text-indigo-600">450,000</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 mt-2">
                    Features (inputs): Size, Bedrooms, Age • Label (output): Price
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Training and Testing</h3>
                <p className="text-gray-600 mb-4">
                  We split data into <span className="font-medium">training set</span> (to teach the model) and 
                  <span className="font-medium"> test set</span> (to evaluate its performance).
                </p>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500" 
                      style={{ width: '70%' }}
                      title="Training Data (70%)"
                    ></div>
                    <div 
                      className="h-full bg-indigo-300" 
                      style={{ width: '30%', marginLeft: '70%' }}
                      title="Test Data (30%)"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Model Evaluation</h3>
                <p className="text-gray-600 mb-4">
                  We use metrics to evaluate how well our model performs. Common metrics include:
                </p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-700">Accuracy</h4>
                    <p className="text-sm text-gray-600">Percentage of correct predictions</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">87% accurate</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Precision & Recall</h4>
                    <p className="text-sm text-gray-600">Important for imbalanced datasets</p>
                    <div className="flex space-x-4 mt-2">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Precision</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Recall</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Loss Function</h4>
                    <p className="text-sm text-gray-600">Measures how far predictions are from actual values</p>
                    <div className="h-32 mt-2">
                      <Line 
                        data={{
                          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                          datasets: [{
                            label: 'Training Loss',
                            data: [2.5, 1.8, 1.2, 0.9, 0.7, 0.6, 0.5, 0.45, 0.43, 0.42],
                            borderColor: 'rgba(79, 70, 229, 0.8)',
                            tension: 0.3
                          }]
                        }}
                        options={{
                          scales: {
                            y: { 
                              min: 0,
                              title: { display: true, text: 'Loss Value' }
                            },
                            x: { 
                              title: { display: true, text: 'Epochs (Training Iterations)' }
                            }
                          },
                          plugins: {
                            legend: { display: false }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Examples Section */}
        <div className={`concept-section ${activeTab !== 4 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Examples of Machine Learning</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Image Recognition</h3>
                <p className="text-gray-600 mb-4">
                  ML models can identify objects, people, and scenes in images with high accuracy.
                </p>
                
                <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">🐱</div>
                      <p className="text-sm font-medium">Cat: 98% confidence</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <p className="text-xs">Input image → Feature extraction → Classification → Output label</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 italic">
                  Real-world use: Facebook auto-tagging photos, medical image analysis, self-driving cars recognizing traffic signs
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Natural Language Processing</h3>
                <p className="text-gray-600 mb-4">
                  ML enables computers to understand, interpret, and generate human language.
                </p>
                
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="bg-white rounded p-3 shadow-inner mb-3">
                    <p className="text-sm text-gray-700">User: "What's the weather today?"</p>
                  </div>
                  <div className="bg-indigo-50 rounded p-3 shadow-inner">
                    <p className="text-sm text-gray-700">Assistant: "Currently 72°F and sunny in your area."</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {['Sentiment Analysis', 'Translation', 'Chatbots', 'Summarization', 'Speech Recognition'].map((task) => (
                    <span key={task} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {task}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Predictive Analytics</h3>
                <p className="text-gray-600 mb-4">
                  ML models forecast future outcomes based on historical data patterns.
                </p>
                
                <div className="h-48">
                  <Line 
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                      datasets: [
                        {
                          label: 'Actual Sales',
                          data: [65, 59, 80, 81, 56, 72, 90, 85, 70],
                          borderColor: 'rgba(79, 70, 229, 0.8)',
                          backgroundColor: 'rgba(79, 70, 229, 0.1)',
                          fill: true
                        },
                        {
                          label: 'Predicted Sales',
                          data: [null, null, null, null, null, null, null, null, 82],
                          borderColor: 'rgba(255, 99, 132, 0.8)',
                          borderDash: [5, 5],
                          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                          pointRadius: 5
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: 'Sales Prediction for Next Month',
                          font: { size: 14 }
                        },
                      },
                    }}
                  />
                </div>
                
                <p className="text-sm text-gray-500 italic mt-2">
                  Real-world use: Stock market prediction, equipment failure forecasting, retail demand planning
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Anomaly Detection</h3>
                <p className="text-gray-600 mb-4">
                  ML identifies unusual patterns that don't conform to expected behavior.
                </p>
                
                <div className="h-48">
                  <Line 
                    data={{
                      labels: Array.from({ length: 30 }, (_, i) => i + 1),
                      datasets: [{
                        label: 'Network Traffic',
                        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 50)
                          .map((val, i) => i === 20 ? 180 : val),
                        borderColor: 'rgba(75, 192, 192, 0.8)',
                        pointBackgroundColor: ctx => 
                          ctx.dataIndex === 20 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 0.8)',
                        pointRadius: ctx => ctx.dataIndex === 20 ? 5 : 2
                      }]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: 'Detecting Network Intrusion Attempt',
                          font: { size: 14 }
                        },
                        annotation: {
                          annotations: {
                            box1: {
                              type: 'box',
                              xMin: 19.5,
                              xMax: 20.5,
                              backgroundColor: 'rgba(255, 99, 132, 0.2)',
                              borderColor: 'rgba(255, 99, 132, 0.8)',
                              borderWidth: 1
                            }
                          }
                        }
                      },
                    }}
                  />
                </div>
                
                <p className="text-sm text-gray-500 italic mt-2">
                  Real-world use: Credit card fraud detection, network security, manufacturing defect identification
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI vs ML Section */}
        <div className={`concept-section ${activeTab !== 5 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">AI vs Machine Learning</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Understanding the Relationship</h3>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Artificial Intelligence (AI)</span> is the broader concept of machines being able to carry out tasks in a way we would consider "smart".
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Machine Learning (ML)</span> is a current application of AI based on the idea that we can give machines access to data and let them learn for themselves.
                </p>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                  <h4 className="font-semibold text-indigo-800 mb-2">Simple Analogy:</h4>
                  <p className="text-gray-700">
                    AI is like the concept of a vehicle. ML is like a specific type of vehicle (e.g., electric car). Deep Learning would be a specific model of that car (e.g., Tesla Model 3).
                  </p>
                </div>
              </div>
              
              <div className="h-64 md:h-80">
                <Bar 
                  data={aiVsMlData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'AI vs ML Capabilities Comparison',
                        font: { size: 16 }
                      },
                    },
                  }}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Traditional AI",
                  description: "Rule-based systems with explicit programming",
                  characteristics: [
                    "Fixed rules and logic",
                    "Doesn't improve with more data",
                    "Good for deterministic tasks",
                    "Limited adaptability"
                  ],
                  examples: [
                    "Chess-playing computer",
                    "Basic chatbots with decision trees",
                    "Expert systems"
                  ]
                },
                {
                  title: "Machine Learning",
                  description: "Learns patterns from data to make decisions",
                  characteristics: [
                    "Improves with more data",
                    "Finds patterns humans might miss",
                    "Adapts to new information",
                    "Requires quality training data"
                  ],
                  examples: [
                    "Recommendation systems",
                    "Image recognition",
                    "Predictive analytics"
                  ]
                },
                {
                  title: "Key Differences",
                  description: "How they approach problem solving",
                  characteristics: [
                    "AI: Follows explicit instructions",
                    "ML: Learns from examples",
                    "AI: Static once programmed",
                    "ML: Continuously improves"
                  ],
                  examples: [
                    "AI: If X then Y",
                    "ML: Given many X→Y examples, predicts Y for new X",
                    "Combined: Most modern AI uses ML"
                  ]
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2 text-indigo-700">{card.title}</h3>
                  <p className="text-gray-600 mb-3">{card.description}</p>
                  
                  <h4 className="font-medium text-sm text-gray-700 mt-4 mb-2">Characteristics:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 mb-4 space-y-1">
                    {card.characteristics.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  
                  <h4 className="font-medium text-sm text-gray-700 mt-4 mb-2">Examples:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    {card.examples.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Perspectives/Issues in Machine Learning Section */}
        <div className={`concept-section ${activeTab !== 6 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Perspectives & Issues in Machine Learning</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Understanding ML Challenges</h3>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Simple Definition:</span> Machine Learning, while powerful, faces challenges like bias, overfitting, data privacy, and computational costs that can impact its effectiveness and ethical use.
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Real-life Example:</span> A facial recognition system misidentifying individuals due to biased training data, leading to unfair outcomes in applications like hiring or law enforcement.
                </p>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                  <h4 className="font-semibold text-indigo-800 mb-2">Key Issues:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-1">Bias in data and models</li>
                    <li className="mb-1">Overfitting to training data</li>
                    <li className="mb-1">Data privacy concerns</li>
                    <li>High computational requirements</li>
                  </ul>
                </div>
              </div>
              
              <div className="h-64 md:h-80">
                <Pie 
                  data={issuesImpactData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Impact of ML Issues on System Performance',
                        font: { size: 16 }
                      },
                    },
                  }}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Bias in ML",
                  description: "Models can inherit biases from training data, leading to unfair outcomes.",
                  example: "A hiring algorithm rejecting candidates based on biased historical hiring data.",
                  visualization: (
                    <div className="h-48 mt-4">
                      <Bar 
                        data={{
                          labels: ['Group A', 'Group B', 'Group C'],
                          datasets: [
                            {
                              label: 'Hiring Success Rate (%)',
                              data: [85, 60, 45],
                              backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            }
                          ]
                        }}
                        options={{
                          scales: {
                            y: { 
                              title: { display: true, text: 'Success Rate (%)' },
                              max: 100
                            }
                          },
                          plugins: {
                            title: {
                              display: true,
                              text: 'Bias in Hiring Algorithm',
                              font: { size: 14 }
                            },
                          },
                        }}
                      />
                    </div>
                  )
                },
                {
                  title: "Overfitting",
                  description: "Model learns training data too well, failing to generalize to new data.",
                  example: "A stock prediction model that perfectly fits past data but fails on future trends.",
                  visualization: (
                    <div className="h-48 mt-4">
                      <Line 
                        data={{
                          labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
                          datasets: [
                            {
                              label: 'Training Data',
                              data: [1, 2, 1.5, 3, 2.5, 4, 3.5, 5],
                              borderColor: 'rgba(79, 70, 229, 0.8)',
                              pointRadius: 5
                            },
                            {
                              label: 'Overfit Model',
                              data: [1, 2, 1.5, 3, 2.5, 4, 3.5, 5],
                              borderColor: 'rgba(255, 99, 132, 0.8)',
                              tension: 0.5
                            },
                            {
                              label: 'Generalized Model',
                              data: [1, 1.8, 2, 2.5, 2.8, 3.2, 3.7, 4],
                              borderColor: 'rgba(75, 192, 192, 0.8)',
                              tension: 0.3
                            }
                          ]
                        }}
                        options={{
                          plugins: {
                            title: {
                              display: true,
                              text: 'Overfitting vs. Generalization',
                              font: { size: 14 }
                            },
                          },
                        }}
                      />
                    </div>
                  )
                },
                {
                  title: "Data Privacy",
                  description: "ML systems using sensitive data raise privacy and ethical concerns.",
                  example: "Health apps collecting user data without clear consent for ML training.",
                  visualization: (
                    <div className="h-48 mt-4 bg-gray-100 flex items-center justify-center rounded-lg">
                      <div className="text-center p-4">
                        <div className="flex justify-center mb-3">
                          <div className="relative">
                            <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🔒</span>
                            </div>
                            <div className="absolute -right-2 -top-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center text-xs font-bold">
                              ⚠
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Sensitive data exposure in ML training
                        </p>
                      </div>
                    </div>
                  )
                },
                {
                  title: "Computational Cost",
                  description: "Training large ML models requires significant computational resources.",
                  example: "Training a large language model requiring thousands of GPUs over weeks.",
                  visualization: (
                    <div className="h-48 mt-4">
                      <Bar 
                        data={{
                          labels: ['Small Model', 'Medium Model', 'Large Model'],
                          datasets: [
                            {
                              label: 'Compute Time (hours)',
                              data: [10, 100, 1000],
                              backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            }
                          ]
                        }}
                        options={{
                          scales: {
                            y: { 
                              title: { display: true, text: 'Compute Time (hours)' },
                              type: 'logarithmic'
                            }
                          },
                          plugins: {
                            title: {
                              display: true,
                              text: 'Compute Requirements by Model Size',
                              font: { size: 14 }
                            },
                          },
                        }}
                      />
                    </div>
                  )
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2 text-indigo-700">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <p className="text-sm text-gray-500 italic mb-3">Example: {item.example}</p>
                  {item.visualization}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MachineLearningVisualization;