function getProgramInfo(info) {
	return {
  	name: info[0],
    weight: info[1].substring(1,info[1].length-1)
  }
}

const findBottom = function(input) {
	let lines = input.split('\n')
  let programs = []
  for (i=0; i<lines.length; i++) {
  	let line = lines[i]
		let programInfo = line.split(' ')
    let programNameWeight = getProgramInfo(programInfo)

    // see if program already exists in the list
    let programIndex = _.findIndex(programs, function(x) { return x.name === programNameWeight.name})
    if (programIndex < 0) {
    	programs.push({name: programNameWeight.name, weight: programNameWeight.weight, parent:undefined})
    }
    else {
    	programs[programIndex].weight = programNameWeight.weight
    }
    if (programInfo.length > 2) {
			// program is holding up some other programs
      let parentName = programNameWeight.name
      let children = programInfo.slice(3)
      for (n=0; n<children.length; n++) {
      	let child = children[n].replace(',','')
        // see if child already exists in program list
        let childIndex = _.findIndex(programs, function(x) { return x.name === child})
        if (childIndex < 0) {
         	programs.push({name: child, weight: undefined, parent: parentName})
         }
         else {
         	programs[childIndex].parent = parentName
         }
      }
    }
  }
	let bottomIndex = _.findIndex(programs, function(x) { return x.parent === undefined })
	console.log(programs[bottomIndex])
}
