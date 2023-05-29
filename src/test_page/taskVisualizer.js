import React, { useState, useEffect } from "react";
import "./taskVisualizer.css";
import axios from "axios";

function TaskVisualizer({ tasks, handleSubmit }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(5400); // 1 hour and 30 minutes countdown

  const task = currentTaskIndex !== null ? tasks[currentTaskIndex] : null;
  const isLastTask = currentTaskIndex === tasks.length - 1;

  useEffect(() => {
    let timer = null;
    if (currentTaskIndex !== null && !showResult && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (currentTaskIndex !== null) {
      clearInterval(timer);
      handleSubmit(userAnswers);
      setShowResult(true);
    }
    return () => clearInterval(timer);
  }, [showResult, time, handleSubmit, userAnswers, currentTaskIndex]);

  const handleAnswerChange = (event, index) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentTaskIndex] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  const handleNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const handlePrevTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };

  const handleTaskSelect = (index) => {
    setCurrentTaskIndex(index);
  };

  const handleStartTest = () => {
    setCurrentTaskIndex(0);
    setShowResult(false);
    setTime(5400); // Reset timer to 1 hour and 30 minutes
    setUserAnswers(new Array(tasks.length).fill(""));
  };

  const handleSubmitTest = () => {
    setShowResult(true);
    handleSubmit(userAnswers);
  };

  return (
    <div className="task-visualizer">
      {showResult ? (
        <div>
          <h2>Времето свърши!</h2>
          <h3>Резултати</h3>
          {tasks.map((task, index) => (
            <div key={index} className="task-overview">
              <h4>Задача: {task.task}</h4>
              {task.image && (
                <img className="task-image" src={task.image} alt="Task Image" />
              )}
              <p>Вашият отговор: {userAnswers[index]}</p>
              <p>Верният отговор: {task.answers.join(", ")}</p>
              {task.answers.includes(userAnswers[index]) ? (
                <p className="correct-answer">Вашият отговор е верен!</p>
              ) : (
                <p className="incorrect-answer">Вашият отговор е грешен.</p>
              )}
            </div>
          ))}
          <button className="button" onClick={handleStartTest}>
            Рестарт
          </button>
        </div>
      ) : (
        <div>
          {currentTaskIndex !== null ? (
            <>
              <div className="task-container">
                <div className="task-content">
                  <h2>Задача: {task.task}</h2>
                  {task.image && (
                    <img
                      className="task-image"
                      src={task.image}
                      alt="Task Image"
                    />
                  )}
                  <p className="time-remaining">
                    Оставащо време:{" "}
                    {`${Math.floor(time / 3600)
                      .toString()
                      .padStart(2, "0")}:${Math.floor((time % 3600) / 60)
                      .toString()
                      .padStart(2, "0")}:${(time % 60)
                      .toString()
                      .padStart(2, "0")}`}
                  </p>
                  <div className="answer-container">
                    {task.type === "open" ? (
                      task.answers.length > 1 ? (
                        task.answers.map((_, index) => (
                          <div key={index} className="input-field">
                            <label>{task.open_answer_letters[index]}</label>
                            <input
                              type="text"
                              value={userAnswers[currentTaskIndex] || ""}
                              onChange={(event) =>
                                handleAnswerChange(event, currentTaskIndex)
                              }
                            />
                          </div>
                        ))
                      ) : (
                        <input
                          type="text"
                          value={userAnswers[currentTaskIndex] || ""}
                          onChange={(event) =>
                            handleAnswerChange(event, currentTaskIndex)
                          }
                        />
                      )
                    ) : (
                      task.possible_answers.map((answer, index) => (
                        <div key={index} className="radio-option">
                          <input
                            type="radio"
                            name={`task_${currentTaskIndex}`}
                            value={answer}
                            checked={userAnswers[currentTaskIndex] === answer}
                            onChange={(event) =>
                              handleAnswerChange(event, currentTaskIndex)
                            }
                          />
                          <label>{answer}</label>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="task-buttons">
                    {currentTaskIndex > 0 && (
                      <button
                        className="button button-prev"
                        onClick={handlePrevTask}
                      >
                        Предишна задача
                      </button>
                    )}
                    <div className="task-number">
                      Задача {currentTaskIndex + 1} от {tasks.length}
                    </div>
                    {isLastTask ? (
                      <button className="button" onClick={handleSubmitTest}>
                        Предай
                      </button>
                    ) : (
                      <button
                        className="button button-next"
                        onClick={handleNextTask}
                      >
                        Следваща задача
                      </button>
                    )}
                  </div>
                  <div className="task-dropdown">
                    <select
                      value={currentTaskIndex}
                      onChange={(e) => handleTaskSelect(Number(e.target.value))}
                    >
                      {tasks.map((_, index) => (
                        <option key={index} value={index}>
                          Задача {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <button className="button" onClick={handleStartTest}>
              Старт
            </button>
          )}
        </div>
      )}
    </div>
  );
}
function App() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDBConnected, setIsDBConnected] = useState(false); // New state for DB connection status

  const handleSubmit = (answers) => {
    setUserAnswers(answers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://nvo-10-math-backend.onrender.com/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log("Error occurred during data fetching:", error);
      })
      .finally(() => {
        setIsDBConnected(true); // Set DB connection status to true after fetching data
        setIsLoading(false); // Set loading state to false
      });
  };

  return (
    <div className="App">
      {isLoading ? (
        <div>Loading...</div>
      ) : isDBConnected ? (
        <TaskVisualizer
          className="start-button"
          tasks={tasks}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div>Connecting to the database...</div>
      )}
    </div>
  );
}

export default App;
