// BEGIN
export default (companies) => {
  const container = document.querySelector('.container');
  
  if (!container) {
    const newContainer = document.createElement('div');
    newContainer.className = 'container m-3';
    document.body.appendChild(newContainer);
  }
  
  const cont = document.querySelector('.container') || document.body;
  
  let currentDescDiv = null;
  let currentCompany = null;
  
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = company.name;
    
    button.onclick = function() {
      if (currentCompany === company && currentDescDiv !== null) {
        currentDescDiv.remove();
        currentDescDiv = null;
        currentCompany = null;
      } else {
        if (currentDescDiv !== null) {
          currentDescDiv.remove();
        }
        
        const desc = document.createElement('div');
        desc.textContent = company.description;
        cont.appendChild(desc);
        
        currentDescDiv = desc;
        currentCompany = company;
      }
    };
    
    cont.appendChild(button);
  }
};
// END