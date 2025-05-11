'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';



const MediaCommunicationVisualizer = () => {
  const [activeCategory, setActiveCategory] = useState('guided');
  const [activeMedia, setActiveMedia] = useState('twisted-pair');

  // Media definitions with image references
  const mediaTypes = {
    guided: [
      {
        id: 'twisted-pair',
        name: 'Twisted Pair Cable',
        image: "https://datasave.qsfptek.com/resources/image/2021-12-29261151.jpg",
        description: 'Two insulated copper wires twisted together to reduce interference',
        characteristics: ['Low cost', 'Easy to install', 'Limited bandwidth (1MHz)', 'Short distances (<100m)'],
        applications: ['Telephone lines', 'Ethernet networks', 'DSL connections'],
        types: [
          { name: 'UTP (Unshielded)', use: 'Common Ethernet cables' },
          { name: 'STP (Shielded)', use: 'Industrial environments' }
        ]
      },
      {
        id: 'coaxial',
        name: 'Coaxial Cable',
        image: "https://datasave.qsfptek.com/resources/image/2021-12-29453510.jpg",
        description: 'Central conductor surrounded by insulation and metallic shield',
        characteristics: ['Better shielding than TP', 'Higher bandwidth (750MHz)', 'Longer distances (500m)', 'More expensive'],
        applications: ['Cable TV', 'Broadband internet', 'CCTV systems'],
        types: [
          { name: 'RG-6', use: 'Cable television' },
          { name: 'RG-58', use: 'Thin Ethernet' }
        ]
      },
      {
        id: 'fiber-optic',
        name: 'Fiber Optic Cable',
        image: "https://datasave.qsfptek.com/resources/image/2021-12-29354782.jpg",
        description: 'Glass fibers carrying light pulses for data transmission',
        characteristics: ['Extremely high bandwidth', 'Immune to EMI', 'Very long distances (40km+)', 'Expensive installation'],
        applications: ['Internet backbones', 'Telecom networks', 'Medical imaging'],
        types: [
          { name: 'Single-mode', use: 'Long distance (100km)' },
          { name: 'Multi-mode', use: 'Short distance (2km)' }
        ]
      }
    ],
    unguided: [
      {
        id: 'radio',
        name: 'Radio Waves',
        image: "https://www.researchgate.net/profile/Eyo-Essien-2/publication/344679603/figure/fig5/AS:947129086382081@1602824579891/Scattering-of-radio-signals-by-rain-drops.ppm",
        description: 'Omnidirectional waves (3kHz-300GHz) requiring antennas',
        characteristics: ['Long range', 'Penetrates walls', 'Low data rate', 'Susceptible to interference'],
        applications: ['AM/FM radio', 'TV broadcasting', 'WiFi (2.4/5GHz)'],
        frequency: '3kHz - 300GHz'
      },
      {
        id: 'microwave',
        name: 'Microwave',
        image: "https://c7.alamy.com/comp/2R1BYMH/electromagnetic-wave-vector-illustration-scientific-illustration-of-electromagnetic-wave-consisting-of-electric-and-magnetic-fields-and-propagation-2R1BYMH.jpg",
        description: 'Directional high-frequency waves (1-300GHz)',
        characteristics: ['Line-of-sight needed', 'High bandwidth', 'Affected by weather', 'Tower alignment required'],
        applications: ['Cellular networks', 'Satellite comms', 'Radar systems'],
        frequency: '1GHz - 300GHz'
      },
      {
        id: 'infrared',
        name: 'Infrared',
        image: "https://cdn.langeek.co/photo/26028/original/none?type=png",
        description: 'Short-range communication using light (300GHz-400THz)',
        characteristics: ['Very short range', 'No license needed', 'Secure (doesn\'t penetrate walls)', 'Affected by light'],
        applications: ['TV remotes', 'Wireless mice', 'IR data transfer'],
        frequency: '300GHz - 400THz'
      },
      {
        id: 'satellite',
        name: 'Satellite Communication',
        image: "https://cdn1.byjus.com/wp-content/uploads/2020/06/Physics-Images-Satellite-communication-4.png",
        description: 'Communication via orbiting satellites (C/Ku/Ka bands)',
        characteristics: ['Global coverage', 'High latency (250ms+)', 'Expensive infrastructure', 'Weather affected'],
        applications: ['GPS', 'Satellite TV', 'Military comms'],
        orbits: [
          { name: 'LEO', alt: '160-2,000km', use: 'Starlink, Iridium' },
          { name: 'MEO', alt: '2,000-35,786km', use: 'GPS systems' },
          { name: 'GEO', alt: '35,786km', use: 'Weather satellites' }
        ]
      }
    ]
  };

  // Current media being displayed
  const currentMedia = [...mediaTypes.guided, ...mediaTypes.unguided].find(m => m.id === activeMedia);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Communication Media Visualizer
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl">
        Understanding transmission media in computer networks
      </p>

      {/* Category Selector */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => {
            setActiveCategory('guided');
            setActiveMedia('twisted-pair');
          }}
          className={`px-4 py-2 rounded-lg ${
            activeCategory === 'guided' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Guided Media
        </button>
        <button
          onClick={() => {
            setActiveCategory('unguided');
            setActiveMedia('radio');
          }}
          className={`px-4 py-2 rounded-lg ${
            activeCategory === 'unguided' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Unguided Media
        </button>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Media Type Selector */}
        <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">
            {activeCategory === 'guided' ? 'Wired Media' : 'Wireless Media'}
          </h2>
          <div className="space-y-2">
            {mediaTypes[activeCategory].map((media) => (
              <button
                key={media.id}
                onClick={() => setActiveMedia(media.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                  activeMedia === media.id 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="w-10 h-10 relative">
                  <img 
                    src={media.image}
                    alt={media.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <span className="font-medium">{media.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-md p-6">
          <motion.div
            key={activeMedia}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-col gap-6">
              
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentMedia.name}
                </h2>
                <p className="text-gray-600 mt-2">{currentMedia.description}</p>
                
                {currentMedia.frequency && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      Frequency Range: <span className="font-normal">{currentMedia.frequency}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full  relative rounded-lg overflow-hidden">
                <img 
                  src={currentMedia.image}
                  alt={currentMedia.name}
                  layout="fill"
                  className='w-full h-80'
                  objectFit="cover"
                />
              </div>
            </div>

            {/* Wave Visualization */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">Signal Characteristics</h3>
              <div className="h-40 relative">
                {activeCategory === 'guided' ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                      <p className="text-gray-500">Electrical/Light pulses travel through cable</p>
                      <div className="mt-2 flex justify-center">
                        <div className="w-64 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    {/* Radio wave animation */}
                    {activeMedia === 'radio' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-40 h-40">
                          {[1, 2, 3].map((ring) => (
                            <motion.div
                              key={ring}
                              className="absolute border-2 border-blue-500 rounded-full"
                              style={{
                                width: `${ring * 40}px`,
                                height: `${ring * 40}px`,
                                left: `calc(50% - ${ring * 20}px)`,
                                top: `calc(50% - ${ring * 20}px)`
                              }}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.6, 1, 0.6]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: ring * 0.5
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Microwave animation */}
                    {activeMedia === 'microwave' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-20">
                          <motion.div
                            className="absolute h-1 bg-blue-500 top-1/2"
                            style={{ width: '100%' }}
                            animate={{
                              backgroundPosition: ['0% 50%', '100% 50%']
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                          />
                          <motion.div
                            className="absolute text-sm text-blue-700"
                            style={{ left: '75%', top: '60%' }}
                            animate={{
                              x: ['0%', '80%', '0%']
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity
                            }}
                          >
                            ↑ Directional
                          </motion.div>
                        </div>
                      </div>
                    )}
                    
                    {/* Infrared animation */}
                    {activeMedia === 'infrared' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-40 h-40">
                          <motion.div
                            className="absolute bg-red-500 rounded-full"
                            style={{
                              width: '8px',
                              height: '8px',
                              left: '20%',
                              top: '50%'
                            }}
                            animate={{
                              x: ['0%', '60%', '0%'],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity
                            }}
                          />
                          <motion.div
                            className="absolute bg-red-500 rounded-full"
                            style={{
                              width: '8px',
                              height: '8px',
                              left: '20%',
                              top: '50%'
                            }}
                            animate={{
                              x: ['0%', '60%', '0%'],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.3
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Satellite animation */}
                    {activeMedia === 'satellite' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-40">
                          <motion.div
                            className="absolute bg-gray-800 rounded-full"
                            style={{
                              width: '20px',
                              height: '20px',
                              left: '10%',
                              top: '50%'
                            }}
                          />
                          <motion.div
                            className="absolute bg-blue-500 rounded-full"
                            style={{
                              width: '10px',
                              height: '10px',
                              left: '70%',
                              top: '30%'
                            }}
                            animate={{
                              y: ['0%', '40%', '0%'],
                              x: ['0%', '10%', '0%']
                            }}
                            transition={{
                              duration: 6,
                              repeat: Infinity
                            }}
                          />
                          <motion.div
                            className="absolute h-px bg-blue-300"
                            style={{
                              left: '12%',
                              right: '30%',
                              top: '55%'
                            }}
                          />
                          <motion.div
                            className="absolute h-px bg-blue-300"
                            style={{
                              left: '30%',
                              right: '72%',
                              top: '35%'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-3">Characteristics</h3>
                <ul className="space-y-2">
                  {currentMedia.characteristics.map((char, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-green-700"
                    >
                      <span>•</span>
                      <span>{char}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-3">Applications</h3>
                <ul className="space-y-2">
                  {currentMedia.applications.map((app, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="flex items-start gap-2 text-blue-700"
                    >
                      <span>•</span>
                      <span>{app}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specialized Information */}
            {currentMedia.types && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800 mb-3">Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentMedia.types.map((type, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                      className="bg-white p-3 rounded-lg shadow-sm"
                    >
                      <h4 className="font-semibold text-purple-700">{type.name}</h4>
                      <p className="text-purple-600 text-sm">{type.use}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentMedia.orbits && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-3">Satellite Orbits</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentMedia.orbits.map((orbit, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                      className="bg-white p-3 rounded-lg shadow-sm"
                    >
                      <h4 className="font-semibold text-yellow-700">{orbit.name}</h4>
                      <p className="text-yellow-600 text-sm">Altitude: {orbit.alt}</p>
                      <p className="text-yellow-600 text-sm">Used for: {orbit.use}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MediaCommunicationVisualizer;