'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProtocolVisualizer = () => {
  const [activeTab, setActiveTab] = useState('functions');
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const protocolFunctions = [
    {
      name: 'Data Formatting',
      description: 'Shapes data into a standard format for transmission, like packaging a letter.',
      example: 'HTTP headers (web requests), TCP sequence numbers (order), Ethernet frames (local delivery).',
      visualization: (
        <div className="relative h-48">
          <motion.div
            className="absolute top-1/3 left-1/4 w-28 h-10 bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-sm"
            animate={isAnimating ? { x: [0, 250, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Raw Data
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-1/4 w-36 h-12 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center text-sm"
            animate={isAnimating ? { x: [0, 250, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            [Header] Data
          </motion.div>
          <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 text-gray-600 text-sm">
            Packaged for Delivery
          </div>
        </div>
      ),
    },
    {
      name: 'Transmission Rules',
      description: 'Controls how data is sent, like traffic lights for packets.',
      example: 'TCP ensures order (sliding window), Ethernet avoids collisions (CSMA/CD).',
      visualization: (
        <div className="relative h-48">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-green-500 rounded-full"
              style={{ top: '40%', left: `${20 + i * 10}%` }}
              animate={isAnimating ? { x: [0, 300, 0], opacity: [1, 0.7, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            />
          ))}
          <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm">
            Packets Sent in Order
          </div>
        </div>
      ),
    },
    {
      name: 'Error Handling',
      description: 'Fixes data errors, like re-sending a damaged package.',
      example: 'TCP retransmits lost data, Ethernet checks frames (CRC).',
      visualization: (
        <div className="relative h-48">
          <motion.div
            className="absolute top-1/3 left-1/4 w-28 h-10 bg-red-100 border border-red-300 rounded flex items-center justify-center text-sm"
            animate={isAnimating ? { x: [0, 250, 0], opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Damaged Data
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-1/4 w-28 h-10 bg-green-100 border border-green-300 rounded flex items-center justify-center text-sm"
            animate={isAnimating ? { x: [0, 250, 0], opacity: [0, 1, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            Resent Data
          </motion.div>
          <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 text-gray-600 text-sm">
            Error Fixed
          </div>
        </div>
      ),
    },
    {
      name: 'Security & Compression',
      description: 'Protects and shrinks data, like locking and zipping a package.',
      example: 'TLS encrypts data (HTTPS), HTTP compresses files.',
      visualization: (
        <div className="relative h-48">
          <motion.div
            className="absolute top-1/3 left-1/4 w-36 h-12 bg-purple-100 border border-purple-300 rounded flex items-center justify-center text-sm"
            animate={isAnimating ? { x: [0, 250, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Large Data
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-1/4 w-24 h-10 bg-purple-200 border-2 border-purple-400 rounded flex items-center justify-center text-sm"
            animate={isAnimating ? { x: [0, 250, 0], scale: [1, 0.9, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            🔒 Compressed
          </motion.div>
          <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 text-gray-600 text-sm">
            Secure & Smaller
          </div>
        </div>
      ),
    },
    {
      name: 'Session Control',
      description: 'Sets up and ends connections, like a phone call handshake.',
      example: 'TCP 3-way handshake, TLS secure session setup.',
      visualization: (
        <div className="relative h-48 flex flex-col items-center justify-center">
          <div className="flex justify-between w-full max-w-xs mb-2">
            <div className="text-sm font-semibold">Client</div>
            <div className="text-sm font-semibold">Server</div>
          </div>
          <div className="space-y-4 w-full max-w-xs">
            <motion.div
              animate={isAnimating ? { opacity: [0, 1, 0], x: [-20, 0, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="flex justify-between items-center"
            >
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              <div className="text-sm font-mono px-2 py-1 bg-gray-100 rounded">SYN</div>
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            </motion.div>
            <motion.div
              animate={isAnimating ? { opacity: [0, 1, 0], x: [20, 0, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="flex justify-between items-center"
            >
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="text-sm font-mono px-2 py-1 bg-gray-100 rounded">SYN-ACK</div>
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </motion.div>
            <motion.div
              animate={isAnimating ? { opacity: [0, 1, 0], x: [-20, 0, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              className="flex justify-between items-center"
            >
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              <div className="text-sm font-mono px-2 py-1 bg-gray-100 rounded">ACK</div>
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      ),
    },
  ];

  const commonProtocols = [
    {
      name: 'TCP',
      fullName: 'Transmission Control Protocol',
      layer: 'Transport',
      description: 'Ensures reliable data delivery, like a guaranteed mail service.',
      features: [
        '3-way handshake to start connections.',
        'Resends lost data automatically.',
        'Keeps data in the correct order.',
        'Manages data flow to avoid overload.',
      ],
      port: 'Varies (e.g., 80 for HTTP, 443 for HTTPS)',
      color: 'bg-blue-100 border-blue-400',
    },
    {
      name: 'IP',
      fullName: 'Internet Protocol',
      layer: 'Network',
      description: 'Routes data using addresses, like a postal system.',
      features: [
        'Uses IPv4 or IPv6 addresses.',
        'Breaks data into packets.',
        'Routes packets across networks.',
        'No delivery guarantee (best effort).',
      ],
      port: 'N/A',
      color: 'bg-green-100 border-green-400',
    },
    {
      name: 'HTTP',
      fullName: 'HyperText Transfer Protocol',
      layer: 'Application',
      description: 'Powers web browsing by fetching pages.',
      features: [
        'Sends requests (e.g., GET, POST).',
        'Works with browsers and servers.',
        'Supports HTTP/2 and HTTP/3 for speed.',
        'Uses HTTPS for security.',
      ],
      port: '80 (HTTP), 443 (HTTPS)',
      color: 'bg-purple-100 border-purple-400',
    },
    {
      name: 'DNS',
      fullName: 'Domain Name System',
      layer: 'Application',
      description: 'Translates website names to IP addresses, like a phonebook.',
      features: [
        'Resolves names (e.g., google.com).',
        'Uses UDP for quick queries.',
        'Stores results for faster access.',
        'Organized in a global hierarchy.',
      ],
      port: '53',
      color: 'bg-yellow-100 border-yellow-400',
    },
    {
      name: 'FTP',
      fullName: 'File Transfer Protocol',
      layer: 'Application',
      description: 'Moves files between computers, like a digital courier.',
      features: [
        'Uses separate control and data channels.',
        'Supports login for secure access.',
        'Handles large file transfers.',
        'Offers binary or text modes.',
      ],
      port: '20 (data), 21 (control)',
      color: 'bg-red-100 border-red-400',
    },
  ];

  const protocolStackExample = [
    {
      protocol: 'HTTP',
      layer: 'Application',
      description: 'Sends webpage request (e.g., GET /index.html).',
    },
    {
      protocol: 'TCP',
      layer: 'Transport',
      description: 'Adds port numbers and ensures reliable delivery.',
    },
    {
      protocol: 'IP',
      layer: 'Network',
      description: 'Adds source and destination IP addresses.',
    },
    {
      protocol: 'Ethernet',
      layer: 'Data Link',
      description: 'Adds MAC addresses for local delivery.',
    },
  ];

  // Start animations automatically
  useEffect(() => {
    setIsAnimating(true);
    return () => setIsAnimating(false); // Cleanup on unmount
  }, []);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Network Protocols Visualizer</h1>
        <p className="text-center text-gray-600 mb-8">Discover how protocols make the Internet work</p>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('functions')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'functions' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              How Protocols Work
            </button>
            <button
              onClick={() => setActiveTab('protocols')}
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'protocols' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Common Protocols
            </button>
            <button
              onClick={() => setActiveTab('stack')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'stack' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Protocol Stack
            </button>
          </div>
        </div>

        {activeTab === 'functions' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">What Protocols Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {protocolFunctions.map((func, index) => (
                <motion.div
                  key={index}
                  className="border rounded-lg overflow-hidden bg-gray-50"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-4 border-b">
                    <h3 className="font-bold text-lg text-gray-800">{func.name}</h3>
                    <p className="text-sm text-gray-600">{func.description}</p>
                  </div>
                  <div className="p-4">{func.visualization}</div>
                  <div className="p-4 bg-gray-100 text-sm">
                    <p className="font-semibold">Examples:</p>
                    <p className="text-gray-600">{func.example}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={toggleAnimation}
                className={`px-4 py-2 rounded-lg ${isAnimating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition`}
              >
                {isAnimating ? 'Pause Animations' : 'Play Animations'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'protocols' && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Protocol List */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-6 h-full">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Protocols</h2>
                <div className="space-y-4">
                  {commonProtocols.map((protocol, index) => (
                    <motion.div
                      key={index}
                      onClick={() => setActiveProtocol(activeProtocol?.name === protocol.name ? null : protocol)}
                      className={`p-4 rounded-lg border cursor-pointer ${protocol.color} ${activeProtocol?.name === protocol.name ? 'ring-2 ring-blue-500' : ''}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="font-bold text-lg">{protocol.name}</h3>
                      <p className="text-sm text-gray-700">{protocol.fullName}</p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="bg-white px-2 py-1 rounded">{protocol.layer} Layer</span>
                        <span className="bg-white px-2 py-1 rounded">Port: {protocol.port}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Protocol Details */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-6 h-full sticky top-4">
                {activeProtocol ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-800">
                        {activeProtocol.name} ({activeProtocol.fullName})
                      </h3>
                      <div className="flex items-center mt-2">
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded mr-2">{activeProtocol.layer} Layer</span>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">Port: {activeProtocol.port}</span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-2">What It Does:</h4>
                      <p className="text-gray-600">{activeProtocol.description}</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {activeProtocol.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-600">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    {activeProtocol.name === 'TCP' && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">TCP 3-Way Handshake:</h4>
                        <div className="flex flex-col items-center">
                          <div className="flex justify-between w-full max-w-xs mb-2">
                            <div className="text-sm font-semibold">Client</div>
                            <div className="text-sm font-semibold">Server</div>
                          </div>
                          <div className="space-y-4 w-full max-w-xs">
                            <motion.div
                              animate={isAnimating ? { opacity: [0, 1, 0], x: [-20, 0, 0] } : {}}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                              className="flex justify-between items-center"
                            >
                              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                              <div className="text-sm font-mono px-2 py-1 bg-gray-100 rounded">SYN</div>
                              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            </motion.div>
                            <motion.div
                              animate={isAnimating ? { opacity: [0, 1, 0], x: [20, 0, 0] } : {}}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                              className="flex justify-between items-center"
                            >
                              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                              <div className="text-sm font-mono px-2 py-1 bg-gray-100 rounded">SYN-ACK</div>
                              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                            </motion.div>
                            <motion.div
                              animate={isAnimating ? { opacity: [0, 1, 0], x: [-20, 0, 0] } : {}}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                              className="flex justify-between items-center"
                            >
                              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                              <div className="text-sm font-mono px-2 py-1 bg-gray-100 rounded">ACK</div>
                              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="text-5xl mb-4">📡</div>
                    <h3 className="text-xl font-medium text-gray-500 mb-2">Explore Protocols</h3>
                    <p className="text-gray-400">Click a protocol to learn how it works</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">How Protocols Work Together: Loading a Webpage</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
              {/* Data flow animation */}
              {isAnimating && (
                <motion.div
                  className="absolute left-8 w-4 h-4 bg-blue-500 rounded-full"
                  style={{ x: '-50%' }}
                  animate={{ top: ['10%', '25%', '50%', '75%', '90%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] }}
                />
              )}
              {/* Protocol layers */}
              <div className="space-y-8">
                {protocolStackExample.map((layer, index) => (
                  <div key={index} className="relative flex items-start pl-12">
                    {/* Layer indicator */}
                    <div className="absolute left-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                      {4 - index}
                    </div>
                    {/* Layer content */}
                    <div className="flex-1 border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-800">{layer.protocol}</h3>
                          <p className="text-sm text-gray-600">{layer.layer} Layer</p>
                        </div>
                        <div className="text-sm bg-gray-100 px-2 py-1 rounded">{layer.description}</div>
                      </div>
                      {/* Protocol-specific visualization */}
                      {layer.protocol === 'HTTP' && (
                        <div className="mt-3 p-3 bg-gray-100 rounded text-sm font-mono">
                          GET / HTTP/1.1<br />
                          Host: example.com<br />
                          User-Agent: Browser
                        </div>
                      )}
                      {layer.protocol === 'TCP' && (
                        <div className="mt-3 flex items-center space-x-2">
                          <div className="text-sm bg-blue-100 px-2 py-1 rounded">Port: 54321</div>
                          <div className="text-sm bg-blue-100 px-2 py-1 rounded">Port: 80</div>
                          <div className="text-sm bg-blue-100 px-2 py-1 rounded">Sequence</div>
                        </div>
                      )}
                      {layer.protocol === 'IP' && (
                        <div className="mt-3 flex items-center space-x-2">
                          <div className="text-sm bg-green-100 px-2 py-1 rounded">IP: 192.168.1.10</div>
                          <div className="text-sm bg-green-100 px-2 py-1 rounded">IP: 93.184.216.34</div>
                        </div>
                      )}
                      {layer.protocol === 'Ethernet' && (
                        <div className="mt-3 flex items-center space-x-2">
                          <div className="text-sm bg-red-100 px-2 py-1 rounded">MAC: 00:1A:...</div>
                          <div className="text-sm bg-red-100 px-2 py-1 rounded">MAC: 00:0C:...</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">How Data Travels:</h3>
              <p className="text-sm text-gray-600 mb-2">
                Data starts as a webpage request and gets wrapped (encapsulated) at each layer, like adding envelopes with addresses.
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                <li><strong>HTTP</strong>: Creates the webpage request.</li>
                <li><strong>TCP</strong>: Adds ports to target the right app.</li>
                <li><strong>IP</strong>: Adds IP addresses to find the server.</li>
                <li><strong>Ethernet</strong>: Adds local device addresses (MAC).</li>
              </ol>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={toggleAnimation}
                className={`px-4 py-2 rounded-lg ${isAnimating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition`}
              >
                {isAnimating ? 'Pause Animation' : 'Play Animation'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtocolVisualizer;