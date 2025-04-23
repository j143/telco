var express = require('express');
var router = express.Router();

// Import necessary modules
const problems = [];

// Add a sample problem statement
problems.push({
  id: 1,
  title: 'Call Flow Validation',
  description: 'Validate a call flow sequence for a 5G network. The input is an array of events, and the output should be true if the sequence is valid, false otherwise.',
  difficulty: 'Intermediate',
  testCases: [
    { input: ['REGISTER', 'INVITE', 'ACK', 'BYE'], expected: true },
    { input: ['REGISTER', 'BYE', 'INVITE'], expected: false },
    { input: ['INVITE', 'ACK'], expected: false }
  ]
});

// Add a judge function for the problem
function validateCallFlow(events) {
  const validSequence = ['REGISTER', 'INVITE', 'ACK', 'BYE'];
  let index = 0;

  for (const event of events) {
    if (event === validSequence[index]) {
      index++;
    } else if (validSequence.includes(event)) {
      return false;
    }
  }

  return index === validSequence.length;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route to get all problems
router.get('/problems', (req, res) => {
  res.json(problems);
});

// Route to add a new problem
router.post('/problems', (req, res) => {
  const { title, description, difficulty } = req.body;
  const newProblem = { id: problems.length + 1, title, description, difficulty };
  problems.push(newProblem);
  res.status(201).json(newProblem);
});

// Route to submit a solution
router.post('/solutions', (req, res) => {
  const { problemId, solutionCode } = req.body;
  const problem = problems.find(p => p.id === problemId);

  if (!problem) {
    return res.status(404).json({ message: 'Problem not found' });
  }

  // Mock evaluation logic for the specific problem
  if (problemId === 1) {
    const userFunction = eval(`(${solutionCode})`);
    const results = problem.testCases.map(testCase => {
      const output = userFunction(testCase.input);
      return { input: testCase.input, expected: testCase.expected, output, passed: output === testCase.expected };
    });

    return res.json({ problemId, results });
  }

  res.status(400).json({ message: 'Unsupported problem' });
});

module.exports = router;
