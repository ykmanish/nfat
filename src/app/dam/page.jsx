'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ModulationConceptVisualizer = () => {
  const [activeModulation, setActiveModulation] = useState('ask');
  const [animationStep, setAnimationStep] = useState(0);
  const bits = [1, 0, 1, 0]; // Fixed binary pattern for demonstration

  // Modulation definitions
  const modulations = {
    ask: {
      name: "Amplitude Shift Keying (ASK)",
      description: "Digital '1' = High amplitude\nDigital '0' = Low amplitude",
      analogy: "Like a light dimmer switch - bright for 1, dim for 0",
      pros: ["Simple to implement", "Low bandwidth"],
      cons: ["Noise sensitive", "Power inefficient"]
    },
    fsk: {
      name: "Frequency Shift Keying (FSK)",
      description: "Digital '1' = High frequency\nDigital '0' = Low frequency",
      analogy: "Like two different musical notes - high pitch for 1, low for 0",
      pros: ["Better noise immunity", "Good for RF"],
      cons: ["Needs more bandwidth", "Complex circuitry"]
    },
    psk: {
      name: "Phase Shift Keying (PSK)",
      description: "Digital '1' = 180° phase shift\nDigital '0' = No phase shift",
      analogy: "Like a spinning wheel changing direction",
      pros: ["Bandwidth efficient", "Good noise immunity"],
      cons: ["Complex detection", "Sync required"]
    },
    qam: {
      name: "Quadrature Amplitude Modulation (QAM)",
      description: "Combines amplitude + phase changes\n(4+ bits per symbol)",
      analogy: "Like adjusting both volume and station on a radio",
      pros: ["High data rate", "Spectrum efficient"],
      cons: ["Very noise sensitive", "Complex implementation"]
    }
  };

  // Auto-rotate through animation steps
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate through modulation types
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveModulation(prev => {
        if (prev === 'ask') return 'fsk';
        if (prev === 'fsk') return 'psk';
        if (prev === 'psk') return 'qam';
        return 'ask';
      });
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  // Generate signal points for visualization
  const generateSignal = () => {
    const points = [];
    bits.forEach((bit, i) => {
      for (let j = 0; j < 50; j++) {
        const x = i * 50 + j;
        let y = 50;
        
        // Different modulation effects
        if (activeModulation === 'ask') {
          y = 30 + (bit === 1 ? 40 : 10) * Math.sin(x/10);
        } 
        else if (activeModulation === 'fsk') {
          y = 30 + 30 * Math.sin(x/(bit === 1 ? 8 : 12));
        }
        else if (activeModulation === 'psk') {
          y = 30 + 30 * Math.sin(x/10 + (bit === 1 ? Math.PI : 0));
        }
        else if (activeModulation === 'qam') {
          const phase = i % 2 === 0 ? Math.PI/4 : 3*Math.PI/4;
          y = 30 + (bit === 1 ? 35 : 15) * Math.sin(x/10 + phase);
        }
        
        points.push({ x, y });
      }
    });
    return points;
  };

  const signalPoints = generateSignal();

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Digital-to-Analog Modulation
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl">
        How digital bits (1s and 0s) are represented as analog signals
      </p>

      {/* Modulation Selector */}
      <div className="flex gap-2 mb-8">
        {Object.keys(modulations).map((key) => (
          <button
            key={key}
            onClick={() => setActiveModulation(key)}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeModulation === key 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {modulations[key].name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mb-8">
        {/* Signal Visualization */}
        <div className="relative h-64 mb-8">
          {/* Bit indicators */}
          <div className="absolute top-2 left-0 right-0 flex justify-center gap-8">
            {bits.map((bit, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: animationStep === i ? 1.2 : 1,
                  backgroundColor: animationStep === i ? '#3b82f6' : '#e5e7eb'
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
              >
                {bit}
              </motion.div>
            ))}
          </div>

          {/* Signal Wave */}
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path
              d={`M ${signalPoints.map(p => `${p.x/5} ${p.y}`).join(' L ')}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
            
            {/* Modulation-specific annotations */}
            {activeModulation === 'ask' && (
              <>
                <motion.line
                  x1="0" y1="30" x2="200" y2="30"
                  stroke="#10b981"
                  strokeWidth="0.5"
                  strokeDasharray="4"
                />
                <motion.text
                  x="180" y="25"
                  fill="#10b981"
                  fontSize="4"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  Amplitude Changes
                </motion.text>
              </>
            )}
            
            {activeModulation === 'fsk' && (
              <motion.text
                x="180" y="20"
                fill="#10b981"
                fontSize="4"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                Frequency Changes
              </motion.text>
            )}
            
            {activeModulation === 'psk' && (
              <motion.path
                d="M 100 50 L 120 30 L 140 50 L 120 70 Z"
                fill="none"
                stroke="#10b981"
                strokeWidth="0.8"
                animate={{ 
                  opacity: [0, 1, 0],
                  pathLength: [0, 1, 0]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            )}
          </svg>
        </div>

        {/* Concept Explanation */}
        <div className="space-y-4">
          <motion.div
            key={activeModulation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-blue-50 rounded-lg"
          >
            <h3 className="font-bold text-lg text-blue-800 mb-2">
              {modulations[activeModulation].name}
            </h3>
            <pre className="text-blue-700 whitespace-pre-wrap">
              {modulations[activeModulation].description}
            </pre>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="p-4 bg-green-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-bold text-green-700 mb-2">Real-World Analogy</h4>
              <p className="text-green-600">
                {modulations[activeModulation].analogy}
              </p>
            </motion.div>

            <motion.div
              className="p-4 bg-yellow-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-bold text-yellow-700 mb-2">Exam Focus</h4>
              <ul className="space-y-2">
                <li className="text-yellow-600">
                  <span className="font-medium">Used in:</span> {
                    activeModulation === 'ask' ? 'Optical comms, RFID' :
                    activeModulation === 'fsk' ? 'Modems, wireless keyboards' :
                    activeModulation === 'psk' ? 'WiFi, DSL' : 'Cable modems, 4G/5G'
                  }
                </li>
                <li className="text-yellow-600">
                  <span className="font-medium">Key Formula:</span> {
                    activeModulation === 'ask' ? 'A(t) = A₀(1 + m(t))' :
                    activeModulation === 'fsk' ? 'f(t) = f₀ + Δf·m(t)' :
                    activeModulation === 'psk' ? 'ϕ(t) = ϕ₀ + Δϕ·m(t)' : 
                    'I/Q modulation with both A and ϕ changes'
                  }
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <h4 className="font-bold text-emerald-700 mb-2">Advantages</h4>
              <ul className="list-disc pl-5 space-y-1 text-emerald-600">
                {modulations[activeModulation].pros.map((pro, i) => (
                  <li key={i}>{pro}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-rose-50 rounded-lg">
              <h4 className="font-bold text-rose-700 mb-2">Disadvantages</h4>
              <ul className="list-disc pl-5 space-y-1 text-rose-600">
                {modulations[activeModulation].cons.map((con, i) => (
                  <li key={i}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-center max-w-2xl">
        <p>This animation automatically cycles through modulation types every 12 seconds.</p>
        <p>Each bit is highlighted for 3 seconds to show how it affects the signal.</p>
      </div>
    </div>
  );
};

export default ModulationConceptVisualizer;