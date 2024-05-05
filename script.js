const balance = document.getElementById("balance")
const money_add = document.getElementById("money-add")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")


const localStorageTransactions = JSON.parse(localStorage.getItem("Transactions"))
let Transactions = localStorage.getItem("Transactions") !== null ? localStorageTransactions : [];

function addTransactions(e){
    e.preventDefault();
    if(
        text.value.trim==="" || amount.value.trim===""
    ){
        alert("Please enter text and value")
    }
    else{
        const transaction ={
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }

        Transactions.push(transaction)
        addTransactionDOM(transaction)
        updateValues()
        text.value=""
        amount.value=""
    }
}

function generateId(){
    return Math.floor(Math.random()*100000000)
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+"
    const item = document.createElement("li")

    item.classList.add(
        transaction.amount>0 ? "money-transaction-plus":"money-transaction-minus"
    )
        
    item.innerHTML =`
    ${transaction.text}<span id="span">${sign}₹${Math.abs(transaction.amount)}</span>
    <button id="delete-btn" class="money-transaction-btn" onclick="removeTransaction(${transaction.id})">❌</button>`

list.appendChild(item)

}

function removeTransaction(id){
    Transactions = Transactions.filter(transaction => transaction.id !== id)
    updateLocalStorage()
    init()
}

function updateValues(){
    const amounts = Transactions.map(transaction => transaction.amount)
    let total = amounts.reduce((acc,curr) => (acc+=curr),0).toFixed(2)
    let income = amounts.filter(item => item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2)
    let expense = (amounts.filter(item => item<0).reduce((acc,curr)=>(acc+=curr),0)*-1).toFixed(2)

    balance.innerText=`₹${total}`
    money_add.innerText=`₹${income}`
    money_minus.innerText=`₹${expense}`
}

function updateLocalStorage(){
    localStorage.setItem(
        "Transactions", 
        JSON.stringify(Transactions)
    )
}

function init(){
    list.innerHTML=""
    Transactions.forEach(addTransactionDOM)
    updateValues();
}

init()

form.addEventListener("submit", addTransactions)