const calculate = (input) => {
  // const calculation = new Function('', 'return ' + input + ';');
  const calculation = new Function('', 'return 5/2;');
  console.log(calculation);
  return calculation();
}

export default calculate;
