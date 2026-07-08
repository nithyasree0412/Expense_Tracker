

const balance = document.getElementById('balance');
const incomeAmount = document.getElementById('income-amount');
const expenseAmount = document.getElementById('expense-amount');
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
let transactions = [];

// LocalStorage Functions
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const saved = localStorage.getItem('transactions');
    if (saved) transactions = JSON.parse(saved);
}

transactionForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim()); 
    if (description === "" || isNaN(amount)) {
        alert("Please enter valid data");
        return;
    }
    const object = {
        id : transactions.length + 1,
        description: description,
        amount: amount
    };   
    transactions.push(object);
    saveTransactions();
    config();
    
    descriptionInput.value = "";
    amountInput.value = "";
    

});
    
    

//const dummydata = [{id : 1, description: 'boost', amount: -39},
  //  {id : 2, description: 'holicks', amount: +20},
    //{id : 3, description: 'salary', amount: +1000}];


function loadTransaction(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const li = document.createElement("li");
    li.classList.add(transaction.amount < 0 ? "exp" : "inc");
    li.innerHTML = `${transaction.description} <span>${sign}${Math.abs(transaction.amount).toFixed(2)}</span> 
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>`;
    transactionList.appendChild(li);
    
}
function deleteTransaction(id) {
    if (confirm("Are you sure you want to delete this transaction?")) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        saveTransactions();
        config();
        
    }   
    else {
        alert("Transaction deletion canceled.");
    }
    
}
function config() {
    // Implementation for updating the UI
    transactionList.innerHTML = "";
    transactions.forEach(loadTransaction);
    updateamounts();
}
function updateamounts() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    balance.textContent = total;
    incomeAmount.textContent = income;
    expenseAmount.textContent = expense;
}
window.addEventListener("load", function () {
    loadTransactions();
    config();
});