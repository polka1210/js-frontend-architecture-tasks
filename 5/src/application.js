import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
  let lists = [
    { id: uniqueId(), name: 'General', tasks: [] }
  ];
  let activeListId = lists[0].id;
  
  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');
  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');
  const newListInput = document.querySelector('#new-list-name');
  const newTaskInput = document.querySelector('#new-task-name');
  
  function render() {
    const ul = document.createElement('ul');
    
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const li = document.createElement('li');
      
      if (list.id === activeListId) {
        const b = document.createElement('b');
        b.textContent = list.name;
        li.appendChild(b);
      } else {
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = list.name;
        a.onclick = (function(id) {
          return function(e) {
            e.preventDefault();
            activeListId = id;
            render();
          };
        })(list.id);
        li.appendChild(a);
      }
      
      ul.appendChild(li);
    }
    
    listsContainer.innerHTML = '';
    listsContainer.appendChild(ul);
    
    const activeList = lists.find(l => l.id === activeListId);
    
    if (activeList && activeList.tasks.length > 0) {
      const taskUl = document.createElement('ul');
      
      for (let i = 0; i < activeList.tasks.length; i++) {
        const task = activeList.tasks[i];
        const taskLi = document.createElement('li');
        taskLi.textContent = task.name;
        taskUl.appendChild(taskLi);
      }
      
      tasksContainer.innerHTML = '';
      tasksContainer.appendChild(taskUl);
    } else {
      tasksContainer.innerHTML = '';
    }
  }
  
  newListForm.onsubmit = function(e) {
    e.preventDefault();
    const name = newListInput.value.trim();
    
    if (name === '') {
      return;
    }
    
    let exists = false;
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].name === name) {
        exists = true;
        break;
      }
    }
    
    if (!exists) {
      const newList = {
        id: uniqueId(),
        name: name,
        tasks: []
      };
      lists.push(newList);
    }
    
    newListInput.value = '';
    render();
  };
  
  newTaskForm.onsubmit = function(e) {
    e.preventDefault();
    const name = newTaskInput.value.trim();
    
    if (name === '') {
      return;
    }
    
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].id === activeListId) {
        lists[i].tasks.push({ id: uniqueId(), name: name });
        break;
      }
    }
    
    newTaskInput.value = '';
    render();
  };
  
  render();
};
// END