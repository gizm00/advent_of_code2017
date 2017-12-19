function wheresWaldo(input) {
	let steps = input.split(',')
  let ne = steps.filter(word => word === 'ne')
  let nw = steps.filter(word => word === 'nw')
  let n = steps.filter(word => word === 'n')
  let s = steps.filter(word => word === 's')
  let se = steps.filter(word => word === 'se')
  let sw = steps.filter(word => word === 'sw')

  let neSteps = ne.length
  let nwSteps = nw.length
  let nSteps = n.length
  let sSteps = s.length
  let seSteps = se.length
  let swSteps = sw.length

  // see what steps cancel eachother out
  let neSwSteps = neSteps - swSteps
  let nwSeSteps = nwSteps - seSteps
  let nsSteps = nSteps - sSteps
  if (neSwSteps <= 0) {
  	swSteps = swSteps-neSteps
    neSteps = 0
   }
   if (neSwSteps > 0) {
   	neSteps = neSteps - swSteps
    swSteps = 0
   }
   if (nwSeSteps <= 0) {
  	seSteps = seSteps-nwSteps
    nwSteps = 0
   }
   if (nwSeSteps > 0) {
   	nwSteps = nwSteps - seSteps
    seSteps = 0
   }
   if (nSteps <= 0) {
  	sSteps = sSteps-nSteps
    nSteps = 0
   }
   if (nwSeSteps > 0) {
   	nSteps = nSteps - sSteps
    sSteps = 0
   }

  console.log("NW steps: %s, SW steps: %s, NE steps: %s, SE steps: %s, N steps: %s, S steps: %s", nwSteps, swSteps,neSteps,seSteps,nSteps,sSteps)
}

input = "ne,ne,sw,sw"
let ans = wheresWaldo(input)
