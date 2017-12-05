const listMaze = function(inputString) {
  let list = inputString.split('\n')
  let currentLocation = 0
  let offset = 0
  let steps = 0
  while (currentLocation < list.length) {
    offset = parseInt(list[currentLocation])
    list[currentLocation]++
    currentLocation
    steps++
  }
  console.log("escaped maze in " + steps + " steps")
}

const listMazeOffset = function(inputString) {
  let list = inputString.split('\n')
  let currentLocation = 0
  let offset = 0
  let steps = 0
  while (currentLocation < list.length  &&  steps < 15) {
    console.log(list)
    offset = parseInt(list[currentLocation])
    list[currentLocation] = parseInt(list[currentLocation]) >= 3 ? list[currentLocation]-- : list[currentLocation]++
    currentLocation += offset
    console.log('currentLocation: ' + currentLocation)
    steps++
  }
  console.log("escaped maze in " + steps + " steps")
}
