'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NetworkCategoriesVisualizer = () => {
  const [activeCategory, setActiveCategory] = useState('client-server');
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = {
    'client-server': {
      name: "Client-Server Network",
      description: "Centralized architecture where servers provide services to client devices",
      features: [
        "Centralized data storage and management",
        "Clients request services from servers",
        "Servers process requests and return responses",
        "Common in business environments"
      ],
      advantages: [
        "Centralized security and control",
        "Easier maintenance and updates",
        "Better resource sharing",
        "Scalable for many clients"
      ],
      disadvantages: [
        "Single point of failure (server)",
        "Higher implementation cost",
        "Requires professional administration",
        "Performance bottleneck if server overloaded"
      ],
      examples: [
        "Corporate email systems",
        "Web servers and browsers",
        "Database applications",
        "Online banking systems"
      ],
      color: "bg-blue-100 border-blue-400"
    },
    'peer-to-peer': {
      name: "Peer-to-Peer Network",
      description: "Decentralized architecture where all devices have equal capabilities",
      features: [
        "No dedicated servers",
        "Each node can be client and server",
        "Direct communication between peers",
        "Distributed resource sharing"
      ],
      advantages: [
        "No single point of failure",
        "Lower implementation cost",
        "Easy to set up and maintain",
        "Scalable for small groups"
      ],
      disadvantages: [
        "Less security control",
        "Difficult to administer",
        "Poorer performance with many peers",
        "No centralized backup"
      ],
      examples: [
        "File sharing (BitTorrent)",
        "Blockchain networks",
        "Skype (earlier versions)",
        "Home network sharing"
      ],
      color: "bg-green-100 border-green-400"
    },
    'public': {
      name: "Public Network",
      description: "Open networks accessible to any user, typically over the Internet",
      features: [
        "Available to general public",
        "Uses shared infrastructure",
        "Requires security measures",
        "Often free or subscription-based"
      ],
      advantages: [
        "Wide accessibility",
        "Low/no cost to users",
        "Global connectivity",
        "Easy to connect"
      ],
      disadvantages: [
        "Security and privacy risks",
        "No quality of service guarantees",
        "Vulnerable to attacks",
        "Bandwidth limitations"
      ],
      examples: [
        "Public Wi-Fi hotspots",
        "The Internet",
        "Cellular data networks",
        "Municipal wireless networks"
      ],
      color: "bg-yellow-100 border-yellow-400"
    },
    'private': {
      name: "Private Network",
      description: "Restricted networks for specific organizations or users",
      features: [
        "Access controlled by owner",
        "Enhanced security measures",
        "Dedicated infrastructure",
        "Custom configurations"
      ],
      advantages: [
        "Higher security",
        "Better performance control",
        "Customizable to needs",
        "Reliable connectivity"
      ],
      disadvantages: [
        "Higher implementation cost",
        "Limited accessibility",
        "Requires maintenance",
        "Geographically constrained"
      ],
      examples: [
        "Corporate intranets",
        "Banking networks",
        "Military communications",
        "Hospital record systems"
      ],
      color: "bg-purple-100 border-purple-400"
    },
    'enterprise': {
      name: "Enterprise Network",
      description: "Large-scale private network connecting multiple locations and services",
      features: [
        "Connects entire organization",
        "Combines LANs, WANs, and MANs",
        "High-performance infrastructure",
        "Advanced security systems"
      ],
      advantages: [
        "Organization-wide connectivity",
        "Centralized management",
        "High reliability",
        "Supports thousands of users"
      ],
      disadvantages: [
        "Very high cost",
        "Complex to design and maintain",
        "Requires IT specialists",
        "Vulnerable to internal threats"
      ],
      examples: [
        "Multinational corporate networks",
        "University campus networks",
        "Government agency networks",
        "Hospital healthcare systems"
      ],
      color: "bg-red-100 border-red-400"
    }
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationKey(prev => prev + 1);
    setTimeout(() => setIsAnimating(true), 100);
  };

  useEffect(() => {
    resetAnimation();
  }, [activeCategory]);

  const renderVisualization = () => {
    switch (activeCategory) {
      case 'client-server':
        return (
          <div className="relative h-64">
            {/* Server */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-blue-500 rounded-lg flex flex-col items-center justify-center text-white"
              animate={isAnimating ? { 
                scale: [1, 1.05, 1],
                boxShadow: ["0 4px 6px rgba(0,0,0,0.1)", "0 10px 15px rgba(0,0,0,0.1)", "0 4px 6px rgba(0,0,0,0.1)"]
              } : {}}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              <div className="text-2xl">🖥️</div>
              <div className="text-xs mt-1">Server</div>
            </motion.div>
            
            {/* Clients */}
            {[0, 1, 2, 3].map((i) => {
              const angle = i * 90;
              const x = 80 * Math.cos(angle * Math.PI / 180);
              const y = 80 * Math.sin(angle * Math.PI / 180);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  animate={isAnimating ? { 
                    scale: [1, 1.1, 1],
                    y: [0, -5, 0]
                  } : {}}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <div className="text-xl">💻</div>
                </motion.div>
              );
            })}
            
            {/* Connections */}
            {isAnimating && (
              <>
                {[0, 1, 2, 3].map((i) => {
                  const angle = i * 90;
                  const x = 80 * Math.cos(angle * Math.PI / 180);
                  const y = 80 * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <motion.svg
                      key={i}
                      className="absolute top-0 left-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${x}px)`}
                        y2={`calc(50% + ${y}px)`}
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    </motion.svg>
                  );
                })}
                
                {/* Data packets */}
                {[0, 1, 2, 3].map((i) => {
                  const angle = i * 90;
                  const x = 80 * Math.cos(angle * Math.PI / 180);
                  const y = 80 * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <motion.div
                      key={`req-${i}`}
                      className="absolute w-3 h-3 bg-green-500 rounded-full"
                      style={{
                        left: `calc(50% + ${x/2}px)`,
                        top: `calc(50% + ${y/2}px)`,
                      }}
                      animate={{
                        left: ['50%', `calc(50% + ${x}px)`],
                        top: ['50%', `calc(50% + ${y}px)`],
                      }}
                      transition={{
                        duration: 1,
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
      
      case 'peer-to-peer':
        return (
          <div className="relative h-64">
            {/* Peers */}
            {[0, 1, 2, 3].map((i) => {
              const angle = i * 90;
              const x = 60 * Math.cos(angle * Math.PI / 180);
              const y = 60 * Math.sin(angle * Math.PI / 180);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  animate={isAnimating ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <div className="text-xl">💻</div>
                </motion.div>
              );
            })}
            
            {/* Connections */}
            {isAnimating && (
              <>
                {[0, 1, 2, 3].flatMap((i, _, arr) => 
                  arr.slice(i+1).map(j => {
                    const angle1 = i * 90;
                    const x1 = 60 * Math.cos(angle1 * Math.PI / 180);
                    const y1 = 60 * Math.sin(angle1 * Math.PI / 180);
                    
                    const angle2 = j * 90;
                    const x2 = 60 * Math.cos(angle2 * Math.PI / 180);
                    const y2 = 60 * Math.sin(angle2 * Math.PI / 180);
                    
                    return (
                      <motion.svg
                        key={`${i}-${j}`}
                        className="absolute top-0 left-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <line
                          x1={`calc(50% + ${x1}px)`}
                          y1={`calc(50% + ${y1}px)`}
                          x2={`calc(50% + ${x2}px)`}
                          y2={`calc(50% + ${y2}px)`}
                          stroke="#10b981"
                          strokeWidth="1.5"
                          strokeDasharray="3,3"
                        />
                      </motion.svg>
                    );
                  })
                )}
                
                {/* Data packets */}
                {[0, 1, 2, 3].flatMap((i, _, arr) => 
                  arr.slice(i+1).map(j => {
                    const angle1 = i * 90;
                    const x1 = 60 * Math.cos(angle1 * Math.PI / 180);
                    const y1 = 60 * Math.sin(angle1 * Math.PI / 180);
                    
                    const angle2 = j * 90;
                    const x2 = 60 * Math.cos(angle2 * Math.PI / 180);
                    const y2 = 60 * Math.sin(angle2 * Math.PI / 180);
                    
                    return (
                      <motion.div
                        key={`pkt-${i}-${j}`}
                        className="absolute w-2 h-2 bg-purple-500 rounded-full"
                        style={{
                          left: `calc(50% + ${x1}px)`,
                          top: `calc(50% + ${y1}px)`,
                        }}
                        animate={{
                          left: [`calc(50% + ${x1}px)`, `calc(50% + ${x2}px)`],
                          top: [`calc(50% + ${y1}px)`, `calc(50% + ${y2}px)`],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: (i + j) * 0.3
                        }}
                      />
                    );
                  })
                )}
              </>
            )}
          </div>
        );
      
      case 'public':
        return (
          <div className="relative h-64">
            {/* Internet cloud */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="text-blue-800 font-semibold">Public Internet</div>
            </div>
            
            {/* Users */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = i * 60;
              const x = 100 * Math.cos(angle * Math.PI / 180);
              const y = 100 * Math.sin(angle * Math.PI / 180);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  animate={isAnimating ? { 
                    scale: [1, 1.05, 1],
                    y: [0, -3, 0]
                  } : {}}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <div className="text-lg">👤</div>
                </motion.div>
              );
            })}
            
            {/* Connections */}
            {isAnimating && (
              <>
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = i * 60;
                  const x = 100 * Math.cos(angle * Math.PI / 180);
                  const y = 100 * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <motion.svg
                      key={i}
                      className="absolute top-0 left-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path
                        d={`M calc(50% + ${x}px) calc(50% + ${y}px) Q 50% 50%, 50% 30%`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                      />
                    </motion.svg>
                  );
                })}
                
                {/* Data packets */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = i * 60;
                  const x = 100 * Math.cos(angle * Math.PI / 180);
                  const y = 100 * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <motion.div
                      key={`pkt-${i}`}
                      className="absolute w-2 h-2 bg-red-500 rounded-full"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      animate={{
                        left: [`calc(50% + ${x}px)`, '50%'],
                        top: [`calc(50% + ${y}px)`, '30%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.3
                      }}
                    />
                  );
                })}
              </>
            )}
          </div>
        );
      
      case 'private':
        return (
          <div className="relative h-64">
            {/* Private cloud */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-400">
              <div className="text-purple-800 font-semibold">Private Network</div>
            </div>
            
            {/* Firewall */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-16 bg-gray-300 flex items-center justify-center">
              <div className="text-xs rotate-90">FIREWALL</div>
            </div>
            
            {/* Authorized users */}
            {[0, 1, 2].map((i) => {
              const angle = i * 120 - 30;
              const x = 80 * Math.cos(angle * Math.PI / 180);
              const y = 80 * Math.sin(angle * Math.PI / 180);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center border-2 border-purple-500"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  animate={isAnimating ? { 
                    scale: [1, 1.05, 1],
                    borderColor: ["#8b5cf6", "#a78bfa", "#8b5cf6"]
                  } : {}}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <div className="text-lg">👔</div>
                </motion.div>
              );
            })}
            
            {/* Blocked user */}
            {isAnimating && (
              <motion.div
                className="absolute w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
                style={{
                  left: '80%',
                  top: '70%',
                }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  x: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <div className="text-lg">🚫</div>
              </motion.div>
            )}
            
            {/* Connections */}
            {isAnimating && (
              <>
                {[0, 1, 2].map((i) => {
                  const angle = i * 120 - 30;
                  const x = 80 * Math.cos(angle * Math.PI / 180);
                  const y = 80 * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <motion.svg
                      key={i}
                      className="absolute top-0 left-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path
                        d={`M calc(50% + ${x}px) calc(50% + ${y}px) Q 50% 50%, 50% 30%`}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                      />
                    </motion.svg>
                  );
                })}
                
                {/* Data packets */}
                {[0, 1, 2].map((i) => {
                  const angle = i * 120 - 30;
                  const x = 80 * Math.cos(angle * Math.PI / 180);
                  const y = 80 * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <motion.div
                      key={`pkt-${i}`}
                      className="absolute w-3 h-3 bg-purple-500 rounded-full"
                      style={{
                        left: `calc(50% + ${x/2}px)`,
                        top: `calc(50% + ${y/2}px)`,
                      }}
                      animate={{
                        left: [`calc(50% + ${x}px)`, '50%'],
                        top: [`calc(50% + ${y}px)`, '30%'],
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
      
      case 'enterprise':
        return (
          <div className="relative h-64">
            {/* Central data center */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">
              Data Center
            </div>
            
            {/* Departments */}
            {[
              { left: '20%', top: '60%', name: "HR" },
              { left: '35%', top: '30%', name: "Finance" },
              { left: '65%', top: '30%', name: "Engineering" },
              { left: '80%', top: '60%', name: "Operations" }
            ].map((dept, i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center border border-red-400"
                style={{ left: dept.left, top: dept.top }}
                animate={isAnimating ? { 
                  y: [0, -5, 0],
                  borderColor: ["#fecaca", "#fca5a5", "#fecaca"]
                } : {}}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                <div className="text-xs text-center">{dept.name}</div>
              </motion.div>
            ))}
            
            {/* Connections */}
            {isAnimating && (
              <>
                {[
                  { fromX: '20%', fromY: '60%' },
                  { fromX: '35%', fromY: '30%' },
                  { fromX: '65%', fromY: '30%' },
                  { fromX: '80%', fromY: '60%' }
                ].map((dept, i) => (
                  <motion.svg
                    key={i}
                    className="absolute top-0 left-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <line
                      x1={dept.fromX}
                      y1={dept.fromY}
                      x2="50%"
                      y2="20%"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                    />
                  </motion.svg>
                ))}
                
                {/* Data packets */}
                {[
                  { fromX: '20%', fromY: '60%', delay: 0 },
                  { fromX: '35%', fromY: '30%', delay: 0.5 },
                  { fromX: '65%', fromY: '30%', delay: 1 },
                  { fromX: '80%', fromY: '60%', delay: 1.5 }
                ].map((dept, i) => (
                  <motion.div
                    key={`pkt-${i}`}
                    className="absolute w-3 h-3 bg-red-500 rounded-full"
                    style={{
                      left: dept.fromX,
                      top: dept.fromY,
                    }}
                    animate={{
                      left: [dept.fromX, '50%'],
                      top: [dept.fromY, '20%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: dept.delay
                    }}
                  />
                ))}
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
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Network Categories Visualizer</h1>
        <p className="text-center text-gray-600 mb-8">Explore different network architectures and their characteristics</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Visualization */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              {/* Category Selector */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                {Object.keys(categories).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      resetAnimation();
                    }}
                    className={`px-2 py-2 text-xs rounded-lg ${activeCategory === key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {categories[key].name.split(' ')[0]}
                  </button>
                ))}
              </div>
              
              {/* Network Visualization */}
              <div key={animationKey} className="relative h-64 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                {renderVisualization()}
              </div>
              
              <div className="flex justify-center mt-4 space-x-4">
                <button 
                  onClick={resetAnimation}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  Restart
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

          {/* Right Column - Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{categories[activeCategory].name}</h2>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-1">Description:</h3>
                <p>{categories[activeCategory].description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-2">Key Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {categories[activeCategory].features.map((feature, i) => (
                      <li key={i} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-yellow-700 mb-2">Examples:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {categories[activeCategory].examples.map((example, i) => (
                      <li key={i} className="text-sm">{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-2">Advantages:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {categories[activeCategory].advantages.map((adv, i) => (
                      <li key={i} className="text-sm">{adv}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-red-700 mb-2">Disadvantages:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {categories[activeCategory].disadvantages.map((disadv, i) => (
                      <li key={i} className="text-sm">{disadv}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                <h3 className="font-semibold text-gray-700 mb-2">Technical Insight:</h3>
                {activeCategory === 'client-server' && (
                  <p className="text-sm">Client-server architecture typically uses TCP for reliable connections. Servers often listen on well-known ports (HTTP=80, HTTPS=443) while clients use ephemeral ports. Load balancers are commonly used to distribute client requests across multiple servers.</p>
                )}
                {activeCategory === 'peer-to-peer' && (
                  <p className="text-sm">P2P networks often use UDP for faster communication and implement application-layer protocols for discovery and coordination. NAT traversal techniques like STUN/TURN/ICE are commonly needed for direct peer connections across different networks.</p>
                )}
                {activeCategory === 'public' && (
                  <p className="text-sm">Public networks require encryption (TLS/SSL) for security. VPNs create secure tunnels over public networks. Quality of Service (QoS) is challenging due to shared bandwidth and lack of centralized control.</p>
                )}
                {activeCategory === 'private' && (
                  <p className="text-sm">Private networks often use RFC 1918 address spaces (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) with NAT for internet access. Enterprise-grade firewalls, IDS/IPS, and VLANs are commonly deployed for segmentation and security.</p>
                )}
                {activeCategory === 'enterprise' && (
                  <p className="text-sm">Enterprise networks typically implement hierarchical designs with core, distribution, and access layers. They use advanced routing protocols (OSPF, BGP), MPLS for WAN connectivity, and SD-WAN for optimizing traffic across multiple connections.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkCategoriesVisualizer;