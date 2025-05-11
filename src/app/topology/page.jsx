'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TopologyVisualizer = () => {
  const [activeTopology, setActiveTopology] = useState('star');
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const topologies = {
    bus: {
      name: "Bus Topology",
      description: "All devices connected to a single central cable (bus)",
      advantages: [
        "Easy to install and extend",
        "Requires less cable than others",
        "Cost-effective for small networks"
      ],
      disadvantages: [
        "Data collisions can occur (CSMA/CD needed)",
        "Single point of failure (backbone cable)",
        "Performance degrades with more devices"
      ],
      uses: ["Early Ethernet networks", "Small temporary networks"],
      animation: "dataTravel"
    },
    star: {
      name: "Star Topology",
      description: "All devices connected to a central hub/switch",
      advantages: [
        "Easy to install and manage",
        "Device failure doesn't affect others",
        "Easy to troubleshoot"
      ],
      disadvantages: [
        "Hub/switch failure takes down network",
        "Requires more cabling than bus",
        "Performance depends on central device"
      ],
      uses: ["Modern LANs", "Home networks", "Office networks"],
      animation: "centralRouting"
    },
    ring: {
      name: "Ring Topology",
      description: "Devices connected in a circular loop",
      advantages: [
        "Equal network access for all devices",
        "Good performance for small networks",
        "No data collisions (token passing)"
      ],
      disadvantages: [
        "Single break disrupts entire network",
        "Difficult to troubleshoot",
        "Adding devices disrupts network"
      ],
      uses: ["Token Ring networks", "FDDI networks", "Some MANs"],
      animation: "tokenPassing"
    },
    mesh: {
      name: "Mesh Topology",
      description: "Each device connected to every other device",
      advantages: [
        "Highly fault-tolerant",
        "Multiple redundant paths",
        "High performance"
      ],
      disadvantages: [
        "Extremely high cabling cost",
        "Complex installation/maintenance",
        "N² connections required"
      ],
      uses: ["Military systems", "Financial networks", "Critical infrastructure"],
      animation: "multiPath"
    },
    tree: {
      name: "Tree Topology",
      description: "Hierarchical star networks connected via bus",
      advantages: [
        "Scalable for large networks",
        "Easy fault isolation",
        "Segmentable network"
      ],
      disadvantages: [
        "Dependent on root node",
        "Complex cabling structure",
        "Maintenance challenges"
      ],
      uses: ["University campuses", "Corporate networks", "WANs"],
      animation: "hierarchical"
    },
    hybrid: {
      name: "Hybrid Topology",
      description: "Combination of two or more topologies",
      advantages: [
        "Flexible and scalable",
        "Utilizes strengths of different topologies",
        "Fault isolation possible"
      ],
      disadvantages: [
        "Complex design",
        "Expensive implementation",
        "Maintenance expertise required"
      ],
      uses: ["Large enterprises", "Multi-department organizations", "ISPs"],
      animation: "combined"
    }
  };

  // Trigger re-render for animation reset
  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationKey(prev => prev + 1);
    setTimeout(() => setIsAnimating(true), 100);
  };

  useEffect(() => {
    resetAnimation();
  }, [activeTopology]);

  const renderTopology = () => {
    switch (activeTopology) {
      case 'bus':
        return (
          <div className="relative h-64">
            {/* Backbone cable */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400"></div>
            
            {/* Devices */}
            {[20, 40, 60, 80].map((pos) => (
              <motion.div
                key={pos}
                className="absolute top-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold -ml-4 -mt-4"
                style={{ left: `${pos}%` }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              >
                {pos/20}
              </motion.div>
            ))}
            
            {/* Data packets */}
            {isAnimating && (
              <>
                <motion.div
                  className="absolute top-1/2 w-4 h-4 bg-red-500 rounded-full -mt-2"
                  initial={{ left: '0%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-1/2 w-4 h-4 bg-green-500 rounded-full -mt-2"
                  initial={{ left: '100%' }}
                  animate={{ left: '0%' }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                />
              </>
            )}
          </div>
        );
      
      case 'star':
        return (
          <div className="relative h-64 flex items-center justify-center">
            {/* Central hub */}
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold z-10">
              HUB
            </div>
            
            {/* Devices */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * 60) - 90;
              const x = 100 * Math.cos(angle * Math.PI / 180);
              const y = 100 * Math.sin(angle * Math.PI / 180);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, delay: i * 0.1 }}
                >
                  {i+1}
                </motion.div>
              );
            })}
            
            {/* Connections */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * 60) - 90;
              const x = 100 * Math.cos(angle * Math.PI / 180);
              const y = 100 * Math.sin(angle * Math.PI / 180);
              
              return (
                <svg
                  key={i}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ zIndex: 1 }}
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x}px)`}
                    y2={`calc(50% + ${y}px)`}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                  />
                </svg>
              );
            })}
            
            {/* Data packets */}
            {isAnimating && (
              <>
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = (i * 60) - 90;
                  const x = 100 * Math.cos(angle * Math.PI / 180);
                  const y = 100 * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-purple-500 rounded-full z-20"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.5
                      }}
                    />
                  );
                })}
              </>
            )}
          </div>
        );
      
      case 'ring':
        return (
          <div className="relative h-64 flex items-center justify-center">
            {/* Ring circle */}
            <div className="absolute w-48 h-48 rounded-full border-4 border-gray-400"></div>
            
            {/* Devices */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * 60) - 90;
              const x = 100 * Math.cos(angle * Math.PI / 180);
              const y = 100 * Math.sin(angle * Math.PI / 180);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  {i+1}
                </motion.div>
              );
            })}
            
            {/* Token animation */}
            {isAnimating && (
              <motion.div
                className="absolute w-6 h-6 bg-green-500 rounded-full z-10"
                style={{
                  left: 'calc(50% + 100px)',
                  top: '50%',
                }}
                animate={{
                  left: ['calc(50% + 50px)', 'calc(50% + 0px)', 'calc(50% - 50px)', 'calc(50% - 100px)', 'calc(50% - 50px)', 'calc(50% + 0px)', 'calc(50% + 50px)', 'calc(50% + 100px)'],
                  top: ['calc(50% + 86.6px)', 'calc(50% + 100px)', 'calc(50% + 86.6px)', 'calc(50% + 0px)', 'calc(50% - 86.6px)', 'calc(50% - 100px)', 'calc(50% - 86.6px)', 'calc(50% + 0px)'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </div>
        );
      
      case 'mesh':
        return (
          <div className="relative h-64 flex items-center justify-center">
            {/* Devices */}
            {[
              { x: 0, y: 0 }, 
              { x: -80, y: -40 }, 
              { x: 80, y: -40 },
              { x: -80, y: 40 },
              { x: 80, y: 40 }
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, delay: i * 0.1 }}
              >
                {i+1}
              </motion.div>
            ))}
            
            {/* Connections */}
            {isAnimating && (
              <>
                {[0, 1, 2, 3, 4].flatMap((i, _, arr) => 
                  arr.slice(i+1).map(j => (
                    <motion.svg
                      key={`${i}-${j}`}
                      className="absolute top-0 left-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <line
                        x1={`calc(50% + ${[
                          { x: 0, y: 0 }, 
                          { x: -80, y: -40 }, 
                          { x: 80, y: -40 },
                          { x: -80, y: 40 },
                          { x: 80, y: 40 }
                        ][i].x}px)`}
                        y1={`calc(50% + ${[
                          { x: 0, y: 0 }, 
                          { x: -80, y: -40 }, 
                          { x: 80, y: -40 },
                          { x: -80, y: 40 },
                          { x: 80, y: 40 }
                        ][i].y}px)`}
                        x2={`calc(50% + ${[
                          { x: 0, y: 0 }, 
                          { x: -80, y: -40 }, 
                          { x: 80, y: -40 },
                          { x: -80, y: 40 },
                          { x: 80, y: 40 }
                        ][j].x}px)`}
                        y2={`calc(50% + ${[
                          { x: 0, y: 0 }, 
                          { x: -80, y: -40 }, 
                          { x: 80, y: -40 },
                          { x: -80, y: 40 },
                          { x: 80, y: 40 }
                        ][j].y}px)`}
                        stroke="#9CA3AF"
                        strokeWidth="1"
                      />
                    </motion.svg>
                  ))
                )}
                
                {/* Data packets */}
                {[0, 1, 2, 3, 4].flatMap((i, _, arr) => 
                  arr.slice(i+1).map(j => (
                    <motion.div
                      key={`${i}-${j}-packet`}
                      className="absolute w-3 h-3 bg-red-500 rounded-full z-10"
                      style={{
                        left: `calc(50% + ${[
                          { x: 0, y: 0 }, 
                          { x: -80, y: -40 }, 
                          { x: 80, y: -40 },
                          { x: -80, y: 40 },
                          { x: 80, y: 40 }
                        ][i].x}px)`,
                        top: `calc(50% + ${[
                          { x: 0, y: 0 }, 
                          { x: -80, y: -40 }, 
                          { x: 80, y: -40 },
                          { x: -80, y: 40 },
                          { x: 80, y: 40 }
                        ][i].y}px)`,
                      }}
                      animate={{
                        left: `calc(50% + ${[
                          { x: 0, y: 0 }, 
                          { x: -80, y: -40 }, 
                          { x: 80, y: -40 },
                          { x: -80, y: 40 },
                          { x: 80, y: 40 }
                        ][j].x}px)`,
                        top: `calc(50% + ${[
                          { x: 0, y: 0 }, 
                          { x: -80, y: -40 }, 
                          { x: 80, y: -40 },
                          { x: -80, y: 40 },
                          { x: 80, y: 40 }
                        ][j].y}px)`,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: (i + j) * 0.3
                      }}
                    />
                  ))
                )}
              </>
            )}
          </div>
        );
      
      case 'tree':
        return (
          <div className="relative h-64">
            {/* Root node */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            
            {/* Level 1 nodes */}
            {[30, 50, 70].map((pos, i) => (
              <div key={i} className="absolute top-20" style={{ left: `${pos}%` }}>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                  {i+2}
                </div>
                
                {/* Connection to root */}
                <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-1 h-10">
                  <line x1="50%" y1="100%" x2="50%" y2="0%" stroke="#9CA3AF" strokeWidth="2" />
                </svg>
                
                {/* Level 2 nodes */}
                {[25, 75].map((subPos, j) => (
                  <div key={j} className="absolute top-20" style={{ left: `${subPos}%` }}>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                      {i+2}.{j+1}
                    </div>
                    
                    {/* Connection to parent */}
                    <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-1 h-10">
                      <line x1="50%" y1="100%" x2="50%" y2="0%" stroke="#9CA3AF" strokeWidth="2" />
                    </svg>
                  </div>
                ))}
              </div>
            ))}
            
            {/* Data flow animation */}
            {isAnimating && (
              <>
                {/* Root to level 1 */}
                {[30, 50, 70].map((pos, i) => (
                  <motion.div
                    key={`l1-${i}`}
                    className="absolute w-4 h-4 bg-green-500 rounded-full"
                    style={{
                      left: '50%',
                      top: '20px',
                    }}
                    animate={{
                      left: `${pos}%`,
                      top: '80px',
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.5
                    }}
                  />
                ))}
                
                {/* Level 1 to level 2 */}
                {[30, 50, 70].flatMap((pos, i) => 
                  [25, 75].map((subPos, j) => (
                    <motion.div
                      key={`l2-${i}-${j}`}
                      className="absolute w-3 h-3 bg-purple-500 rounded-full"
                      style={{
                        left: `${pos}%`,
                        top: '80px',
                      }}
                      animate={{
                        left: `${pos + (subPos === 25 ? -5 : 5)}%`,
                        top: '160px',
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1.5 + (i * 0.3) + (j * 0.15)
                      }}
                    />
                  ))
                )}
              </>
            )}
          </div>
        );
      
      case 'hybrid':
        return (
          <div className="relative h-64">
            {/* Combination of star and bus */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
              HUB
            </div>
            
            {/* Star connections */}
            {[20, 50, 80].map((pos, i) => (
              <div key={i} className="absolute top-20" style={{ left: `${pos}%` }}>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                  {i+1}
                </div>
                
                {/* Connection to hub */}
                <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-full h-10">
                  <line 
                    x1={`${i === 0 ? '80%' : i === 1 ? '50%' : '20%'}`} 
                    y1="100%" 
                    x2="50%" 
                    y2="0%" 
                    stroke="#9CA3AF" 
                    strokeWidth="2" 
                  />
                </svg>
              </div>
            ))}
            
            {/* Bus backbone */}
            <div className="absolute top-32 left-0 right-0 h-2 bg-gray-400"></div>
            
            {/* Bus devices */}
            {[20, 40, 60, 80].map((pos, i) => (
              <div key={`bus-${i}`} className="absolute top-32 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold -ml-4" style={{ left: `${pos}%` }}>
                B{i+1}
              </div>
            ))}
            
            {/* Data animation */}
            {isAnimating && (
              <>
                {/* Star animation */}
                {[20, 50, 80].map((pos, i) => (
                  <motion.div
                    key={`star-${i}`}
                    className="absolute w-4 h-4 bg-red-500 rounded-full"
                    style={{
                      left: '50%',
                      top: '40px',
                    }}
                    animate={{
                      left: `${pos}%`,
                      top: '80px',
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.5
                    }}
                  />
                ))}
                
                {/* Bus animation */}
                <motion.div
                  className="absolute top-32 w-4 h-4 bg-purple-500 rounded-full -mt-2"
                  initial={{ left: '0%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Network Topology Visualizer</h1>
        <p className="text-center text-gray-600 mb-8">Interactive visualization of different network configurations</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Topology Visualization */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              {/* Topology Selector */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {Object.keys(topologies).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTopology(key);
                      resetAnimation();
                    }}
                    className={`px-3 py-2 text-sm rounded-lg ${activeTopology === key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {topologies[key].name}
                  </button>
                ))}
              </div>
              
              {/* Topology Animation */}
              <div key={animationKey} className="relative h-64 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                {renderTopology()}
              </div>
              
              <div className="flex justify-center mt-4 space-x-4">
                <button 
                  onClick={resetAnimation}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  Restart Animation
                </button>
                <button 
                  onClick={() => setIsAnimating(!isAnimating)}
                  className={`px-4 py-2 ${isAnimating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition text-sm`}
                >
                  {isAnimating ? 'Pause' : 'Play'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Topology Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{topologies[activeTopology].name}</h2>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-1">Description:</h3>
                <p>{topologies[activeTopology].description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-2">Advantages:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {topologies[activeTopology].advantages.map((item, i) => (
                      <li key={i} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-red-700 mb-2">Disadvantages:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {topologies[activeTopology].disadvantages.map((item, i) => (
                      <li key={i} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-2">Common Uses:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {topologies[activeTopology].uses.map((item, i) => (
                    <li key={i} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <h3 className="font-semibold text-yellow-700 mb-2">Technical Insight:</h3>
                {activeTopology === 'bus' && (
                  <p className="text-sm">Uses CSMA/CD (Carrier Sense Multiple Access with Collision Detection) to manage data collisions on the shared medium.</p>
                )}
                {activeTopology === 'star' && (
                  <p className="text-sm">Modern implementations typically use switches instead of hubs, creating a separate collision domain for each device.</p>
                )}
                {activeTopology === 'ring' && (
                  <p className="text-sm">Uses token passing (Token Ring) or beaconing (FDDI) to control network access and prevent collisions.</p>
                )}
                {activeTopology === 'mesh' && (
                  <p className="text-sm">Often implemented as a wireless mesh network in modern deployments to reduce cabling requirements.</p>
                )}
                {activeTopology === 'tree' && (
                  <p className="text-sm">Also known as hierarchical star topology, commonly used with VLANs in enterprise networks.</p>
                )}
                {activeTopology === 'hybrid' && (
                  <p className="text-sm">Allows network designers to optimize different segments of the network for specific requirements.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopologyVisualizer;