'use client'
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Scatter, Bar, Line } from 'react-chartjs-2';
import { Tab } from '@headlessui/react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

// gsap.registerPlugin(ScrollTrigger);

const AdvancedMLConcepts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const [kValue, setKValue] = useState(3);
  const [pcaComponents, setPcaComponents] = useState(2);

  // Generate sample data for visualizations
  const generateClusters = (k) => {
    const clusters = [];
    const colors = [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)'
    ];
    
    for (let i = 0; i < k; i++) {
      const centerX = Math.random() * 10;
      const centerY = Math.random() * 10;
      const points = [];
      
      for (let j = 0; j < 20; j++) {
        points.push({
          x: centerX + (Math.random() * 4 - 2),
          y: centerY + (Math.random() * 4 - 2)
        });
      }
      
      clusters.push({
        label: `Cluster ${i+1}`,
        data: points,
        backgroundColor: colors[i % colors.length]
      });
    }
    
    return { datasets: clusters };
  };

  const generateGaussianMixture = () => {
    return {
      datasets: [
        {
          label: 'Gaussian 1',
          data: Array.from({length: 50}, () => ({
            x: gaussianRandom(3, 1),
            y: gaussianRandom(3, 1)
          })),
          backgroundColor: 'rgba(255, 99, 132, 0.6)'
        },
        {
          label: 'Gaussian 2',
          data: Array.from({length: 50}, () => ({
            x: gaussianRandom(7, 1.2),
            y: gaussianRandom(7, 1.2)
          })),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        },
        {
          label: 'Gaussian 3',
          data: Array.from({length: 50}, () => ({
            x: gaussianRandom(5, 0.8),
            y: gaussianRandom(8, 0.8)
          })),
          backgroundColor: 'rgba(255, 206, 86, 0.6)'
        }
      ]
    };
  };

  const generateHighDimData = () => {
    return {
      labels: ['1D', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D'],
      datasets: [{
        label: 'Data Sparsity',
        data: [100, 90, 75, 60, 45, 30, 20, 12, 8, 5],
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
      }]
    };
  };

  const generatePCAExample = (components) => {
    const originalData = Array.from({length: 50}, () => ({
      x: Math.random() * 10,
      y: Math.random() * 10 * 0.3 + 0.7 * Math.random() * 10
    }));
    
    // Simulate PCA by projecting onto a line (for visualization)
    const pcaData = originalData.map(point => ({
      x: (point.x + point.y) / 2,
      y: (point.x + point.y) / 2
    }));
    
    return {
      original: {
        datasets: [{
          label: 'Original Data',
          data: originalData,
          backgroundColor: 'rgba(79, 70, 229, 0.6)',
        }]
      },
      pca: {
        datasets: [{
          label: 'PCA Projection',
          data: components === 2 ? originalData : pcaData,
          backgroundColor: components === 2 
            ? 'rgba(79, 70, 229, 0.6)' 
            : 'rgba(239, 68, 68, 0.6)',
        }]
      }
    };
  };

  // Helper function for Gaussian random numbers
  function gaussianRandom(mean=0, stdev=1) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
  }

  // Generate initial data
  const [clusterData, setClusterData] = useState(generateClusters(kValue));
  const [gaussianData, setGaussianData] = useState(generateGaussianMixture());
  const [highDimData, setHighDimData] = useState(generateHighDimData());
  const [pcaData, setPcaData] = useState(generatePCAExample(pcaComponents));

  // Update data when parameters change
  useEffect(() => {
    setClusterData(generateClusters(kValue));
  }, [kValue]);

  useEffect(() => {
    setPcaData(generatePCAExample(pcaComponents));
  }, [pcaComponents]);

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
           Machine Learning - Unit 3
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-sm text-gray-500">
            Specially Designed for Sri
          </p>
        </motion.div>

        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-1 rounded-xl w-fit mx-auto bg-indigo-900/20 p-1 mb-12  overflow-x-auto">
            {[
              'Clustering', 
              'K-Means', 
              'Gaussian Mixtures', 
              'EM Algorithm',
              'Curse of Dimensionality',
              'Dimensionality Reduction',
              'PCA'
            ].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `whitespace-nowrap px-4 py-2.5 text-sm font-medium leading-5 text-indigo-700
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

        {/* Clustering Section */}
        <div className={`concept-section ${activeTab !== 0 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Clustering Algorithms</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">What is Clustering?</h3>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Clustering</span> is an unsupervised learning technique that groups similar data points together based on their characteristics.
                </p>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 mb-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">Real-life Example:</h4>
                  <p className="text-gray-700">
                    Customer segmentation in marketing - grouping customers with similar purchasing behaviors, 
                    demographics, or preferences to target them with personalized campaigns.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-indigo-700 mt-6">Types of Clustering</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li><span className="font-medium">Partition-based:</span> Divides data into non-overlapping clusters (e.g., K-Means)</li>
                  <li><span className="font-medium">Hierarchical:</span> Creates a tree of clusters (e.g., Agglomerative)</li>
                  <li><span className="font-medium">Density-based:</span> Finds dense regions (e.g., DBSCAN)</li>
                  <li><span className="font-medium">Distribution-based:</span> Models clusters as probability distributions (e.g., Gaussian Mixtures)</li>
                </ul>
              </div>
              
              <div className="h-96">
                <Scatter 
                  data={clusterData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Example Clusters in 2D Space',
                        font: { size: 16 }
                      },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Feature 1' } },
                      y: { title: { display: true, text: 'Feature 2' } }
                    }
                  }}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">Association Rule Mining</h3>
              <p className="text-gray-600 mb-4">
                Discovers interesting relations between variables in large databases. Commonly used for market basket analysis.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Market Basket Example:</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Rules like "Customers who buy diapers often buy beer" can be discovered from transaction data.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">Rule</span>
                      <span className="text-sm">Diapers → Beer</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">Support</span>
                      <span className="text-sm">5% of transactions contain both</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">Confidence</span>
                      <span className="text-sm">70% of diaper purchases include beer</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">Lift</span>
                      <span className="text-sm">3.5x more likely than random</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Common Algorithms:</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li><span className="font-medium">Apriori:</span> Uses breadth-first search with candidate generation</li>
                    <li><span className="font-medium">FP-Growth:</span> Uses frequent pattern tree for better performance</li>
                    <li><span className="font-medium">Eclat:</span> Uses depth-first search with vertical data format</li>
                  </ul>
                  
                  <div className="mt-4 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Use Case:</span> Product recommendations, store layout optimization, 
                      cross-selling strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* K-Means Section */}
        <div className={`concept-section ${activeTab !== 1 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">K-Means Clustering</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">How K-Means Works</h3>
                <p className="text-gray-600 mb-4">
                  K-Means partitions data into K clusters where each data point belongs to the cluster with the nearest mean.
                </p>
                
                <div className="mb-6">
                  <label htmlFor="k-slider" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Clusters (K): {kValue}
                  </label>
                  <input
                    id="k-slider"
                    type="range"
                    min="2"
                    max="6"
                    value={kValue}
                    onChange={(e) => setKValue(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 mb-6">
                  <h4 className="font-semibold text-indigo-800 mb-2">Algorithm Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                    <li>Randomly initialize K cluster centroids</li>
                    <li>Assign each point to the nearest centroid</li>
                    <li>Recalculate centroids as mean of assigned points</li>
                    <li>Repeat until centroids stabilize</li>
                  </ol>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Choosing K</h3>
                <p className="text-gray-600 mb-2">
                  The elbow method helps determine the optimal number of clusters:
                </p>
                <div className="h-48">
                  <Line 
                    data={{
                      labels: ['2', '3', '4', '5', '6'],
                      datasets: [{
                        label: 'Within-Cluster Sum of Squares (WCSS)',
                        data: [450, 220, 150, 120, 100],
                        borderColor: 'rgba(79, 70, 229, 0.8)',
                        tension: 0.3
                      }]
                    }}
                    options={{
                      scales: {
                        y: { title: { display: true, text: 'WCSS' } },
                        x: { title: { display: true, text: 'Number of Clusters (K)' } }
                      },
                      plugins: {
                        annotation: {
                          annotations: {
                            box1: {
                              type: 'box',
                              xMin: 2.5,
                              xMax: 3.5,
                              backgroundColor: 'rgba(255, 99, 132, 0.2)',
                              borderColor: 'rgba(255, 99, 132, 0.8)',
                              borderWidth: 1
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="h-96">
                <Scatter 
                  data={clusterData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: `K-Means Clustering (K=${kValue})`,
                        font: { size: 16 }
                      },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Feature 1' } },
                      y: { title: { display: true, text: 'Feature 2' } }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Pros and Cons</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-medium text-green-800 mb-2">Advantages</h4>
                    <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
                      <li>Simple and easy to implement</li>
                      <li>Fast and efficient on large datasets</li>
                      <li>Works well with spherical clusters</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-medium text-red-800 mb-2">Limitations</h4>
                    <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                      <li>Requires specifying K in advance</li>
                      <li>Sensitive to initial centroids</li>
                      <li>Struggles with non-spherical clusters</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Customer Segmentation",
                    "Document Classification",
                    "Image Compression",
                    "Anomaly Detection",
                    "Market Research"
                  ].map((app, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {app}
                    </span>
                  ))}
                </div>
                <div className="mt-3 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Example:</span> Retailers use K-Means to group stores with similar sales patterns 
                    for targeted inventory management.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gaussian Mixtures Section */}
        <div className={`concept-section ${activeTab !== 2 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gaussian Mixture Models</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Mixtures of Gaussians</h3>
                <p className="text-gray-600 mb-4">
                  A probabilistic model that assumes data is generated from a mixture of a finite number of Gaussian distributions with unknown parameters.
                </p>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 mb-6">
                  <h4 className="font-semibold text-indigo-800 mb-2">Real-life Example:</h4>
                  <p className="text-gray-700">
                    Modeling human heights in a population that might consist of different subpopulations 
                    (e.g., males and females) each with their own height distribution.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Key Concepts</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Each cluster is represented by a Gaussian (normal) distribution</li>
                  <li>Soft clustering - points can belong to multiple clusters with different probabilities</li>
                  <li>Can model clusters with different sizes and correlations</li>
                  <li>More flexible than K-Means for non-spherical clusters</li>
                </ul>
              </div>
              
              <div className="h-96">
                <Scatter 
                  data={gaussianData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Gaussian Mixture Model with 3 Components',
                        font: { size: 16 }
                      },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Feature 1' } },
                      y: { title: { display: true, text: 'Feature 2' } }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Gaussian Distribution Parameters</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2 text-center">Mean (μ)</h4>
                  <div className="h-40">
                    <Line 
                      data={{
                        labels: Array.from({length: 100}, (_, i) => i / 10),
                        datasets: [
                          {
                            label: 'μ=5, σ=1',
                            data: Array.from({length: 100}, (_, i) => {
                              const x = i / 10;
                              return Math.exp(-Math.pow(x - 5, 2) / (2 * 1 * 1));
                            }),
                            borderColor: 'rgba(79, 70, 229, 0.8)'
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: { y: { beginAtZero: true } },
                        plugins: { legend: { display: false } }
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Center of the distribution. Shifts the curve left/right.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2 text-center">Variance (σ²)</h4>
                  <div className="h-40">
                    <Line 
                      data={{
                        labels: Array.from({length: 100}, (_, i) => i / 10),
                        datasets: [
                          {
                            label: 'μ=5, σ=1',
                            data: Array.from({length: 100}, (_, i) => {
                              const x = i / 10;
                              return Math.exp(-Math.pow(x - 5, 2) / (2 * 1 * 1));
                            }),
                            borderColor: 'rgba(79, 70, 229, 0.8)'
                          },
                          {
                            label: 'μ=5, σ=1.5',
                            data: Array.from({length: 100}, (_, i) => {
                              const x = i / 10;
                              return Math.exp(-Math.pow(x - 5, 2) / (2 * 1.5 * 1.5));
                            }),
                            borderColor: 'rgba(239, 68, 68, 0.8)'
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: { y: { beginAtZero: true } },
                        plugins: { legend: { display: false } }
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Spread of the distribution. Higher variance = wider curve.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2 text-center">Mixing Coefficients</h4>
                  <div className="h-40 flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex justify-center space-x-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">0.6</div>
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">0.3</div>
                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">0.1</div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Weights representing each component's contribution to the mixture.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* EM Algorithm Section */}
        <div className={`concept-section ${activeTab !== 3 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Expectation-Maximization (EM) Algorithm</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">What is EM?</h3>
                <p className="text-gray-600 mb-4">
                  An iterative method to find maximum likelihood estimates of parameters in statistical models where the data is incomplete or has latent variables.
                </p>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 mb-6">
                  <h4 className="font-semibold text-indigo-800 mb-2">Real-life Example:</h4>
                  <p className="text-gray-700">
                    Medical diagnosis where some test results are missing - EM can estimate the missing values 
                    while simultaneously determining the most likely disease categories.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Algorithm Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">1</div>
                    <div>
                      <h4 className="font-medium text-gray-800">Expectation Step (E-Step)</h4>
                      <p className="text-gray-600 text-sm">
                        Calculate the expected value of the log-likelihood function with respect to the current estimate of the parameters.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">2</div>
                    <div>
                      <h4 className="font-medium text-gray-800">Maximization Step (M-Step)</h4>
                      <p className="text-gray-600 text-sm">
                        Find the parameters that maximize the expected log-likelihood found in the E-step.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">3</div>
                    <div>
                      <h4 className="font-medium text-gray-800">Convergence Check</h4>
                      <p className="text-gray-600 text-sm">
                        Repeat until the parameters converge (change very little between iterations).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Visualizing EM for GMM</h3>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="mb-4">
                      <div className="relative h-48 w-full">
                        {/* This would be an animation in a real implementation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-lg font-medium text-gray-700 mb-2">Iteration: 3</div>
                            <div className="flex justify-center space-x-6">
                              <div>
                                <div className="w-16 h-16 rounded-full bg-red-500 opacity-60 mx-auto mb-1"></div>
                                <div className="text-xs text-gray-600">μ: 3.2, σ: 1.1</div>
                              </div>
                              <div>
                                <div className="w-16 h-16 rounded-full bg-blue-500 opacity-60 mx-auto mb-1"></div>
                                <div className="text-xs text-gray-600">μ: 6.8, σ: 1.3</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      The algorithm alternates between assigning points to clusters (E-step) and 
                      updating cluster parameters (M-step) until convergence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Applications of EM</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Gaussian Mixture Models (GMM)</li>
                  <li>Hidden Markov Models (HMM)</li>
                  <li>Missing data imputation</li>
                  <li>Computer vision (image segmentation)</li>
                  <li>Natural language processing (topic modeling)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Pros and Cons</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-medium text-green-800 mb-2">Advantages</h4>
                    <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
                      <li>Guaranteed to increase likelihood</li>
                      <li>Works well with missing data</li>
                      <li>Flexible for many models</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-medium text-red-800 mb-2">Limitations</h4>
                    <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                      <li>Can converge to local maxima</li>
                      <li>Slow convergence sometimes</li>
                      <li>Requires specifying number of components</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Curse of Dimensionality Section */}
        <div className={`concept-section ${activeTab !== 4 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Curse of Dimensionality</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">What is it?</h3>
                <p className="text-gray-600 mb-4">
                  Refers to various phenomena that arise when analyzing and organizing data in high-dimensional spaces that do not occur in low-dimensional settings.
                </p>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 mb-6">
                  <h4 className="font-semibold text-indigo-800 mb-2">Real-life Example:</h4>
                  <p className="text-gray-700">
                    In recommendation systems, with thousands of product features, distances between users become meaningless 
                    as all users appear equally distant from each other in the high-dimensional space.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Key Problems</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Data becomes sparse - distances between points become similar</li>
                  <li>More dimensions require exponentially more data</li>
                  <li>Computational complexity increases</li>
                  <li>Visualization becomes difficult</li>
                                    <li>Overfitting risk increases in high dimensions</li>
                </ul>
              </div>
              
              <div className="h-96">
                <Bar 
                  data={highDimData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Data Sparsity in High Dimensions',
                        font: { size: 16 }
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.parsed.y}% of data coverage`
                        }
                      }
                    },
                    scales: {
                      x: { title: { display: true, text: 'Number of Dimensions' } },
                      y: { 
                        title: { display: true, text: 'Data Coverage (%)' },
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Effects and Solutions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-medium text-red-800 mb-2">Challenges</h4>
                  <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                    <li>Distance metrics lose meaning</li>
                    <li>Increased computational cost</li>
                    <li>Need for larger datasets</li>
                    <li>Difficulty in visualization</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-medium text-green-800 mb-2">Solutions</h4>
                  <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
                    <li>Dimensionality reduction (PCA, t-SNE)</li>
                    <li>Feature selection</li>
                    <li>Regularization techniques</li>
                    <li>Using appropriate distance metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dimensionality Reduction Section */}
        <div className={`concept-section ${activeTab !== 5 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dimensionality Reduction</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">What is Dimensionality Reduction?</h3>
                <p className="text-gray-600 mb-4">
                  Techniques to reduce the number of features in a dataset while preserving as much information as possible, addressing the curse of dimensionality.
                </p>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 mb-6">
                  <h4 className="font-semibold text-indigo-800 mb-2">Real-life Example:</h4>
                  <p className="text-gray-700">
                    Compressing high-resolution images by reducing pixel dimensions while maintaining visual quality for faster processing in computer vision tasks.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Common Techniques</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li><span className="font-medium">PCA (Principal Component Analysis):</span> Projects data onto principal components that maximize variance.</li>
                  <li><span className="font-medium">t-SNE:</span> Non-linear technique for visualization in 2D/3D spaces.</li>
                  <li><span className="font-medium">UMAP:</span> Preserves both local and global data structure.</li>
                  <li><span className="font-medium">Autoencoders:</span> Neural network-based approach for non-linear reduction.</li>
                </ul>
              </div>
              
              <div className="h-96">
                <Scatter 
                  data={pcaData.original}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: 'High-Dimensional Data Before Reduction',
                        font: { size: 16 }
                      },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Feature 1' } },
                      y: { title: { display: true, text: 'Feature 2' } }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Benefits and Trade-offs</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-medium text-green-800 mb-2">Benefits</h4>
                  <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
                    <li>Reduces computational complexity</li>
                    <li>Improves model performance</li>
                    <li>Enables visualization</li>
                    <li>Mitigates curse of dimensionality</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-medium text-red-800 mb-2">Trade-offs</h4>
                  <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                    <li>Potential loss of information</li>
                    <li>Interpretability challenges</li>
                    <li>Computationally expensive for some methods</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">Applications</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Image Processing",
                  "Text Analysis",
                  "Genomics",
                  "Financial Modeling",
                  "Visualization"
                ].map((app, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* PCA Section */}
        <div className={`concept-section ${activeTab !== 6 ? 'hidden' : ''}`}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Principal Component Analysis (PCA)</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">How PCA Works</h3>
                <p className="text-gray-600 mb-4">
                  PCA transforms high-dimensional data into a lower-dimensional space by projecting it onto principal components that maximize variance.
                </p>
                
                <div className="mb-6">
                  <label htmlFor="pca-slider" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Components: {pcaComponents}
                  </label>
                  <input
                    id="pca-slider"
                    type="range"
                    min="1"
                    max="2"
                    value={pcaComponents}
                    onChange={(e) => setPcaComponents(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 mb-6">
                  <h4 className="font-semibold text-indigo-800 mb-2">Algorithm Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                    <li>Standardize the data (zero mean, unit variance)</li>
                    <li>Compute the covariance matrix</li>
                    <li>Calculate eigenvectors and eigenvalues</li>
                    <li>Select top k eigenvectors as principal components</li>
                    <li>Project data onto these components</li>
                  </ol>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Explained Variance</h3>
                <div className="h-48">
                  <Bar 
                    data={{
                      labels: ['PC1', 'PC2', 'PC3', 'PC4'],
                      datasets: [{
                        label: 'Explained Variance Ratio',
                        data: [0.45, 0.25, 0.15, 0.10],
                        backgroundColor: 'rgba(79, 70, 229, 0.6)',
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: { 
                          title: { display: true, text: 'Variance Ratio' },
                          beginAtZero: true
                        },
                        x: { title: { display: true, text: 'Principal Components' } }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="h-96">
                <Scatter 
                  data={pcaData.pca}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: `PCA Projection (${pcaComponents} Component${pcaComponents > 1 ? 's' : ''})`,
                        font: { size: 16 }
                      },
                    },
                    scales: {
                      x: { title: { display: true, text: 'Principal Component 1' } },
                      y: { title: { display: true, text: pcaComponents === 2 ? 'Principal Component 2' : 'Projected Value' } }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Pros and Cons</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-medium text-green-800 mb-2">Advantages</h4>
                    <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
                      <li>Maximizes variance retention</li>
                      <li>Reduces dimensionality effectively</li>
                      <li>Computationally efficient</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-medium text-red-800 mb-2">Limitations</h4>
                    <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                      <li>Assumes linear relationships</li>
                      <li>Components may be hard to interpret</li>
                      <li>Sensitive to scaling</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Data Visualization",
                    "Feature Extraction",
                    "Noise Reduction",
                    "Image Compression",
                    "Genomics"
                  ].map((app, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {app}
                    </span>
                  ))}
                </div>
                <div className="mt-3 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Example:</span> PCA is used in facial recognition to reduce thousands of pixel values into a few key features for efficient processing.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AdvancedMLConcepts;