'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OSIVisualizer = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [direction, setDirection] = useState('down');
  const [showEncapsulation, setShowEncapsulation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const layers = [
    {
      id: 7,
      name: 'Application Layer',
      function: 'Provides network services directly to end-user applications',
      examples: ['HTTP', 'FTP', 'SMTP', 'DNS', 'Web browsers'],
      protocols: ['HTTP', 'FTP', 'SMTP', 'DNS', 'Telnet'],
      pdu: 'Data',
      color: 'bg-purple-100 border-purple-400',
      icon: '🌐',
    },
    {
      id: 6,
      name: 'Presentation Layer',
      function: 'Translates data between application and network formats',
      examples: ['SSL/TLS encryption', 'JPEG/MPEG compression', 'ASCII translation'],
      protocols: ['SSL', 'TLS', 'JPEG', 'MPEG'],
      pdu: 'Data',
      color: 'bg-blue-100 border-blue-400',
      icon: '🔒',
    },
    {
      id: 5,
      name: 'Session Layer',
      function: 'Manages sessions between applications (establish, maintain, terminate)',
      examples: ['API sessions', 'NetBIOS', 'Session checkpoints'],
      protocols: ['NetBIOS', 'RPC', 'PAP'],
      pdu: 'Data',
      color: 'bg-green-100 border-green-400',
      icon: '🤝',
    },
    {
      id: 4,
      name: 'Transport Layer',
      function: 'Ensures reliable (TCP) or best-effort (UDP) data delivery',
      examples: ['TCP connections', 'UDP datagrams', 'Port numbers'],
      protocols: ['TCP', 'UDP', 'SCTP'],
      pdu: 'Segments (TCP) / Datagrams (UDP)',
      color: 'bg-yellow-100 border-yellow-400',
      icon: '📦',
    },
    {
      id: 3,
      name: 'Network Layer',
      function: 'Handles logical addressing (IP) and routing between networks',
      examples: ['IP packets', 'Routers', 'ICMP ping'],
      protocols: ['IP', 'ICMP', 'ARP', 'BGP'],
      pdu: 'Packets',
      color: 'bg-orange-100 border-orange-400',
      icon: '🛣️',
    },
    {
      id: 2,
      name: 'Data Link Layer',
      function: 'Provides error-free frame transfer between directly connected nodes',
      examples: ['Ethernet frames', 'MAC addresses', 'Network switches'],
      protocols: ['Ethernet', 'PPP', 'MAC'],
      pdu: 'Frames',
      color: 'bg-red-100 border-red-400',
      icon: '🔗',
    },
    {
      id: 1,
      name: 'Physical Layer',
      function: 'Transmits raw bits over physical medium',
      examples: ['Ethernet cables', 'Fiber optics', 'Hubs', 'Wi-Fi radio waves'],
      protocols: ['RS-232', '100BaseTX', 'DSL'],
      pdu: 'Bits',
      color: 'bg-gray-100 border-gray-400',
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

    const positions = layers.map((_, index) => `${(index + 0.5) * (100 / 7)}%`).reverse();
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
            top: { duration: 5, times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1], repeat: Infinity, repeatDelay: 1 },
            opacity: { duration: 5, times: [0, 0.1, 0.9, 1], repeat: Infinity, repeatDelay: 1 },
          }}
        >
          {showEncapsulation && (
            <motion.div
              className="absolute -top-6 left-0 text-xs font-mono whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              {layers.find((l) => l.id === (direction === 'down' ? 7 : 1)).pdu}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">OSI Model Visualizer</h1>
        <p className="text-center text-gray-600 mb-8">The 7-layer reference model for network communications</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - OSI Model Visualization */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <div className="flex justify-between mb-6">
                <button
                  onClick={() => setDirection((d) => (d === 'down' ? 'up' : 'down'))}
                  className={`px-4 py-2 ${direction === 'down' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
                >
                  {direction === 'down' ? '▼ Downward Flow' : '▲ Upward Flow'}
                </button>
                <button
                  onClick={() => setShowEncapsulation(!showEncapsulation)}
                  className={`px-4 py-2 ${showEncapsulation ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
                >
                  {showEncapsulation ? 'Hide PDUs' : 'Show PDUs'}
                </button>
              </div>

              {/* OSI Model Layers */}
              <div className="relative h-[600px] flex flex-col justify-between">
                {/* Vertical connection line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>

                {/* Data flow animation */}
                {renderDataFlow()}

                {/* Layers */}
                <div className="flex flex-col gap-4">
                  {layers.map((layer) => (
                    <motion.div
                      key={layer.id}
                      onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                      className={`relative flex items-center p-4 rounded-lg border-l-8 cursor-pointer transition-all ${layer.color} ${activeLayer === layer.id ? 'ring-2 ring-blue-500' : ''}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-xl mr-4">
                        {layer.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Layer {layer.id}: {layer.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1">{layer.function}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-10 space-x-4">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className={`px-4 py-2 ${isAnimating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition`}
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
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Layer {activeLayer}: {layers.find((l) => l.id === activeLayer).name}
                  </h2>

                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-700 mb-1">Primary Function:</h3>
                    <p>{layers.find((l) => l.id === activeLayer).function}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-700 mb-2">Protocols:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {layers.find((l) => l.id === activeLayer).protocols.map((protocol, i) => (
                          <li key={i} className="text-sm">{protocol}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-700 mb-2">Examples:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {layers.find((l) => l.id === activeLayer).examples.map((example, i) => (
                          <li key={i} className="text-sm">{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {showEncapsulation && (
                    <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                      <h3 className="font-semibold text-yellow-700 mb-1">Protocol Data Unit (PDU):</h3>
                      <p className="font-mono">{layers.find((l) => l.id === activeLayer).pdu}</p>
                    </div>
                  )}

                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                    <h3 className="font-semibold text-gray-700 mb-2">Technical Deep Dive:</h3>
                    {activeLayer === 7 && (
                      <p className="text-sm">
                        The only layer that directly interacts with user applications. Protocols at this layer define how
                        applications create and interpret network requests.
                      </p>
                    )}
                    {activeLayer === 6 && (
                      <p className="text-sm">
                        Responsible for data translation, compression, and encryption. TLS handshakes occur at this layer
                        to establish secure connections.
                      </p>
                    )}
                    {activeLayer === 5 && (
                      <p className="text-sm">
                        Manages sessions through tokens, checkpoints, and recovery procedures. Often implemented directly
                        in application protocols rather than as separate services.
                      </p>
                    )}
                    {activeLayer === 4 && (
                      <p className="text-sm">
                        TCP provides reliable delivery through sequencing, acknowledgments, and retransmissions. UDP
                        offers minimal overhead for time-sensitive applications.
                      </p>
                    )}
                    {activeLayer === 3 && (
                      <p className="text-sm">
                        IP handles logical addressing while routing protocols determine optimal paths. Fragmentation occurs
                        when packets exceed MTU size.
                      </p>
                    )}
                    {activeLayer === 2 && (
                      <p className="text-sm">
                        MAC sublayer handles physical addressing (MAC addresses) and media access control (CSMA/CD). LLC
                        sublayer provides error checking and flow control.
                      </p>
                    )}
                    {activeLayer === 1 && (
                      <p className="text-sm">
                        Defines physical characteristics like voltage levels, cable specifications, and connector types.
                        Converts digital bits to signals appropriate for the medium.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="text-5xl mb-4">🖥️</div>
                  <h3 className="text-xl font-medium text-gray-500 mb-2">OSI Model Visualizer</h3>
                  <p className="text-gray-400 mb-6">
                    {direction === 'down'
                      ? 'Click on any layer to see details about its functions and protocols'
                      : 'View how data moves up through the layers during reception'}
                  </p>
                  <div className="text-left bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">How the OSI Model Works:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>Data flows <strong>down</strong> the layers during transmission (encapsulation)</li>
                      <li>Data flows <strong>up</strong> the layers during reception (decapsulation)</li>
                      <li>Each layer adds its own header (and sometimes trailer) to the PDU</li>
                      <li>Layers only communicate with their immediate neighbors</li>
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

export default OSIVisualizer;