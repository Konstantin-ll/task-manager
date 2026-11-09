import { useState, type FormEvent } from "react";
import "./App.css";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTitle("");
  }

  return (
    <main className="app">
      <h1>Task Manager — CI test</h1>
      <p className="subtitle">Управляй своими задачами</p>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Например, встреча в 14:00"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <button type="submit">Добавить</button>
      </form>

      <section className="tasks">
        <h2>Мои задачи ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <p className="empty">Пока задач нет. Добавь первую!</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
