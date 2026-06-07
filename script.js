let display = document.getElementById("display");
let expression = "";
let resultShown = false;

function update(val){
  display.innerText = val || "0";
}

// Clear
document.getElementById("clear").onclick = () => {
  expression = "";
  update("0");
};

// Numbers
document.querySelectorAll(".num").forEach(btn=>{
  btn.onclick = () => {

    if(resultShown){
      expression = "";
      resultShown = false;
    }

    let value = btn.innerText;

    // prevent multiple leading zeros
    if(value === "0" && expression === "0") return;

    // decimal control
    if(value === "."){
      let parts = expression.split(/[\+\-\*\/]/);
      if(parts[parts.length-1].includes(".")) return;
      if(parts[parts.length-1] === "") expression += "0";
    }

    expression += value;
    update(expression);
  };
});

// Operators
document.querySelectorAll(".op").forEach(btn=>{
  btn.onclick = () => {
    if(expression === "") return;

    resultShown = false;

    let last = expression.slice(-1);

    if("+-*/".includes(last)){
      expression = expression.slice(0,-1);
    }

    expression += btn.innerText;
    update(expression);
  };
});

// Equals
document.getElementById("equals").onclick = () => {
  try{
    let result = eval(expression);
    result = Math.round(result * 100000) / 100000;
    update(result);
    expression = result.toString();
    resultShown = true;
  }catch{
    update("Error");
    expression = "";
  }
};
