var todoService = {
  TodoData: [
    // { id: 1, title: "Learn Java", completed: false },
    // { id: 2, title: "Learn HTML", completed: false },
    // { id: 3, title: "Learn JavaScript", completed: false },
    // { id: 4, title: "Learn MySQL", completed: false }
  ],
  initData: () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(function(resp) {
        return resp.json();
      })
      .then(function(data) {
        // console.log(data);
        todoService.TodoData = [...data];
        if (todoApp) {
          todoApp.render();
        }
      });
  },
  getAllTodos: function() {
    return this.TodoData;
  },
  findTodoById: function(id) {
    return this.TodoData.find(function(todo) {
      return todo.id == id;
    });
  },
  addNewTodo: function(todo) {
    this.TodoData = [todo, ...this.TodoData];
  },
  deleteTodo: function(id) {
    let todos = this.TodoData.filter(function(todo) {
      return todo.id != id;
    });

    this.TodoData = [...todos];
  },
  markCompleted: function(id) {
    var todos = this.TodoData.map(function(todo) {
      if (todo.id == id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.TodoData = [...todos];
  },
  toggleEdit: function(id) {
    let todoUpdated = null;
    var todos = this.TodoData.map(function(todo) {
      if (todo.id == id) {
        todo.isEdit = !todo.isEdit;
        todoUpdated = todo;
      }
      return todo;
    });
    // console.log(todos);
    this.TodoData = [...todos];
    return todoUpdated;
  },
  updateTodoTitle: function(id, title) {
    let todoUpdated = null;
    let todos = this.TodoData.map((todo, index) => {
      if (todo.id == id) {
        todo.title = title;
        todo.isEdit = !todo.isEdit;
        todoUpdated = todo;
      }
      return todo;
    });
    this.TodoData = [...todos];
    return todoUpdated;
  }
};
todoService.initData();
