'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NetworkTypesVisualizer = () => {
  const [activeNetwork, setActiveNetwork] = useState('pan');
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const networks = {
    pan: {
      name: "Personal Area Network (PAN)",
      description: "Smallest network for personal device connectivity",
      coverage: "1-10 meters",
      speed: "Up to 2 Mbps (Bluetooth)",
      technologies: ["Bluetooth", "Infrared", "ZigBee", "USB"],
      examples: [
        "Phone to laptop connection",
        "Smartwatch syncing",
        "Wireless headphones"
      ],
      color: "bg-purple-100 border-purple-400"
    },
    lan: {
      name: "Local Area Network (LAN)",
      description: "Connects devices within a limited area like home or office",
      coverage: "Up to 1 km",
      speed: "100 Mbps - 10 Gbps",
      technologies: ["Ethernet", "Wi-Fi", "Token Ring"],
      examples: [
        "Office computer network",
        "Home Wi-Fi network",
        "School computer lab"
      ],
      color: "bg-blue-100 border-blue-400"
    },
    man: {
      name: "Metropolitan Area Network (MAN)",
      description: "Covers a city or large campus area",
      coverage: "5-50 km",
      speed: "10 Mbps - 1 Gbps",
      technologies: ["Fiber optics", "Microwave", "Ethernet"],
      examples: [
        "City-wide cable network",
        "University campus network",
        "Municipal Wi-Fi"
      ],
      color: "bg-green-100 border-green-400"
    },
    wan: {
      name: "Wide Area Network (WAN)",
      description: "Spans countries/continents, connects multiple LANs/MANs",
      coverage: "100s - 1000s km",
      speed: "1 Mbps - 100 Mbps",
      technologies: ["MPLS", "Satellite", "Fiber optics", "Leased lines"],
      examples: [
        "The Internet",
        "Bank ATM networks",
        "Corporate global networks"
      ],
      color: "bg-yellow-100 border-yellow-400"
    },
    can: {
      name: "Campus Area Network (CAN)",
      description: "Connects buildings within a university or industrial campus",
      coverage: "1-5 km",
      speed: "100 Mbps - 10 Gbps",
      technologies: ["Ethernet", "Fiber optics", "Wireless bridges"],
      examples: [
        "University campus network",
        "Hospital complex network",
        "Military base network"
      ],
      color: "bg-orange-100 border-orange-400"
    },
    vpn: {
      name: "Virtual Private Network (VPN)",
      description: "Secure encrypted connection over public networks",
      coverage: "Global (over Internet)",
      speed: "Varies (5-100 Mbps typical)",
      technologies: ["IPSec", "SSL/TLS", "WireGuard", "OpenVPN"],
      examples: [
        "Remote work access",
        "Bypassing geo-restrictions",
        "Secure public Wi-Fi usage"
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
  }, [activeNetwork]);

  const renderNetworkVisualization = () => {
    switch (activeNetwork) {
      case 'pan':
        return (
          <div className="relative h-64 flex items-center justify-center">
            {/* Central device (phone) */}
            <motion.div 
              className="absolute w-16 h-24 bg-gray-800 rounded-xl flex items-center justify-center text-white"
              animate={isAnimating ? { rotate: [0, -5, 5, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              📱
            </motion.div>
            
            {/* Peripheral devices */}
            {[
              { angle: 0, distance: 80, device: "⌚", name: "Watch" },
              { angle: 120, distance: 80, device: "🎧", name: "Headphones" },
              { angle: 240, distance: 80, device: "💻", name: "Laptop" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-md"
                style={{
                  left: `calc(50% + ${Math.cos(item.angle * Math.PI / 180) * item.distance}px)`,
                  top: `calc(50% + ${Math.sin(item.angle * Math.PI / 180) * item.distance}px)`,
                }}
                animate={isAnimating ? { 
                  y: [0, -5, 5, 0],
                  opacity: [0.8, 1, 0.8]
                } : {}}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  delay: i * 0.3
                }}
              >
                {item.device}
              </motion.div>
            ))}
            
            {/* Connection lines */}
            {isAnimating && (
              <>
                {[0, 120, 240].map((angle, i) => (
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
                      x2={`calc(50% + ${Math.cos(angle * Math.PI / 180) * 80}px)`}
                      y2={`calc(50% + ${Math.sin(angle * Math.PI / 180) * 80}px)`}
                      stroke="#9333ea"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  </motion.svg>
                ))}
              </>
            )}
          </div>
        );
      
      case 'lan':
        return (
          <div className="relative h-64">
            {/* Router */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gray-700 rounded flex items-center justify-center text-white">
              <div className="text-xs">Wi-Fi Router</div>
            </div>
            
            {/* Connected devices */}
            {[
              { left: '20%', top: '40%', device: "💻", name: "Laptop" },
              { left: '40%', top: '60%', device: "📱", name: "Phone" },
              { left: '60%', top: '40%', device: "🖨️", name: "Printer" },
              { left: '80%', top: '60%', device: "📺", name: "Smart TV" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm"
                style={{ left: item.left, top: item.top }}
                animate={isAnimating ? { 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 1px 3px rgba(0,0,0,0.1)", "0 4px 6px rgba(0,0,0,0.1)", "0 1px 3px rgba(0,0,0,0.1)"]
                } : {}}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  delay: i * 0.2
                }}
              >
                {item.device}
              </motion.div>
            ))}
            
            {/* Wi-Fi waves */}
            {isAnimating && (
              <motion.div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-2 border-blue-400"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2, opacity: [0.5, 0.3, 0] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeOut"
                }}
              />
            )}
          </div>
        );
      
      case 'man':
        return (
          <div className="relative h-64">
            {/* City skyline */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-300 flex justify-around">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="h-full w-8 bg-gray-500" style={{ height: `${20 + Math.random() * 30}px` }}></div>
              ))}
            </div>
            
            {/* Buildings with LANs */}
            {[
              { left: '15%', label: "University" },
              { left: '35%', label: "Hospital" },
              { left: '55%', label: "City Hall" },
              { left: '75%', label: "Library" }
            ].map((item, i) => (
              <div key={i} className="absolute bottom-16" style={{ left: item.left }}>
                <div className="w-12 h-20 bg-gray-600 mx-auto">
                  <div className="text-xs text-center text-white mt-1">{item.label}</div>
                </div>
                
                {/* Building LAN */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-xs text-white">
                  LAN
                </div>
              </div>
            ))}
            
            {/* Fiber connections */}
            {isAnimating && (
              <>
                {[15, 35, 55, 75].flatMap((left, i, arr) => 
                  arr.slice(i+1).map(right => (
                    <motion.svg
                      key={`${left}-${right}`}
                      className="absolute top-0 left-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <line
                        x1={`${left}%`}
                        y1="40%"
                        x2={`${right}%`}
                        y2="40%"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="5,3"
                      />
                    </motion.svg>
                  ))
                )}
                
                {/* Data packets */}
                {[15, 35, 55, 75].flatMap((left, i, arr) => 
                  arr.slice(i+1).map(right => (
                    <motion.div
                      key={`pkt-${left}-${right}`}
                      className="absolute w-3 h-3 bg-green-500 rounded-full"
                      style={{ top: '40%', left: `${left}%` }}
                      animate={{ left: [`${left}%`, `${right}%`, `${left}%`] }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                      }}
                    />
                  ))
                )}
              </>
            )}
          </div>
        );
      
      case 'wan':
        return (
          <div className="relative h-64">
            {/* World map background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg viewBox="0 0 800 400" className="w-full h-full">
                <path d="M400,200a150,150 0 1,0 0.1,0z" fill="none" stroke="blue" strokeWidth="2"/>
              </svg>
            </div>
            
            {/* Continents/cities */}
            {[
              { left: '15%', top: '30%', label: "New York" },
              { left: '30%', top: '60%', label: "London" },
              { left: '70%', top: '50%', label: "Tokyo" },
              { left: '85%', top: '30%', label: "San Francisco" }
            ].map((item, i) => (
              <div key={i} className="absolute" style={{ left: item.left, top: item.top }}>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                  {item.label.split(' ')[0][0]}
                </div>
                <div className="text-xs text-center mt-1">{item.label}</div>
              </div>
            ))}
            
            {/* Satellite */}
            {isAnimating && (
              <motion.div
                className="absolute w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center"
                style={{ left: '50%', top: '20%' }}
                animate={{ 
                  rotate: 360,
                  x: [0, 20, 0, -20, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="text-xs">SAT</div>
              </motion.div>
            )}
            
            {/* Connections */}
            {isAnimating && (
              <>
                {/* Terrestrial links */}
                {[
                  ['15%', '30%', '30%', '60%'],
                  ['30%', '60%', '70%', '50%'],
                  ['70%', '50%', '85%', '30%'],
                  ['85%', '30%', '15%', '30%']
                ].map((coords, i) => (
                  <motion.svg
                    key={`terr-${i}`}
                    className="absolute top-0 left-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <line
                      x1={coords[0]}
                      y1={coords[1]}
                      x2={coords[2]}
                      y2={coords[3]}
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                      strokeDasharray="5,3"
                    />
                  </motion.svg>
                ))}
                
                {/* Satellite links */}
                {[
                  { fromX: '15%', fromY: '30%' },
                  { fromX: '30%', fromY: '60%' },
                  { fromX: '70%', fromY: '50%' },
                  { fromX: '85%', fromY: '30%' }
                ].map((item, i) => (
                  <motion.svg
                    key={`sat-${i}`}
                    className="absolute top-0 left-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path
                      d={`M ${item.fromX} ${item.fromY} Q 50% 15%, 50% 20%`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="5,3"
                    />
                  </motion.svg>
                ))}
                
                {/* Data packets */}
                {[
                  { path: "M 15% 30% L 30% 60%", delay: 0 },
                  { path: "M 30% 60% L 70% 50%", delay: 1 },
                  { path: "M 70% 50% L 85% 30%", delay: 2 },
                  { path: "M 85% 30% L 15% 30%", delay: 3 }
                ].map((item, i) => (
                  <motion.div
                    key={`pkt-${i}`}
                    className="absolute w-3 h-3 bg-red-500 rounded-full"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                      x: [0, 100, 200, 300],
                      y: [0, 50, 0, -50]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: item.delay
                    }}
                  />
                ))}
              </>
            )}
          </div>
        );
      
      case 'can':
        return (
          <div className="relative h-64">
            {/* Campus buildings */}
            {[
              { left: '20%', top: '20%', label: "Library" },
              { left: '40%', top: '40%', label: "Admin" },
              { left: '60%', top: '20%', label: "Science" },
              { left: '50%', top: '60%', label: "Dorms" },
              { left: '30%', top: '60%', label: "Sports" }
            ].map((item, i) => (
              <div key={i} className="absolute" style={{ left: item.left, top: item.top }}>
                <div className="w-10 h-12 bg-gray-600 flex items-end justify-center pb-1">
                  <div className="text-xs text-white">{item.label}</div>
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  LAN
                </div>
              </div>
            ))}
            
            {/* Fiber backbone */}
            {isAnimating && (
              <>
                <svg className="absolute top-0 left-0 w-full h-full">
                  <path 
                    d="M 20% 20% Q 30% 30%, 40% 40% Q 45% 50%, 50% 60% L 30% 60%"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <path 
                    d="M 40% 40% L 60% 20%"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <path 
                    d="M 60% 20% Q 55% 40%, 50% 60%"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                </svg>
                
                {/* Data packets */}
                {[
                  { path: "M 20% 20% Q 30% 30%, 40% 40%", delay: 0 },
                  { path: "M 40% 40% Q 45% 50%, 50% 60%", delay: 1 },
                  { path: "M 40% 40% L 60% 20%", delay: 2 },
                  { path: "M 60% 20% Q 55% 40%, 50% 60%", delay: 3 },
                  { path: "M 50% 60% L 30% 60%", delay: 4 }
                ].map((item, i) => (
                  <motion.div
                    key={`pkt-${i}`}
                    className="absolute w-3 h-3 bg-purple-500 rounded-full"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                      x: [0, 100, 200],
                      y: [0, 50, 100]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: item.delay
                    }}
                  />
                ))}
              </>
            )}
          </div>
        );
      
      case 'vpn':
        return (
          <div className="relative h-64">
            {/* Internet cloud */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="text-xs text-blue-800">Public Internet</div>
            </div>
            
            {/* Office */}
            <div className="absolute bottom-8 left-1/4 transform -translate-x-1/2 w-16 h-12 bg-gray-600 rounded flex items-end justify-center pb-1">
              <div className="text-xs text-white">Office</div>
            </div>
            
            {/* Remote user */}
            <div className="absolute bottom-8 left-3/4 transform -translate-x-1/2 w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
              👨💻
            </div>
            
            {/* VPN tunnels */}
            {isAnimating && (
              <>
                <motion.svg
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <path
                    d="M 25% 75% Q 50% 50%, 75% 75%"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeDasharray="5,3"
                  />
                </motion.svg>
                
                <motion.div
                  className="absolute w-4 h-4 bg-purple-500 rounded-full"
                  style={{ left: '25%', top: '75%' }}
                  animate={{
                    left: ['25%', '50%', '75%', '50%', '25%'],
                    top: ['75%', '50%', '75%', '50%', '75%']
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div
                  className="absolute w-4 h-4 bg-green-500 rounded-full"
                  style={{ left: '75%', top: '75%' }}
                  animate={{
                    left: ['75%', '50%', '25%', '50%', '75%'],
                    top: ['75%', '50%', '75%', '50%', '75%']
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                  }}
                />
              </>
            )}
            
            {/* Encryption indicators */}
            {isAnimating && (
              <>
                <motion.div
                  className="absolute text-xs"
                  style={{ left: '35%', top: '60%' }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                >
                  🔒 Encrypted
                </motion.div>
                <motion.div
                  className="absolute text-xs"
                  style={{ left: '65%', top: '60%' }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 2.5
                  }}
                >
                  🔒 Encrypted
                </motion.div>
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
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Network Types Visualizer</h1>
        <p className="text-center text-gray-600 mb-8">Interactive exploration of different computer network classifications</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Network Visualization */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              {/* Network Type Selector */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {Object.keys(networks).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveNetwork(key);
                      resetAnimation();
                    }}
                    className={`px-2 py-2 text-xs rounded-lg ${activeNetwork === key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {networks[key].name.split(' (')[0]}
                  </button>
                ))}
              </div>
              
              {/* Network Visualization */}
              <div key={animationKey} className="relative h-64 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                {renderNetworkVisualization()}
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

          {/* Right Column - Network Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{networks[activeNetwork].name}</h2>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-1">Description:</h3>
                <p>{networks[activeNetwork].description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-1">Coverage:</h3>
                  <p>{networks[activeNetwork].coverage}</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-yellow-700 mb-1">Speed:</h3>
                  <p>{networks[activeNetwork].speed}</p>
                </div>
              </div>
              
              <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-1">Technologies:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {networks[activeNetwork].technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-white text-sm rounded border border-purple-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-1">Examples:</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  {networks[activeNetwork].examples.map((example, i) => (
                    <li key={i} className="text-sm">{example}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                <h3 className="font-semibold text-red-700 mb-1">Technical Insight:</h3>
                {activeNetwork === 'pan' && (
                  <p className="text-sm">Bluetooth PAN is also called Piconet (up to 8 devices). Newer versions like Bluetooth 5 support mesh networking.</p>
                )}
                {activeNetwork === 'lan' && (
                  <p className="text-sm">Modern LANs often use VLANs to logically segment networks without physical separation.</p>
                )}
                {activeNetwork === 'man' && (
                  <p className="text-sm">Many MANs use DWDM (Dense Wavelength Division Multiplexing) to increase fiber capacity.</p>
                )}
                {activeNetwork === 'wan' && (
                  <p className="text-sm">SD-WAN is transforming traditional WANs by using software to manage multiple connection types.</p>
                )}
                {activeNetwork === 'can' && (
                  <p className="text-sm">CANs often implement QoS (Quality of Service) to prioritize critical traffic like video conferencing.</p>
                )}
                {activeNetwork === 'vpn' && (
                  <p className="text-sm">Modern VPNs use AES-256 encryption and perfect forward secrecy for enhanced security.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkTypesVisualizer;