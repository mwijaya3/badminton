import React, { useState, useEffect } from 'react';
import { firestore } from '../utils/firebase';  // Import Firestore from utils/firebase
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Calendar.css';

const Calendar = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const q = query(collection(firestore, 'tasks'), where('isPublic', '==', true));
      const querySnapshot = await getDocs(q);
      const taskList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
    };
    fetchTasks();
  }, []);

  // Add a task to Firestore
  const handleAddTask = async () => {
    if (task.trim()) {
      try {
        await addDoc(collection(firestore, 'tasks'), {
          task,
          isPublic,
          user: 'currentUser@example.com', // Replace with actual user info
        });
        setTasks([...tasks, { task, isPublic }]);
        setTask('');
      } catch (err) {
        console.error('Error adding task: ', err);
      }
    }
  };

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>
      <div className="task-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="task-list">
        <h2>Public Tasks</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((taskItem) => (
              <li key={taskItem.id}>{taskItem.task}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks added yet!</p>
        )}
      </div>
      {/* Example of navigating to another page */}
      <button onClick={() => navigate('/profile')}>Go to Profile</button>
    </div>
  );
};

export default Calendar;
