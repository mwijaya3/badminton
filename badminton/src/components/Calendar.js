import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection('tasks')
        .where('userId', '==', user.uid)
        .onSnapshot((snapshot) => {
          const tasksData = snapshot.docs.map((doc) => doc.data());
          setTasks(tasksData);
        });
      return () => unsubscribe();
    }
  }, [user]);

  const addTask = async () => {
    if (!task || !date) return;
    await firestore.collection('tasks').add({
      task,
      date,
      userId: user.uid,
      isPublic,
    });
    setTask('');
    setDate('');
  };

  return (
    <div>
      <h2>Your Calendar</h2>
      {user ? (
        <div>
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label>
            Public
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </label>
          <button onClick={addTask}>Add Task</button>
          <h3>Your Tasks</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task.task} - {task.date} {task.isPublic ? '(Public)' : '(Private)'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button onClick={() => navigate('/login')}>Login</button> // Use navigate() instead of history.push()
      )}
    </div>
  );
};

export default Calendar;
