// expect a string of numbers
// produce a sum of all digits that match the offset digit in the string
// the end of the string loops around to the beginning
const parseSequence = function(sequence, offset) {
  let sum = 0
  for (let i=0; i<sequence.length; i++) {
    let index = i + offset
    if ((index) >= sequence.length)
      index = (i+offset) - sequence.length
    if (sequence[i] == sequence[index]) {
      sum += parseInt(sequence[i])
    }
  }
  console.log('output sum: ' + sum)
}
