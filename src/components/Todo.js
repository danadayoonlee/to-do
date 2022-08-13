import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri'; // icon
import { TiEdit } from 'react-icons/ti'; // icon

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value); // TodoList.js 에 edit.id와 value를 보낸다
    setEdit({ // 다시 입력창을 빈 상태로 clear
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />; // 만약 유저가 update icon을 클릭하면 위의 submitUpdate로 간다
  }

  return todos.map((todo, index) => ( // 위의 if가 아니라면 이 부분을 return해라
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'} // 조건에 따라 className을 바꿔라
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}> {/* 유저가 to-do를 complete 하면 TodoList.js 에 todo.id를 보낸다 */}
        {todo.text} {/* to-do List의 text를 보여줌 */}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Todo;
