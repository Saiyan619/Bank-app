
const account1 = {
    owner : "niyi",
    movements : [200, 450, -400, -650, -130, 70, 1300],
    interestRate : 1.2,
    pin: 1111,
};
const account2 = {
    owner : "ayo",
    movements : [300, 150, -400, -650, -130, 740, 900],
    interestRate : 1.5,
    pin: 2222,
};
const account3 = {
    owner : "sam",
    movements : [200, 450, 400, 650, -130, -70, 1300],
    interestRate : 1.2,
    pin: 3333,
};
const account4 = {
    owner : "fola",
    movements : [300, 150, -400, -650, -130, 740, 900, 2000, 500],
    interestRate : 1.5,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];



// LOGIN
let loginInputUser, loginInputPin, loginBtn, webContainer, loader, displayError;
webContainer = document.querySelector('.container');
loginInputUser = document.querySelector('.user');
loginInputPin = document.querySelector('.pin');
loginBtn = document.querySelector('.login-btn');
let currentAccount;
let currentAccountPin;
loader = document.querySelector('.loader');
loader.style.display = 'none';
displayError = document.querySelector('.display-error');
displayError.style.display = 'none';

loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let loginInputUserVal = loginInputUser.value
    let loginInputPinVal = loginInputPin.value
    currentAccount = accounts.find(account => account.owner === loginInputUserVal && account.pin === Number(loginInputPinVal));
    if (currentAccount && currentAccount.pin === Number(loginInputPinVal)) {
        loader.style.display = 'block';
        displayError.style.display = 'none'
        setTimeout(function () {
            loader.style.display = 'none';
            webContainer.style.opacity = '1';
            // console.log(currentAccount.pin);
            displayDeposits(currentAccount.movements);
            displayBalance(currentAccount.movements);
            displayStatistics(currentAccount);
        }, 2000);
        // loginInputPinVal = loginInputPin = '';
        
    } else {
        loader.style.display = 'block';
        setTimeout(function () {
            loader.style.display = 'none';
            displayError.style.display = 'block'
        }, 2000);
    }
    
    let username = document.querySelector('.username');
    username.textContent = currentAccount.owner.toUpperCase();
    username.style.display = 'inline-block';
}); 
// Statistics
let credit, debit, interest;
credit = document.querySelector('.in');
debit = document.querySelector('.out');
interest = document.querySelector('.interest');
const displayStatistics = function (transfers) {
    // credit alert
    const creditFinal = transfers.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    credit.textContent = `$${creditFinal}`;
    // debit alert
    const debitFinal = transfers.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    debit.textContent = `$${debitFinal}`;
    // interest rate
    interest.textContent = currentAccount.interestRate;
}




//Inserting transaction list
let mainLeft, depositsMoney;
mainLeft = document.querySelector('#mainLeft');
depositsMoney = document.querySelector('.deposits');
const displayDeposits = function(deposits){

    deposits.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        
        const html = `<div class="inner-depo">
        <div class="depo-${type}">${i + 1} ${type}</div>
        ${mov}
    </div> `;
        
    depositsMoney.insertAdjacentHTML('afterbegin',html);
    });
};

// Was having issues with pushing the inputcash so i just made a function for it instead;
const pushCash = function (arr, x) {
    arr.push(x);
    // console.log(arr);
};

// Transfer
let transferFunds = document.querySelector('#transfer-input');
let transferBtn = document.querySelector('.submit-transfer-btn');
let recieverAcc = document.querySelector('#transfer-input-user');
transferBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let transferFundsVal = transferFunds.value;
    let amount = Number(transferFundsVal);
    recieverAccVal = recieverAcc.value;
    recieverAccName = accounts.find(account => account.owner === recieverAccVal);
    console.log(recieverAccName.movements,recieverAccName.owner);
    if (amount > 0 || amount <= totalCash && recieverAccVal !== currentAccount.owner) {
        // console.log('transfer valid');
        loader.style.display = 'block';
        setTimeout(function () {
            loader.style.display = 'none';
            pushCash(currentAccount.movements, -amount);
        pushCash(recieverAccName.movements, amount);
        displayDeposits(currentAccount.movements);
        displayBalance(currentAccount.movements);
        displayStatistics(currentAccount);
            // displayError.style.display = 'block'
        }, 2000);
        
    }
    
});



let requestBtn = document.querySelector('.request-cash-btn');
let requestCashInput = document.querySelector('#request-cash');
requestBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let requestCashInputVal = requestCashInput.value;
    let reqAmount = Number(requestCashInputVal);
    if (reqAmount > 0 && reqAmount <= 5000) {
        // return totalCash += requestCashInputVal;
        loader.style.display = 'block';
        setTimeout(function () {
            loader.style.display = 'none';
            currentAccount.movements.push(reqAmount);
        displayDeposits(currentAccount.movements);
            displayStatistics(currentAccount);
            displayBalance();
            // displayError.style.display = 'block'
        }, 2000);
    }
    // console.log(reqAmount);
    // reqAmount = '';
    
});

let closeAccUser = document.querySelector('#close-acc-user');
let closeAccPin = document.querySelector('#close-acc-pin');
let closeAccBtn = document.querySelector('.close-acc-btn');
closeAccBtn.addEventListener('click' ,function (e) {
    e.preventDefault();
    let closeAccUserVal = closeAccUser.value;
    let closeAccPinVal = closeAccPin.value;
    console.log(closeAccUserVal, closeAccPinVal)
    if (closeAccUserVal == currentAccount.owner || closeAccPinVal == currentAccount.pin) {
        webContainer.style.opacity = '0'; 
    }
})


// Current balance
let totalCash = document.querySelector('.total-cash');
const displayBalance = function () {
    const sum = currentAccount.movements.reduce(function (arr, cur, i) {
        return arr + cur
    }, 0);

    totalCash.textContent = `$${sum}`;
};




// close account is not bad but wanna add close timer(prolly 10s)
//update date











