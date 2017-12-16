//advent of code day 8 - part 1 2017

const parseInstructions = function(input) {
	let commands = input.split('\n')
  //console.log(commands.length)
  let registers = []
	let highest = 0
  for (i=0; i<commands.length; i++) {
  	let command = commands[i]
		//console.log('current command:' + command)
    let [targetReg, cmd, value, ifstmt, compReg, comparator, comparisonVal] = command.split(' ')
    let targetRegIndex = _.findIndex(registers, function(x) { return x.name === targetReg})
    let compRegIndex = _.findIndex(registers, function(x) { return x.name === compReg})
    let targetRegValue = undefined
    let compRegValue = undefined
    // if registers are not yet in the register list, add with initial value of 0
    if (targetRegIndex < 0) {
      targetRegIndex = registers.length
    	registers.push({name: targetReg, value:0})
      targetRegValue = 0
    } else {
    	targetRegValue = registers[targetRegIndex].value
    }
    if (compRegIndex < 0) {
      compRegIndex = registers.length
    	registers.push({name: compReg, value:0})
      compRegValue = 0
    } else {
    	compRegValue = registers[compRegIndex].value
    }

    //console.log('targetReg: ' + targetReg + ' value: ' + targetRegValue)
    //console.log('compReg:' + compReg + ' value: ' + compRegValue)

    // first, test the comparison. if comparison is false move on to the next command
   	let compResult = false
   	switch (comparator) {
    	case '>':
      	if (compRegValue > comparisonVal)
        	compResult = true
        break;
    	case '>=':
      	if (compRegValue >= comparisonVal)
        	compResult = true
        break;
      case '<':
      	if (compRegValue < comparisonVal)
        	compResult = true
        break;
      case '<=':
      	if (compRegValue <= comparisonVal)
        	compResult = true
        break;
      case '==':
      	if (compRegValue == comparisonVal)
        	compResult = true
        break;
      case '!=':
      	if (compRegValue != comparisonVal)
        	compResult = true
        break;
    }

    if (!compResult) continue;

    // if the comparison is true, perform the operation
    let result = undefined
    switch (cmd) {
    	case 'inc':
      	result = targetRegValue + parseInt(value)
        break;
      case 'dec':
      	result = targetRegValue - parseInt(value)
      	break;
    }

    // update the target register with the new value
    registers[targetRegIndex].value = result
    //console.log('for ' + command + " result is: " + result)

		if (result > highest)
			highest = result
  }

	let maximum = _.map(registers, function(x) { return parseInt(x.value)}).reduce(function(a,b) { return Math.max(a,b)})
	console.log(registers)
	console.log('final max value of registers: ' + maximum)
	console.log('highest value held in a register during execution: ' + highest)
}
