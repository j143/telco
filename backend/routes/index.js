var express = require('express');
var router = express.Router();

// Import necessary modules
const problems = [];

// Add a sample problem statement
problems.push({
  id: 1,
  title: '5G Call Flow Sequence Validation',
  description: 'Write a function to validate a call flow sequence for a 5G network. The input is an array of events, and the output should be true if the sequence is valid, false otherwise. A valid sequence must follow the order: REGISTER -> INVITE -> ACK -> BYE.',
  difficulty: 'Intermediate',
  testCases: [
    { input: ['REGISTER', 'INVITE', 'ACK', 'BYE'], expected: true },
    { input: ['REGISTER', 'BYE', 'INVITE'], expected: false },
    { input: ['INVITE', 'ACK'], expected: false }
  ]
});

// Add three basic problem statements
problems.push(
  {
    id: 2,
    title: 'Network Packet Validation',
    description: 'Validate if a given network packet follows the correct format. The input is a string representing the packet, and the output should be true if the format is valid, false otherwise.',
    difficulty: 'Beginner',
    testCases: [
      { input: 'HEADER|DATA|FOOTER', expected: true },
      { input: 'HEADER|FOOTER', expected: false },
      { input: 'DATA|HEADER|FOOTER', expected: false }
    ]
  },
  {
    id: 3,
    title: 'Signal Strength Analysis',
    description: 'Analyze an array of signal strengths and return the maximum strength. The input is an array of integers, and the output should be the maximum value.',
    difficulty: 'Beginner',
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: 5 },
      { input: [-1, -2, -3, -4], expected: -1 },
      { input: [10, 20, 30, 40, 50], expected: 50 }
    ]
  },
  {
    id: 4,
    title: 'Latency Threshold Check',
    description: 'Check if all latencies in an array are below a given threshold. The input is an object with an array of latencies and a threshold, and the output should be true if all latencies are below the threshold, false otherwise.',
    difficulty: 'Intermediate',
    testCases: [
      { input: { latencies: [10, 20, 30], threshold: 50 }, expected: true },
      { input: { latencies: [10, 60, 30], threshold: 50 }, expected: false },
      { input: { latencies: [5, 15, 25], threshold: 20 }, expected: false }
    ]
  }
);

// Updated validation logic
function validateCallFlow(events) {
  const validSequence = ['REGISTER', 'INVITE', 'ACK', 'BYE'];
  let index = 0;

  for (const event of events) {
    if (event === validSequence[index]) {
      index++;
    } else if (validSequence.includes(event)) {
      return false; // Invalid order
    }
  }

  return index === validSequence.length; // Ensure all steps are completed
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route to get all problems
router.get('/problems', (req, res) => {
  res.json(problems);
});

// Route to get a specific problem by ID
router.get('/problems/:id', (req, res) => {
  const problemId = parseInt(req.params.id, 10);
  const problem = problems.find(p => p.id === problemId);

  if (!problem) {
    return res.status(404).json({ message: 'Problem not found' });
  }

  res.json(problem);
});

// Route to add a new problem
router.post('/problems', (req, res) => {
  const { title, description, difficulty } = req.body;
  const newProblem = { id: problems.length + 1, title, description, difficulty };
  problems.push(newProblem);
  res.status(201).json(newProblem);
});

// Updated solution submission route
router.post('/solutions', (req, res) => {
  const { problemId, solutionCode } = req.body;
  const problem = problems.find(p => p.id === problemId);

  if (!problem) {
    return res.status(404).json({ message: 'Problem not found' });
  }

  try {
    const userFunction = eval(`(${solutionCode})`);
    const results = problem.testCases.map(testCase => {
      const output = userFunction(testCase.input);
      return { input: testCase.input, expected: testCase.expected, output, passed: output === testCase.expected };
    });

    res.json({ problemId, results });
  } catch (error) {
    res.status(400).json({ message: 'Error in user solution', error: error.message });
  }
});

module.exports = router;
