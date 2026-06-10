import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default () => {
  const form = document.querySelector('form');
  const input = document.querySelector('input[name="name"]');
  const list = document.querySelector('#tasks');
  
  async function loadTasks() {
    const res = await axios.get(routes.tasksPath());
    const items = res.data.items;
    
    list.innerHTML = '';
    
    for (let i = 0; i < items.length; i++) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = items[i].name;
      list.appendChild(li);
    }
  }
  
  loadTasks();
  
  form.onsubmit = async function(e) {
    e.preventDefault();
    
    const name = input.value;
    
    if (name === '') {
      return;
    }
    
    await axios.post(routes.tasksPath(), { name: name });
    
    input.value = '';
    
    loadTasks();
  };
};
// END