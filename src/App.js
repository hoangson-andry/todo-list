import React from "react";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.todoInputRef = React.createRef();
    this.todoButtonRef = React.createRef();
    this.todoListRef = React.createRef();
    this.filterRef = React.createRef();
  }

  //get Todos
  getTodos = () => {
    let todos;

    // if it HAS already an item, get it
    if (localStorage.getItem("todos") !== null) {
      todos = JSON.parse(localStorage.getItem("todos"));
    } else {
      todos = [];
    }

    todos.forEach(function (todo) {
      this.createComponents(todo);
    });
  };
  addTodo = (e) => {
    // Validate and prevent refresh
    e.preventDefault();
    if (!this.todoInputRef.current.value) return;

    // Creating all components
    this.createComponents(this.todoInputRef.current.value);

    // Add todo to local storage
    this.saveLocalTodos(this.todoInputRef.current.value);

    // Clear and focus Input
    this.todoInputRef.current.value = "";
  };
  deleteCheck = (e) => {
    const item = e.target;
    const todo = item.parentElement;

    // delete todo
    if (item.classList[0] === "trash-btn") {
      todo.classList.add("fall");
      todo.addEventListener("animationend", function () {
        this.removeLocalTodos(todo);
        todo.remove();
      });
    }
  };
  createComponents = (value) => {
    // Create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Create Completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("check-btn");
    todoDiv.appendChild(completedButton);

    // Create Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append all
    this.todoListRef.current.appendChild(todoDiv);
  };
  filterTodo = (e) => {
    const value = e.target.value;
    const todos = this.todoListRef.current.childNodes;
    console.log(value);
    todos.forEach(function (todo) {
      switch (value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }

          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        default:
          return;
      }
    });
  };
  saveLocalTodos = (todo) => {
    // Check
    let todos;
    // if it HAS already an item, get it
    if (localStorage.getItem("todos") !== null) {
      todos = JSON.parse(localStorage.getItem("todos"));
    } else {
      todos = [];
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Todo List Javascript</h1>
        </header>

        <form>
          <input
            type="text"
            className="todo-input"
            ref={this.todoInputRef}
            maxLength="40"
          />
          <button
            className="todo-button"
            onClick={this.addTodo}
            ref={this.todoButtonRef}
            type="submit"
          >
            <i className="fas fa-plus-square"></i>
          </button>
          <div className="select">
            <select
              name="todos"
              onChange={this.filterTodo}
              className="filter-todo"
              ref={this.filterRef}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </form>
        <div className="todo-container">
          <ul
            className="todo-list"
            onClick={this.deleteCheck}
            ref={this.todoListRef}
          ></ul>
        </div>
      </div>
    );
  }
}

export default App;
