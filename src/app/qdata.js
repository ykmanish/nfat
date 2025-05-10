export const questions = [
  // General Knowledge (12 questions)
  {
    id: 1,
    question: "Who is the author of the book 'Wings of Fire'?",
    options: ["A.P.J. Abdul Kalam", "Jawaharlal Nehru", "R.K. Narayan", "Vikram Seth"],
    correctAnswer: 0,
    domain: "General Knowledge",
    explanation: "'Wings of Fire' is an autobiography of A.P.J. Abdul Kalam, India's 11th President."
  },
  {
    id: 2,
    question: "Which day is celebrated as World Cyber Security Day?",
    options: ["November 30", "October 1", "December 12", "February 5"],
    correctAnswer: 0,
    domain: "General Knowledge",
    explanation: "World Cyber Security Day is celebrated on November 30 to raise awareness about cybersecurity."
  },
  {
    id: 3,
    question: "Which Indian state was the first to implement the Panchayati Raj system?",
    options: ["Rajasthan", "Maharashtra", "Gujarat", "West Bengal"],
    correctAnswer: 0,
    domain: "General Knowledge",
    explanation: "Rajasthan was the first state to implement Panchayati Raj in 1959 in Nagaur district."
  },
  {
    id: 4,
    question: "Who won the Nobel Prize in Physics in 2020 for discoveries about black holes?",
    options: ["Roger Penrose, Reinhard Genzel, Andrea Ghez", "Donna Strickland, Gérard Mourou, Arthur Ashkin", "James Peebles, Michel Mayor, Didier Queloz", "Rainer Weiss, Kip Thorne, Barry Barish"],
    correctAnswer: 0,
    domain: "General Knowledge",
    explanation: "Roger Penrose, Reinhard Genzel, and Andrea Ghez won for their discoveries about black holes."
  },
  {
    id: 5,
    question: "Which of these is NOT a fundamental right under the Indian Constitution?",
    options: ["Right to Equality", "Right to Property", "Right to Freedom of Religion", "Right against Exploitation"],
    correctAnswer: 1,
    domain: "General Knowledge",
    explanation: "Right to Property was removed from fundamental rights and made a legal right under Article 300A."
  },
  {
    id: 6,
    question: "The 'Blue Whale Challenge' is associated with which of the following?",
    options: ["Marine conservation", "A dangerous online game", "A new Olympic sport", "A social media platform"],
    correctAnswer: 1,
    domain: "General Knowledge",
    explanation: "The Blue Whale Challenge was a dangerous online game that allegedly encouraged self-harm."
  },
  {
    id: 7,
    question: "Which Indian city hosted the 44th Chess Olympiad in 2022?",
    options: ["Chennai", "New Delhi", "Mumbai", "Hyderabad"],
    correctAnswer: 0,
    domain: "General Knowledge",
    explanation: "Chennai hosted the 44th Chess Olympiad in 2022 at the Four Points by Sheraton."
  },
  {
    id: 8,
    question: "The 'Digital India' campaign was launched in which year?",
    options: ["2014", "2015", "2016", "2017"],
    correctAnswer: 1,
    domain: "General Knowledge",
    explanation: "Digital India was launched on July 1, 2015 by Prime Minister Narendra Modi."
  },
  {
    id: 9,
    question: "Which of these is India's first indigenously developed anti-satellite missile?",
    options: ["Agni-V", "Prithvi", "Mission Shakti", "A-SAT"],
    correctAnswer: 2,
    domain: "General Knowledge",
    explanation: "Mission Shakti was India's first successful anti-satellite missile test conducted in 2019."
  },
  {
    id: 10,
    question: "Who is known as the 'Father of Indian Space Program'?",
    options: ["A.P.J. Abdul Kalam", "Vikram Sarabhai", "Homi Bhabha", "Satish Dhawan"],
    correctAnswer: 1,
    domain: "General Knowledge",
    explanation: "Vikram Sarabhai is considered the Father of the Indian Space Program."
  },
  {
    id: 11,
    question: "Which of these awards is given for exceptional contribution to cybersecurity?",
    options: ["Ramon Magsaysay Award", "Infosys Prize", "Global Cybersecurity Excellence Award", "Ashoka Chakra"],
    correctAnswer: 2,
    domain: "General Knowledge",
    explanation: "The Global Cybersecurity Excellence Award recognizes outstanding contributions in cybersecurity."
  },
  {
    id: 12,
    question: "The 'Pradhan Mantri Gramin Digital Saksharta Abhiyan' aims to:",
    options: ["Provide digital literacy in rural areas", "Install ATMs in villages", "Develop rural e-commerce", "Provide free smartphones"],
    correctAnswer: 0,
    domain: "General Knowledge",
    explanation: "The scheme aims to make 6 crore rural households digitally literate."
  },

  // Logical Reasoning and Aptitude (12 questions)
  {
    id: 13,
    question: "Complete the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    domain: "Logical Reasoning and Aptitude",
    explanation: "The pattern is adding consecutive even numbers: +4, +6, +8, +10, +12 → 30+12=42"
  },
  {
    id: 14,
    question: "If 'PENCIL' is coded as 'RGPENK', how is 'PAPER' coded in the same language?",
    options: ["RCRGT", "RCRTG", "RCTGR", "RCTRG"],
    correctAnswer: 0,
    domain: "Logical Reasoning and Aptitude",
    explanation: "Each letter is moved two positions forward in the alphabet: P→R, A→C, P→R, E→G, R→T"
  },
  {
    id: 15,
    question: "A is B's sister. C is B's mother. D is C's father. How is A related to D?",
    options: ["Granddaughter", "Grandson", "Daughter", "Niece"],
    correctAnswer: 0,
    domain: "Logical Reasoning and Aptitude",
    explanation: "D is grandfather (father of C, who is mother of B and A), so A is granddaughter."
  },
  {
    id: 16,
    question: "Which of the following is the mirror image of 'CYBER'?",
    options: ["REBYC", "ƆYᗡƎᖵ", "REBγC", "ƆYᗡƎЯ"],
    correctAnswer: 3,
    domain: "Logical Reasoning and Aptitude",
    explanation: "The correct mirror image reverses the letters and shows their mirrored forms."
  },
  {
    id: 17,
    question: "Statement: All hackers are cyber criminals. Some cyber criminals are arrested. Conclusion: Some hackers are arrested.",
    options: ["Definitely true", "Probably true", "Probably false", "Definitely false"],
    correctAnswer: 2,
    domain: "Logical Reasoning and Aptitude",
    explanation: "The conclusion doesn't necessarily follow as the arrested criminals might not be hackers."
  },
  {
    id: 18,
    question: "If North-West becomes East, what will South-East become?",
    options: ["North", "West", "North-West", "South-West"],
    correctAnswer: 1,
    domain: "Logical Reasoning and Aptitude",
    explanation: "Rotating the compass 135° clockwise makes NW→E, so SE→W."
  },
  {
    id: 19,
    question: "Find the odd one out: Phishing, Spoofing, Encryption, DDoS",
    options: ["Phishing", "Spoofing", "Encryption", "DDoS"],
    correctAnswer: 2,
    domain: "Logical Reasoning and Aptitude",
    explanation: "Encryption is a security measure while others are cyber attacks."
  },
  {
    id: 20,
    question: "If 'Computer' is related to 'Hardware', then 'Cybersecurity' is related to:",
    options: ["Software", "Threats", "Protection", "Networks"],
    correctAnswer: 2,
    domain: "Logical Reasoning and Aptitude",
    explanation: "Cybersecurity primarily deals with protection against digital threats."
  },
  {
    id: 21,
    question: "Which number comes next in the series: 1, 1, 2, 3, 5, 8, 13, ?",
    options: ["18", "20", "21", "23"],
    correctAnswer: 2,
    domain: "Logical Reasoning and Aptitude",
    explanation: "Fibonacci series where each number is the sum of the two preceding ones: 8+13=21"
  },
  {
    id: 22,
    question: "Complete the analogy: Firewall : Network :: ? : Building",
    options: ["Door", "Security guard", "Alarm system", "CCTV"],
    correctAnswer: 1,
    domain: "Logical Reasoning and Aptitude",
    explanation: "A firewall protects a network like a security guard protects a building."
  },
  {
    id: 23,
    question: "If all Zips are Zaps and some Zaps are Zops, then which statement must be true?",
    options: ["All Zips are Zops", "Some Zips are Zops", "No Zips are Zops", "None of the above"],
    correctAnswer: 3,
    domain: "Logical Reasoning and Aptitude",
    explanation: "We cannot definitively conclude any of the given options from the statements."
  },
  {
    id: 24,
    question: "Arrange in logical order: 1. Cyber attack 2. Investigation 3. Vulnerability 4. Patch 5. Exploit",
    options: ["3,5,1,2,4", "1,3,5,2,4", "3,1,5,2,4", "5,3,1,2,4"],
    correctAnswer: 0,
    domain: "Logical Reasoning and Aptitude",
    explanation: "Vulnerability leads to exploit which causes attack, then investigation and patch."
  },

  // Mathematical Reasoning and Data Interpretation (12 questions)
  {
    id: 25,
    question: "If 12 workers can complete a cybersecurity project in 20 days, how many workers are needed to complete it in 15 days?",
    options: ["16", "18", "20", "24"],
    correctAnswer: 0,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "Work = 12 workers × 20 days = 240 worker-days. For 15 days: 240/15 = 16 workers"
  },
  {
    id: 26,
    question: "A cybersecurity firm's profit increased by 25% in Q1, then decreased by 20% in Q2. If the original profit was ₹10 lakh, what is it now?",
    options: ["₹9 lakh", "₹10 lakh", "₹11 lakh", "₹12 lakh"],
    correctAnswer: 1,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "After Q1: 10 × 1.25 = 12.5 lakh. After Q2: 12.5 × 0.8 = 10 lakh"
  },
  {
    id: 27,
    question: "The ratio of cybersecurity analysts to ethical hackers in a company is 5:3. If there are 120 analysts, how many ethical hackers are there?",
    options: ["48", "72", "80", "96"],
    correctAnswer: 1,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "5 parts = 120 → 1 part = 24 → 3 parts = 72"
  },
  {
    id: 28,
    question: "A train carrying sensitive data travels 300 km in 5 hours. If it stops for 30 minutes during this journey, what is its average speed?",
    options: ["55 km/h", "60 km/h", "65 km/h", "70 km/h"],
    correctAnswer: 1,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "Total time = 5 hours (including stop). Speed = Distance/Time = 300/5 = 60 km/h"
  },
  {
    id: 29,
    question: "If a data breach affects 0.05% of a company's 5 million customers, how many customers are affected?",
    options: ["250", "2,500", "25,000", "250,000"],
    correctAnswer: 1,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "0.05% of 5,000,000 = (0.05/100) × 5,000,000 = 2,500"
  },
  {
    id: 30,
    question: "What is the next number in the series: 3, 9, 27, 81, ?",
    options: ["162", "243", "324", "405"],
    correctAnswer: 1,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "Each number is multiplied by 3: 3×3=9, 9×3=27, 27×3=81, 81×3=243"
  },
  {
    id: 31,
    question: "A cybersecurity budget is divided between software (40%), hardware (35%), and training (25%). If the total budget is ₹20 lakh, how much is spent on training?",
    options: ["₹4 lakh", "₹5 lakh", "₹6 lakh", "₹7 lakh"],
    correctAnswer: 1,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "25% of 20 lakh = 0.25 × 20 = 5 lakh"
  },
  {
    id: 32,
    question: "If a password must be 8-12 characters long and contain at least one number and one special character, how many possible passwords exist if there are 26 letters, 10 numbers, and 10 special characters?",
    options: ["(26+10+10)^12", "26^8 × 10 × 10", "Σ from 8 to 12 of (62^n - 52^n - 36^n + 26^n)", "None of the above"],
    correctAnswer: 2,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "The correct formula accounts for all lengths and the inclusion requirements."
  },
  {
    id: 33,
    question: "A company's cybersecurity incidents per month are: Jan-5, Feb-8, Mar-6, Apr-10. What is the average incidents per month?",
    options: ["6", "7", "7.25", "7.5"],
    correctAnswer: 2,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "(5+8+6+10)/4 = 29/4 = 7.25"
  },
  {
    id: 34,
    question: "If a security system has a 90% detection rate and processes 1,000 threats daily, how many threats might go undetected?",
    options: ["10", "50", "100", "200"],
    correctAnswer: 2,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "10% of 1000 = 100 threats undetected"
  },
  {
    id: 35,
    question: "A data center has 5 servers, each with 95% uptime. What is the probability all 5 are up simultaneously?",
    options: ["77.4%", "85.7%", "90.2%", "95%"],
    correctAnswer: 0,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "0.95^5 ≈ 0.7738 or 77.4%"
  },
  {
    id: 36,
    question: "A ransomware attack costs a company ₹50,000 immediately plus ₹5,000 per day for recovery. What's the total cost after 2 weeks?",
    options: ["₹85,000", "₹100,000", "₹120,000", "₹150,000"],
    correctAnswer: 2,
    domain: "Mathematical Reasoning and Data Interpretation",
    explanation: "50,000 + (5,000 × 14) = 50,000 + 70,000 = 120,000"
  },

  // Information and Communication Technology (12 questions)
  {
    id: 37,
    question: "What does VPN stand for?",
    options: ["Virtual Private Network", "Verified Private Network", "Virtual Public Network", "Verified Public Network"],
    correctAnswer: 0,
    domain: "Information and Communication Technology",
    explanation: "VPN stands for Virtual Private Network, which provides secure communication over public networks."
  },
  {
    id: 38,
    question: "Which protocol is used for secure web browsing?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correctAnswer: 2,
    domain: "Information and Communication Technology",
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) encrypts web traffic for secure browsing."
  },
  {
    id: 39,
    question: "What is the full form of ICT?",
    options: ["International Communication Technology", "Information and Computer Technology", "Information and Communication Technology", "Integrated Communication Technology"],
    correctAnswer: 2,
    domain: "Information and Communication Technology",
    explanation: "ICT stands for Information and Communication Technology."
  },
  {
    id: 40,
    question: "Which of these is NOT a cloud service model?",
    options: ["IaaS", "PaaS", "SaaS", "BaaS"],
    correctAnswer: 3,
    domain: "Information and Communication Technology",
    explanation: "The main cloud service models are IaaS, PaaS, and SaaS. BaaS (Backend as a Service) is less common."
  },
  {
    id: 41,
    question: "What is the primary purpose of a firewall?",
    options: ["To prevent unauthorized access", "To speed up internet connection", "To create backups", "To manage emails"],
    correctAnswer: 0,
    domain: "Information and Communication Technology",
    explanation: "A firewall's main purpose is to monitor and control incoming and outgoing network traffic based on security rules."
  },
  {
    id: 42,
    question: "Which of these is an example of synchronous communication?",
    options: ["Email", "Video conferencing", "Discussion forum", "Blog comments"],
    correctAnswer: 1,
    domain: "Information and Communication Technology",
    explanation: "Video conferencing is synchronous as participants communicate in real-time."
  },
  {
    id: 43,
    question: "What does 'URL' stand for?",
    options: ["Uniform Resource Locator", "Universal Reference Link", "Uniform Reference Locator", "Universal Resource Link"],
    correctAnswer: 0,
    domain: "Information and Communication Technology",
    explanation: "URL stands for Uniform Resource Locator, the address of a web resource."
  },
  {
    id: 44,
    question: "Which digital initiative provides online courses from Indian universities?",
    options: ["DigiLocker", "SWAYAM", "UMANG", "e-Hospital"],
    correctAnswer: 1,
    domain: "Information and Communication Technology",
    explanation: "SWAYAM (Study Webs of Active Learning for Young Aspiring Minds) provides online courses."
  },
  {
    id: 45,
    question: "What is the purpose of two-factor authentication?",
    options: ["To increase login speed", "To reduce password complexity", "To enhance security", "To allow multiple users"],
    correctAnswer: 2,
    domain: "Information and Communication Technology",
    explanation: "Two-factor authentication enhances security by requiring two different forms of identification."
  },
  {
    id: 46,
    question: "Which technology enables contactless payments?",
    options: ["NFC", "GPS", "Bluetooth", "RFID"],
    correctAnswer: 0,
    domain: "Information and Communication Technology",
    explanation: "NFC (Near Field Communication) enables contactless payments like mobile wallets."
  },
  {
    id: 47,
    question: "What is the primary function of an ISP?",
    options: ["To develop software", "To provide internet access", "To manufacture hardware", "To create websites"],
    correctAnswer: 1,
    domain: "Information and Communication Technology",
    explanation: "ISP (Internet Service Provider) primarily provides internet access to customers."
  },
  {
    id: 48,
    question: "Which of these is NOT a database management system?",
    options: ["MySQL", "Oracle", "MongoDB", "Apache"],
    correctAnswer: 3,
    domain: "Information and Communication Technology",
    explanation: "Apache is a web server software, not a database management system."
  },

  // Communication (12 questions)
  {
    id: 49,
    question: "Which of these is an example of non-verbal communication?",
    options: ["Email", "Phone call", "Facial expression", "Podcast"],
    correctAnswer: 2,
    domain: "Communication",
    explanation: "Facial expressions are a form of non-verbal communication."
  },
  {
    id: 50,
    question: "What is the primary purpose of feedback in communication?",
    options: ["To complete the communication cycle", "To criticize the sender", "To delay the process", "To document the interaction"],
    correctAnswer: 0,
    domain: "Communication",
    explanation: "Feedback completes the communication cycle by providing the sender information about the message's reception."
  },
  {
    id: 51,
    question: "Which barrier occurs when technical jargon is used with non-technical audiences?",
    options: ["Physical barrier", "Language barrier", "Psychological barrier", "Organizational barrier"],
    correctAnswer: 1,
    domain: "Communication",
    explanation: "Using technical terms with non-technical audiences creates a language/semantic barrier."
  },
  {
    id: 52,
    question: "In the communication process, encoding refers to:",
    options: ["Receiving the message", "Translating ideas into communicable form", "Interpreting the message", "Selecting the channel"],
    correctAnswer: 1,
    domain: "Communication",
    explanation: "Encoding is the process of converting thoughts into communication forms like words or gestures."
  },
  {
    id: 53,
    question: "Which communication style is most effective in a crisis situation?",
    options: ["Assertive", "Aggressive", "Passive", "Manipulative"],
    correctAnswer: 0,
    domain: "Communication",
    explanation: "Assertive communication is direct yet respectful, making it most effective in crises."
  },
  {
    id: 54,
    question: "What is 'noise' in the communication process?",
    options: ["Any distraction during communication", "Speaking too softly", "Using complex words", "Lack of feedback"],
    correctAnswer: 0,
    domain: "Communication",
    explanation: "Noise refers to any interference that disrupts the communication process."
  },
  {
    id: 55,
    question: "Which of these is NOT a characteristic of effective communication?",
    options: ["Clarity", "Completeness", "Complexity", "Conciseness"],
    correctAnswer: 2,
    domain: "Communication",
    explanation: "Effective communication should be simple and clear, not unnecessarily complex."
  },
  {
    id: 56,
    question: "In intercultural communication, what does 'high-context culture' refer to?",
    options: ["Cultures that rely heavily on explicit verbal messages", "Cultures that emphasize written communication", "Cultures where much is communicated through context", "Cultures with many official languages"],
    correctAnswer: 2,
    domain: "Communication",
    explanation: "High-context cultures communicate much through context, relationships, and non-verbal cues."
  },
  {
    id: 57,
    question: "Which of these is an example of upward communication in an organization?",
    options: ["CEO sending an email to all employees", "Team leader reporting to manager", "Department head announcing policy", "Colleagues discussing a project"],
    correctAnswer: 1,
    domain: "Communication",
    explanation: "Upward communication flows from lower to higher organizational levels."
  },
  {
    id: 58,
    question: "What is the primary advantage of written communication over oral communication?",
    options: ["Immediate feedback", "Permanent record", "Emotional impact", "Speed of transmission"],
    correctAnswer: 1,
    domain: "Communication",
    explanation: "Written communication provides a permanent record that can be referenced later."
  },
  {
    id: 59,
    question: "Which communication channel is most appropriate for conveying sensitive performance feedback?",
    options: ["Company-wide email", "Public announcement", "Face-to-face meeting", "Social media post"],
    correctAnswer: 2,
    domain: "Communication",
    explanation: "Sensitive feedback is best delivered privately in person to allow for discussion and clarification."
  },
  {
    id: 60,
    question: "What is the primary purpose of an agenda in a meeting?",
    options: ["To limit discussion time", "To provide structure and focus", "To document decisions", "To assign tasks"],
    correctAnswer: 1,
    domain: "Communication",
    explanation: "An agenda provides structure and keeps the meeting focused on important topics."
  },

  // Principles of Management (8 questions)
  {
    id: 61,
    question: "Which management function involves setting objectives and determining courses of action?",
    options: ["Organizing", "Planning", "Leading", "Controlling"],
    correctAnswer: 1,
    domain: "Principles of Management",
    explanation: "Planning involves setting objectives and determining how to achieve them."
  },
  {
    id: 62,
    question: "According to Maslow's hierarchy, which need comes after physiological needs?",
    options: ["Esteem needs", "Safety needs", "Belongingness needs", "Self-actualization"],
    correctAnswer: 1,
    domain: "Principles of Management",
    explanation: "Maslow's hierarchy: Physiological → Safety → Belonging → Esteem → Self-actualization"
  },
  {
    id: 63,
    question: "Which management theory emphasizes scientific study of work methods?",
    options: ["Bureaucratic management", "Administrative management", "Scientific management", "Human relations"],
    correctAnswer: 2,
    domain: "Principles of Management",
    explanation: "Scientific management, developed by Taylor, focuses on optimizing work methods."
  },
  {
    id: 64,
    question: "What is the primary purpose of a SWOT analysis?",
    options: ["To evaluate employee performance", "To assess organizational strengths/weaknesses", "To calculate financial ratios", "To schedule production"],
    correctAnswer: 1,
    domain: "Principles of Management",
    explanation: "SWOT analyzes Strengths, Weaknesses, Opportunities, and Threats for strategic planning."
  },
  {
    id: 65,
    question: "Which decision-making approach relies on intuition and experience?",
    options: ["Rational model", "Bounded rationality", "Intuitive decision making", "Evidence-based management"],
    correctAnswer: 2,
    domain: "Principles of Management",
    explanation: "Intuitive decision making relies on gut feelings and accumulated experience."
  },
  {
    id: 66,
    question: "In organizational structure, 'span of control' refers to:",
    options: ["The number of subordinates a manager supervises", "The geographical area served", "The budget allocated", "The time between decisions"],
    correctAnswer: 0,
    domain: "Principles of Management",
    explanation: "Span of control is the number of employees directly reporting to a manager."
  },
  {
    id: 67,
    question: "Which leadership style involves high task and high relationship behavior?",
    options: ["Authoritarian", "Participative", "Delegating", "Selling"],
    correctAnswer: 1,
    domain: "Principles of Management",
    explanation: "Participative leadership involves both task direction and relationship building."
  },
  {
    id: 68,
    question: "Centralization in management refers to:",
    options: ["Concentration of decision-making authority at top levels", "Physical location of headquarters", "Focus on core competencies", "Standardization of processes"],
    correctAnswer: 0,
    domain: "Principles of Management",
    explanation: "Centralization means higher-level managers make most decisions."
  },

  // Financial Management and Accounting (8 questions)
  {
    id: 69,
    question: "Which financial statement shows a company's financial position at a point in time?",
    options: ["Income statement", "Balance sheet", "Cash flow statement", "Statement of retained earnings"],
    correctAnswer: 1,
    domain: "Financial Management and Accounting",
    explanation: "The balance sheet shows assets, liabilities, and equity at a specific date."
  },
  {
    id: 70,
    question: "What does ROI stand for in financial terms?",
    options: ["Return on Investment", "Risk of Inflation", "Rate of Interest", "Revenue on Inventory"],
    correctAnswer: 0,
    domain: "Financial Management and Accounting",
    explanation: "ROI measures the gain or loss generated on an investment relative to its cost."
  },
  {
    id: 71,
    question: "Which ratio measures a company's ability to meet short-term obligations?",
    options: ["Debt-to-equity ratio", "Current ratio", "Return on assets", "Inventory turnover"],
    correctAnswer: 1,
    domain: "Financial Management and Accounting",
    explanation: "Current ratio = Current assets / Current liabilities, measuring short-term liquidity."
  },
  {
    id: 72,
    question: "What is the primary purpose of a cash flow statement?",
    options: ["To show profitability", "To track cash movements", "To list assets", "To calculate taxes"],
    correctAnswer: 1,
    domain: "Financial Management and Accounting",
    explanation: "The cash flow statement shows how cash moves in and out of the business."
  },
  {
    id: 73,
    question: "Which capital budgeting method considers the time value of money?",
    options: ["Payback period", "Accounting rate of return", "Net present value", "All of the above"],
    correctAnswer: 2,
    domain: "Financial Management and Accounting",
    explanation: "NPV discounts future cash flows to their present value, considering time value of money."
  },
  {
    id: 74,
    question: "What does 'EPS' stand for in financial reporting?",
    options: ["Earnings Per Share", "Expenses Per Sale", "Equity Position Statement", "Estimated Profit Summary"],
    correctAnswer: 0,
    domain: "Financial Management and Accounting",
    explanation: "EPS (Earnings Per Share) = Net income / Outstanding shares, showing profitability per share."
  },
  {
    id: 75,
    question: "Which of these is a current asset?",
    options: ["Building", "Patent", "Accounts receivable", "Long-term loan"],
    correctAnswer: 2,
    domain: "Financial Management and Accounting",
    explanation: "Accounts receivable is expected to be converted to cash within one year."
  },
  {
    id: 76,
    question: "What is the accounting equation?",
    options: ["Assets = Liabilities + Equity", "Revenue - Expenses = Profit", "Debits = Credits", "Income + Gains = Expenses + Losses"],
    correctAnswer: 0,
    domain: "Financial Management and Accounting",
    explanation: "The fundamental accounting equation is Assets = Liabilities + Owner's Equity."
  },

  // Business Communication and Marketing Management (8 questions)
  {
    id: 77,
    question: "Which marketing concept focuses on customer needs?",
    options: ["Production concept", "Product concept", "Selling concept", "Marketing concept"],
    correctAnswer: 3,
    domain: "Business Communication and Marketing Management",
    explanation: "The marketing concept emphasizes understanding and meeting customer needs."
  },
  {
    id: 78,
    question: "What is the final stage in the product life cycle?",
    options: ["Introduction", "Growth", "Maturity", "Decline"],
    correctAnswer: 3,
    domain: "Business Communication and Marketing Management",
    explanation: "The product life cycle stages are Introduction → Growth → Maturity → Decline."
  },
  {
    id: 79,
    question: "Which of these is NOT part of the marketing mix (4Ps)?",
    options: ["Product", "Price", "Promotion", "People"],
    correctAnswer: 3,
    domain: "Business Communication and Marketing Management",
    explanation: "The traditional 4Ps are Product, Price, Place, and Promotion."
  },
  {
    id: 80,
    question: "What is the primary purpose of market segmentation?",
    options: ["To reduce production costs", "To identify homogeneous customer groups", "To standardize products", "To increase profit margins"],
    correctAnswer: 1,
    domain: "Business Communication and Marketing Management",
    explanation: "Segmentation divides markets into groups with similar characteristics/needs."
  },
  {
    id: 81,
    question: "Which digital marketing metric measures the percentage of visitors who take a desired action?",
    options: ["Bounce rate", "Click-through rate", "Conversion rate", "Impressions"],
    correctAnswer: 2,
    domain: "Business Communication and Marketing Management",
    explanation: "Conversion rate = (Conversions / Total visitors) × 100%"
  },
  {
    id: 82,
    question: "What is 'brand equity'?",
    options: ["The financial value of a brand", "The cost of brand development", "The legal protection of a brand", "The physical assets of a brand"],
    correctAnswer: 0,
    domain: "Business Communication and Marketing Management",
    explanation: "Brand equity refers to the value a brand adds to a product/service."
  },
  {
    id: 83,
    question: "Which pricing strategy sets high initial prices to maximize profits from early adopters?",
    options: ["Penetration pricing", "Skimming pricing", "Competitive pricing", "Psychological pricing"],
    correctAnswer: 1,
    domain: "Business Communication and Marketing Management",
    explanation: "Price skimming sets high initial prices that are lowered over time."
  },
  {
    id: 84,
    question: "What is the primary goal of content marketing?",
    options: ["Immediate sales", "Building brand awareness and trust", "Reducing production costs", "Competitor analysis"],
    correctAnswer: 1,
    domain: "Business Communication and Marketing Management",
    explanation: "Content marketing aims to build relationships by providing valuable content."
  },

  // Strategic Management and Human Resource Management (8 questions)
  {
    id: 85,
    question: "Which analysis examines Political, Economic, Social, and Technological factors?",
    options: ["SWOT", "PEST", "BCG", "Porter's Five Forces"],
    correctAnswer: 1,
    domain: "Strategic Management and Human Resource Management",
    explanation: "PEST analysis examines macro-environmental factors affecting an organization."
  },
  {
    id: 86,
    question: "In the BCG matrix, what is a 'cash cow'?",
    options: ["High growth, high market share", "Low growth, high market share", "High growth, low market share", "Low growth, low market share"],
    correctAnswer: 1,
    domain: "Strategic Management and Human Resource Management",
    explanation: "Cash cows have high market share in slow-growth markets, generating more cash than needed."
  },
  {
    id: 87,
    question: "What is the first step in the strategic management process?",
    options: ["Strategy implementation", "Environmental scanning", "Strategy formulation", "Evaluation and control"],
    correctAnswer: 1,
    domain: "Strategic Management and Human Resource Management",
    explanation: "Strategic management begins with environmental scanning/analysis."
  },
  {
    id: 88,
    question: "Which HR process identifies and documents job responsibilities?",
    options: ["Recruitment", "Job analysis", "Performance appraisal", "Training"],
    correctAnswer: 1,
    domain: "Strategic Management and Human Resource Management",
    explanation: "Job analysis systematically studies jobs to determine duties and requirements."
  },
  {
    id: 89,
    question: "What is competency mapping?",
    options: ["Identifying skills required for jobs", "Creating organizational charts", "Planning office space", "Tracking employee attendance"],
    correctAnswer: 0,
    domain: "Strategic Management and Human Resource Management",
    explanation: "Competency mapping identifies the skills and behaviors needed for job performance."
  },
  {
    id: 90,
    question: "Which of Porter's generic strategies focuses on serving a narrow market segment?",
    options: ["Cost leadership", "Differentiation", "Focus", "Diversification"],
    correctAnswer: 2,
    domain: "Strategic Management and Human Resource Management",
    explanation: "The focus strategy targets a specific market niche with either cost or differentiation advantage."
  },
  {
    id: 91,
    question: "What is the purpose of a balanced scorecard?",
    options: ["To measure financial performance only", "To track multiple organizational perspectives", "To evaluate employee benefits", "To assess market share"],
    correctAnswer: 1,
    domain: "Strategic Management and Human Resource Management",
    explanation: "The balanced scorecard tracks financial, customer, internal process, and learning/growth metrics."
  },
  {
    id: 92,
    question: "Which HR activity forecasts future workforce needs?",
    options: ["Human resource planning", "Recruitment", "Selection", "Orientation"],
    correctAnswer: 0,
    domain: "Strategic Management and Human Resource Management",
    explanation: "HR planning ensures the right people are available when needed."
  },

  // Business Statistics (8 questions)
  {
    id: 93,
    question: "Which measure represents the middle value in an ordered dataset?",
    options: ["Mean", "Median", "Mode", "Range"],
    correctAnswer: 1,
    domain: "Business Statistics",
    explanation: "The median is the middle value when data is arranged in order."
  },
  {
    id: 94,
    question: "What does a correlation coefficient of -0.9 indicate?",
    options: ["Strong positive relationship", "Weak positive relationship", "Strong negative relationship", "No relationship"],
    correctAnswer: 2,
    domain: "Business Statistics",
    explanation: "A coefficient close to -1 indicates a strong negative/inverse relationship."
  },
  {
    id: 95,
    question: "In hypothesis testing, what does a p-value less than 0.05 typically indicate?",
    options: ["Accept the null hypothesis", "Reject the null hypothesis", "Inconclusive results", "Need larger sample size"],
    correctAnswer: 1,
    domain: "Business Statistics",
    explanation: "A p-value < 0.05 suggests statistically significant evidence against the null hypothesis."
  },
  {
    id: 96,
    question: "Which probability distribution is used for modeling rare events?",
    options: ["Normal distribution", "Binomial distribution", "Poisson distribution", "Uniform distribution"],
    correctAnswer: 2,
    domain: "Business Statistics",
    explanation: "Poisson distribution models rare events occurring in fixed intervals."
  },
  {
    id: 97,
    question: "What is the range of this dataset: 5, 8, 12, 3, 15?",
    options: ["3", "12", "15", "17"],
    correctAnswer: 1,
    domain: "Business Statistics",
    explanation: "Range = Maximum - Minimum = 15 - 3 = 12"
  },
  {
    id: 98,
    question: "Which sampling method ensures every member has an equal chance of selection?",
    options: ["Convenience sampling", "Stratified sampling", "Simple random sampling", "Snowball sampling"],
    correctAnswer: 2,
    domain: "Business Statistics",
    explanation: "Simple random sampling gives each member an equal selection probability."
  },
  {
    id: 99,
    question: "What is the mean of 10, 20, 30, 40, 50?",
    options: ["20", "25", "30", "35"],
    correctAnswer: 2,
    domain: "Business Statistics",
    explanation: "Mean = (10+20+30+40+50)/5 = 150/5 = 30"
  },
  {
    id: 100,
    question: "Which test would you use to compare means of three or more groups?",
    options: ["t-test", "ANOVA", "Chi-square", "Regression"],
    correctAnswer: 1,
    domain: "Business Statistics",
    explanation: "ANOVA (Analysis of Variance) compares means across multiple groups."
  }
];