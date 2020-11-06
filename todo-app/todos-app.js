var todoApp = {
  $todoList: document.querySelector("#todoList"),
  addNewTodo: function() {
    let todo = {
      id: +new Date(),
      title: document.getElementById("myInput").value,
      completed: false
    };
    todoService.addNewTodo(todo);
    // TodoData = [todo, ...TodoData];
    // this.render();
    var itemUI = this.getItemUI(todo);
    this.$todoList.insertAdjacentHTML("afterBegin", itemUI);
  },
  deleteTodo: function(id) {
    if (confirm(`Are you sure you want to delete todo - ${id} ?`)) {
      todoService.deleteTodo(id);
      // this.render();
      document.querySelector(`li[data-id="${id}"]`).remove();
      if (todoService.TodoData.length == 0) {
        this.render();
      }
    }
  },
  // markCompleted: function(id) {
  //   todoService.markCompleted(id);
  //   this.render();
  // },
  parseHTML: function(html) {
    var node = document.createElement("fragment");
    node.innerHTML = html;
    return node;
  },
  markCompleted: function(event) {
    // event.target;
    let id = event.target.getAttribute("data-id");
    todoService.markCompleted(id);

    this.render();
  },
  toggleEdit: function(id) {
    console.log("blur");
    let todoUpdated = todoService.toggleEdit(id);
    // this.render();

    let itemUI = this.getItemUI(todoUpdated);
    let node = this.parseHTML(itemUI);

    let $liNodeTObeUpdated = document.querySelector(`li[data-id="${id}"]`);

    if ($liNodeTObeUpdated) {
      $liNodeTObeUpdated.outerHTML = node.innerHTML;
      //Set the focus on edit textbox only if edit is enabled
      if (todoUpdated.isEdit && $liNodeTObeUpdated) {
        let $input = document.querySelector(
          `li[data-id="${id}"] input[type="text"]`
        );
        $input.focus();
        // Code to set focus at end of the text
        var val = $input.value; //store the value of the element
        $input.value = ""; //clear the value of the element
        $input.value = val;
      }
    }
  },
  render: function() {
    // debugger;
    console.log("In Render Method");
    let todoData = todoService.getAllTodos();
    this.$todoList.innerHTML = "";

    if (todoData.length === 0) {
      //Show No Todos found message
      this.$todoList.innerHTML =
        "<li>No Todos found. Please create new Todo.</li>";
    }
    var html = "";
    todoData.forEach((todo, index) => {
      // console.log(this);
      let itemUI = this.getItemUI(todo);
      // let itemUI = "";
      // if (todo.isEdit) {
      //   //Editable
      //   itemUI = `<li class="${
      //     todo.completed ? "checked" : ""
      //   }" ondblclick="todoApp.markCompleted(${todo.id})">
      //   <input type="text" value="${todo.title}" onblur="todoApp.toggleEdit(${
      //     todo.id
      //   })"/>
      //  `;
      // } else {
      //   //Readonly
      //   itemUI = `<li data-id="${todo.id}" class="${
      //     todo.completed ? "checked" : ""
      //   }" >${todo.title} <span onclick="todoApp.toggleEdit(${
      //     todo.id
      //   })" class="edit">☰</span><span onclick="todoApp.deleteTodo(${
      //     todo.id
      //   })" class="close">×</span></li>`;
      // }

      html += itemUI;
    });
    this.$todoList.insertAdjacentHTML("afterBegin", html);
  },
  getItemUI: function(todo) {
    let itemUI = "";
    if (todo.isEdit) {
      //Editable
      itemUI = `<li data-id="${todo.id}" class="${
        todo.completed ? "checked" : ""
      }" ondblclick="todoApp.markCompleted(${todo.id})">
      <input type="text" id="inputTodoTitle" value="${
        todo.title
      }"  onkeyup="todoApp.saveTodo(event,${todo.id})"/>
     <a href="#" class="cancel" onclick="todoApp.hideEditTextbox(${
       todo.id
     })">Cancel</>`;
      //
    } else {
      //Readonly
      itemUI = `<li data-id="${todo.id}" class="${
        todo.completed ? "checked" : ""
      }" >${todo.title} <span onclick="todoApp.toggleEdit(${
        todo.id
      })" class="edit">☰</span><span onclick="todoApp.deleteTodo(${
        todo.id
      })" class="close">×</span></li>`;
    }
    return itemUI;
  },
  hideEditTextbox: function(id) {
    this.toggleEdit(id);
  },
  saveTodo: function(event, id) {
    // debugger;
    var key = event.which || event.keyCode;
    if (key == 13) {
      console.log("saveTodo");
      // 13= key code for Enter key
      var todoUpdated = todoService.updateTodoTitle(
        id,
        document.querySelector("#inputTodoTitle").value
      );
      // this.render();

      //Refactored code where we dont need to re-render all the tods and we will only update changed Todo in UI
      let itemUI = this.getItemUI(todoUpdated);
      let node = this.parseHTML(itemUI);

      let $liNodeTObeUpdated = document.querySelector(`li[data-id="${id}"]`);
      if ($liNodeTObeUpdated) {
        document.querySelector(`li[data-id="${id}"]`).outerHTML =
          node.innerHTML;
      }
    }
  }
};

todoApp.render();
