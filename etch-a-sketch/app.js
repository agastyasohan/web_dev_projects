
// for(let i=1;i<=256;i++){
//     const div = document.createElement("div");
//     div.setAttribute('id',i);
//     div.innerText = i;
//     container.append(div);
// };

let color = "black";
let click = false;

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    // Toggle drawing state on mouse button events
    document.querySelector('body').addEventListener('mousedown', () => (click = true));
    document.querySelector('body').addEventListener('mouseup', () => (click = false));

    const slider = document.querySelector('.slider');
    slider.addEventListener('input', (event) =>{
      const newSize = event.target.value;
      createBoard(newSize);
    })
    createBoard(slider.value);
  });

const createBoard = (size) => {
    const board = document.querySelector('.board');
    board.innerHTML = '';  // Clear the board before creating a new one

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`


    let numDiv = size*size;

    for(let i=0;i<numDiv;i++){
      const div = document.createElement('div')
      board.insertAdjacentElement('beforeend', div)
      div.addEventListener("mouseover", colorDiv)
    }

};

const colorDiv = (event) => {
  const div = event.target
  if(click){
    if(color === "random"){
      div.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`
    }
    else {
      div.style.backgroundColor = 'black';
    }
  }
}

const setColor = (colorChoice) => {
  color = colorChoice;
}

const resetBoard = () => {
  let divs = document.querySelectorAll('div');
  divs.forEach((div) => {
    div.style.backgroundColor = 'white';
  })
}

