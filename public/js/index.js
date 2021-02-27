const btn = document.querySelector('#clearHistoryBtn').addEventListener('click', action);

function action(){
  fetch('http://localhost:5000/user/expenses')
  .then(data => data.json())
  .then(result => console.log(result))
  .catch(err => console.log(err));
}