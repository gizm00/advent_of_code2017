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
	return programs
}

function generation(programs, parent, programsWithGeneration) {
	//let programsWithGeneration = {}//programs.slice()
  //programsWithGeneration.push(parent)
  //console.log('parent: ' + parent.name)
	let children = _.filter(programs, function(x) {return x.parent == parent.name})
  //console.log('children, length: ' + children.length)
  //console.log(_.map(children, 'name'))
	let numChildren = children.length
	if (numChildren === 0) {
  	return programsWithGeneration
  }
	let childGeneration = parseInt(parent.generation) + 1
  //console.log('child generation: ' + childGeneration)
  let i = 0
 	while(i < numChildren) {
      // call back to find children
      //let childIndex = _.findIndex(programsWithGeneration, function(x) { return x.name == children[i].name})
      //console.log('index for child ' + children[i].name + ' ' + childIndex)
      let child = children[i]
     // console.log(child.name + 'calling down to process my children')
      child.generation = childGeneration
      programsWithGeneration.push(child)
      generation(programs, child, programsWithGeneration)
      //console.log('my parent is: ' + parent.name + ' and im at index i=' + i)
      i++
  }

  // check sums of children
  /*let balanced = children.every(function(cur, index, array) {
  	if (index == array.length-1)
    	return cur.weight == array[0].weight
    else
    	return cur.weight == array[index+1].weight
    })
  if (!balanced) {
    console.log('children of ' + parent.name + ' with generation ' + parent.generation + ' are unbalanced')
    console.log(children)
  }*/

	// update the parent with the node total
	let parentIndex = _.findIndex(programsWithGeneration, function(x) { return x.name == parent.name })
	let nodeWeight = _.map(children,'weight').reduce((a,b) => parseInt(a)+parseInt(b)) + parseInt(programsWithGeneration[parentIndex].weight)
	programsWithGeneration[parentIndex].nodeWeight = nodeWeight
	//console.log('weight for node: ' + nodeWeight)
	return programsWithGeneration
}

const findUnbalanced2 = function(input) {
	let programs = findBottom(input)
	let parentIndex = _.findIndex(programs, function(x) { return x.parent === undefined})
	programs[parentIndex].generation = 0
	let parent = programs[parentIndex]
	let acc = []
	acc.push(parent)
	let progGen = generation(programs, parent, acc)
	console.log(progGen)
}

const findUnbalanced = function(input) {
	let programs = findBottom(input)
  // get unique list of parents
  let values = _.map(programs, 'parent')
  let parents = values.reduce((acc, p) => acc.includes(p) ? acc : acc.concat(p), [])
  parents = _.filter(parents, function(x) { return x !== undefined})
  for (i=0; i<parents.length; i++) {
  	let parent = parents[i]
    let parentProgram = _.find(programs, function(x) { return x.name = parent})
  	// find all elements with the given parent an ensure their weights are all equal
    let children = _.filter(programs, function(x) { return x.parent === parent})
    let childrenMatch = children.every( (val, i, arr) => val.weight === arr[0].weight)
    if (!childrenMatch) {
    	//console.log('children of parent ' + parent + ' are mismatched')
      //console.log(children)

      // if the children are mismatched, need to find out what the sum is of any
      // grandchildren for each mismatched child
     let childSums = []
     children.forEach(function(child) {
        let grandChildren = _.filter(programs, function(x) { return x.parent === child.name})
        let grandChildSum = _.map(grandChildren, function(x) { return parseInt(x.weight)}).reduce((acc, x) => acc + x)
        //console.log('sum for ' + child.name + ' ' + grandChildSum)
        //console.log('child weight: ' + grandChildren[0].weight )
        let totalWeight = parseInt(child.weight) + grandChildSum
        childSums.push({parent: child.name, parentWeight: child.weight, childrenWeight: grandChildSum, totalWeight: totalWeight})
        //console.log('sum for parent ' + child.name + ' with children: ' + totalWeight)
      })

      // find out which node in the childSums list has the mismatched weight
      let misfit = undefined
      childSums.forEach(function(sum) {
      	//console.log(sum)
      	let totalRecords = _.filter(childSums, function(x) { return x.totalWeight == sum.totalWeight}).length
        //console.log('total records: ' + totalRecords)
        if (totalRecords == 1) {
        	console.log('found misfit record')
          console.log(sum)
          misfit = sum
          let compWeight = _.find(childSums, function(x) { return x.totalWeight != sum.totalWeight}).totalWeight
          let updatedWeight = (parseInt(compWeight) - parseInt(sum.totalWeight)) + parseInt(sum.parentWeight)
          console.log('change weight to: ' + updatedWeight)
        }
      })

    }
  }
}
