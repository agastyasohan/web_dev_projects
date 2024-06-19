
// for(let i=1;i<=256;i++){
//     const div = document.createElement("div");
//     div.setAttribute('id',i);
//     div.innerText = i;
//     container.append(div);
// };


document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    createBoard(32);
  });

const createBoard = (size) => {
    const board = document.querySelector('.board');
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`


    let numDiv = size*size;

    for(let i=0;i<numDiv;i++){
      const div = document.createElement('div')
      div.style.backgroundColor = "yellow"
      board.insertAdjacentElement('beforeend', div)
    }
      
  
    
}