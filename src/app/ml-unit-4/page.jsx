'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Tooltip CSS (embedded for simplicity)
const tooltipStyles = `
  .tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.2s, transform 0.2s;
  }
  .node:hover .tooltip {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GraphicalModelsVisualization = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Inject tooltip styles
    const styleSheet = document.createElement('style');
    styleSheet.innerText = tooltipStyles;
    document.head.appendChild(styleSheet);

    // GSAP animations for scroll-triggered elements
    gsap.utils.toArray(sectionRefs.current).forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
      });
    });

    // Animate Bayesian Network edges
    document.querySelectorAll('.bayes-edge').forEach((edge) => {
      const length = edge.getTotalLength();
      edge.style.strokeDasharray = length;
      edge.style.strokeDashoffset = length;
      gsap.to(edge, {
        scrollTrigger: {
          trigger: '#bayesian-networks',
          start: 'top center',
        },
        strokeDashoffset: 0,
        duration: 1,
        ease: 'power2.inOut',
      });
    });

    // Animate HMM states
    gsap.from('.hmm-state', {
      scrollTrigger: {
        trigger: '#hidden-markov-models',
        start: 'top center',
      },
      scale: 0,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)',
    });

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
         <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
           Machine Learning - Unit 4
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-sm text-gray-500">
            Specially Designed for Sri
          </p>
        </motion.section>

        {/* 1. Directed Graphical Models */}
        <motion.section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Directed Graphical Models</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Directed Graphical Models are like a treasure map with arrows! They show how things influence each other using a graph with directed edges, helping predict outcomes.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A weather app uses a model where clouds cause rain, and rain causes wet streets. Arrows show clouds → rain → wet streets, predicting if you need an umbrella!
              </motion.p>
              <motion.div
                className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Why It’s Awesome</h3>
                <ul className="space-y-2">
                  {['Shows cause-and-effect', 'Predicts outcomes', 'Used in weather, medicine, and more'].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center"
                      initial={{ x: -20 }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64 md:h-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Directed Graphical Model Diagram">
                  {/* Nodes with Tooltips */}
                  <g className="node">
                    <motion.circle cx="100" cy="50" r="15" fill="#3B82F6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} role="img" aria-label="Clouds node" />
                    <foreignObject x="80" y="60" width="40" height="20">
                      <div className="tooltip">Cause: Clouds</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="80" cy="120" r="15" fill="#3B82F6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} role="img" aria-label="Rain node" />
                    <foreignObject x="60" y="130" width="40" height="20">
                      <div className="tooltip">Effect: Rain</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="120" cy="120" r="15" fill="#3B82F6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} role="img" aria-label="Wet Streets node" />
                    <foreignObject x="100" y="130" width="40" height="20">
                      <div className="tooltip">Effect: Wet Streets</div>
                    </foreignObject>
                  </g>
                  {/* Edges */}
                  <motion.path
                    d="M100,65 L80,105"
                    stroke="#1E3A8A"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.path
                    d="M100,65 L120,105"
                    stroke="#1E3A8A"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  <motion.text x="100" y="40" textAnchor="middle" fill="#3B82F6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Clouds
                  </motion.text>
                  <motion.text x="80" y="140" textAnchor="middle" fill="#3B82F6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Rain
                  </motion.text>
                  <motion.text x="120" y="140" textAnchor="middle" fill="#3B82F6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Wet Streets
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 2. Bayesian Networks */}
        <motion.section
          id="bayesian-networks"
          ref={(el) => (sectionRefs.current[1] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-purple-700 mb-6">Bayesian Networks</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Bayesian Networks are like a detective’s clue board! They use directed graphs to show how variables (clues) depend on each other, using probabilities to solve mysteries.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A doctor uses a Bayesian Network to diagnose a cold. Symptoms like cough and fever depend on the cold, and probabilities help figure out if you’re sick!
              </motion.p>
              <motion.div
                className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Cool Fact</h3>
                <p className="text-gray-700">
                  Combines graphs with probabilities to make smart predictions, like a super-smart detective!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Bayesian Network Diagram">
                  {/* Nodes with Tooltips */}
                  <g className="node">
                    <motion.circle cx="100" cy="50" r="15" fill="#8B5CF6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} role="img" aria-label="Cold node" />
                    <foreignObject x="80" y="60" width="40" height="20">
                      <div className="tooltip">Cause: Cold</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="70" cy="120" r="15" fill="#8B5CF6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} role="img" aria-label="Cough node" />
                    <foreignObject x="50" y="130" width="40" height="20">
                      <div className="tooltip">Symptom: Cough</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="130" cy="120" r="15" fill="#8B5CF6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} role="img" aria-label="Fever node" />
                    <foreignObject x="110" y="130" width="40" height="20">
                      <div className="tooltip">Symptom: Fever</div>
                    </foreignObject>
                  </g>
                  {/* Edges */}
                  <motion.path
                    d="M100,65 L70,105"
                    stroke="#4C1D95"
                    strokeWidth="3"
                    fill="none"
                    className="bayes-edge"
                  />
                  <motion.path
                    d="M100,65 L130,105"
                    stroke="#4C1D95"
                    strokeWidth="3"
                    fill="none"
                    className="bayes-edge"
                  />
                  <motion.text x="100" y="40" textAnchor="middle" fill="#8B5CF6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Cold
                  </motion.text>
                  <motion.text x="70" y="140" textAnchor="middle" fill="#8B5CF6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Cough
                  </motion.text>
                  <motion.text x="130" y="140" textAnchor="middle" fill="#8B5CF6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Fever
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 3. Exploiting Independence Properties */}
        <motion.section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-teal-700 mb-6">Exploiting Independence Properties</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Exploiting Independence Properties is like ignoring distractions to focus on what matters! It simplifies calculations by assuming some variables don’t affect each other.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A traffic app predicts delays. It assumes your morning coffee choice doesn’t affect traffic, so it only models road conditions, making predictions faster!
              </motion.p>
              <motion.div
                className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-teal-800 mb-3">Why It’s Smart</h3>
                <p className="text-gray-700">
                  Cuts down complex math by focusing on key relationships, speeding up models!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-green-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Independence Properties Diagram">
                  {/* Relevant Nodes */}
                  <g className="node">
                    <motion.circle cx="80" cy="80" r="15" fill="#14B8A6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} role="img" aria-label="Traffic node" />
                    <foreignObject x="60" y="90" width="40" height="20">
                      <div className="tooltip">Relevant: Traffic</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="120" cy="120" r="15" fill="#14B8A6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} role="img" aria-label="Delay node" />
                    <foreignObject x="100" y="130" width="40" height="20">
                      <div className="tooltip">Relevant: Delay</div>
                    </foreignObject>
                  </g>
                  {/* Irrelevant Node */}
                  <g className="node">
                    <motion.circle cx="50" cy="150" r="10" fill="#6B7280" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} role="img" aria-label="Coffee node" />
                    <foreignObject x="30" y="160" width="40" height="20">
                      <div className="tooltip">Irrelevant: Coffee</div>
                    </foreignObject>
                  </g>
                  <motion.path
                    d="M80,95 L120,105"
                    stroke="#14B8A6"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.text x="80" y="70" textAnchor="middle" fill="#14B8A6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Traffic
                  </motion.text>
                  <motion.text x="120" y="140" textAnchor="middle" fill="#14B8A6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Delay
                  </motion.text>
                  <motion.text x="50" y="170" textAnchor="middle" fill="#6B7280" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Coffee
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 4. From Distributions to Graphs */}
        <motion.section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-pink-700 mb-6">From Distributions to Graphs</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> From Distributions to Graphs is like turning a math equation into a picture! It takes probability distributions and draws them as graphs to show relationships.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A school tracks student grades. Instead of complex math, it draws a graph where study time affects grades, making it easier to understand!
              </motion.p>
              <motion.div
                className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-pink-800 mb-3">Why It’s Neat</h3>
                <p className="text-gray-700">
                  Graphs make math visual, helping us see how things connect without getting lost in numbers!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Distributions to Graphs Diagram">
                  {/* Distribution Curve */}
                  <motion.path
                    d="M20,180 Q100,20 180,180"
                    fill="none"
                    stroke="#EC4899"
                    strokeWidth="3"
                    initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.5 }}
                  />
                  {/* Graph Nodes */}
                  <g className="node">
                    <motion.circle cx="80" cy="120" r="10" fill="#F472B6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} role="img" aria-label="Study node" />
                    <foreignObject x="60" y="130" width="40" height="20">
                      <div className="tooltip">Variable: Study</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="120" cy="120" r="10" fill="#F472B6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }} role="img" aria-label="Grades node" />
                    <foreignObject x="100" y="130" width="40" height="20">
                      <div className="tooltip">Variable: Grades</div>
                    </foreignObject>
                  </g>
                  <motion.path
                    d="M80,120 L120,120"
                    stroke="#F472B6"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                  <motion.text x="100" y="50" textAnchor="middle" fill="#EC4899" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    Distribution
                  </motion.text>
                  <motion.text x="80" y="140" textAnchor="middle" fill="#F472B6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                    Study
                  </motion.text>
                  <motion.text x="120" y="140" textAnchor="middle" fill="#F472B6" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                    Grades
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 5. Markov Random Fields */}
        <motion.section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6">Markov Random Fields</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Markov Random Fields are like a neighborhood where everyone influences their neighbors! They use undirected graphs to show how variables affect each other mutually.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> In a social network, your mood might depend on your friends’ moods. A Markov Random Field models how everyone’s mood influences each other without arrows!
              </motion.p>
              <motion.div
                className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3">Why It’s Cool</h3>
                <p className="text-gray-700">
                  Handles mutual influences, great for networks like social media or image processing!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-teal-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Markov Random Fields Diagram">
                  {/* Nodes */}
                  <g className="node">
                    <motion.circle cx="80" cy="80" r="10" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} role="img" aria-label="Friend 1 node" />
                    <foreignObject x="60" y="90" width="40" height="20">
                      <div className="tooltip">Mood: Friend 1</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="120" cy="80" r="10" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} role="img" aria-label="Friend 2 node" />
                    <foreignObject x="100" y="90" width="40" height="20">
                      <div className="tooltip">Mood: Friend 2</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="100" cy="120" r="10" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} role="img" aria-label="You node" />
                    <foreignObject x="80" y="130" width="40" height="20">
                      <div className="tooltip">Mood: You</div>
                    </foreignObject>
                  </g>
                  {/* Undirected Edges */}
                  <motion.line x1="80" y1="80" x2="120" y2="80" stroke="#047857" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                  <motion.line x1="80" y1="80" x2="100" y2="120" stroke="#047857" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
                  <motion.line x1="120" y1="80" x2="100" y2="120" stroke="#047857" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
                  <motion.text x="80" y="70" textAnchor="middle" fill="#10B981" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Friend 1
                  </motion.text>
                  <motion.text x="120" y="70" textAnchor="middle" fill="#10B981" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Friend 2
                  </motion.text>
                  <motion.text x="100" y="140" textAnchor="middle" fill="#10B981" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    You
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 6. Inference in Graphical Models */}
        <motion.section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-red-700 mb-6">Inference in Graphical Models</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Inference in Graphical Models is like solving a puzzle with some pieces missing! It uses the graph to predict unknown variables based on what you know.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A smart home knows the lights are on and guesses if you’re home. The graph links lights to presence, helping predict your location!
              </motion.p>
              <motion.div
                className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-red-800 mb-3">How It Works</h3>
                <p className="text-gray-700">
                  Uses probabilities and graph structure to fill in the blanks, like a detective’s guess!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Inference Diagram">
                  {/* Known Node */}
                  <g className="node">
                    <motion.circle cx="80" cy="80" r="15" fill="#EF4444" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} role="img" aria-label="Lights On node" />
                    <foreignObject x="60" y="90" width="40" height="20">
                      <div className="tooltip">Known: Lights On</div>
                    </foreignObject>
                  </g>
                  {/* Unknown Node */}
                  <g className="node">
                    <motion.circle cx="120" cy="120" r="15" fill="#B91C1C" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} role="img" aria-label="Home node" />
                    <foreignObject x="100" y="130" width="40" height="20">
                      <div className="tooltip">Unknown: Home?</div>
                    </foreignObject>
                  </g>
                  <motion.path
                    d="M80,95 L120,105"
                    stroke="#B91C1C"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.text x="80" y="70" textAnchor="middle" fill="#EF4444" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    Lights On
                  </motion.text>
                  <motion.text x="120" y="140" textAnchor="middle" fill="#B91C1C" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    Home?
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 7. Learning in Graphical Models */}
        <motion.section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Learning in Graphical Models</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Learning in Graphical Models is like teaching a robot to understand connections! It uses data to figure out the graph’s structure and probabilities.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A shopping app learns that buying shoes often leads to buying socks. It builds a graph from purchase data to predict what you’ll buy next!
              </motion.p>
              <motion.div
                className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Why It’s Smart</h3>
                <p className="text-gray-700">
                  Builds graphs from data, making predictions more accurate over time!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Learning Diagram">
                  {/* Nodes */}
                  <g className="node">
                    <motion.circle cx="80" cy="80" r="15" fill="#4F46E5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} role="img" aria-label="Shoes node" />
                    <foreignObject x="60" y="90" width="40" height="20">
                      <div className="tooltip">Purchase: Shoes</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="120" cy="120" r="15" fill="#4F46E5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} role="img" aria-label="Socks node" />
                    <foreignObject x="100" y="130" width="40" height="20">
                      <div className="tooltip">Purchase: Socks</div>
                    </foreignObject>
                  </g>
                  <motion.path
                    d="M80,95 L120,105"
                    stroke="#1E3A8A"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.text x="80" y="70" textAnchor="middle" fill="#4F46E5" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    Shoes
                  </motion.text>
                  <motion.text x="120" y="140" textAnchor="middle" fill="#4F46E5" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    Socks
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 8. Naïve Bayes Classifiers */}
        <motion.section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-orange-700 mb-6">Naïve Bayes Classifiers</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Naïve Bayes Classifiers are like a quick detective making smart guesses! They predict categories (like spam or not) by assuming features are independent and using probabilities.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> An email app checks words like “free” or “win” to classify emails as spam. It assumes words don’t depend on each other, making it super fast!
              </motion.p>
              <motion.div
                className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Why It’s Fast</h3>
                <p className="text-gray-700">
                  Simple assumptions make it quick and effective for text classification!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Naïve Bayes Diagram">
                  {/* Features */}
                  <g className="node">
                    <motion.circle cx="60" cy="60" r="10" fill="#F97316" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} role="img" aria-label="Free node" />
                    <foreignObject x="40" y="70" width="40" height="20">
                      <div className="tooltip">Feature: “Free”</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="60" cy="100" r="10" fill="#F97316" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} role="img" aria-label="Win node" />
                    <foreignObject x="40" y="110" width="40" height="20">
                      <div className="tooltip">Feature: “Win”</div>
                    </foreignObject>
                  </g>
                  {/* Class */}
                  <g className="node">
                    <motion.circle cx="120" cy="80" r="15" fill="#EA580C" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} role="img" aria-label="Spam node" />
                    <foreignObject x="100" y="90" width="40" height="20">
                      <div className="tooltip">Class: Spam</div>
                    </foreignObject>
                  </g>
                  <motion.line x1="60" y1="60" x2="120" y2="80" stroke="#EA580C" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                  <motion.line x1="60" y1="100" x2="120" y2="80" stroke="#EA580C" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
                  <motion.text x="60" y="50" textAnchor="middle" fill="#F97316" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    “Free”
                  </motion.text>
                  <motion.text x="60" y="120" textAnchor="middle" fill="#F97316" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    “Win”
                  </motion.text>
                  <motion.text x="120" y="100" textAnchor="middle" fill="#EA580C" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Spam
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 9. Markov Models */}
        <motion.section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-emerald-700 mb-6">Markov Models</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Markov Models are like a game of hopscotch! They predict the next step based only on where you are now, not your past steps, using state transitions.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A music app predicts your next song choice. If you’re listening to pop, it’s likely you’ll pick another pop song, based only on the current song!
              </motion.p>
              <motion.div
                className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-emerald-800 mb-3">Why It’s Fun</h3>
                <p className="text-gray-700">
                  Simple and great for sequences, like predicting your next move!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Markov Models Diagram">
                  {/* States */}
                  <g className="node">
                    <motion.circle cx="60" cy="100" r="15" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} role="img" aria-label="Pop node" />
                    <foreignObject x="40" y="110" width="40" height="20">
                      <div className="tooltip">State: Pop</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="140" cy="100" r="15" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} role="img" aria-label="Pop Next node" />
                    <foreignObject x="120" y="110" width="40" height="20">
                      <div className="tooltip">State: Pop Next</div>
                    </foreignObject>
                  </g>
                  <motion.path
                    d="M75,100 Q100,80 125,100"
                    stroke="#047857"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.text x="60" y="90" textAnchor="middle" fill="#10B981" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    Pop
                  </motion.text>
                  <motion.text x="140" y="90" textAnchor="middle" fill="#10B981" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    Pop Next
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 10. Hidden Markov Models */}
        <motion.section
          id="hidden-markov-models"
          ref={(el) => (sectionRefs.current[9] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">Hidden Markov Models</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Hidden Markov Models are like a secret agent game! They model hidden states you can’t see, predicting them from observable clues, using state transitions.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A speech app guesses words (hidden states) from sounds (observable). If you say “he-llo,” it predicts “hello” based on sound patterns!
              </motion.p>
              <motion.div
                className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Why It’s Exciting</h3>
                <p className="text-gray-700">
                  Uncovers hidden patterns, perfect for speech, gestures, or weather prediction!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" aria-label="Hidden Markov Models Diagram">
                  {/* Hidden States */}
                  <g className="node">
                    <motion.circle cx="60" cy="60" r="15" fill="#F59E0B" className="hmm-state" role="img" aria-label="Word 1 node" />
                    <foreignObject x="40" y="70" width="40" height="20">
                      <div className="tooltip">Hidden: Word 1</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="140" cy="60" r="15" fill="#F59E0B" className="hmm-state" role="img" aria-label="Word 2 node" />
                    <foreignObject x="120" y="70" width="40" height="20">
                      <div className="tooltip">Hidden: Word 2</div>
                    </foreignObject>
                  </g>
                  {/* Observable States */}
                  <g className="node">
                    <motion.circle cx="60" cy="120" r="10" fill="#D97706" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} role="img" aria-label="Sound 1 node" />
                    <foreignObject x="40" y="130" width="40" height="20">
                      <div className="tooltip">Observable: Sound 1</div>
                    </foreignObject>
                  </g>
                  <g className="node">
                    <motion.circle cx="140" cy="120" r="10" fill="#D97706" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} role="img" aria-label="Sound 2 node" />
                    <foreignObject x="120" y="130" width="40" height="20">
                      <div className="tooltip">Observable: Sound 2</div>
                    </foreignObject>
                  </g>
                  <motion.path
                    d="M75,60 Q100,40 125,60"
                    stroke="#D97706"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  <motion.line x1="60" y1="75" x2="60" y2="110" stroke="#D97706" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
                  <motion.line x1="140" y1="75" x2="140" y2="110" stroke="#D97706" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} />
                  <motion.text x="60" y="50" textAnchor="middle" fill="#F59E0B" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                    Word 1
                  </motion.text>
                  <motion.text x="140" y="50" textAnchor="middle" fill="#F59E0B" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                    Word 2
                  </motion.text>
                  <motion.text x="60" y="140" textAnchor="middle" fill="#D97706" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                    Sound 1
                  </motion.text>
                  <motion.text x="140" y="140" textAnchor="middle" fill="#D97706" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                    Sound 2
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="mt-16 text-center text-gray-500">
          <p>BCA Part-III Examination 2025 - Jaipur University</p>
          <p className="mt-2">Graphical Models Visualization</p>
        </div>
      </div>
    </div>
  );
};

export default GraphicalModelsVisualization;