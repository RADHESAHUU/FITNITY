import React, { useState, useEffect } from 'react';

const ProgressChecklistCard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: '30 min walk', completed: false },
    { id: 2, text: 'Stretch', completed: false },
    { id: 3, text: 'Meditate', completed: false },
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('progressTasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('progressTasks', JSON.stringify(tasks));
    } catch (err) {
      setError('Failed to save tasks. Please try again.');
    }
  }, [tasks]);

  const toggleTask = (id) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  const addTask = (text) => {
    try {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text, completed: false },
      ]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
    }
  };

  const removeTask = (id) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to remove task. Please try again.');
    }
  };

  return (
    <div className="bg-deepBlack p-4 rounded-lg shadow-lg hover:shadow-neonPurple transition-all duration-300" role="region" aria-labelledby="task-list-title">
      <h2 id="task-list-title" className="text-xl font-bold text-fitnityBlue mb-4">Progress Checklist</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <ul className="space-y-2" aria-label="Task list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-2 rounded-lg cursor-pointer transition-all duration-300 ${
              task.completed ? 'bg-fitnityBlue text-white line-through' : 'bg-gray-700 text-gray-200'
            }`}
            onClick={() => toggleTask(task.id)}
            role="button"
            aria-pressed={task.completed}
          >
            {task.text}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          placeholder="Add a task..."
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              addTask(e.target.value.trim());
              e.target.value = '';
            }
          }}
          aria-label="New task input"
        />
      </div>
    </div>
  );
};

export default ProgressChecklistCard;