'use client'
import { useState } from 'react';

const OSIVisualization = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeDirection, setActiveDirection] = useState('down');
  const [showEncapsulation, setShowEncapsulation] = useState(false);

  const layers = [
    {
      id: 7,
      name: "Application",
      function: "Provides network services to end-user applications",
      examples: "HTTP, FTP, SMTP, DNS, browsers",
      protocols: "HTTP, FTP, SMTP, DNS, Telnet",
      pdu: "Data",
      color: "bg-purple-100 border-purple-400"
    },
    {
      id: 6,
      name: "Presentation",
      function: "Data translation, encryption, compression",
      examples: "SSL/TLS, JPEG, MPEG, ASCII translation",
      protocols: "SSL, TLS, JPEG, MPEG",
      pdu: "Data",
      color: "bg-blue-100 border-blue-400"
    },
    {
      id: 5,
      name: "Session",
      function: "Manages sessions between applications",
      examples: "APIs, NetBIOS, session checkpoints",
      protocols: "NetBIOS, RPC, PAP",
      pdu: "Data",
      color: "bg-green-100 border-green-400"
    },
    {
      id: 4,
      name: "Transport",
      function: "End-to-end communication, error recovery, flow control",
      examples: "TCP (reliable), UDP (unreliable), port numbers",
      protocols: "TCP, UDP, SCTP",
      pdu: "Segments (TCP) / Datagrams (UDP)",
      color: "bg-yellow-100 border-yellow-400"
    },
    {
      id: 3,
      name: "Network",
      function: "Logical addressing and routing between networks",
      examples: "IP, ICMP, routers, IP addresses",
      protocols: "IP, ICMP, ARP, IPSec",
      pdu: "Packets",
      color: "bg-orange-100 border-orange-400"
    },
    {
      id: 2,
      name: "Data Link",
      function: "Reliable frame transfer between nodes, MAC addressing",
      examples: "Ethernet, PPP, switches, MAC addresses",
      protocols: "Ethernet, PPP, MAC",
      pdu: "Frames",
      color: "bg-red-100 border-red-400"
    },
    {
      id: 1,
      name: "Physical",
      function: "Transmits raw bits over physical medium",
      examples: "Cables, hubs, repeaters, NICs",
      protocols: "RS-232, 100BaseTX, DSL",
      pdu: "Bits",
      color: "bg-gray-100 border-gray-400"
    }
  ];

  const handleLayerClick = (layerId) => {
    setActiveLayer(layerId === activeLayer ? null : layerId);
  };

  const toggleDirection = () => {
    setActiveDirection(activeDirection === 'down' ? 'up' : 'down');
  };

  const toggleEncapsulation = () => {
    setShowEncapsulation(!showEncapsulation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">OSI Model Visualization</h1>
        <p className="text-center text-gray-600 mb-8">The 7-layer reference model for network communications</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - OSI Model Visualization */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <div className="flex justify-between mb-6">
                <button 
                  onClick={toggleDirection}
                  className={`px-4 py-2 ${activeDirection === 'down' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
                >
                  {activeDirection === 'down' ? 'Sending Process ▼' : 'Receiving Process ▲'}
                </button>
                <button 
                  onClick={toggleEncapsulation}
                  className={`px-4 py-2 ${showEncapsulation ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
                >
                  {showEncapsulation ? 'Hide Encapsulation' : 'Show Encapsulation'}
                </button>
              </div>

              {/* OSI Model Layers */}
              <div className="relative">
                {/* Communication Arrows */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-full">
                  <div className={`absolute left-0 w-1 h-full bg-blue-200 ${activeDirection === 'down' ? 'top-0' : 'bottom-0'}`}></div>
                  <div className={`absolute left-0 w-4 h-4 ${activeDirection === 'down' ? 'top-0' : 'bottom-0'} transform ${activeDirection === 'down' ? 'rotate-45' : '-135deg'} border-r-2 border-b-2 border-blue-500`}></div>
                </div>

                {layers.map((layer) => (
                  <div 
                    key={layer.id}
                    onClick={() => handleLayerClick(layer.id)}
                    className={`relative flex items-center mb-4 p-4 rounded-lg border-l-8 cursor-pointer transition-all ${layer.color} ${activeLayer === layer.id ? 'ring-2 ring-blue-500 scale-[1.02]' : ''}`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-lg font-bold mr-4">
                      {layer.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{layer.name} Layer</h3>
                      <p className="text-sm text-gray-600">{layer.function}</p>
                    </div>

                    {/* Encapsulation Labels */}
                    {showEncapsulation && (
                      <div className="absolute right-4 text-xs font-mono bg-white px-2 py-1 rounded border">
                        {layer.pdu}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Layer Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full sticky top-4">
              {activeLayer ? (
                <>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Layer {activeLayer}: {layers.find(l => l.id === activeLayer).name} Layer
                  </h2>
                  
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-1">Primary Function:</h3>
                    <p>{layers.find(l => l.id === activeLayer).function}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-700 mb-1">Protocols:</h3>
                      <p className="text-sm">{layers.find(l => l.id === activeLayer).protocols}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-700 mb-1">Examples:</h3>
                      <p className="text-sm">{layers.find(l => l.id === activeLayer).examples}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <h3 className="font-semibold text-yellow-700 mb-1">Technical Details:</h3>
                    {activeLayer === 7 && (
                      <p className="text-sm">Interfaces directly with applications like web browsers and email clients.</p>
                    )}
                    {activeLayer === 6 && (
                      <p className="text-sm">Handles data format translation and encryption/decryption.</p>
                    )}
                    {activeLayer === 5 && (
                      <p className="text-sm">Manages session establishment, maintenance, and termination.</p>
                    )}
                    {activeLayer === 4 && (
                      <p className="text-sm">Provides reliable (TCP) or unreliable (UDP) delivery services.</p>
                    )}
                    {activeLayer === 3 && (
                      <p className="text-sm">Uses IP addresses for logical network addressing and routing.</p>
                    )}
                    {activeLayer === 2 && (
                      <p className="text-sm">Divided into LLC (Logical Link Control) and MAC sublayers.</p>
                    )}
                    {activeLayer === 1 && (
                      <p className="text-sm">Deals with physical connectors, cables, and raw bit transmission.</p>
                    )}
                  </div>

                  {showEncapsulation && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-700 mb-1">PDU (Protocol Data Unit):</h3>
                      <p className="font-mono">{layers.find(l => l.id === activeLayer).pdu}</p>
                      <p className="text-sm mt-2">
                        {activeDirection === 'down' ? 
                          "Data is encapsulated as it moves down the layers" : 
                          "Data is decapsulated as it moves up the layers"}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="text-5xl mb-4">🖥️</div>
                  <h3 className="text-xl font-medium text-gray-500 mb-2">OSI Model Visualizer</h3>
                  <p className="text-gray-400">
                    Click on any layer to see detailed information about its functions and protocols.
                  </p>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
                    <h4 className="font-semibold text-blue-700 mb-2">About the OSI Model:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      <li>Developed by ISO in 1984 as a reference model</li>
                      <li>7 layers with distinct responsibilities</li>
                      <li>Each layer serves the layer above it</li>
                      <li>Provides standardization for network protocols</li>
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

export default OSIVisualization;