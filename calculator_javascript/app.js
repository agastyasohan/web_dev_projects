

let ans = false;
function solve(val) {
    const input = document.querySelector('input');
    if(ans){
        Clear();
        ans= false;
        }
    input.value += val;
    
};

function Clear(){
    const input = document.querySelector('input');
    input.value = '';
    
}

function Result(){ 
    const input = document.querySelector('input');
    const num = eval(input.value);
    input.value=num;
    ans = true;
}


