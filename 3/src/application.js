// BEGIN
export default (notebooks) => {
  const form = document.querySelector('form');
  const resultDiv = document.querySelector('.result');
  
  function filterNotebooks() {
    const brandSelect = document.querySelector('[name="brand"]');
    const modelInput = document.querySelector('[name="model"]');
    const priceFrom = document.querySelector('[name="priceFrom"]');
    const priceTo = document.querySelector('[name="priceTo"]');
    
    const brand = brandSelect ? brandSelect.value : '';
    const model = modelInput ? modelInput.value.toLowerCase() : '';
    const from = priceFrom ? priceFrom.value : '';
    const to = priceTo ? priceTo.value : '';
    
    const filtered = [];
    
    for (let i = 0; i < notebooks.length; i++) {
      const nb = notebooks[i];
      
      let ok = true;
      
      if (brand !== '' && brand !== 'all') {
        if (nb.brand !== brand) {
          ok = false;
        }
      }
      
      if (model !== '') {
        if (nb.model.toLowerCase().indexOf(model) === -1) {
          ok = false;
        }
      }
      
      if (from !== '') {
        const priceFromNum = parseInt(from, 10);
        if (nb.price < priceFromNum) {
          ok = false;
        }
      }
      
      if (to !== '') {
        const priceToNum = parseInt(to, 10);
        if (nb.price > priceToNum) {
          ok = false;
        }
      }
      
      if (ok) {
        filtered[filtered.length] = nb;
      }
    }
    
    resultDiv.innerHTML = '';
    
    if (filtered.length > 0) {
      const ul = document.createElement('ul');
      
      for (let i = 0; i < filtered.length; i++) {
        const li = document.createElement('li');
        li.textContent = filtered[i].model;
        ul.appendChild(li);
      }
      
      resultDiv.appendChild(ul);
    }
  }
  
  const inputs = document.querySelectorAll('input, select');
  for (let i = 0; i < inputs.length; i++) {
    const inp = inputs[i];
    const eventName = inp.tagName === 'SELECT' ? 'change' : 'input';
    
    inp.addEventListener(eventName, function() {
      filterNotebooks();
    });
  }
  
  filterNotebooks();
};
// END