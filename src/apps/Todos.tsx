import React, { useEffect, useState } from "react";
import { setLastOpen } from "../main";
import TextBox from "../components/Textbox";
import { uid } from "uid";

interface ITodo {
  id: string;
  text: string;
  done: boolean;
}

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = () => {
    const todosFromStorage = localStorage.getItem("todos_list");
    let todosList: ITodo[] = [];

    if (!todosFromStorage) {
      console.error("Couldnt load todos, not found");
    }

    try {
      todosList = JSON.parse(todosFromStorage || "[]") as ITodo[];
    } catch (e) {
      console.error(e);
      updateLocalStorage([]);
      todosList = [];
    }

    setTodos(todosList);
  };

  const addTodo = (text: string) => {
    let newTodo = {
      id: uid(),
      text,
      done: false,
    };

    setTodos((prev) => {
      let newTodos = [...prev, newTodo];
      updateLocalStorage(newTodos);
      return newTodos;
    });
  };

  const markDone = (id: string) => {
    setTodos((prev) => {
      let newTodos = prev.map((t) => (t.id === id ? { ...t, done: true } : t));
      updateLocalStorage(newTodos);
      return newTodos;
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => {
      let newTodos = prev.filter((t) => t.id !== id);
      updateLocalStorage(newTodos);
      return newTodos;
    });
  };

  const updateLocalStorage = (todos: ITodo[]) => {
    localStorage.setItem("todos_list", JSON.stringify(todos));
  };

  useEffect(() => {
    setLastOpen("todos");
    fetchTodos();
  }, []);

  return (
    <section className="my-4 flex flex-col gap-4 absolute left-0 bottom-0 top-0 right-0">
      <h1>TODOS</h1>
      <section className="flex-1 flex flex-col gap-1">
        {todos.length === 0 ? (
          <p>Nothing yet.</p>
        ) : (
          [...todos]
            .sort((a) => (a.done ? 1 : -1))
            .map(({ id, text, done }) => (
              <div
                key={id}
                className={`p-2 bg-white border rounded-md flex gap-2 max-w-full ${
                  done ? "bg-slate-300" : null
                }`}
              >
                <button
                  onClick={() => markDone(id)}
                  className="w-6 h-6 bg-green-200 rounded-full flex justify-center items-center"
                >
                  &#x2713;
                </button>
                <p className="flex-1 break-all break-words">{text}</p>
                <button
                  onClick={() => deleteTodo(id)}
                  className="w-6 h-6 bg-slate-200 rounded-full flex justify-center items-center"
                >
                  &#x2715;
                </button>
              </div>
            ))
        )}
      </section>
      <TextBox onInput={addTodo} />
    </section>
  );
};

export default Todos;
