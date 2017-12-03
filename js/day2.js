// expect a tab delimited matrix of numbers
// to compute the checksum:
// 1. find the difference between the largest and smallest values in each row
// 2. compute the sum of this difference across all rows
const computeChecksumDiff = function(matrix) {
  let lines = matrix.split('\n');
  let checksum = 0
  for (let i=0; i<lines.length; i++) {
    let diff = 0
    let sortedArray = lines[i].split('\t').sort(function(a, b){return a-b})
    diff = sortedArray[sortedArray.length-1] - sortedArray[0]
    checksum += diff
  }

  console.log('output checksum: ' + checksum)
}

// expect a tab delimited matrix of numbers
// each row will have 2 entries where one evenly divides the other
// to compute the checksum:
// 1. find the difference between the 2 entries that are evenly divisible
// 2. compute the sum of this difference across all rows
const computeChecksumDiv = function(matrix) {
  let lines = matrix.split('\n');
  let checksum = 0
  for (let i=0; i<lines.length; i++) {
    let sequence = lines[i].split('\t').sort(function(a, b){return b-a})
    for (let i=0; i<sequence.length; i++) {
      for (let n=0; n<sequence.length; n++) {
        if (((sequence[i] % sequence[n]) == 0) && (sequence[i] != sequence[n])) {
          checksum += sequence[i] / sequence[n]
        }
      }
    }
  }
  console.log('output checksum: ' + checksum)
}
const computeChecksumDivNoLoop = function(matrix) {
  let lines = matrix.split('\n');
  let checksum = 0
  let foundElem = 0
  for (let i=0; i<lines.length; i++) {
    let sequence = lines[i].split('\t')
    for (let i=0; i<sequence.length; i++) {
      foundElem = sequence.find ((element) => {
        return (parseInt(element) % parseInt(sequence[i]) == 0) && element != sequence[i]
      }) || 0
      checksum += parseInt(foundElem)/sequence[i]
    }
  }
  console.log('output checksum: ' + checksum)
}
