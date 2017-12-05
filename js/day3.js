// hmmmm
const spiralSteps = function(number) {
  if (number == 1) {
    return 0
  }

  let steps = 0
  // determine matrix size
  let n = Math.ceil(Math.sqrt(number))

  // the offset between the computed matrix dimension n
  // and the input number will give us an idea of where number
  // lies in the matrix
  // 9
  let matrixMax = n^2
  // 9 - number
  let offset = matrixMax - number
  // 1
  let center = Math.floor(n/2)

  let maxColOffest = center
  if (offset == 0)
    return number
  if (offset > maxMatrix - n)
    // bottom row

  if (offset == maxMatrix - n )
  else if (number > matrixMax - n) {  // > 9-3 = 6
    let rowOffset = center

  }
  else if (offset <= -n && offset > n*n-2*n )

}
