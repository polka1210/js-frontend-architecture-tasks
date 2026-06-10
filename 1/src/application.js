// BEGIN
export default () => {
  let sum = 0;
  
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  const sumDiv = document.createElement('div');
  
  sumDiv.textContent = 'Sum: ' + sum;
  document.body.appendChild(sumDiv);
  
  input.focus();
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const val = input.value;
    const num = parseInt(val, 10);
    
    if (!isNaN(num)) {
      sum = sum + num;
    }
    
    sumDiv.textContent = 'Sum: ' + sum;
    
    input.value = '';
    input.focus();
  });
  
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.type = 'button';
  form.appendChild(resetBtn);
  
  resetBtn.addEventListener('click', function() {
    sum = 0;
    sumDiv.textContent = 'Sum: ' + sum;
    input.value = '';
    input.focus();
  });
};
// END