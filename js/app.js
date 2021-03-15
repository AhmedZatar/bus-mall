'use strict';
const product = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
const productName = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

const img = document.getElementById('img');
const leftImg = document.getElementById('leftImg');
const centerImg = document.getElementById('centerImg');
const rightImg = document.getElementById('rightImg');

function BusProduct(productName){

  this.productName=productName;
  this.path=`./img/${productName}`;
  this.timeSelected = 0;
  this.timeShowen = 0;

  BusProduct.all.push(this);

}

BusProduct.all = [];
for(let i=0;i<product.length;i++){
  new BusProduct(product[i]);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomImg() {

  const leftPic = randomNumber(0, BusProduct.all.length - 1);
  leftImg.src = BusProduct.all[leftPic].path;
  leftImg.title = BusProduct.all[leftPic].productName;
  leftImg.alt = BusProduct.all[leftPic].productName;
  BusProduct.all[leftPic].timeShowen++;


  let centerPic = randomNumber(0, BusProduct.all.length - 1);

  do {
    centerPic = randomNumber(0, BusProduct.all.length - 1);
  }while ( centerPic === leftPic);
  BusProduct.all[centerPic].timeShowen++;

  centerImg.src = BusProduct.all[centerPic].path;
  centerImg.title = BusProduct.all[centerPic].productName;
  centerImg.alt = BusProduct.all[centerPic].productName;

  let rightPic = randomNumber(0, BusProduct.all.length - 1);
  do{
    rightPic = randomNumber(0, BusProduct.all.length - 1);

  }while (rightPic === leftPic || rightPic === centerPic );
  rightImg.src = BusProduct.all[rightPic].path;
  rightImg.title = BusProduct.all[rightPic].productName;
  rightImg.alt = BusProduct.all[rightPic].productName;
  BusProduct.all[rightPic].timeShowen++;
  console.table(BusProduct.all);
}
randomImg();


img.addEventListener('click', clickHolder);

let numberOfSelect=0;
let numberOfRounds=25;
function clickHolder(event) {

  if (numberOfSelect<numberOfRounds && event.target.id==='leftImg' || numberOfSelect<numberOfRounds && event.target.id==='centerImg' || numberOfSelect<numberOfRounds && event.target.id==='rightImg'){
    for (let i = 0; i < BusProduct.all.length; i++){
      if(BusProduct.all[i].productName === event.target.title){
        BusProduct.all[i].timeSelected++;
        numberOfSelect++;
        console.log(numberOfSelect);
      }
    }
    randomImg();
  }else if(numberOfSelect<numberOfRounds){
    alert('Please Select Product');
  }
  reachNumberOfRounds();

}


function reachNumberOfRounds(){

  if(numberOfSelect===numberOfRounds){
    img.removeEventListener('click', clickHolder);
    let section=document.getElementById('img');
    let button=document.createElement('button');
    section.appendChild(button);
    button.innerText='View Results';
    button.id='show';
    const show = document.getElementById('show');
    show.addEventListener('click', clickHolder2);
    a++;
  }
}

let b=0;
function clickHolder2(event){
  if(b===0){
    let aside=document.getElementById('aside');
    let unorderList=document.createElement('ul');
    aside.appendChild(unorderList);
    unorderList.innerText='Results';
    b++;
    for(let i=0;i<product.length;i++){
      let list= document.createElement('li');
      unorderList.appendChild(list);
      list.innerText=productName[i]+' had Selected '+BusProduct.all[i].timeSelected+' times and shown '+BusProduct.all[i].timeShowen+' times';

    }
  }
  let section=document.getElementById('img');
  section.removeChild(section.childNodes[9]);
}








