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








/**      ----  js------- */
// initials 
let sort = false, timeOutTimer,timeRemaider;
const account1 = {
       owner : 'Natnael Fekadu',
       pin: 11,
       movements:[200,400,1000,-600,-400,1200,-300],
       intereseRate: 1.2,
       balance:0,
       movementsDates : [
        "2022-01-23T02:16:00.000Z",
        "2022-02-04T04:06:00.000Z",
        "2023-03-23T23:05:00.000Z",
        "2022-05-03T23:04:00.000Z",
        "2022-07-17T01:46:00.000Z",
        "2022-07-21T13:06:00.000Z",
        "2022-07-22T02:06:00.000Z"
        
    ],
       
 };
const account2 = {
        owner : 'Natnael Deyas',
        pin: 22,
    movements:[600,600,1000,-300,-1400,1800,-300],
    intereseRate: 1.4,
    balance:0,
    movementsDates : [
        "2022-01-23T02:16:00.000Z",
        "2022-02-04T04:06:00.000Z",
        "2023-03-23T23:05:00.000Z",
        "2022-05-03T23:04:00.000Z",
        "2022-07-17T01:46:00.000Z",
        "2022-07-21T13:06:00.000Z",
        "2022-07-22T02:06:00.000Z"
        
    ],
    
};
const account3 = {
    owner : 'Natnael Assefa',
    pin: 33,
    movements:[1200,4400,-1000,-1600,1400,1200,-1300],
    intereseRate: 1.6,
    balance:0,
    movementsDates : [
        "2022-01-23T02:16:00.000Z",
        "2022-02-04T04:06:00.000Z",
        "2023-03-23T23:05:00.000Z",
        "2022-05-03T23:04:00.000Z",
        "2022-07-17T01:46:00.000Z",
        "2022-07-21T13:06:00.000Z",
        "2022-07-22T02:06:00.000Z"
        
    ],
    
};
const account4 = {
    owner : 'Natnael Getachew',
    pin: 44,
    movements:[200,2400,11000,-700,3400,-1200,300],
    intereseRate: 1.8,
    balance:0,
    movementsDates : [
        "2022-01-23T02:16:00.000Z",
        "2022-02-04T04:06:00.000Z",
        "2023-03-23T23:05:00.000Z",
        "2022-05-03T23:04:00.000Z",
        "2022-07-17T01:46:00.000Z",
        "2022-07-21T13:06:00.000Z",
        "2022-07-22T02:06:00.000Z"
        
    ],
    
};
const accounts =[account1,account2,account3,account4];
let currentAccount ;

inputs.forEach(input => input.addEventListener('focus',function(){
    input.value = '';
  }))
const clearInputs = function(){
    inputs.forEach(input => input.value ='');
}
function createUsername(){
    const usernames = accounts.map(function(account,index){
        let username='';
        account.owner.split(' ').forEach(function(name){
            username += name.toLowerCase().substr(0,1)
            account.username = username;
        })
    })
}
createUsername();
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
const displayBalance = function(movements){
    // header date
     headerDate.textContent = formatDates(new Date(),true);
     currentAccount.balance = calDisplaySummary(movements);
    currentAccount.balance += 
        movements.reduce((total,mov)=> {
        return total + mov;
        },0) ;
    balance.textContent = `${(currentAccount.balance.toFixed(2))} `;
        
   
}
const calDisplaySummary = function(movements){
    // deposite
    const inBalace = 
    movements.filter( move => move > 0 )
    .reduce((total,deposite) => total + deposite,0 );
    summaryIn.textContent = `${(inBalace).toFixed(2)}`;
    // widthdrawl 
    const outBalace = 
    movements.filter( move => move < 0 )
    .reduce((total,deposite) => total + deposite,0 );
    summaryOut.textContent = `${(Math.abs(outBalace)).toFixed(2)}`;
    // interest
    const interest = 
    movements.filter( move => move > 0 )
    .map(deposite => deposite * 1.2/100)
    .reduce((interest,totalInterst)=>totalInterst + interest ,0);
    summaryInterest.textContent = `${(interest ).toFixed(2)}`;
    return interest;
    
}
  // display movements
const displayMovement = function(currentAccount,sort){
    movememtContainer.innerHTML = '';
    const movs = sort ? currentAccount.movements.slice().sort((a,b)=> a-b): currentAccount.movements;   
    movs.forEach(function(move,order){
       const  movDates =new Date(currentAccount.movementsDates[order]);   
       
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
    
    currentAccount.balance +=Number( calDisplaySummary(currentAccount.movements));
    displayBalance(currentAccount.movements);
    
}

function logIn(){
    // fake login
    {}
    //  {
    //  currentAccount = account1;
    // const username = 'natfek';
    // const pin =  '1111';  
    
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
            headerLeft.textContent = ` welcome back , ${currentAccount.owner.slice(currentAccount.owner.indexOf(' '))}`;
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
function transfer(){
    const transferRecieverInput = document.querySelector('.input-receipt-name');
    const transferAmountInput = document.    querySelector('.input-transfer-amount');
    const tranferAccount = transferRecieverInput.value;
    const tranferAmount = Number(transferAmountInput.value);
    
    let reciever = accounts.find(finder =>{
        return finder.username == tranferAccount || finder.owner.slice(finder.owner.indexOf(' ')+1).toLowerCase() === tranferAccount.toLowerCase();
    });    
    if(
        reciever!== undefined && 
        reciever.username !== currentAccount.username && 
        currentAccount.balance >= tranferAmount&&
        tranferAmount !=0){
            let now = new Date().toISOString();
            reciever?.movements.push(tranferAmount);
            reciever?.movementsDates.push(now);
            currentAccount.movements.push(-tranferAmount);
            currentAccount.movementsDates.push(now);
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
function askLoan(){
    const loanAmount = +(loanInput.value);
    if(loanAmount ==0 )
    loanInput.value = ' ! too small';
    else if(loanAmount >= currentAccount.balance*.1)
    loanInput.value = '! too much';
    
    else{
        let now = new Date().toISOString();
        currentAccount.movements.push(loanAmount);
        currentAccount.movementsDates.push(now)
        
            // waiting 3 seconds
            
       
        setTimeout( displayMovement,1000,currentAccount);
        clearInputs()
    }

}
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

transferBtn.addEventListener('click',transfer);
loanBtn.addEventListener('click',askLoan);
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
      askLoan()
    }
});
inputTransfer.forEach(input=>input.addEventListener('keydown',function(e){
    if(e.key ==='Enter'){
        transfer()
    }
}));
inputClose.forEach(input=>input.addEventListener('keydown',function(e){
    if(e.key ==='Enter'){
       closeAcccount();
    }
}));

  
{
// using Intl API
  {  
// let now = new Date();
// let options = {
//     hour:'numeric',
//     minute: 'numeric',
//     year: 'numeric',
//     month:'long',
//     weekday: 'long'
// }
// let formated = Intl.DateTimeFormat('am-Et',options).format(now)
// console.log(formated)
}
/** timers  */
// setTImOut
{  
    //  function called(fname,lname){
//     console.log(`${fname} ${lname} is called`);
// }   let fname ='natty',lname = 'fekadu';
//     const timer1 = setTimeout(called,3000,fname,lname);
    // if(fname == 'natty')
    // clearTimeout(timer1)

}
// seInterval

{ 
    // let fname ='natty',lname = 'fekadu';
    // const timer2 = setInterval((fname,lname) => {
    //     console.log(`${fname} ${lname } is called now`);
        
    // }, 2000,fname,lname);

    // setTimeout((timer) =>clearInterval(timer),6000,timer2)

}
// setTimeout(logOut,60000);
}
PINInput.focus;
const mine = 'natty';
console.log(mine);
