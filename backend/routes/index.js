var express = require('express');
var router = express.Router();

// Import necessary modules
const problems = [];

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

  // Mock evaluation logic (replace with actual evaluation later)
  const isCorrect = solutionCode.includes('correct');
  res.json({ problemId, isCorrect });
});

module.exports = router;
