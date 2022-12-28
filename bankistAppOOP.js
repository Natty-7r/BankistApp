'use strict';
/**      ----  elements------- */
  // global elements
  const app = document.querySelector('.app');

   // inputs 
  const inputs = document.querySelectorAll('.input');
  const inputHeader = document.querySelectorAll('.input-header');
  const inputTransfer = document.querySelectorAll('.input-transfer');
//  loan  const inputs = document.querySelectorAll('.input');
  const inputClose = document.querySelectorAll('.input-close');
 
const headerLeft = document.querySelector('.header-left');
const movememtContainer = document.querySelector('.movements');
const balance = document.querySelector('.balance-value');
  // summary
const summaryIn = document.querySelector('.summary-in-value ');

const summaryOut = document.querySelector('.summary-out-value ');
const summaryInterest = document.querySelector('.summary-interest-value');
// log in session
const usernameInput = document.querySelector('.input-user ');
const PINInput = document.querySelector('.input-pin');
const loginBtn = document.querySelector('.btn-login');
    // actions btn&& inputs
    const transferBtn = document.querySelector('.btn-action-transfer');
    const loanBtn = document.querySelector('.btn-action-loan');
const closeBtn = document.querySelector('.btn-action-close');
const closeUserInput = document.querySelector('.input-close-user');
const closePinInput = document.querySelector('.input-close-pin');
const loanInput = document.querySelector('.input-loan');


const logInError = document.querySelector('.login-error');
const sortBtn = document.querySelector('.sort');

const headerDate = document.querySelector('.date');
const logoutTime = document.querySelector('.logout-time');
//




/**----------------------------------------------------------------------------------- */
class Account{
   
    // -- public fields.
    firstName;
    LastName;
    fullName;
  
   // -- private fields. 
   pin;
   #balance;
   #inBalance;
   #outBalance;
   #interest;
   #movements = [];
   #movementDates = [];
   #interestRate = .2;
   // methodes 
  
   constructor(owner,pin,movements,movementDates,intereseRate,){
    [this.firstName,this.LastName] = owner.split(' ');
    this.pin = pin;
    this.fullName = owner ;
    this.#movements  = movements;
    this.#movementDates  = movementDates;
    this.#interestRate =intereseRate;
    this.username =this._createUsername();

}
     // private methodes
 _createUsername(){
        this.username =  
          this.firstName.toLowerCase().slice(0,1) +
          this.LastName.toLowerCase().slice(0,1);
        return this.username;
      }

  _calcualteSummary(){ // return arrayof in,out and interest.
    this.#inBalance = this.#movements.filter(move => move >0).reduce((totalIn,move ) => totalIn + move,0);
    this.#outBalance = Math.abs(this.#movements.filter(move => move < 0).reduce((totalOut,move ) => totalOut + move,0));
    this.#interest = this.#inBalance * this.#interestRate/100;
    return [this.#inBalance,this.#outBalance,this.#interest];
  }

  _calculateBalance(){
   this.#balance =  
   this.#movements.reduce((sum ,move) => sum + move,0);
      this.#balance  += this._calcualteSummary()[2]; // adding the interest 
   return this.#balance ;
  }
  



  //public methodes
  getMovements(){
    return  [this.#movements, this.#movementDates];
  }
  getBalance(){
    return this._calculateBalance();
  }
  getSummary(){
    return this._calcualteSummary();
  }
  deposite(amount,date){
    this.#movements?.push(amount);
    this.#movementDates?.push(date);
    this._calculateBalance();
    displayMovement(this);
    return amount;
  }
  withdraw(amount,date){
    this.deposite(-amount,date);
    displayMovement(this);
    return amount;
  }
  transfer(){
    const transferRecieverInput = document.querySelector('.input-receipt-name');
    const transferAmountInput = document.    querySelector('.input-transfer-amount');
    const tranferAccount = transferRecieverInput.value;
    const tranferAmount = Number(transferAmountInput.value);
    
    let reciever = accounts.find(finder =>{
        return finder.username == tranferAccount || finder.LastName.toLowerCase() === tranferAccount.toLowerCase();
    });    
    if(
        reciever!== undefined && 
        reciever.username !== this.username && 
        this.balance >= tranferAmount&&
        tranferAmount != 0){
            let now = new Date().toISOString();
            reciever?.deposite(tranferAmount,now);
            currentAccount.withdraw(tranferAmount,now);
            // waiting 1 second to display result
            setTimeout( displayMovement,300,currentAccount)         
            clearInputs();
            
        }
        else {
            if(reciever === undefined){
                transferRecieverInput.value = '! unknown account';
            }
            else if(
                reciever.username === this.username
                ){
                    transferRecieverInput.value = '! same account';
                
            }
            else if(this.balance < tranferAmount){
                transferAmountInput.value ='! to much'
            }
            else  if(tranferAmount <= 0){
                transferAmountInput.value ='invalid amount'
            }
            
            
        }
              
}

  askLoan(){
    const loanAmount = +(loanInput.value);
    if(loanAmount ==0 )
    loanInput.value = ' ! too small';
    else if(loanAmount >= this.balance *.3)
    loanInput.value = '! too much';
    
    else{
        let now = new Date().toISOString();
        this.movements.deposite(loanAmount,now);
            // waiting 3 seconds
        setTimeout( displayMovement,1000,currentAccount);
        clearInputs()
    }
}



}


/**      ----  js------- */
// initials 
let sort = false, timeOutTimer,timeRemaider,currentAccount;
const accounts = [];
{// initialzing form past code

const account1 = {
       owner : 'Natnael Fekadu',
       pin: 11,
       movements:[200,400,1000,-600,-400,1200,-300],
       movementsDates : [
        "2022-01-23T02:16:00.000Z",
        "2022-02-04T04:06:00.000Z",
        "2023-03-23T23:05:00.000Z",
        "2022-05-03T23:04:00.000Z",
        "2022-07-17T01:46:00.000Z",
        "2022-07-21T13:06:00.000Z",
        "2022-07-22T02:06:00.000Z"
        
    ], intereseRate: 1.2
       
 };
const account2 = {
        owner : 'Natnael Deyas',
        pin: 22,
    movements:[600,600,1000,-300,-1400,1800,-300],  
    movementsDates : [
        "2022-01-23T02:16:00.000Z",
        "2022-02-04T04:06:00.000Z",
        "2023-03-23T23:05:00.000Z",
        "2022-05-03T23:04:00.000Z",
        "2022-07-17T01:46:00.000Z",
        "2022-07-21T13:06:00.000Z",
        "2022-07-22T02:06:00.000Z"
        
    ],
    intereseRate: 1.4,
    
};
const account3 = {
    owner : 'Natnael Assefa',
    pin: 33,
    movements:[1200,4400,-1000,-1600,1400,1200,-1300],  
    movementsDates : [
        "2022-01-23T02:16:00.000Z",
        "2022-02-04T04:06:00.000Z",
        "2023-03-23T23:05:00.000Z",
        "2022-05-03T23:04:00.000Z",
        "2022-07-17T01:46:00.000Z",
        "2022-07-21T13:06:00.000Z",
        "2022-07-22T02:06:00.000Z"
        
    ],
    intereseRate: 1.6,
    
};
const account4 = {
    owner : 'Natnael Getachew',
    pin: 44,
    movements:[200,2400,11000,-700,3400,-1200,300],
     movementsDates : [
        "2022-01-23T02:16:00.000Z",
        "2022-02-04T04:06:00.000Z",
        "2023-03-23T23:05:00.000Z",
        "2022-05-03T23:04:00.000Z",
        "2022-07-17T01:46:00.000Z",
        "2022-07-21T13:06:00.000Z",
        "2022-07-22T02:06:00.000Z"
        
    ],
    intereseRate: 1.8,
    
};
const accountsArrays =[account1,account2,account3,account4];
accountsArrays.forEach((account ,index) => {
    let {owner ,pin,movements,movementsDates, intereseRate} = account;
    accounts[index] = new Account(owner,pin,movements,movementsDates, intereseRate); 
});
}

 //emptying inputs on focus/
inputs.forEach(input => input.addEventListener('focus',function(){
    input.value = '';
  }))

const clearInputs = function(){
    inputs.forEach(input => input.value ='');
}

  // to format dates
const formatDates = function(movDates,isHeaderDate = false){
    let now = new Date();
    const dayLong  = 
        Math.abs(
        Math.round(
        (movDates-now)/(1000*60*60*24)
    ));

    let dateDisplayed;
    if(isHeaderDate)    
    dateDisplayed =  Intl.DateTimeFormat('am-Et').format(now)
    else{
         if(dayLong == 0)
            dateDisplayed = 'Today'
        else if(dayLong == 1)
            dateDisplayed = 'Yesterday'
        else if (dayLong <= 7 )
            dateDisplayed = `${dayLong} ago`;
        else 
        dateDisplayed =  Intl.DateTimeFormat('am-Et').format(now)

    }

   return  dateDisplayed;
 }
 // displaying the balace and its header
const displayBalance = function(currentAccount){
    // header date
     headerDate.textContent = formatDates(new Date(),true);
     balance.textContent = `${(currentAccount.getBalance().toFixed(2))} `;
        
}
const displaySummary = function(currentAccount){
    const [inBalace,outBalace,interest] = currentAccount.getSummary();
    // deposite
    summaryIn.textContent = `${(inBalace).toFixed(2)}`;
    // widthdrawl 
    summaryOut.textContent = `${(Math.abs(outBalace)).toFixed(2)}`;
    // interest
    summaryInterest.textContent = `${(interest ).toFixed(2)}`;
    
}
  // display movements
const displayMovement = function(currentAccount,sort){
    movememtContainer.innerHTML = '';
    const [movements,movementsDates] = currentAccount.getMovements();
    const movs = sort ? movements.slice().sort((a,b)=> a - b): movements;   
    movs.forEach(function(move,order){
       let  movDates =new Date(movementsDates[order]);   
         let type = move > 0 ? 'deposite':'withdrawal';

         const htmlMove = `
         <div class="mov-left">
            <div class="mov mov-${type}">
                <p class="mov-order">${order+1}</p>
                <p class="mov-name mov-name-${type}"> ${type}</p>
                </div>
            <p class="mov-date">${ formatDates(movDates)} </p>
            </div>           
                                    
            </p>
        <p class="movement-amount">${move} Birr</p>
       `;
        let movEl = document.createElement('div');
        movEl.classList.add('onemovement');
        movEl.innerHTML = htmlMove;
        movememtContainer.insertAdjacentElement('afterbegin',movEl);
    });
    
   
  displaySummary(currentAccount)
  displayBalance(currentAccount)
    
}
function transfer(currentAccount){
    const transferRecieverInput = document.querySelector('.input-receipt-name');
    const transferAmountInput = document.    querySelector('.input-transfer-amount');
    const tranferAccount = transferRecieverInput.value;
    const tranferAmount = Number(transferAmountInput.value);
    
    let reciever = accounts.find(finder =>{
        return finder.username == tranferAccount || finder.LastName.toLowerCase() === tranferAccount.toLowerCase();
    });    
    if(
        reciever!== undefined && 
        reciever.username !==
        currentAccount.username && 
        currentAccount.getBalance() >= tranferAmount&&
        tranferAmount !=0){
            let now = new Date().toISOString();
            reciever?.deposite(tranferAmount,now);
            currentAccount?.withdraw(tranferAmount,now);
            // waiting 1 second
            setTimeout( displayMovement,300,currentAccount)         
            clearInputs();
            
        }
        else {
            if(reciever === undefined){
                transferRecieverInput.value = '! unknown account';
            }
            else if(
                reciever.username === currentAccount.username
                ){
                    transferRecieverInput.value = '! same account';
                
            }
            else if(currentAccount.balance < tranferAmount){
                transferAmountInput.value ='! to much'
            }
            else  if(tranferAmount <= 0){
                transferAmountInput.value ='invalid amount'
            }
            
            
        }
        
        
        
        
}
function askLoan(currentAccount){
    const loanAmount = +(loanInput.value);
    // console.log(currentAccount.getBalance())
    if(loanAmount ==0 )
    loanInput.value = ' ! too small';
    else if(loanAmount >= currentAccount?.getBalance *.1)
    loanInput.value = '! too much';
    
    else{
        let now = new Date().toISOString();
        currentAccount.deposite(loanAmount,now)
        
            // waiting 3 seconds
       
        setTimeout( displayMovement,1000,currentAccount);
        clearInputs()
    }

}

function logIn(){
    // fake login
    {}
    //  {
    //  currentAccount = account1;
    // const username = 'nf';
    // const pin =  '11';  
    
    //     app.classList.add('visible');
    //     displayMovement(currentAccount);
    //     headerLeft.textContent = ` welcome back , ${currentAccount.owner.slice(currentAccount.owner.indexOf(' '))}`;
    //     app.classList.add('visible');
    //     logInError.classList.remove('visible');
    //     usernameInput.value = '';
    //     PINInput.value = '';
    //     PINInput.blur();
    //     // actions
    //     transferBtn.addEventListener('click',transfer);  
    
    // }

    const username = usernameInput.value;
    const pin =  Number(PINInput.value);  
    currentAccount = accounts.find(account =>{
        return account.username === username;
    })
    if(
        currentAccount?.username === username&&
        currentAccount?.pin === pin 
        ){
            app.classList.add('visible');
            logInError.classList.remove('visible');
            headerLeft.textContent = ` welcome back , ${currentAccount.LastName}`;
            usernameInput.value = '';
            PINInput.value = '';
            PINInput.blur();
            displayMovement(currentAccount);  
            clearTimeout(timeOutTimer);
            clearInterval(timeRemaider)         
            logoutTimer();           
            
        }
        else{
            logInError.classList.add('visible');
            if(currentAccount == undefined){
                logInError.textContent= ' ! unrecognized user';
            }
            else if(pin != currentAccount.pin)
            logInError.textContent =' ! invalid PIN';
            
        }
    }   
    // logIn();

    /** actions */


function logOut(){
    app.classList.add('visible');
       
        headerLeft.textContent = ` log in to get started `;
        app.classList.remove('visible');
        usernameInput.value = '';
        PINInput.value = '';
        PINInput.blur();
 }
function closeAcccount(){
    const closeUser = closeUserInput.value;
    const  closePin = Number(closePinInput.value);
    if(
        currentAccount.username === closeUser &&
        currentAccount.pin === closePin){
            const accountIndex =  accounts.findIndex(account =>{
                return account.username = closeUser;
            });
            accounts.splice(accountIndex,1);
            clearInputs();
            logOut();
        }
    else if(currentAccount.username !== closeUser){
        closeUserInput.value = 'wrong username';
    }
    else if( closePin != currentAccount.pin)
    closePinInput.value = 'wrong PIN';
    
    
}

function logoutTimer(){
    console.log('new timers')
    timeOutTimer =setTimeout(logOut,5*60000);
    const time = new Date(0,0,0,0,5,0);
    let timer;
   timeRemaider =  setInterval(function(){
        time.setSeconds(time.getSeconds()-1)
        timer = Intl.DateTimeFormat('en-Us').format(time);
        timer = `${(time.getMinutes()+'').padStart(2,'0')} : ${(time.getSeconds()+'').padStart(2,'0')}`
        logoutTime.textContent = timer;
    
    },1000)
}

// event listners
loginBtn.addEventListener('click',logIn);

transferBtn.addEventListener('click',transfer.bind(null,currentAccount));
loanBtn.addEventListener('click',askLoan.bind(null,currentAccount));
closeBtn.addEventListener('click',closeAcccount)
sortBtn.addEventListener('click',function(){
    displayMovement(currentAccount,!sort);
    sort =!sort;
})
   // Enter on inputs
inputHeader.forEach(input=>input.addEventListener('keydown',function(e){
    if(e.key ==='Enter'){
        logIn()
    }
}));
loanInput.addEventListener('keydown',function(e){
    if(e.key ==='Enter'){
      askLoan(currentAccount)
    }
});
inputTransfer.forEach(input=>input.addEventListener('keydown',function(e){
    if(e.key ==='Enter'){
        transfer(currentAccount)
    }
}));
inputClose.forEach(input=>input.addEventListener('keydown',function(e){
    if(e.key ==='Enter'){
       closeAcccount();
    }
}));
