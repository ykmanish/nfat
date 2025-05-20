'use client';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ClusteringAndDimensionalityVisualization = () => {
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

    // Animate K-Means centroids
    gsap.from('.kmeans-centroid', {
      scrollTrigger: {
        trigger: '#kmeans-clustering',
        start: 'top center',
      },
      scale: 0,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)',
    });

    // Animate EM Gaussian curves
    gsap.from('.gaussian-curve', {
      scrollTrigger: {
        trigger: '#em-algorithm',
        start: 'top center',
      },
      strokeDashoffset: 1000,
      strokeDasharray: 1000,
      duration: 2,
      ease: 'power1.inOut',
    });

    // Animate PCA projection
    gsap.from('.pca-projection', {
      scrollTrigger: {
        trigger: '#pca',
        start: 'top center',
      },
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
         <h1 className="text-4xl font-bold text-center text-indigo-800 mb-3">
          Machine Learning Unit Three
        </h1>
         <p className="text-xl text-gray-600 text-center mb-10">
            Designed for Srishti
          </p>
        </motion.section>

        {/* 1. Clustering */}
        <motion.section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-purple-700 mb-6">Clustering</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Clustering is like throwing a party and grouping friends who vibe together! It puts similar data points into clusters based on their features, like age or interests, without any labels.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A music app groups users who listen to similar songs. If you love pop, you’re in the “pop lovers” cluster with others who jam to the same beats!
              </motion.p>
              <motion.div
                className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Why It’s Cool</h3>
                <ul className="space-y-2">
                  {['Finds patterns on its own', 'No need for pre-labeled data', 'Used in social media, shopping, and more'].map(
                    (item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center"
                        initial={{ x: -20 }}
                        whileInView={{ x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Pop Cluster */}
                  {[50, 55, 60].map((x, i) => (
                    <motion.circle
                      key={`pop-${i}`}
                      cx={x}
                      cy={50 + i * 10}
                      r="6"
                      fill="#8B5CF6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  {/* Rock Cluster */}
                  {[120, 125, 130].map((x, i) => (
                    <motion.circle
                      key={`rock-${i}`}
                      cx={x}
                      cy={120 + i * 10}
                      r="6"
                      fill="#EC4899"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    />
                  ))}
                  <motion.text
                    x="55"
                    y="30"
                    textAnchor="middle"
                    fill="#8B5CF6"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Pop Lovers
                  </motion.text>
                  <motion.text
                    x="125"
                    y="100"
                    textAnchor="middle"
                    fill="#EC4899"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Rock Fans
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 2. Association Rule Mining */}
        <motion.section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-pink-700 mb-6">Association Rule Mining</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Association Rule Mining is like spotting besties in a shopping cart! It finds items that are often bought together, creating rules to predict what goes with what.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> At a store, if people buying bread often grab butter, the store learns: “Bread → Butter.” They might place them closer to boost sales!
              </motion.p>
              <motion.div
                className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-pink-800 mb-3">Fun Fact</h3>
                <p className="text-gray-700">
                  Rules are written as “If bread, then butter” with a confidence score, like 75% chance they’re bought together!
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
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Bread */}
                  <motion.rect
                    x="50"
                    y="50"
                    width="30"
                    height="30"
                    fill="#F472B6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  {/* Butter */}
                  <motion.rect
                    x="120"
                    y="120"
                    width="30"
                    height="30"
                    fill="#A78BFA"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  />
                  {/* Arrow */}
                  <motion.path
                    d="M80,65 L110,115"
                    stroke="#EC4899"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  <motion.text
                    x="65"
                    y="40"
                    textAnchor="middle"
                    fill="#F472B6"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Bread
                  </motion.text>
                  <motion.text
                    x="135"
                    y="110"
                    textAnchor="middle"
                    fill="#A78BFA"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Butter
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 3. K-Means Clustering */}
        <motion.section
          id="kmeans-clustering"
          ref={(el) => (sectionRefs.current[2] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-6">K-Means Clustering</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> K-Means Clustering is like picking squad leaders and grouping friends around them! It selects a few center points (centroids) and assigns data to the nearest one.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A coffee shop wants to place 3 pickup points for delivery. K-Means picks 3 spots (centroids) and groups nearby customers to each, making deliveries quick!
              </motion.p>
              <motion.div
                className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">How It Works</h3>
                <p className="text-gray-700">
                  Choose K centroids, group points by the closest one, move centroids to the group’s center, and repeat until the groups settle!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Cluster 1 Points */}
                  {[50, 55, 45].map((x, i) => (
                    <motion.circle
                      key={`k1-${i}`}
                      cx={x}
                      cy={50 + i * 10}
                      r="4"
                      fill="#3B82F6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  {/* Cluster 2 Points */}
                  {[120, 125, 115].map((x, i) => (
                    <motion.circle
                      key={`k2-${i}`}
                      cx={x}
                      cy={120 + i * 10}
                      r="4"
                      fill="#06B6D4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    />
                  ))}
                  {/* Centroids */}
                  <motion.circle
                    cx="50"
                    cy="60"
                    r="8"
                    fill="#1E3A8A"
                    className="kmeans-centroid"
                  />
                  <motion.circle
                    cx="120"
                    cy="130"
                    r="8"
                    fill="#164E63"
                    className="kmeans-centroid"
                  />
                  <motion.text
                    x="50"
                    y="40"
                    textAnchor="middle"
                    fill="#3B82F6"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Group 1
                  </motion.text>
                  <motion.text
                    x="120"
                    y="100"
                    textAnchor="middle"
                    fill="#06B6D4"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Group 2
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 4. Expectation Maximization (EM) */}
        <motion.section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6">Expectation Maximization (EM)</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> EM is like a treasure hunter guessing where gold is hidden, then digging smarter each time! It guesses patterns in data and refines them to find the best fit.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A weather app guesses if rainy days form patterns. EM starts with a guess, checks past weather data, and adjusts until it finds the best pattern for rain predictions!
              </motion.p>
              <motion.div
                className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3">EM Steps</h3>
                <p className="text-gray-700">
                  Guess the pattern (Expectation), improve the guess with data (Maximization), repeat until it’s spot-on!
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
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Guess Points */}
                  {[50, 60, 70].map((x, i) => (
                    <motion.circle
                      key={`guess-${i}`}
                      cx={x}
                      cy={50 + i * 10}
                      r="4"
                      fill="#10B981"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  {/* Refined Points */}
                  {[120, 130, 140].map((x, i) => (
                    <motion.circle
                      key={`refined-${i}`}
                      cx={x}
                      cy={120 + i * 10}
                      r="4"
                      fill="#14B8A6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    />
                  ))}
                  <motion.path
                    d="M70,60 L110,130"
                    stroke="#10B981"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  <motion.text
                    x="60"
                    y="30"
                    textAnchor="middle"
                    fill="#10B981"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Guess
                  </motion.text>
                  <motion.text
                    x="130"
                    y="100"
                    textAnchor="middle"
                    fill="#14B8A6"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Refined
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 5. Mixtures of Gaussians */}
        <motion.section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-teal-700 mb-6">Mixtures of Gaussians</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Mixtures of Gaussians is like mixing different flavors of ice cream! It models data as a blend of bell-shaped curves (Gaussians) to capture different groups.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A pet store groups dogs by size. Some are small, some medium, some large. Mixtures of Gaussians fits three bell curves to show these size groups!
              </motion.p>
              <motion.div
                className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-teal-800 mb-3">Why It’s Sweet</h3>
                <p className="text-gray-700">
                  Handles overlapping groups better than K-Means, like sorting messy data into neat piles!
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
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Gaussian Curve 1 */}
                  <motion.path
                    d="M20,180 Q80,20 140,180"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="3"
                    className="gaussian-curve"
                  />
                  {/* Gaussian Curve 2 */}
                  <motion.path
                    d="M60,180 Q120,40 180,180"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    className="gaussian-curve"
                  />
                  <motion.text
                    x="80"
                    y="30"
                    textAnchor="middle"
                    fill="#14B8A6"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Small Dogs
                  </motion.text>
                  <motion.text
                    x="120"
                    y="50"
                    textAnchor="middle"
                    fill="#10B981"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Large Dogs
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 6. EM Algorithm in General */}
        <motion.section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-emerald-700 mb-6">EM Algorithm in General</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> The EM Algorithm is like playing a guessing game to solve a puzzle! It guesses hidden patterns in data, checks how good the guess is, and keeps tweaking until it fits perfectly.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A chef guesses the ingredients in a mystery dish, tastes it, and adjusts the recipe. EM does this with data, like guessing customer preferences in a store!
              </motion.p>
              <motion.div
                className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-emerald-800 mb-3">How It Rolls</h3>
                <p className="text-gray-700">
                  Expectation: Guess the pattern. Maximization: Tweak it to fit better. Repeat until the puzzle is solved!
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
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Initial Guess */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="8"
                    fill="#047857"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  {/* Refined Guess */}
                  <motion.circle
                    cx="140"
                    cy="140"
                    r="8"
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  />
                  <motion.path
                    d="M68,68 Q100,100 132,132"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  <motion.text
                    x="60"
                    y="40"
                    textAnchor="middle"
                    fill="#047857"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Initial Guess
                  </motion.text>
                  <motion.text
                    x="140"
                    y="120"
                    textAnchor="middle"
                    fill="#10B981"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Refined
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 7. The Curse of Dimensionality */}
        <motion.section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-red-700 mb-6">The Curse of Dimensionality</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> The Curse of Dimensionality is like getting lost in a giant maze! When data has too many features (dimensions), it spreads out, making it hard for models to find patterns.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A game app tracks 50 player stats (speed, skills, etc.). With so many stats, players seem too different to group. Fewer stats make grouping easier!
              </motion.p>
              <motion.div
                className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-red-800 mb-3">Why It’s Tricky</h3>
                <p className="text-gray-700">
                  More dimensions mean sparser data, fewer neighbors, and slower models. Time to simplify!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* 2D Points */}
                  {[50, 60, 70].map((x, i) => (
                    <motion.circle
                      key={`2d-${i}`}
                      cx={x}
                      cy={50}
                      r="4"
                      fill="#EF4444"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  {/* 3D Cube */}
                  <motion.path
                    d="M100,100 L120,80 L140,100 L120,120 Z M120,80 L120,60 L140,80 M140,100 L140,80"
                    stroke="#B91C1C"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.text
                    x="60"
                    y="30"
                    textAnchor="middle"
                    fill="#EF4444"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    2D: Packed
                  </motion.text>
                  <motion.text
                    x="130"
                    y="140"
                    textAnchor="middle"
                    fill="#B91C1C"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    3D: Sparse
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 8. Dimensionality Reduction */}
        <motion.section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Dimensionality Reduction</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Dimensionality Reduction is like cleaning out your messy backpack! It keeps only the most important features in data, making it simpler for models to work with.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A fitness app tracks 20 metrics (steps, heart rate, etc.). Dimensionality Reduction picks the top 2 (like steps and calories) to make tracking easier!
              </motion.p>
              <motion.div
                className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Why It’s Awesome</h3>
                <p className="text-gray-700">
                  Simplifies data, speeds up models, and avoids the Curse of Dimensionality!
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
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* High-Dimensional Points */}
                  {[50, 60, 70].map((x, i) => (
                    <motion.circle
                      key={`high-d-${i}`}
                      cx={x}
                      cy={50 + i * 10}
                      r="4"
                      fill="#4F46E5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  {/* Reduced-Dimensional Points */}
                  {[100, 110, 120].map((y, i) => (
                    <motion.circle
                      key={`low-d-${i}`}
                      cx="100"
                      cy={y}
                      r="4"
                      fill="#3B82F6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.6 }}
                    />
                  ))}
                  <motion.line
                    x1="100"
                    y1="80"
                    x2="100"
                    y2="140"
                    stroke="#1E3A8A"
                    strokeWidth="3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  />
                  <motion.text
                    x="60"
                    y="30"
                    textAnchor="middle"
                    fill="#4F46E5"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Many Features
                  </motion.text>
                  <motion.text
                    x="120"
                    y="160"
                    textAnchor="middle"
                    fill="#3B82F6"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Fewer Features
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 9. Factor Analysis */}
        <motion.section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Factor Analysis</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> Factor Analysis is like finding the secret ingredients behind a recipe! It uncovers hidden factors that explain why data behaves a certain way, reducing complexity.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A school tests students in math, science, and reading. Factor Analysis finds a hidden “academic ability” factor that explains their scores, simplifying analysis!
              </motion.p>
              <motion.div
                className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Why It’s Neat</h3>
                <p className="text-gray-700">
                  Reveals hidden patterns and reduces data to meaningful factors, like solving a mystery!
                </p>
              </motion.div>
            </div>
            <motion.div
              className="relative h-64"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Observed Variables */}
                  {[50, 70, 90].map((x, i) => (
                    <motion.circle
                      key={`obs-${i}`}
                      cx={x}
                      cy="50"
                      r="6"
                      fill="#3B82F6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  {/* Hidden Factor */}
                  <motion.circle
                    cx="70"
                    cy="120"
                    r="8"
                    fill="#1E3A8A"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                  {/* Connections */}
                  {[50, 70, 90].map((x, i) => (
                    <motion.line
                      key={`conn-${i}`}
                      x1={x}
                      y1="50"
                      x2="70"
                      y2="120"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.8 }}
                    />
                  ))}
                  <motion.text
                    x="70"
                    y="30"
                    textAnchor="middle"
                    fill="#3B82F6"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Test Scores
                  </motion.text>
                  <motion.text
                    x="70"
                    y="140"
                    textAnchor="middle"
                    fill="#1E3A8A"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Ability
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 10. Principal Component Analysis (PCA) */}
        <motion.section
          id="pca"
          ref={(el) => (sectionRefs.current[9] = el)}
          className="mb-20 p-8 bg-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Principal Component Analysis (PCA)</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <strong>Definition:</strong> PCA is like summarizing a long book into a few key chapters! It finds the most important directions in data and projects it onto them, reducing dimensions.
              </motion.p>
              <motion.p
                className="text-gray-700 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <strong>Real-Life Example:</strong> A movie app tracks 30 user preferences (genres, actors). PCA boils it down to 2 main tastes (e.g., action vs. romance) to make recommendations simpler!
              </motion.p>
              <motion.div
                className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">How PCA Rocks</h3>
                <p className="text-gray-700">
                  Picks the directions with the most action (variance) and simplifies data without losing the good stuff!
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
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* 3D Points */}
                  {[50, 60, 70].map((x, i) => (
                    <motion.circle
                      key={`3d-${i}`}
                      cx={x}
                      cy={50 + i * 10}
                      r="4"
                      fill="#4F46E5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  {/* Principal Component */}
                  <motion.line
                    x1="40"
                    y1="80"
                    x2="160"
                    y2="120"
                    stroke="#1E3A8A"
                    strokeWidth="3"
                    className="pca-projection"
                  />
                  {/* Projected Points */}
                  {[80, 100, 120].map((x, i) => (
                    <motion.circle
                      key={`proj-${i}`}
                      cx={x}
                      cy={80 + (x - 80) * 0.5}
                      r="4"
                      fill="#3B82F6"
                      className="pca-projection"
                    />
                  ))}
                  <motion.text
                    x="60"
                    y="30"
                    textAnchor="middle"
                    fill="#4F46E5"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Original Data
                  </motion.text>
                  <motion.text
                    x="120"
                    y="140"
                    textAnchor="middle"
                    fill="#3B82F6"
                    fontSize="12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    PCA Projection
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="mt-16 text-center text-gray-500">
          <p>BCA Part-III Examination 2025 - Jaipur University</p>
          <p className="mt-2">Clustering & Dimensionality Reduction Visualization</p>
        </div>
      </div>
    </div>
  );
};

export default ClusteringAndDimensionalityVisualization;