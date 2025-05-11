'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TCPIPVisualizer = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [direction, setDirection] = useState('down');
  const [showEncapsulation, setShowEncapsulation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [activeProtocol, setActiveProtocol] = useState(null);

  const layers = [
    {
      id: 4,
      name: 'Application Layer',
      description: 'Where apps like browsers and email clients talk to the network.',
      analogy: 'Like a receptionist handling customer requests.',
      protocols: [
        {
          name: 'HTTP',
          description: 'Powers web browsing by fetching webpages.',
          port: 80,
          example: 'Loading a webpage like google.com.',
        },
        {
          name: 'FTP',
          description: 'Transfers files between computers.',
          port: '20/21',
          example: 'Uploading a photo to a server.',
        },
        {
          name: 'SMTP',
          description: 'Sends emails across the internet.',
          port: 25,
          example: 'Sending an email via Gmail.',
        },
        {
          name: 'DNS',
          description: 'Translates domain names to IP addresses.',
          port: 53,
          example: 'Finding the server for google.com.',
        },
      ],
      pdu: 'Data',
      color: 'bg-purple-100 border-purple-400',
      icon: '🌐',
    },
    {
      id: 3,
      name: 'Transport Layer',
      description: 'Ensures data gets to the right app, reliably or quickly.',
      analogy: 'Like a courier service choosing delivery speed.',
      protocols: [
        {
          name: 'TCP',
          description: 'Reliable delivery with error checking.',
          features: ['3-way handshake', 'Error recovery', 'Flow control'],
          example: 'Streaming a Netflix movie.',
        },
        {
          name: 'UDP',
          description: 'Fast delivery without guarantees.',
          features: ['No handshake', 'Low overhead', 'No retries'],
          example: 'Live video calls.',
        },
      ],
      pdu: 'Segments (TCP) / Datagrams (UDP)',
      color: 'bg-blue-100 border-blue-400',
      icon: '📦',
    },
    {
      id: 2,
      name: 'Internet Layer',
      description: 'Routes data across networks using IP addresses.',
      analogy: 'Like a postal service sorting packages by address.',
      protocols: [
        {
          name: 'IP',
          description: 'Assigns addresses and routes data.',
          versions: ['IPv4 (32-bit)', 'IPv6 (128-bit)'],
          example: 'Sending data to 192.168.1.1.',
        },
        {
          name: 'ICMP',
          description: 'Reports errors and diagnostics.',
          example: 'Pinging a server to check connectivity.',
        },
        {
          name: 'ARP',
          description: 'Maps IP addresses to hardware addresses.',
          example: 'Finding a device’s MAC address locally.',
        },
      ],
      pdu: 'Packets',
      color: 'bg-green-100 border-green-400',
      icon: '🛣️',
    },
    {
      id: 1,
      name: 'Network Access Layer',
      description: 'Handles physical connections and data framing.',
      analogy: 'Like the roads and trucks delivering packages.',
      protocols: [
        {
          name: 'Ethernet',
          description: 'Wired network connections.',
          standards: ['IEEE 802.3', '100BASE-TX', '1000BASE-T'],
          example: 'Connecting via a LAN cable.',
        },
        {
          name: 'Wi-Fi',
          description: 'Wireless network connections.',
          standards: ['IEEE 802.11', '802.11ac', '802.11ax (Wi-Fi 6)'],
          example: 'Connecting to a home Wi-Fi network.',
        },
        {
          name: 'PPP',
          description: 'Direct point-to-point connections.',
          example: 'Old-school dial-up internet.',
        },
      ],
      pdu: 'Frames',
      color: 'bg-orange-100 border-orange-400',
      icon: '🔌',
    },
  ];

  // Reset animation on direction or encapsulation change
  useEffect(() => {
    setIsAnimating(false);
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer); // Cleanup to prevent memory leaks
  }, [direction, showEncapsulation]);

  const renderDataFlow = () => {
    if (!isAnimating) return null;

    // Calculate positions for the animation (evenly spaced across layers)
    const positions = layers.map((_, index) => `${(index + 0.5) * (100 / 4)}%`).reverse();
    const animationSequence = direction === 'down' ? positions : [...positions].reverse();

    return (
      <AnimatePresence>
        <motion.div
          className={`absolute left-1/2 w-4 h-4 rounded-full ${direction === 'down' ? 'bg-green-500' : 'bg-blue-500'}`}
          style={{ x: '-50%' }}
          initial={{ top: animationSequence[0], opacity: 0 }}
          animate={{
            top: animationSequence,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            top: { duration: 4, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, repeatDelay: 1 },
            opacity: { duration: 4, times: [0, 0.1, 0.9, 1], repeat: Infinity, repeatDelay: 1 },
          }}
        >
          {showEncapsulation && (
            <motion.div
              className="absolute -top-6 left-2 text-xs font-mono whitespace-nowrap bg-white px-1 rounded shadow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {layers.find((l) => l.id === (direction === 'down' ? 4 - Math.floor(positions.indexOf(animationSequence[positions.length - 1]) / 1) : 1 + Math.floor(positions.indexOf(animationSequence[positions.length - 1]) / 1))).pdu}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">TCP/IP Model Visualizer</h1>
        <p className="text-center text-gray-600 mb-8">Explore the 4-layer model that powers the Internet</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - TCP/IP Model Visualization */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <div className="flex justify-between mb-6">
                <button
                  onClick={() => setDirection((d) => (d === 'down' ? 'up' : 'down'))}
                  className={`px-4 py-2 rounded-lg ${direction === 'down' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {direction === 'down' ? '▼ Sending Data' : '▲ Receiving Data'}
                </button>
                <button
                  onClick={() => setShowEncapsulation(!showEncapsulation)}
                  className={`px-4 py-2 rounded-lg ${showEncapsulation ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {showEncapsulation ? 'Hide Data Units' : 'Show Data Units'}
                </button>
              </div>

              {/* TCP/IP Model Layers */}
              <div className="relative h-[400px] flex flex-col justify-between">
                {/* Vertical connection line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>

                {/* Data flow animation */}
                {renderDataFlow()}

                {/* Layers */}
                <div className="flex flex-col gap-4">
                  {layers.map((layer) => (
                    <motion.div
                      key={layer.id}
                      onClick={() => {
                        setActiveLayer(layer.id);
                        setActiveProtocol(null);
                      }}
                      className={`relative flex items-center p-4 rounded-lg border-l-8 cursor-pointer transition-all ${layer.color} ${activeLayer === layer.id ? 'ring-2 ring-blue-500' : ''}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-xl mr-4">
                        {layer.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Layer {layer.id}: {layer.name}</h3>
                        <p className="text-sm text-gray-600">{layer.analogy}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className={`px-4 py-2 rounded-lg ${isAnimating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition`}
                >
                  {isAnimating ? 'Pause Animation' : 'Play Animation'}
                </button>
                <button
                  onClick={() => {
                    setIsAnimating(false);
                    setTimeout(() => setIsAnimating(true), 100);
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Restart Animation
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Layer Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full sticky top-4">
              {activeLayer ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        Layer {activeLayer}: {layers.find((l) => l.id === activeLayer).name}
                      </h2>
                      <p className="text-gray-600">{layers.find((l) => l.id === activeLayer).description}</p>
                    </div>
                    <button
                      onClick={() => setActiveProtocol(null)}
                      className={`px-3 py-1 text-sm rounded ${activeProtocol ? 'bg-gray-200 text-gray-700' : 'hidden'}`}
                    >
                      Back to Layer
                    </button>
                  </div>

                  {!activeProtocol ? (
                    <>
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-700 mb-2">Key Protocols:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {layers.find((l) => l.id === activeLayer).protocols.map((protocol, i) => (
                            <motion.div
                              key={i}
                              onClick={() => setActiveProtocol(protocol)}
                              className="p-3 bg-white rounded-lg border cursor-pointer hover:shadow-md"
                              whileHover={{ y: -2 }}
                            >
                              <h4 className="font-bold text-gray-800">{protocol.name}</h4>
                              <p className="text-sm text-gray-600 line-clamp-1">{protocol.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {showEncapsulation && (
                        <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                          <h3 className="font-semibold text-yellow-700 mb-1">Data Unit (PDU):</h3>
                          <p className="font-mono">{layers.find((l) => l.id === activeLayer).pdu}</p>
                          <p className="text-xs text-gray-600 mt-1">The name for data at this layer.</p>
                        </div>
                      )}

                      <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                        <h3 className="font-semibold text-gray-700 mb-2">Quick Insight:</h3>
                        <p className="text-sm">{layers.find((l) => l.id === activeLayer).analogy}</p>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-lg">{activeProtocol.name}</h3>
                        <p className="text-gray-700">{activeProtocol.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeProtocol.port && (
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-700 mb-1">Default Port:</h4>
                            <p className="font-mono">{activeProtocol.port}</p>
                            <p className="text-xs text-gray-600 mt-1">The network “door” this protocol uses.</p>
                          </div>
                        )}
                        {activeProtocol.versions && (
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-700 mb-1">Versions:</h4>
                            <ul className="list-disc pl-5">
                              {activeProtocol.versions.map((v, i) => (
                                <li key={i} className="text-sm">{v}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {activeProtocol.features && (
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <h4 className="font-semibold text-yellow-700 mb-1">Key Features:</h4>
                            <ul className="list-disc pl-5">
                              {activeProtocol.features.map((f, i) => (
                                <li key={i} className="text-sm">{f}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {activeProtocol.example && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-700 mb-1">Example:</h4>
                          <p className="text-sm italic">"{activeProtocol.example}"</p>
                        </div>
                      )}

                      {activeLayer === 3 && activeProtocol.name === 'TCP' && (
                        <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                          <h4 className="font-semibold text-red-700 mb-2">TCP 3-Way Handshake:</h4>
                          <div className="flex flex-col items-center">
                            <div className="flex justify-between w-full max-w-xs mb-2">
                              <div className="text-sm font-semibold">Client</div>
                              <div className="text-sm font-semibold">Server</div>
                            </div>
                            <div className="space-y-4 w-full max-w-xs">
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0 }}
                                className="flex justify-between items-center"
                              >
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <div className="text-xs font-mono px-2 py-1 bg-gray-100 rounded">SYN</div>
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="flex justify-between items-center"
                              >
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                <div className="text-xs font-mono px-2 py-1 bg-gray-100 rounded">SYN-ACK</div>
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                className="flex justify-between items-center"
                              >
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <div className="text-xs font-mono px-2 py-1 bg-gray-100 rounded">ACK</div>
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="text-5xl mb-4">🖥️</div>
                  <h3 className="text-xl font-medium text-gray-500 mb-2">TCP/IP Model Visualizer</h3>
                  <p className="text-gray-400 mb-6">
                    {direction === 'down'
                      ? 'Click a layer to explore its role and protocols.'
                      : 'See how data is received and processed upward.'}
                  </p>
                  <div className="text-left bg-blue-50 p-4 rounded-lg max-w-md">
                    <h4 className="font-semibold text-blue-700 mb-2">What is TCP/IP?</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>The foundation of the Internet, developed in the 1970s.</li>
                      <li>4 layers simplify networking compared to OSI’s 7 layers.</li>
                      <li>Data is wrapped (encapsulated) as it moves down layers.</li>
                      <li>TCP ensures reliability; IP handles addressing.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCPIPVisualizer;