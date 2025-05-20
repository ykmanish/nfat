'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SamplingAndReinforcementLearning = () => {
  const [activeTab, setActiveTab] = useState('sampling');

  const concepts = {
    sampling: {
      title: 'Sampling Methods',
      sections: [
        {
          title: 'What is Sampling?',
          content: (
            <div className="space-y-6">
              <div className="bg-blue-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Definition</h3>
                <p className="text-gray-700">
                  <strong>Sampling</strong> is selecting a subset of data from a larger population to analyze while maintaining its statistical properties. <em>Mnemonic</em>: Think of sampling as picking a few candies from a jar to guess the flavor mix without eating them all!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                  whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Simple Random Sampling</h3>
                  <p className="text-gray-600 mb-4">Every item in the population has an equal chance of being selected, like drawing names from a hat.</p>
                  <div className="flex flex-wrap gap-2">
                    {Array(20).fill().map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-6 h-6 rounded-full bg-blue-500"
                        animate={{
                          opacity: i % 4 === 0 ? [0.3, 1, 0.3] : 1, // Highlight every 4th item as "selected"
                          scale: i % 4 === 0 ? [0.8, 1.2, 0.8] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Remember, it’s completely random—no bias!</p>
                </motion.div>
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                  whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Stratified Sampling</h3>
                  <p className="text-gray-600 mb-4">Divide the population into subgroups (strata) and sample from each to ensure representation.</p>
                  <div className="flex justify-between h-20">
                    {['red', 'blue', 'green', 'yellow', 'purple'].map((color, i) => (
                      <motion.div
                        key={i}
                        className={`w-1/5 rounded-t-lg bg-${color}-400`}
                        animate={{ height: [60, 80, 60] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Use when groups differ significantly (e.g., age, income).</p>
                </motion.div>
              </div>
            </div>
          ),
        },
        {
          title: 'Monte Carlo Methods',
          content: (
            <div className="space-y-6">
              <div className="bg-purple-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Monte Carlo Simulation</h3>
                <p className="text-gray-700">
                  Uses repeated random sampling to estimate solutions to complex problems. <em>Mnemonic</em>: Like rolling dice many times to predict outcomes!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Estimating π</h3>
                  <div className="relative h-64">
                    <svg width="100%" height="100%" viewBox="0 0 200 200">
                      <rect x="10" y="10" width="180" height="180" fill="#E5E7EB" />
                      <circle cx="100" cy="100" r="90" fill="#3B82F6" fillOpacity="0.3" />
                      {Array(100).fill().map((_, i) => {
                        const x = Math.random() * 180 + 10;
                        const y = Math.random() * 180 + 10;
                        const inCircle = Math.sqrt((x - 100) ** 2 + (y - 100) ** 2) <= 90;
                        return (
                          <motion.circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="2"
                            fill={inCircle ? '#10B981' : '#EF4444'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.01 }}
                          />
                        );
                      })}
                    </svg>
                  </div>
                  <p className="text-gray-600 mt-2">Ratio of points inside circle to total points ≈ π/4. <strong>Exam Tip</strong>: Explain how random points estimate π.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Applications</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-3">$</span>
                      <span>Risk analysis in finance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-3">⚕️</span>
                      <span>Medical outcome predictions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-3">🌐</span>
                      <span>Physics simulations</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Know at least 3 applications.</p>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    reinforcement: {
      title: 'Reinforcement Learning (RL)',
      sections: [
        {
          title: 'What is RL?',
          content: (
            <div className="space-y-6">
              <div className="bg-green-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Definition</h3>
                <p className="text-gray-700">
                  An agent learns by interacting with an environment, taking actions to maximize cumulative rewards. <em>Mnemonic</em>: Think of a dog learning tricks—actions (sit, stay) earn treats (rewards)!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Components</h3>
                  <ul className="space-y-3">
                    <li><strong>Agent</strong>: Decision-maker (e.g., robot, AI).</li>
                    <li><strong>Environment</strong>: World the agent acts in (e.g., game board).</li>
                    <li><strong>Action</strong>: Choices made by the agent.</li>
                    <li><strong>Reward</strong>: Feedback from the environment (positive or negative).</li>
                    <li><strong>State</strong>: Current situation of the environment.</li>
                  </ul>
                  <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Use acronym <strong>AERAS</strong> (Agent, Environment, Reward, Action, State).</p>
                </motion.div>
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">RL Process</h3>
                  <div className="flex justify-center">
                    <svg width="200" height="120">
                      <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                          <path d="M0,0 L10,5 L0,10 Z" fill="#6B7280" />
                        </marker>
                      </defs>
                      <rect x="20" y="50" width="40" height="40" rx="5" fill="#10B981" />
                      <rect x="80" y="50" width="40" height="40" rx="5" fill="#3B82F6" />
                      <rect x="140" y="50" width="40" height="40" rx="5" fill="#F59E0B" />
                      <motion.path
                        d="M60,70 L80,70"
                        fill="none"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                      />
                      <motion.path
                        d="M120,70 L140,70"
                        fill="none"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                      <motion.path
                        d="M140,90 L140,110 L40,110 L40,90"
                        fill="none"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                      <text x="40" y="40" textAnchor="middle" fill="white">Agent</text>
                      <text x="100" y="40" textAnchor="middle" fill="white">Action</text>
                      <text x="160" y="40" textAnchor="middle" fill="white">Environment</text>
                      <text x="90" y="100" textAnchor="middle" fill="#6B7280">Reward</text>
                    </svg>
                  </div>
                  <p className="text-gray-600 mt-4 text-center">Cycle: Agent → Action → Environment → Reward → Agent</p>
                </motion.div>
              </div>
            </div>
          ),
        },
        {
          title: 'Core Elements of RL',
          content: (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  className="bg-yellow-100 p-4 rounded-lg"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="font-semibold text-yellow-800 mb-2">Policy</h3>
                  <p className="text-gray-600 text-sm">Rules for what action to take in each state (e.g., “if ball is left, move left”).</p>
                </motion.div>
                <motion.div
                  className="bg-blue-100 p-4 rounded-lg"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="font-semibold text-blue-800 mb-2">Value Function</h3>
                  <p className="text-gray-600 text-sm">Predicts future rewards from a state (e.g., “this move leads to high score”).</p>
                </motion.div>
                <motion.div
                  className="bg-purple-100 p-4 rounded-lg"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="font-semibold text-purple-800 mb-2">Model</h3>
                  <p className="text-gray-600 text-sm">Agent’s map of the environment (optional, predicts outcomes).</p>
                </motion.div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Exploration vs Exploitation</h3>
                <p className="text-gray-600 mb-4"><em>Exploration</em>: Try new actions to discover better options. <em>Exploitation</em>: Use known best actions to maximize reward.</p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: '50%' }}
                        animate={{ width: ['50%', '80%', '50%'] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </div>
                    <p className="text-center text-sm mt-1">Exploration</p>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: '50%' }}
                        animate={{ width: ['50%', '20%', '50%'] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </div>
                    <p className="text-center text-sm mt-1">Exploitation</p>
                  </div>
                </div>
                <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Balance is key—too much exploration wastes time, too much exploitation misses better options.</p>
              </div>
            </div>
          ),
        },
        {
          title: 'RL vs Supervised Learning',
          content: (
            <div className="space-y-6">
              <div className="bg-red-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Key Differences</h3>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Aspect</th>
                      <th className="px-4 py-2 text-left">Supervised Learning</th>
                      <th className="px-4 py-2 text-left">Reinforcement Learning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2"><strong>Feedback</strong></td>
                      <td className="px-4 py-2">Labeled data (e.g., cat vs dog)</td>
                      <td className="px-4 py-2">Rewards (e.g., +1 for winning)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>Timing</strong></td>
                      <td className="px-4 py-2">Immediate</td>
                      <td className="px-4 py-2">Delayed</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>Goal</strong></td>
                      <td className="px-4 py-2">Minimize prediction error</td>
                      <td className="px-4 py-2">Maximize total reward</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2"><strong>Data</strong></td>
                      <td className="px-4 py-2">Fixed dataset</td>
                      <td className="px-4 py-2">Dynamic environment</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Use the acronym <strong>FTGD</strong> (Feedback, Timing, Goal, Data) to recall differences.</p>
              </div>
            </div>
          ),
        },
        {
          title: 'Applications of RL',
          content: (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: '🤖', title: 'Robotics', desc: 'Navigation and task automation' },
                  { icon: '🎮', title: 'Game AI', desc: 'AlphaGo, Dota 2 bots' },
                  { icon: '🚗', title: 'Autonomous Vehicles', desc: 'Self-driving decisions' },
                ].map((app, i) => (
                  <motion.div
                    key={i}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-3xl mb-2">{app.icon}</div>
                    <h3 className="font-semibold text-gray-800">{app.title}</h3>
                    <p className="text-gray-600 text-sm">{app.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-indigo-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Case Study: AlphaGo</h3>
                <p className="text-gray-700">
                  DeepMind’s AlphaGo (2016) used RL to beat world champion Lee Sedol:
                </p>
                <ul className="space-y-2">
                  <li>Learned via self-play (games against itself).</li>
                  <li>Used policy network (action selection) and value network (reward prediction).</li>
                  <li>Discovered new strategies humans hadn’t considered.</li>
                </ul>
                <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Mention AlphaGo as a landmark RL example.</p>
              </div>
            </div>
          ),
        },
      ],
    },
    instance: {
      title: 'Instance-Based Learning',
      sections: [
        {
          title: 'What is Instance-Based Learning?',
          content: (
            <div className="space-y-6">
              <div className="bg-purple-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Definition</h3>
                <p className="text-gray-700">
                  Stores training examples and predicts based on similarity to them. <em>Mnemonic</em>: Like recognizing a friend by comparing to past memories!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1-Nearest Neighbor (1-NN)</h3>
                  <p className="text-gray-600 mb-4">Classify a new point based on the closest training example.</p>
                  <div className="relative h-48">
                    <svg width="100%" height="100%" viewBox="0 0 200 150">
                      {[
                        { x: 40, y: 40, c: 'red' },
                        { x: 60, y: 80, c: 'red' },
                        { x: 80, y: 30, c: 'red' },
                        { x: 120, y: 50, c: 'blue' },
                        { x: 140, y: 70, c: 'blue' },
                        { x: 160, y: 40, c: 'blue' },
                        { x: 100, y: 100, c: 'green' }, // New point
                      ].map((p, i) => (
                        <motion.circle
                          key={i}
                          cx={p.x}
                          cy={p.y}
                          r="5"
                          fill={p.c === 'green' ? '#10B981' : p.c === 'red' ? '#EF4444' : '#3B82F6'}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                      <motion.path
                        d="M100,100 L80,30"
                        fill="none"
                        stroke="#6B7280"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 mt-2 text-center">Green point classified as red (closest neighbor).</p>
                </motion.div>
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Distance Metrics</h3>
                  <ul className="space-y-3">
                    <li><strong>Euclidean</strong>: √Σ(xᵢ - yᵢ)² (straight-line distance).</li>
                    <li><strong>Manhattan</strong>: Σ|xᵢ - yᵢ| (city-block distance).</li>
                    <li><strong>Cosine</strong>: 1 - (A·B)/(||A|| ||B||) (angle-based).</li>
                  </ul>
                  <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Euclidean is most common; know its formula!</p>
                </motion.div>
              </div>
            </div>
          ),
        },
        {
          title: 'k-Nearest Neighbors (k-NN)',
          content: (
            <div className="space-y-6">
              <div className="bg-blue-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">k-NN Algorithm</h3>
                <p className="text-gray-700">
                  Classify based on the majority vote of the k closest training examples. <em>Mnemonic</em>: Like asking k friends for advice and going with the majority!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Choosing k</h3>
                  <div className="h-48 flex items-center justify-center">
                    <svg width="200" height="150" className="border border-gray-200 rounded">
                      <line x1="30" y1="130" x2="170" y2="130" stroke="#6B7280" />
                      <line x1="30" y1="130" x2="30" y2="20" stroke="#6B7280" />
                      <path d="M40,120 Q80,40 120,80 Q160,20 170,30" fill="none" stroke="#EF4444" strokeWidth="2" />
                      <path d="M40,110 Q80,30 120,70 Q160,10 170,20" fill="none" stroke="#3B82F6" strokeWidth="2" />
                      <text x="20" y="70" fill="#6B7280">Error</text>
                      <text x="100" y="145" fill="#6B7280">k value</text>
                      <text x="160" y="40" fill="#EF4444" fontSize="10">Training</text>
                      <text x="160" y="30" fill="#3B82F6" fontSize="10">Validation</text>
                    </svg>
                  </div>
                  <p className="text-gray-600 text-center">Small k = overfitting, large k = underfitting.</p>
                  <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Optimal k balances bias and variance.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Example: k=3</h3>
                  <div className="relative h-48">
                    <svg width="100%" height="100%" viewBox="0 0 200 150">
                      {[
                        { x: 40, y: 40, c: 'red' },
                        { x: 60, y: 80, c: 'red' },
                        { x: 80, y: 30, c: 'red' },
                        { x: 120, y: 50, c: 'blue' },
                        { x: 140, y: 70, c: 'blue' },
                        { x: 160, y: 40, c: 'blue' },
                        { x: 100, y: 100, c: 'green' },
                      ].map((p, i) => (
                        <motion.circle
                          key={i}
                          cx={p.x}
                          cy={p.y}
                          r="5"
                          fill={p.c === 'green' ? '#10B981' : p.c === 'red' ? '#EF4444' : '#3B82F6'}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                      {[
                        { x1: 100, y1: 100, x2: 80, y2: 30 },
                        { x1: 100, y1: 100, x2: 60, y2: 80 },
                        { x1: 100, y1: 100, x2: 120, y2: 50 },
                      ].map((line, i) => (
                        <motion.path
                          key={i}
                          d={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
                          fill="none"
                          stroke="#6B7280"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: i * 0.3 }}
                        />
                      ))}
                    </svg>
                  </div>
                  <p className="text-gray-600 mt-2 text-center">Green point classified as blue (2 blue, 1 red in k=3).</p>
                  <p className="text-gray-600 mt-4"><strong>Exam Tip</strong>: Explain how majority voting works.</p>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">{concepts[activeTab].title}</h1>

         <p className="text-xl text-gray-600 text-center mb-10">
            Designed for Srishti
          </p>        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(concepts).map((key) => (
            <motion.button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === key ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {concepts[key].title}
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {concepts[activeTab].sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`p-8 ${index > 0 ? 'border-t border-gray-200' : ''}`}
            >
              <h2 className="text-2xl font-bold text-indigo-700 mb-6">{section.title}</h2>
              {section.content}
            </motion.div>
          ))}
        </div>

        {/* Exam Preparation Tips */}
        <motion.div
          className="mt-12 bg-yellow-100 p-6 rounded-lg border-l-4 border-yellow-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">Exam Preparation Tips</h3>
          <ul className="space-y-2">
            {activeTab === 'sampling' && (
              <>
                <li>Understand <strong>random vs stratified sampling</strong>: Random is unbiased; stratified ensures group representation.</li>
                <li>Explain <strong>Monte Carlo methods</strong> with the π example (points in circle ÷ total points ≈ π/4).</li>
                <li>Know 3 applications (e.g., finance, physics, medicine).</li>
                <li><strong>Common Question</strong>: “Compare random and stratified sampling.” Answer: Random is simpler; stratified is better for diverse groups.</li>
                <li><strong>Pitfall</strong>: Don’t confuse Monte Carlo with deterministic methods—it relies on randomness.</li>
              </>
            )}
            {activeTab === 'reinforcement' && (
              <>
                <li>Memorize <strong>AERAS</strong>: Agent, Environment, Reward, Action, State.</li>
                <li>Explain <strong>exploration vs exploitation</strong>: Exploration tries new actions; exploitation uses known best actions.</li>
                <li>Compare RL vs supervised learning using <strong>FTGD</strong> (Feedback, Timing, Goal, Data).</li>
                <li>Know applications: AlphaGo, robotics, self-driving cars.</li>
                <li><strong>Common Question</strong>: “How does RL differ from supervised learning?” Answer: RL uses rewards, not labels; has delayed feedback.</li>
                <li><strong>Pitfall</strong>: Don’t forget RL involves dynamic environments, not static datasets.</li>
              </>
            )}
            {activeTab === 'instance' && (
              <>
                <li>Understand <strong>k-NN</strong>: Predicts based on k nearest neighbors’ majority vote.</li>
                <li>Know <strong>distance metrics</strong>: Euclidean (√Σ(xᵢ - yᵢ)²), Manhattan (Σ|xᵢ - yᵢ|), Cosine.</li>
                <li>Explain k choice: Small k = overfitting, large k = underfitting.</li>
                <li><strong>Common Question</strong>: “How does k-NN work?” Answer: Finds k closest points, uses majority class.</li>
                <li><strong>Pitfall</strong>: Don’t ignore the curse of dimensionality—high dimensions make distances less meaningful.</li>
              </>
            )}
          </ul>
          <p className="text-gray-600 mt-4"><strong>General Tip</strong>: Practice explaining concepts in simple terms and use examples (e.g., AlphaGo, π estimation).</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SamplingAndReinforcementLearning;