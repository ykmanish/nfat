'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Power3 } from 'gsap/dist/gsap';

gsap.registerPlugin(ScrollTrigger);

export default function MachineLearningVisualizations() {
  const overviewRef = useRef(null);
  const applicationsRef = useRef(null);
  const typesRef = useRef(null);
  const conceptsRef = useRef(null);
  const examplesRef = useRef(null);
  const issuesRef = useRef(null);
  const aiVsMlRef = useRef(null);

  useEffect(() => {
    // GSAP animations for each section
    const sections = [
      overviewRef, applicationsRef, typesRef, 
      conceptsRef, examplesRef, issuesRef, aiVsMlRef
    ];

    sections.forEach((section, index) => {
      gsap.from(section.current, {
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: Power3.easeOut
      });
    });

    // Animated diagrams
    gsap.from(".ml-process", {
      scrollTrigger: {
        trigger: ".ml-process",
        start: "top 75%"
      },
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    });

    gsap.from(".pie-chart", {
      scrollTrigger: {
        trigger: ".pie-chart",
        start: "top 75%"
      },
      rotation: -180,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    });

    gsap.from(".ai-ml-venn", {
      scrollTrigger: {
        trigger: ".ai-ml-venn",
        start: "top 75%"
      },
      scale: 0,
      opacity: 0,
      duration: 1.2,
      ease: "bounce.out"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-3">
          Machine Learning Unit One
        </h1>
         <p className="text-xl text-gray-600 text-center mb-10">
            Designed for Srishti
          </p>
        
        {/* Overview Section */}
        <section ref={overviewRef} className="mb-20 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Machine Learning Foundations - Overview</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-4">
                Machine Learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.
              </p>
              <div className="ml-process bg-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-blue-800 mb-4">ML Process Flow</h3>
                <div className="flex flex-col items-center">
                  <div className="flex justify-center items-center w-16 h-16 bg-blue-500 text-white rounded-full mb-2 transform transition hover:scale-110">
                    1
                  </div>
                  <p className="text-sm font-medium">Data Collection</p>
                  <div className="h-8 w-1 bg-blue-300"></div>
                  
                  <div className="flex justify-center items-center w-16 h-16 bg-blue-500 text-white rounded-full mb-2 transform transition hover:scale-110">
                    2
                  </div>
                  <p className="text-sm font-medium">Data Preparation</p>
                  <div className="h-8 w-1 bg-blue-300"></div>
                  
                  <div className="flex justify-center items-center w-16 h-16 bg-blue-500 text-white rounded-full mb-2 transform transition hover:scale-110">
                    3
                  </div>
                  <p className="text-sm font-medium">Model Training</p>
                  <div className="h-8 w-1 bg-blue-300"></div>
                  
                  <div className="flex justify-center items-center w-16 h-16 bg-blue-500 text-white rounded-full mb-2 transform transition hover:scale-110">
                    4
                  </div>
                  <p className="text-sm font-medium">Evaluation</p>
                  <div className="h-8 w-1 bg-blue-300"></div>
                  
                  <div className="flex justify-center items-center w-16 h-16 bg-blue-500 text-white rounded-full transform transition hover:scale-110">
                    5
                  </div>
                  <p className="text-sm font-medium">Deployment</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-purple-100 p-6 rounded-lg h-full">
                <h3 className="text-xl font-medium text-purple-800 mb-4">Key Components</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Algorithms (Decision Trees, Neural Networks, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Training Data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Features (Input Variables)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Model (Learned Representation)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Evaluation Metrics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section ref={applicationsRef} className="mb-20 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Applications of Machine Learning</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Healthcare", icon: "🏥", desc: "Disease diagnosis, drug discovery, medical imaging analysis" },
              { title: "Finance", icon: "💳", desc: "Fraud detection, algorithmic trading, credit scoring" },
              { title: "E-commerce", icon: "🛒", desc: "Recommendation systems, customer segmentation" },
              { title: "Automotive", icon: "🚗", desc: "Self-driving cars, predictive maintenance" },
              { title: "Entertainment", icon: "🎬", desc: "Content recommendation, personalized playlists" },
              { title: "Security", icon: "🔒", desc: "Anomaly detection, facial recognition" }
            ].map((app, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{app.icon}</div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">{app.title}</h3>
                <p className="text-gray-600">{app.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Types of ML Section */}
        <section ref={typesRef} className="mb-20 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Types of Machine Learning</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="pie-chart relative w-64 h-64 mx-auto mb-6">
                <div className="absolute w-full h-full rounded-full border-8 border-blue-500 clip-[0 50% 50% 0]"></div>
                <div className="absolute w-full h-full rounded-full border-8 border-green-500 clip-[0 0 50% 50%] rotate-90"></div>
                <div className="absolute w-full h-full rounded-full border-8 border-purple-500 clip-[50% 50% 0 0] rotate-180"></div>
                <div className="absolute w-full h-full rounded-full border-8 border-yellow-500 clip-[50% 0 0 50%] rotate-270"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">ML Types</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="space-y-6">
                <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-medium text-blue-700 mb-2">Supervised Learning</h3>
                  <p className="text-gray-700">Learns from labeled training data to predict outcomes for unseen data.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Classification</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Regression</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Algorithms: SVM, Random Forest</span>
                  </div>
                </div>
                
                <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-medium text-green-700 mb-2">Unsupervised Learning</h3>
                  <p className="text-gray-700">Finds hidden patterns or intrinsic structures in input data without labels.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Clustering</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Dimensionality Reduction</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Algorithms: K-Means, PCA</span>
                  </div>
                </div>
                
                <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-xl font-medium text-purple-700 mb-2">Reinforcement Learning</h3>
                  <p className="text-gray-700">Learns by interacting with an environment to maximize cumulative reward.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Agent</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Environment</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Rewards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Concepts Section */}
        <section ref={conceptsRef} className="mb-20 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Basic Concepts in Machine Learning</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-medium text-blue-600 mb-4">Key Terminology</h3>
              <div className="space-y-4">
                {[
                  { term: "Features", def: "Input variables used to make predictions" },
                  { term: "Labels", def: "Output variables we want to predict" },
                  { term: "Training Set", def: "Data used to train the model" },
                  { term: "Test Set", def: "Data used to evaluate model performance" },
                  { term: "Overfitting", def: "Model performs well on training data but poorly on new data" },
                  { term: "Underfitting", def: "Model fails to capture underlying patterns in data" }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="font-semibold text-indigo-600">{item.term}:</span> {item.def}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-medium text-blue-600 mb-4">Model Evaluation Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Accuracy", color: "bg-green-100 text-green-800" },
                  { name: "Precision", color: "bg-blue-100 text-blue-800" },
                  { name: "Recall", color: "bg-purple-100 text-purple-800" },
                  { name: "F1 Score", color: "bg-yellow-100 text-yellow-800" },
                  { name: "RMSE", color: "bg-red-100 text-red-800" },
                  { name: "R² Score", color: "bg-indigo-100 text-indigo-800" }
                ].map((metric, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg text-center font-medium ${metric.color} transform transition hover:scale-105`}
                  >
                    {metric.name}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-medium text-indigo-700 mb-2">Bias-Variance Tradeoff</h4>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>High Bias</span>
                  <span>Balanced</span>
                  <span>High Variance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section ref={examplesRef} className="mb-20 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Examples of Machine Learning</h2>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3 bg-blue-100 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-blue-800 mb-2">Spam Detection</h3>
                <p className="text-gray-700">Classifying emails as spam or not spam using Naive Bayes classifier.</p>
              </div>
              <div className="md:w-2/3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">S</div>
                    <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">H</div>
                    <div className="flex-1 h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mr-3">S</div>
                    <div className="flex-1 h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Not Spam</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Spam</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3 bg-purple-100 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-purple-800 mb-2">House Price Prediction</h3>
                <p className="text-gray-700">Predicting house prices based on features using Linear Regression.</p>
              </div>
              <div className="md:w-2/3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="h-48 relative">
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                      {[1200, 1500, 1800, 2100, 2400].map((sqft, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div 
                            className="w-6 bg-blue-500 rounded-t-sm"
                            style={{ height: `${Math.random() * 80 + 20}px` }}
                          ></div>
                          <span className="text-xs mt-1">{sqft} sqft</span>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gray-300"></div>
                    <div className="absolute top-1/4 left-0 right-0 h-px bg-gray-300"></div>
                    <div className="absolute top-2/4 left-0 right-0 h-px bg-gray-300"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-px bg-gray-300"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
                  </div>
                  <div className="mt-2 text-center text-sm text-gray-600">
                    Square Feet vs. Price (Trend Line shown in red)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perspectives/Issues Section */}
        <section ref={issuesRef} className="mb-20 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Perspectives/Issues in Machine Learning</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-medium text-blue-600 mb-4">Technical Challenges</h3>
              <ul className="space-y-3">
                {[
                  "Data Quality and Quantity",
                  "Feature Selection and Engineering",
                  "Model Selection and Tuning",
                  "Computational Resources",
                  "Interpretability of Models",
                  "Scalability Issues"
                ].map((issue, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full mr-3 mt-1"></span>
                    <span className="text-gray-700">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-medium text-blue-600 mb-4">Ethical Considerations</h3>
              <div className="space-y-4">
                {[
                  { issue: "Bias in Algorithms", severity: "High" },
                  { issue: "Privacy Concerns", severity: "High" },
                  { issue: "Job Displacement", severity: "Medium" },
                  { issue: "Accountability", severity: "High" },
                  { issue: "Transparency", severity: "Medium" },
                  { issue: "Security Risks", severity: "High" }
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.issue}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.severity === "High" ? "bg-red-100 text-red-800" : 
                        item.severity === "Medium" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-green-100 text-green-800"
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.severity === "High" ? "bg-red-500" : 
                          item.severity === "Medium" ? "bg-yellow-500" : 
                          "bg-green-500"
                        }`} 
                        style={{ width: `${item.severity === "High" ? "90%" : item.severity === "Medium" ? "60%" : "30%"}` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI vs ML Section */}
        <section ref={aiVsMlRef} className="p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6">AI vs. Machine Learning</h2>
          
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <div className="ai-ml-venn relative w-full max-w-md h-64 mx-auto">
                <div className="absolute w-64 h-64 rounded-full bg-blue-100 opacity-70 left-0 top-0 flex items-center justify-center">
                  <span className="text-lg font-medium text-blue-800">Machine Learning</span>
                </div>
                <div className="absolute w-64 h-64 rounded-full bg-purple-100 opacity-70 right-0 top-0 flex items-center justify-center">
                  <span className="text-lg font-medium text-purple-800">Artificial Intelligence</span>
                </div>
                <div className="absolute w-64 h-64 rounded-full bg-indigo-200 opacity-90 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <span className="text-lg font-medium text-indigo-800">Deep Learning</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div className="p-5 bg-indigo-50 rounded-lg">
                  <h3 className="text-xl font-medium text-indigo-700 mb-2">Artificial Intelligence (AI)</h3>
                  <p className="text-gray-700">
                    Broad concept of machines being able to carry out tasks in a way that we would consider "smart".
                    Includes rule-based systems, expert systems, and more.
                  </p>
                </div>
                
                <div className="p-5 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-700 mb-2">Machine Learning (ML)</h3>
                  <p className="text-gray-700">
                    Subset of AI that focuses on the development of algorithms that can learn from and make predictions on data.
                    Improves automatically through experience.
                  </p>
                </div>
                
                <div className="p-5 bg-purple-50 rounded-lg">
                  <h3 className="text-xl font-medium text-purple-700 mb-2">Deep Learning (DL)</h3>
                  <p className="text-gray-700">
                    Subset of ML that uses neural networks with many layers. Excels at processing unstructured data like images, sound, and text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* <div className="mt-12 text-center text-gray-500">
          <p>BCA Part-III Examination 2025 - Jaipur University</p>
          <p className="mt-2">Machine Learning Concepts Visualization</p>
        </div> */}
      </div>
    </div>
  );
}