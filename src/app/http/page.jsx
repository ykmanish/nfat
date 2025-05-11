'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NetworkVisualization = () => {
  const [activeTab, setActiveTab] = useState('dns');
  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const dnsSteps = [
    {
      id: 1,
      title: "Browser Checks Cache",
      description: "Checks local DNS cache for the domain's IP",
      icon: "🔍",
      details: "The browser first checks its own cache, then the OS cache, then router cache before proceeding.",
      techNote: "DNS caching follows TTL (Time-To-Live) values set by domain owners.",
      simpleExplanation: "The browser looks in its memory to see if it already knows the website's address.",
      realLifeExample: "Like checking your phone's contacts to see if you already have a friend's number before asking someone else."
    },
    {
      id: 2,
      title: "Query to Recursive Resolver",
      description: "Request sent to ISP's DNS resolver",
      icon: "📡",
      details: "If no local cache exists, the query goes to a recursive resolver (like 8.8.8.8 or your ISP's server).",
      techNote: "Recursive resolvers implement DNS caching to improve performance.",
      simpleExplanation: "If the browser doesn't know the address, it asks a helper (like your internet provider) to find it.",
      realLifeExample: "Like asking a librarian to find a book if you can't find it on the shelf."
    },
    {
      id: 3,
      title: "Root Server Query",
      description: "Root server directs to TLD server",
      icon: "🌍",
      details: "The root server (managed by ICANN) returns addresses for the appropriate TLD (.com, .org, etc.) servers.",
      techNote: "There are 13 logical root server clusters worldwide, each replicated hundreds of times.",
      simpleExplanation: "The helper asks a big directory to find out who knows about '.com' or '.org' websites.",
      realLifeExample: "Like asking a city information desk which office handles '.com' businesses."
    },
    {
      id: 4,
      title: "TLD Server Response",
      description: ".com server points to authoritative NS",
      icon: "🔗",
      details: "The TLD server returns the authoritative name servers for the specific domain.",
      techNote: "TLD servers are managed by various organizations (Verisign for .com, PIR for .org, etc.)",
      simpleExplanation: "The '.com' directory says who has the exact address for the website.",
      realLifeExample: "Like the city office telling you which company owns a specific building."
    },
    {
      id: 5,
      title: "Authoritative Server Response",
      description: "Domain's NS returns the IP address",
      icon: "📌",
      details: "The authoritative name server (like ns1.google.com) returns the actual IP address for the domain.",
      techNote: "Authoritative servers are the ultimate source of truth for a domain's DNS records.",
      simpleExplanation: "The website's own address book gives the final address to the browser.",
      realLifeExample: "Like the building's owner giving you their exact street address."
    },
    {
      id: 6,
      title: "Resolver Caches & Returns IP",
      description: "ISP resolver sends IP to browser",
      icon: "🔙",
      details: "The recursive resolver caches the response (following TTL rules) and returns it to your browser.",
      techNote: "DNS responses typically include multiple IPs for load balancing.",
      simpleExplanation: "The helper saves the address for next time and tells the browser where to go.",
      realLifeExample: "Like the librarian writing down the book's location for you and keeping a note for others."
    }
  ];

  const httpSteps = [
    {
      id: 1,
      title: "TCP Connection",
      description: "Browser establishes TCP connection",
      icon: "🤝",
      details: "Browser initiates a TCP 3-way handshake with the server (SYN, SYN-ACK, ACK).",
      techNote: "HTTPS adds TLS handshake after TCP connection.",
      simpleExplanation: "The browser and website shake hands to make a secure connection.",
      realLifeExample: "Like calling a store to make sure they're open before visiting."
    },
    {
      id: 2,
      title: "HTTP Request",
      description: "Browser sends HTTP request",
      icon: "📨",
      details: "Browser sends a GET request with headers (User-Agent, Accept, Cookies, etc.).",
      techNote: "Modern browsers send HTTP/2 or HTTP/3 requests by default.",
      simpleExplanation: "The browser asks the website for the webpage it wants to show.",
      realLifeExample: "Like asking a waiter for the menu at a restaurant."
    },
    {
      id: 3,
      title: "Server Processing",
      description: "Server processes the request",
      icon: "⚙️",
      details: "Server routes the request, executes backend code, and queries databases if needed.",
      techNote: "Load balancers may distribute requests to multiple backend servers.",
      simpleExplanation: "The website prepares the webpage by gathering all the needed information.",
      realLifeExample: "Like the kitchen preparing your order after you tell the waiter what you want."
    },
    {
      id: 4,
      title: "HTTP Response",
      description: "Server sends response back",
      icon: "📩",
      details: "Server sends response with status code, headers, and the requested content.",
      techNote: "Responses include cache headers (Cache-Control, ETag) for browser caching.",
      simpleExplanation: "The website sends the webpage back to the browser.",
      realLifeExample: "Like the waiter bringing your food to the table."
    },
    {
      id: 5,
      title: "Browser Rendering",
      description: "Browser processes response",
      icon: "🖥️",
      details: "Browser parses HTML, fetches additional resources (CSS, JS, images), and renders the page.",
      techNote: "Modern browsers use speculative parsing to load resources faster.",
      simpleExplanation: "The browser builds and displays the webpage on your screen.",
      realLifeExample: "Like setting up a puzzle by putting all the pieces together to see the picture."
    },
    {
      id: 6,
      title: "Connection Closure",
      description: "TCP connection terminates",
      icon: "👋",
      details: "Connection closes or persists for future requests (HTTP keep-alive).",
      techNote: "HTTP/2 and HTTP/3 maintain persistent connections by default.",
      simpleExplanation: "The browser and website finish talking, unless they need to talk again soon.",
      realLifeExample: "Like hanging up the phone after your call with the store, or keeping it open for more questions."
    }
  ];

  const currentSteps = activeTab === 'dns' ? dnsSteps : httpSteps;

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const resetAnimation = () => {
    setActiveStep(null);
    setCompletedSteps([]);
    setIsAnimating(false);
  };

  const playAnimation = async () => {
    resetAnimation();
    setIsAnimating(true);
    
    for (let i = 0; i < currentSteps.length; i++) {
      handleStepClick(currentSteps[i].id);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIsAnimating(false);
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stepVariants = {
    inactive: { opacity: 0.6, scale: 0.98 },
    active: { opacity: 1, scale: 1 },
    completed: { opacity: 1, scale: 1 }
  };

  const iconVariants = {
    inactive: { scale: 1, backgroundColor: "#ffffff", color: "#3b82f6", borderColor: "#93c5fd" },
    active: { scale: 1.1, backgroundColor: "#2563eb", color: "#ffffff", borderColor: "#2563eb" },
    completed: { scale: 1, backgroundColor: "#3b82f6", color: "#ffffff", borderColor: "#3b82f6" }
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2"
        >
          Network Process Visualizer
        </motion.h1>
        
        {/* Tabs */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={tabVariants}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => { setActiveTab('dns'); resetAnimation(); }}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'dns' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              DNS Resolution
            </button>
            <button
              onClick={() => { setActiveTab('http'); resetAnimation(); }}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'http' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              HTTP Workflow
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Timeline */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 h-full"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {activeTab === 'dns' ? 'DNS Resolution Steps' : 'HTTP Request Flow'}
              </h2>
              <div className="relative">
                {/* Timeline line */}
                <motion.div 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-8 h-full w-1 bg-blue-300 transform -translate-x-1/2 top-0 origin-top"
                ></motion.div>
                
                {/* Steps */}
                <div className="space-y-6">
                  {currentSteps.map((step) => (
                    <motion.div 
                      key={step.id}
                      initial="inactive"
                      animate={
                        activeStep === step.id ? "active" : 
                        completedSteps.includes(step.id) ? "completed" : "inactive"
                      }
                      variants={stepVariants}
                      transition={{ duration: 0.3 }}
                      className="relative flex items-start"
                      onClick={() => !isAnimating && handleStepClick(step.id)}
                    >
                      {/* Step icon */}
                      <motion.div 
                        variants={iconVariants}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center justify-center w-12 h-12 rounded-full text-xl z-10 border-2 cursor-pointer`}
                      >
                        {step.icon}
                      </motion.div>
                      
                      {/* Step content */}
                      <motion.div 
                        className={`ml-4 p-3 rounded-lg flex-1 
                          ${activeStep === step.id ? 'bg-blue-50 shadow-sm border-l-4 border-blue-500' : 'bg-gray-50'}`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <h3 className="font-bold text-base text-gray-800">{step.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                        <AnimatePresence>
                          {activeStep === step.id && (
                            <motion.div 
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={contentVariants}
                              className="mt-2 text-blue-700 text-xs"
                            >
                              {activeTab === 'dns' ? 
                                (step.id === 1 ? "Checking local cache..." :
                                 step.id === 2 ? "Contacting ISP resolver..." :
                                 step.id === 3 ? "Querying root server..." :
                                 step.id === 4 ? "Getting TLD information..." :
                                 step.id === 5 ? "Fetching authoritative record..." :
                                 "Returning IP to browser...") :
                                (step.id === 1 ? "Establishing TCP connection..." :
                                 step.id === 2 ? "Sending HTTP request..." :
                                 step.id === 3 ? "Processing on server..." :
                                 step.id === 4 ? "Generating response..." :
                                 step.id === 5 ? "Rendering content..." :
                                 "Closing connection...")
                              }
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                className="flex justify-center mt-8 space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button 
                  onClick={resetAnimation}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                  disabled={isAnimating}
                >
                  Reset
                </button>
                <button 
                  onClick={playAnimation}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                  disabled={isAnimating}
                >
                  {isAnimating ? "Playing..." : "Play Animation"}
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6 h-full sticky top-4"
            >
              <AnimatePresence mode="wait">
                {activeStep ? (
                  <motion.div
                    key={`detail-${activeStep}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-bold text-xl text-gray-800 mb-4">
                      Step {activeStep}: {currentSteps.find(step => step.id === activeStep).title}
                    </h3>
                    <motion.div 
                      className="mb-6 p-4 bg-blue-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-gray-700">
                        {currentSteps.find(step => step.id === activeStep).details}
                      </p>
                    </motion.div>
                    <motion.div 
                      className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="font-semibold text-yellow-800 mb-2">Technical Insight</h4>
                      <p className="text-yellow-700 text-sm">
                        {currentSteps.find(step => step.id === activeStep).techNote}
                      </p>
                    </motion.div>
                    <motion.div 
                      className="mb-6 p-4 bg-green-50 border-l-4 border-green-600 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-semibold text-green-800 mb-2">Simple Explanation</h4>
                      <p className="text-green-700 text-sm">
                        {currentSteps.find(step => step.id === activeStep).simpleExplanation}
                      </p>
                      <h4 className="font-semibold text-green-800 mt-4 mb-2">Real-Life Example</h4>
                      <p className="text-green-700 text-sm">
                        {currentSteps.find(step => step.id === activeStep).realLifeExample}
                      </p>
                    </motion.div>
                    {activeStep === currentSteps.length && (
                      <motion.div 
                        className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="font-semibold text-green-800 mb-2">Process Complete</h4>
                        <p className="text-green-700">
                          {activeTab === 'dns' ? 
                            "The domain has been resolved to an IP address and the browser can now establish a connection." :
                            "The webpage has finished loading and is now interactive."}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div 
                      className="text-5xl mb-4"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {activeTab === 'dns' ? '🌐' : '📡'}
                    </motion.div>
                    <h3 className="text-xl font-medium text-gray-500 mb-2">
                      {activeTab === 'dns' ? 'DNS Resolution Visualizer' : 'HTTP Workflow Visualizer'}
                    </h3>
                    <p className="text-gray-400 max-w-md">
                      {activeTab === 'dns' ? 
                        "Click on any DNS resolution step or press 'Play Animation' to see how browsers find website IP addresses." :
                        "Click on any HTTP workflow step or press 'Play Animation' to see how browsers communicate with web servers."}
                    </p>
                    <motion.div 
                      className="mt-6 w-16 h-2 bg-blue-200 rounded-full"
                      animate={{ 
                        scaleX: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkVisualization;