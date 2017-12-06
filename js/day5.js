const listMaze = function(inputString) {
  let list = inputString.split('\n')
  let currentLocation = 0
  let offset = 0
  let steps = 0
  while (currentLocation < list.length) {
    offset = parseInt(list[currentLocation])
    list[currentLocation]++
    currentLocation += offset
    steps++
  }
  console.log("escaped maze in " + steps + " steps")
}

const listMazeOffset = function(inputString) {
  let list = inputString.split('\n')
  let currentLocation = 0
  let offset = 0
  let steps = 0
  while (currentLocation < list.length) {
    offset = parseInt(list[currentLocation])
    if (offset >= 3)
      list[currentLocation]--
    else
      list[currentLocation]++
    currentLocation += offset
    steps++
  }
  console.log("escaped maze in " + steps + " steps")

}
