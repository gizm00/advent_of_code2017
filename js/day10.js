function convertToAscii(inputSeq) {
	let ascii = []
  for(i=0; i<inputSeq.length; i++) {
  	ascii.push(inputSeq[i].charCodeAt(0))
  }
  console.log('ascii list')
  ascii = ascii.concat([17, 31, 73, 47, 23])
  console.log(ascii)
  return ascii
}

function calculateDenseHash(list) {
	// expect list to have 256 items
  let denseHashes = []
  for (i=0; i<list.length;i=i+16) {
  	let sub = list.slice(i,i+16)
    console.log('sub list for dense hash')
    console.log(sub)
    let hash = sub.reduce(function(acc,b) { return acc ^ b})
    console.log(hash)
  	denseHashes.push(hash)
  }
  return denseHashes
}

function convertToHex(hashes) {
	let hexVal = ''
  hashes.forEach(function(hash) {
  	hexVal = hexVal + hash.toString(16)
  })
  return hexVal
}

function circularReverse(list, index, length, skipSize) {
	//console.log('reversing list starting at ' + index + ' for length ' + length + ' at skip size ' + skipSize)
  if (index + length < list.length) {
  	//console.log('simple reverse')
  	// nothing exciting here, just take the substring and reverse
    let sub = list.slice(index,index+length)
    //console.log('to reverse: ')
    //console.log(sub)
    sub = sub.reverse()
    //console.log('reversed ' )
    //console.log(sub)
    list.splice(index, length, ...sub)
    //console.log('spliced list')
    //console.log(list)
  }
  else {
  	// need to wrap selection/reverse around end of list
    // first, capture elements at the end of the list
    //console.log('wrap around reverse')
    let subEnd = list.slice(index, list.length)
    let covered = list.length - index
    let subStart = list.slice(0, length-covered)
    //console.log('first reverse: ' )
    //console.log(subEnd)
    //console.log('second reverse: ')
    //console.log(subStart)
    let sub = subEnd.concat(...subStart)
    //console.log('to reverse: ' )
    //console.log(sub)
    sub = sub.reverse()
    //console.log('reversed: ')
    //console.log(sub)
    list.splice(index, list.length, ...sub.slice(0,covered))
    //console.log('list after splicing in first part: ')
    //console.log(list)
    //console.log('covered ' + covered)
    list.splice(0, length-covered, ...sub.slice(covered))
    //console.log('list after splicing in second part: ' )
    //console.log(list)
  }
	return list
}

function twistyTime(input, rangeMax, numRounds) {
	let array = []
  let currentIndex = 0
  let skipSize = 0
  for (i=0;i<=rangeMax;i++) array.push(i)
  console.log('array length ' + array.length)

  for (i=0; i<numRounds; i++) {
    input.forEach( (length) => {
      array = circularReverse(array, currentIndex, length, skipSize)
      if (i < 0) {
        currentIndex = (currentIndex + length + skipSize) > array.length ? (currentIndex + length + skipSize)- array.length : (currentIndex + length + skipSize)
        skipSize++
      }
    })
  }

  console.log(array)
  let firstProd = array[0] * array[1]
  console.log('product of first 2: ' + firstProd)
  return array
 }

//let lengths = [70,66,255,2,48,0,54,48,80,141,244,254,160,108,1,41]
let lengths = convertToAscii("1,2,3")
console.log('lengths')
console.log(lengths)
let twisted = twistyTime(lengths, 255, 64)
let denseHash = calculateDenseHash(twisted)
console.log(denseHash)
let hexVal = convertToHex(denseHash)
console.log(hexVal)
