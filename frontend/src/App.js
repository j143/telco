import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [problems, setProblems] = useState([]);
  const [newProblem, setNewProblem] = useState({ title: '', description: '', difficulty: '' });
  const [solution, setSolution] = useState({ problemId: '', solutionCode: '' });
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    fetch('/problems')
      .then(response => response.json())
      .then(data => setProblems(data));
  }, []);

  const handleAddProblem = () => {
    fetch('/problems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProblem),
    })
      .then(response => response.json())
      .then(data => setProblems([...problems, data]));
  };

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
    <div className="App">
      <h1>5G and Network Engineer Platform</h1>

      <h2>Problems</h2>
      <ul>
        {problems.map(problem => (
          <li key={problem.id}>{problem.title} - {problem.difficulty}</li>
        ))}
      </ul>

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

export default App;
