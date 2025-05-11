'use client'
'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DigitalEncodingVisualizer = () => {
  const [inputBits, setInputBits] = useState('1011001');
  const [encodingScheme, setEncodingScheme] = useState('unipolar');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Validate binary input
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[01]*$/.test(value)) {
      setInputBits(value);
    }
  };

  // Available encoding schemes
  const schemes = [
    { id: 'unipolar', name: 'Unipolar' },
    { id: 'nrz-l', name: 'NRZ-L' },
    { id: 'nrz-i', name: 'NRZ-I' },
    { id: 'manchester', name: 'Manchester' },
    { id: 'differential-manchester', name: 'Diff. Manchester' },
    { id: 'ami', name: 'AMI' },
  ];

  // Generate signal data based on encoding scheme
  const generateSignal = () => {
    const bits = inputBits.split('').map(bit => parseInt(bit));
    let signal = [];
    let previousLevel = 0;
    let previousTransition = false;

    switch (encodingScheme) {
      case 'unipolar':
        signal = bits.map(bit => bit === 1 ? 1 : 0);
        break;
      
      case 'nrz-l':
        signal = bits.map(bit => bit === 1 ? 1 : -1);
        break;
      
      case 'nrz-i':
        signal = bits.map((bit, i) => {
          if (i === 0) {
            previousLevel = bit === 1 ? 1 : -1;
            return previousLevel;
          }
          if (bit === 1) {
            previousLevel = -previousLevel;
          }
          return previousLevel;
        });
        break;
      
      case 'manchester':
        signal = bits.flatMap(bit => bit === 1 ? [1, -1] : [-1, 1]);
        break;
      
      case 'differential-manchester':
        signal = [];
        let lastLevel = 1;
        bits.forEach(bit => {
          // Always transition at start of bit
          lastLevel = -lastLevel;
          signal.push(lastLevel);
          // Transition mid-bit only if bit is 0
          if (bit === 0) {
            lastLevel = -lastLevel;
          }
          signal.push(lastLevel);
        });
        break;
      
      case 'ami':
        let lastOnePolarity = 1;
        signal = bits.map(bit => {
          if (bit === 1) {
            lastOnePolarity = -lastOnePolarity;
            return lastOnePolarity;
          }
          return 0;
        });
        break;
      
      default:
        signal = bits;
    }

    return signal;
  };

  const signal = generateSignal();
  const bitDuration = 0.5 / animationSpeed;

  // Animation variants
  const signalVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * bitDuration,
        duration: bitDuration * 0.8,
      },
    }),
  };

  const playAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), signal.length * bitDuration * 1000);
  };

  // Scheme descriptions
  const schemeDescriptions = {
    unipolar: {
      name: "Unipolar Encoding",
      description: "The simplest encoding where 1 is represented by a high voltage and 0 by no voltage.",
      pros: ["Simple to implement"],
      cons: ["No synchronization", "Wastes power", "DC component present"],
      example: "Like a flashlight blinking ON (1) and OFF (0). Simple but inefficient for long distances."
    },
    'nrz-l': {
      name: "NRZ-L (Non-Return to Zero Level)",
      description: "1 is represented by one voltage level and 0 by the opposite level.",
      pros: ["Simple", "No transitions for consecutive bits"],
      cons: ["No synchronization", "DC component present"],
      example: "Like a light switch where UP is 1 and DOWN is 0. No change means same bit continues."
    },
    'nrz-i': {
      name: "NRZ-I (Non-Return to Zero Inverted)",
      description: "A transition at the start of a bit represents 1, no transition represents 0.",
      pros: ["Better synchronization than NRZ-L", "No DC component"],
      cons: ["Still needs clock recovery"],
      example: "Like a doorbell - a ring (transition) means 1, silence means 0."
    },
    manchester: {
      name: "Manchester Encoding",
      description: "Each bit is represented by a mid-bit transition. 1 = high-to-low, 0 = low-to-high.",
      pros: ["Self-clocking (good synchronization)", "No DC component"],
      cons: ["Doubles bandwidth requirement"],
      example: "Like a metronome that swings left for 1 and right for 0, always moving."
    },
    'differential-manchester': {
      name: "Differential Manchester",
      description: "Transition at start of bit represents 0, no transition represents 1. Always transitions mid-bit.",
      pros: ["Self-clocking", "Better noise immunity", "No DC component"],
      cons: ["More complex", "Doubles bandwidth"],
      example: "Like a dance step where you change direction for 0 and keep same for 1, but always step mid-beat."
    },
    ami: {
      name: "AMI (Alternate Mark Inversion)",
      description: "1s alternate between positive and negative, 0s are at zero level.",
      pros: ["No DC component", "Good for long distances"],
      cons: ["Long strings of 0s lose synchronization"],
      example: "Like a conversation where 'yes' alternates between nodding up and down, and 'no' is silence."
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Digital Line Encoding Visualizer
        </h1>
        <p className="text-center text-gray-600 mb-8">
          See how binary data is converted to electrical signals for transmission
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Controls</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Binary Input (0s and 1s)
              </label>
              <input
                type="text"
                value={inputBits}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                maxLength="16"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Encoding Scheme
              </label>
              <select
                value={encodingScheme}
                onChange={(e) => setEncodingScheme(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {schemes.map((scheme) => (
                  <option key={scheme.id} value={scheme.id}>
                    {scheme.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Animation Speed: {animationSpeed}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.5"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={playAnimation}
              disabled={isAnimating}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isAnimating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isAnimating ? 'Playing...' : 'Play Animation'}
            </button>
          </div>

          {/* Signal Visualization */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              {schemeDescriptions[encodingScheme].name} Visualization
            </h2>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Input Bits:</span>
                <div className="flex space-x-2">
                  {inputBits.split('').map((bit, i) => (
                    <div key={i} className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded">
                      {bit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-32 border-t border-gray-200">
                {/* Signal Axis */}
                <div className="absolute left-0 right-0 h-px bg-gray-300 top-1/2"></div>
                <div className="absolute left-0 top-0 text-xs text-gray-500">+V</div>
                <div className="absolute left-0 bottom-0 text-xs text-gray-500">-V</div>
                
                {/* Signal */}
                <div className="absolute left-4 right-4 top-0 bottom-0 overflow-hidden">
                  <div className="relative h-full">
                    {encodingScheme === 'manchester' || encodingScheme === 'differential-manchester' ? (
                      // Manchester encodings have twice as many points
                      <>
                        {signal.map((level, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate={isAnimating ? "visible" : "hidden"}
                            variants={signalVariants}
                            className="absolute top-0 bottom-0 flex items-center"
                            style={{
                              left: `${(i / (signal.length - 1)) * 100}%`,
                              width: `${100 / (signal.length - 1)}%`,
                            }}
                          >
                            <div className="relative w-full">
                              {/* Line to next point */}
                              {i < signal.length - 1 && (
                                <div 
                                  className="absolute h-px bg-blue-600 top-1/2"
                                  style={{
                                    width: '100%',
                                    transform: `translateY(${signal[i+1] > level ? '1px' : signal[i+1] < level ? '-1px' : '0'})`,
                                  }}
                                ></div>
                              )}
                              {/* Current point */}
                              <div 
                                className="absolute w-2 h-2 bg-blue-600 rounded-full -ml-1 -mt-1"
                                style={{
                                  left: '50%',
                                  top: `${50 - level * 40}%`,
                                }}
                              ></div>
                            </div>
                          </motion.div>
                        ))}
                      </>
                    ) : (
                      // Other encodings
                      <>
                        {signal.map((level, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate={isAnimating ? "visible" : "hidden"}
                            variants={signalVariants}
                            className="absolute top-0 bottom-0"
                            style={{
                              left: `${(i / signal.length) * 100}%`,
                              width: `${100 / signal.length}%`,
                            }}
                          >
                            <div 
                              className="absolute w-full bg-blue-600"
                              style={{
                                top: level > 0 ? `${50 - level * 40}%` : '50%',
                                bottom: level < 0 ? `${50 + level * 40}%` : '50%',
                                height: level !== 0 ? `${Math.abs(level) * 80}%` : '1px',
                              }}
                            ></div>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">How {schemeDescriptions[encodingScheme].name} Works:</h3>
              <p className="text-blue-700 text-sm mb-3">{schemeDescriptions[encodingScheme].description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-700 text-sm mb-1">Advantages:</h4>
                  <ul className="text-sm text-green-600 list-disc pl-5">
                    {schemeDescriptions[encodingScheme].pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 text-sm mb-1">Disadvantages:</h4>
                  <ul className="text-sm text-red-600 list-disc pl-5">
                    {schemeDescriptions[encodingScheme].cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-3">
                <h4 className="font-medium text-purple-700 text-sm mb-1">Real-life Example:</h4>
                <p className="text-sm text-purple-600">{schemeDescriptions[encodingScheme].example}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalEncodingVisualizer;