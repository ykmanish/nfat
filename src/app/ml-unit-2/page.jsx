'use client'
'use client';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const AdvancedMLVisualizations = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
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

    // Animate decision tree paths
    gsap.from('.tree-path', {
      scrollTrigger: {
        trigger: '#decision-trees',
        start: 'top center',
      },
      strokeDashoffset: 1000,
      strokeDasharray: 1000,
      duration: 2,
      ease: 'power1.inOut',
    });

    // Animate neural network connections
    gsap.from('.nn-connection', {
      scrollTrigger: {
        trigger: '#neural-networks',
        start: 'top center',
      },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
           Machine Learning - Unit 2
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-sm text-gray-500">
            Specially Designed for Sri
          </p>
        </motion.section>

        {/* Introduction */}
        <motion.section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">What is Machine Learning?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Machine Learning (ML) is like teaching a computer to learn from examples, just like we learn from experience. It looks at data, finds patterns, and makes predictions or decisions without being told exactly what to do.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> Think of Netflix suggesting movies. It learns what you like by looking at what you’ve watched (data) and recommends similar shows (predictions). That’s ML in action!
              </motion.p>
              <motion.div
                className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Topics We’ll Cover</h3>
                <ul className="space-y-2">
                  {['Linear Models', 'Decision Trees', 'Naïve Bayes', 'Regression Models', 'Neural Networks', 'Backpropagation'].map(
                    (item, i) => (
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
                    )
                  )}
                </ul>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64 md:h-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                  <motion.text
                    x="100"
                    y="100"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#4F46E5"
                    className="text-xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    ML
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Linear Models & Decision Trees */}
        <section
          id="decision-trees"
          ref={(el) => (sectionRefs.current[1] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Linear Models & Decision Trees</h2>
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Linear Models */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Linear Models</h3>
              <p className="text-gray-700 mb-4">
                <strong>Definition:</strong> Linear models use a straight line to separate or predict things. They look at your data and find the best line to fit it, like drawing a line through points on a graph.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Real-Life Example:</strong> Predicting a student’s test score based on how many hours they studied. If they study more, the score is likely higher, and the model draws a line to show this pattern.
              </p>
              <div className="relative h-48">
                <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                  {/* Data points */}
                  <motion.circle cx="80" cy="80" r="6" fill="#3B82F6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
                  <motion.circle cx="100" cy="60" r="6" fill="#3B82F6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
                  <motion.circle cx="120" cy="70" r="6" fill="#3B82F6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
                  <motion.circle cx="180" cy="120" r="6" fill="#EF4444" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
                  <motion.circle cx="200" cy="140" r="6" fill="#EF4444" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
                  <motion.circle cx="220" cy="130" r="6" fill="#EF4444" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
                  {/* Decision boundary */}
                  <motion.line
                    x1="50"
                    y1="50"
                    x2="250"
                    y2="150"
                    stroke="#6366F1"
                    strokeWidth="3"
                    strokeDasharray="10,5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Decision Trees */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Decision Trees</h3>
              <p className="text-gray-700 mb-4">
                <strong>Definition:</strong> Decision trees are like a flowchart for decisions. They ask yes/no questions about your data, splitting it into branches until they reach an answer.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Real-Life Example:</strong> Deciding whether to go to the park. The tree asks: “Is it raining?” If no, “Is it sunny?” If yes, “Go to the park!” It’s a step-by-step guide.
              </p>
              <div className="relative h-48 flex justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Root */}
                  <motion.rect
                    x="90"
                    y="20"
                    width="20"
                    height="20"
                    rx="4"
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  {/* Level 1 */}
                  <motion.path
                    d="M100,40 L60,80"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    className="tree-path"
                  />
                  <motion.rect
                    x="40"
                    y="80"
                    width="20"
                    height="20"
                    rx="4"
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  />
                  <motion.path
                    d="M100,40 L140,80"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    className="tree-path"
                  />
                  <motion.rect
                    x="120"
                    y="80"
                    width="20"
                    height="20"
                    rx="4"
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                  {/* Level 2 */}
                  <motion.path
                    d="M60,100 L40,140"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    className="tree-path"
                  />
                  <motion.rect
                    x="20"
                    y="140"
                    width="20"
                    height="20"
                    rx="4"
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                  />
                  <motion.path
                    d="M60,100 L80,140"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    className="tree-path"
                  />
                  <motion.rect
                    x="60"
                    y="140"
                    width="20"
                    height="20"
                    rx="4"
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.0 }}
                  />
                  <motion.path
                    d="M140,100 L120,140"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    className="tree-path"
                  />
                  <motion.rect
                    x="100"
                    y="140"
                    width="20"
                    height="20"
                    rx="4"
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 }}
                  />
                  <motion.path
                    d="M140,100 L160,140"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    className="tree-path"
                  />
                  <motion.rect
                    x="140"
                    y="140"
                    width="20"
                    height="20"
                    rx="4"
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4 }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Naïve Bayes Classification */}
        <motion.section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Naïve Bayes Classification</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-6">
                <strong>Definition:</strong> Naïve Bayes is a simple model that uses probability to classify things. It looks at patterns in data and guesses the most likely category based on those patterns.
              </p>
              <p className="text-gray-700 mb-6">
                <strong>Real-Life Example:</strong> An email spam filter uses Naïve Bayes. It checks words in an email (data). If it sees words like “free” or “win,” it’s more likely to classify the email as spam.
              </p>
              <motion.div
                className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 mb-6"
                whileHover={{ x: 5 }}
              >
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">Bayes’ Theorem</h3>
                <div className="text-2xl font-mono text-center py-4 bg-white rounded">
                  P(A|B) = P(B|A) * P(A) / P(B)
                </div>
                <p className="text-gray-700 mt-2">
                  This formula helps calculate probabilities, like figuring out if an email is spam based on its words.
                </p>
              </motion.div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Why Use Naïve Bayes?</h4>
                <ul className="space-y-2">
                  {['Easy to understand', 'Works with lots of data', 'Fast to learn', 'Good for text classification'].map(
                    (item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                      >
                        <span className="flex-shrink-0 w-5 h-5 bg-yellow-400 rounded-full mr-3 mt-1"></span>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <motion.div
              className="bg-white p-6 rounded-lg border border-gray-200"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Probability Curves</h3>
              <div className="h-64 relative">
                <svg width="100%" height="100%" viewBox="0 0 300 200">
                  {/* Gaussian curves */}
                  <motion.path
                    d="M20,180 Q100,20 180,180"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.path
                    d="M80,180 Q160,40 240,180"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                  {/* Labels */}
                  <motion.text
                    x="100"
                    y="30"
                    textAnchor="middle"
                    fill="#F59E0B"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Spam
                  </motion.text>
                  <motion.text
                    x="160"
                    y="50"
                    textAnchor="middle"
                    fill="#3B82F6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    Not Spam
                  </motion.text>
                  {/* Decision boundary */}
                  <motion.line
                    x1="130"
                    y1="10"
                    x2="130"
                    y2="190"
                    stroke="#6366F1"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.1 }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Regression Models */}
        <motion.section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Regression Models</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Linear Regression */}
            <motion.div
              className="bg-blue-50 p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Linear Regression</h3>
              <p className="text-gray-700 mb-4">
                <strong>Definition:</strong> Linear regression predicts numbers by drawing a straight line through data points, showing how one thing (like study time) affects another (like scores).
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Real-Life Example:</strong> Predicting house prices based on size. Bigger houses usually cost more, and linear regression finds the best line to show this relationship.
              </p>
              <div className="h-40">
                <svg width="100%" height="100%" viewBox="0 0 200 150">
                  {/* Data points */}
                  {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={150 - (x * 0.6 + Math.random() * 30)}
                      r="4"
                      fill="#3B82F6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  {/* Regression line */}
                  <motion.line
                    x1="10"
                    y1="140"
                    x2="190"
                    y2="40"
                    stroke="#1D4ED8"
                    strokeWidth="3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Logistic Regression */}
            <motion.div
              className="bg-purple-50 p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Logistic Regression</h3>
              <p className="text-gray-700 mb-4">
                <strong>Definition:</strong> Logistic regression predicts categories (like yes/no) by using a curve to show the probability of something happening.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Real-Life Example:</strong> Predicting if a student will pass or fail based on study hours. The model gives a probability (e.g., 80% chance of passing).
              </p>
              <div className="h-40">
                <svg width="100%" height="100%" viewBox="0 0 200 150">
                  {/* S-curve */}
                  <motion.path
                    d="M20,130 Q100,75 180,20"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  {/* Data points */}
                  {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={i < 4 ? 140 - Math.random() * 30 : 40 + Math.random() * 30}
                      r="4"
                      fill={i < 4 ? "#3B82F6" : "#EF4444"}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                    />
                  ))}
                </svg>
              </div>
            </motion.div>

            {/* Bayesian Logistic Regression */}
            <motion.div
              className="bg-green-50 p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold text-green-800 mb-3">Bayesian Logistic Regression</h3>
              <p className="text-gray-700 mb-4">
                <strong>Definition:</strong> Bayesian logistic regression adds probabilities to predictions, showing how confident the model is by considering past knowledge.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Real-Life Example:</strong> Predicting if it will rain this afternoon. The model uses past weather data and gives a range of probabilities (e.g., 60–80% chance of rain).
              </p>
              <div className="h-40 relative">
                <svg width="100%" height="100%" viewBox="0 0 200 150">
                  {/* Multiple S-curves to show uncertainty */}
                  {[0, 0.5, -0.5].map((offset, i) => (
                    <motion.path
                      key={i}
                      d={`M20,${130 + offset * 20} Q100,${75 + offset * 30} 180,${20 + offset * 20}`}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeOpacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                    />
                  ))}
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Neural Networks */}
        <section
          id="neural-networks"
          ref={(el) => (sectionRefs.current[4] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Neural Networks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">What Are Neural Networks?</h3>
              <p className="text-gray-700 mb-6">
                <strong>Definition:</strong> Neural networks are like a computer’s brain. They have layers of nodes (like neurons) connected together, learning complex patterns from data to make predictions.
              </p>
              <p className="text-gray-700 mb-6">
                <strong>Real-Life Example:</strong> When your phone unlocks by recognizing your face, it uses a neural network. It learns from many pictures of your face to identify you accurately.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-indigo-700 mb-2">Parts of a Neural Network</h4>
                  <ul className="space-y-2">
                    {[
                      'Input Layer: Takes in data (like a picture)',
                      'Hidden Layers: Find patterns in the data',
                      'Output Layer: Gives the final answer (like “It’s you!”)',
                      'Connections: Pass information between nodes',
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="flex-shrink-0 w-5 h-5 bg-indigo-500 rounded-full mr-3 mt-1"></span>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-700 mb-2">Activation Functions</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['Sigmoid', 'ReLU', 'Tanh'].map((func, i) => (
                      <motion.div
                        key={i}
                        className="p-2 bg-white rounded text-center text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {func}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-64 w-full">
                <svg width="100%" height="100%" viewBox="0 0 300 250">
                  {/* Input Layer */}
                  {[50, 100, 150].map((y, i) => (
                    <motion.circle
                      key={`input-${i}`}
                      cx="50"
                      cy={y}
                      r="15"
                      fill="#6366F1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  {/* Hidden Layer 1 */}
                  {[40, 90, 140, 190].map((y, i) => (
                    <motion.circle
                      key={`hidden1-${i}`}
                      cx="150"
                      cy={y}
                      r="15"
                      fill="#8B5CF6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    />
                  ))}
                  {/* Hidden Layer 2 */}
                  {[60, 120, 180].map((y, i) => (
                    <motion.circle
                      key={`hidden2-${i}`}
                      cx="225"
                      cy={y}
                      r="15"
                      fill="#A78BFA"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.6 }}
                    />
                  ))}
                  {/* Output Layer */}
                  <motion.circle
                    cx="300"
                    cy="125"
                    r="15"
                    fill="#EC4899"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 }}
                  />
                  {/* Connections */}
                  {[50, 100, 150].map((y1, i) =>
                    [40, 90, 140, 190].map((y2, j) => (
                      <motion.line
                        key={`conn1-${i}-${j}`}
                        x1="65"
                        y1={y1}
                        x2="135"
                        y2={y2}
                        stroke="#A5B4FC"
                        strokeWidth="1"
                        className="nn-connection"
                      />
                    ))
                  )}
                  {[40, 90, 140, 190].map((y1, i) =>
                    [60, 120, 180].map((y2, j) => (
                      <motion.line
                        key={`conn2-${i}-${j}`}
                        x1="165"
                        y1={y1}
                        x2="210"
                        y2={y2}
                        stroke="#C4B5FD"
                        strokeWidth="1"
                        className="nn-connection"
                      />
                    ))
                  )}
                  {[60, 120, 180].map((y1, i) => (
                    <motion.line
                      key={`conn3-${i}`}
                      x1="240"
                      y1={y1}
                      x2="285"
                      y2="125"
                      stroke="#F9A8D4"
                      strokeWidth="1"
                      className="nn-connection"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Backpropagation & Regularization */}
        <motion.section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Backpropagation & Regularization</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Backpropagation */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl"
              whileHover={{ rotate: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Backpropagation</h3>
              <p className="text-gray-700 mb-4">
                <strong>Definition:</strong> Backpropagation is how neural networks learn. When the network makes a mistake, it looks back, finds where it went wrong, and adjusts to improve next time.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Real-Life Example:</strong> Imagine practicing soccer kicks. If you miss the goal, you think, “Did I kick too hard?” and adjust. Backpropagation does this for neural networks.
              </p>
              <div className="relative h-48">
                <svg width="100%" height="100%" viewBox="0 0 300 200">
                  {/* Simple network */}
                  <circle cx="50" cy="100" r="15" fill="#3B82F6" />
                  <circle cx="150" cy="60" r="15" fill="#3B82F6" />
                  <circle cx="150" cy="140" r="15" fill="#3B82F6" />
                  <circle cx="250" cy="100" r="15" fill="#3B82F6" />
                  {/* Forward connections */}
                  <line x1="65" y1="100" x2="135" y2="60" stroke="#A5B4FC" strokeWidth="2" />
                  <line x1="65" y1="100" x2="135" y2="140" stroke="#A5B4FC" strokeWidth="2" />
                  <line x1="165" y1="60" x2="235" y2="100" stroke="#A5B4FC" strokeWidth="2" />
                  <line x1="165" y1="140" x2="235" y2="100" stroke="#A5B4FC" strokeWidth="2" />
                  {/* Backward error flow */}
                  <motion.path
                    d="M250,100 Q200,50 150,60"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <motion.path
                    d="M150,60 Q100,80 50,100"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Regularization */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl"
              whileHover={{ rotate: -0.5 }}
            >
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">Regularization</h3>
              <p className="text-gray-700 mb-4">
                <strong>Definition:</strong> Regularization stops a model from learning too much from the training data, preventing it from making mistakes on new data. It’s like keeping the model simple.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Real-Life Example:</strong> If you study only one book for an exam, you might memorize it but fail new questions. Regularization is like studying a variety of books to be ready for anything.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'L1 (Lasso)', color: 'bg-pink-100 text-pink-800' },
                  { name: 'L2 (Ridge)', color: 'bg-purple-100 text-purple-800' },
                  { name: 'Dropout', color: 'bg-indigo-100 text-indigo-800' },
                  { name: 'Early Stopping', color: 'bg-blue-100 text-blue-800' },
                ].map((tech, i) => (
                  <motion.div
                    key={i}
                    className={`p-3 rounded-lg text-center font-medium ${tech.color}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech.name}
                  </motion.div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-2">Balancing Model Complexity</h4>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Overfitting</span>
                  <span>Balanced</span>
                  <span>Underfitting</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* <div className="mt-16 text-center text-gray-500">
          <p>BCA Part-III Examination 2025 - Jaipur University</p>
          <p className="mt-2">Advanced Machine Learning Concepts Visualization</p>
        </div> */}
      </div>
    </div>
  );
};

export default AdvancedMLVisualizations;