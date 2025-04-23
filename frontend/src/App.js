import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Problems from './Problems';
import ProblemDetails from './ProblemDetails';

function Home() {
  return (
    <div>
      <h1>5G and Network Engineer Platform</h1>
      <nav>
        <ul>
          <li><Link to="/problems">Problems</Link></li>
          <li><Link to="/add-problem">Add Problem</Link></li>
          <li><Link to="/submit-solution">Submit Solution</Link></li>
        </ul>
      </nav>
    </div>
  );
}

function AddProblem() {
  const [newProblem, setNewProblem] = React.useState({ title: '', description: '', difficulty: '' });

  const handleAddProblem = () => {
    fetch('/problems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProblem),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      <h2>Add Problem</h2>
      <input
        type="text"
        placeholder="Title"
        value={newProblem.title}
        onChange={e => setNewProblem({ ...newProblem, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProblem.description}
        onChange={e => setNewProblem({ ...newProblem, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Difficulty"
        value={newProblem.difficulty}
        onChange={e => setNewProblem({ ...newProblem, difficulty: e.target.value })}
      />
      <button onClick={handleAddProblem}>Add Problem</button>
    </div>
  );
}

function SubmitSolution() {
  const [solution, setSolution] = React.useState({ problemId: '', solutionCode: '' });
  const [evaluationResult, setEvaluationResult] = React.useState(null);

  const handleSubmitSolution = () => {
    fetch('/solutions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(solution),
    })
      .then(response => response.json())
      .then(data => setEvaluationResult(data));
  };

  return (
    <div>
      <h2>Submit Solution</h2>
      <input
        type="number"
        placeholder="Problem ID"
        value={solution.problemId}
        onChange={e => setSolution({ ...solution, problemId: e.target.value })}
      />
      <textarea
        placeholder="Solution Code"
        value={solution.solutionCode}
        onChange={e => setSolution({ ...solution, solutionCode: e.target.value })}
      />
      <button onClick={handleSubmitSolution}>Submit Solution</button>

      {evaluationResult && (
        <div>
          <h3>Evaluation Result</h3>
          <p>{evaluationResult.isCorrect ? 'Correct' : 'Incorrect'}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<ProblemDetails />} />
        <Route path="/add-problem" element={<AddProblem />} />
        <Route path="/submit-solution" element={<SubmitSolution />} />
      </Routes>
    </Router>
  );
}

export default App;
