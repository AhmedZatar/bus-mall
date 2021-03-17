'use strict';
const product = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
const productName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

const img = document.getElementById('img');
const leftImg = document.getElementById('leftImg');
const centerImg = document.getElementById('centerImg');
const rightImg = document.getElementById('rightImg');

function BusProduct(productName) {

  this.productName = productName;
  this.path = `./img/${productName}`;
  this.timeSelected = 0;
  this.timeShowen = 0;

  BusProduct.all.push(this);
}

BusProduct.all = [];

function retrieve() {
  const data = JSON.parse(localStorage.getItem('dataStorage'));
  if (data) {
    BusProduct.all = JSON.parse(localStorage.getItem('dataStorage'));
    randomImg();
  } else {
    randomImg();
  }
}

for (let i = 0; i < product.length; i++) {

  new BusProduct(product[i]);
}

function randomNumber(min, max) {
  let a = Math.floor(Math.random() * (max - min + 1)) + min;
  while (a === previousImg[0] || a === previousImg[1] || a === previousImg[2]) {
    a = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return a;
}

let previousImg = [];

function randomImg() {
  let leftPic = randomNumber(0, BusProduct.all.length - 1);
  let centerPic = randomNumber(0, BusProduct.all.length - 1);
  let rightPic = randomNumber(0, BusProduct.all.length - 1);

  leftImg.src = BusProduct.all[leftPic].path;
  leftImg.title = BusProduct.all[leftPic].productName;
  leftImg.alt = BusProduct.all[leftPic].productName;
  BusProduct.all[leftPic].timeShowen++;


  do {
    centerPic = randomNumber(0, BusProduct.all.length - 1);
  } while (centerPic === leftPic);

  centerImg.src = BusProduct.all[centerPic].path;
  centerImg.title = BusProduct.all[centerPic].productName;
  centerImg.alt = BusProduct.all[centerPic].productName;
  BusProduct.all[centerPic].timeShowen++;


  do {
    rightPic = randomNumber(0, BusProduct.all.length - 1);

  } while (rightPic === leftPic || rightPic === centerPic);
  rightImg.src = BusProduct.all[rightPic].path;
  rightImg.title = BusProduct.all[rightPic].productName;
  rightImg.alt = BusProduct.all[rightPic].productName;
  BusProduct.all[rightPic].timeShowen++;

  console.table(BusProduct.all);

  previousImg[0] = leftPic;
  previousImg[1] = centerPic;
  previousImg[2] = rightPic;


}



img.addEventListener('click', clickHolder);

let numberOfSelect = 0;
let numberOfRounds = 25;
function clickHolder(event) {

  if (numberOfSelect < numberOfRounds && event.target.id === 'leftImg' || numberOfSelect < numberOfRounds && event.target.id === 'centerImg' || numberOfSelect < numberOfRounds && event.target.id === 'rightImg') {
    for (let i = 0; i < BusProduct.all.length; i++) {
      if (BusProduct.all[i].productName === event.target.title) {
        BusProduct.all[i].timeSelected++;
        numberOfSelect++;
        console.log(numberOfSelect);
      }
    }
    randomImg();
  } else if (numberOfSelect < numberOfRounds) {
    alert('Please Select Product');
  }
  reachNumberOfRounds();

}


function reachNumberOfRounds() {

  if (numberOfSelect === numberOfRounds) {
    img.removeEventListener('click', clickHolder);
    let section = document.getElementById('img');
    let button = document.createElement('button');
    section.appendChild(button);
    button.innerText = 'View Results';
    button.id = 'show';
    const show = document.getElementById('show');
    show.addEventListener('click', clickHolder2);
    localStorage.setItem('dataStorage', JSON.stringify(BusProduct.all));


  }
}


function clickHolder2() {

  let aside = document.getElementById('aside');
  let unorderList = document.createElement('ul');
  aside.appendChild(unorderList);
  unorderList.innerText = 'Results';
  for (let i = 0; i < product.length; i++) {
    let list = document.createElement('li');
    unorderList.appendChild(list);
    list.innerText = productName[i] + ' had Selected ' + BusProduct.all[i].timeSelected + ' times and shown ' + BusProduct.all[i].timeShowen + ' times';

  }

  let section = document.getElementById('img');
  section.removeChild(section.childNodes[9]);
  chartFunction();

}



function chartFunction() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let getProductName = [];
  let getTimeSelected = [];
  let getTimeShowen = [];
  for (let i = 0; i < BusProduct.all.length; i++) {
    getProductName.push(productName[i]);
    getTimeSelected.push(BusProduct.all[i].timeSelected);
    getTimeShowen.push(BusProduct.all[i].timeShowen);
  }
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: getProductName,
      datasets: [{
        label: 'vote totals',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: getTimeSelected,

      },
      {
        label: 'the number of times a product was viewed',
        backgroundColor: 'rgb(100, 99, 132)',
        borderColor: 'rgb(100, 99, 132)',
        data: getTimeShowen,
      }
      ]

    },

    // Configuration options go here
    options: {
      scales: {
        xAxes: [{
          barPercentage: 0.4
        }]
      }
    }
  });
}
retrieve();


