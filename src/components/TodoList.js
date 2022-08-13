import React, { useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

function TodoList() {
  const [todos, setTodos] = useState([]);

  // add
  const addTodo = (todo) => { // (todo)는 parameter
    if (!todo.text || /^\s*$/.test(todo.text)) { // regex - white space between texts
      return;
    }

    const newTodos = [todo, ...todos]; // 새로운 todo가 들어오면 기존의 것들은 자리를 양보하고 todos에 저장하라

    setTodos(newTodos);
    console.log(...todos);
  };

  // update
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item)) // 기존에 있던 todoId와 새로 들어온 item.id가 같으면 정보를 newValue로 업데이트하고 그렇지 않다면 item (그대로)으로 두어라
    );
  };

  // remove
  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  // complete
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} /> {/* 유저가 작성하는 form */}
      <Todo
        todos={todos}
        updateTodo={updateTodo}
        removeTodo={removeTodo}
        completeTodo={completeTodo}
      /> {/* form 외의 유저 눈에 보이는 모든 것 */}
    </>
  );
}

export default TodoList;
