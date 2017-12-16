const day101 = function(matrix) {
    //max = 256
    let max = 256
    let inputSequence = []
    let lengths = matrix.split(',').map(Number)
    let index = 0
    let skipSize = 0
    for (i=0; i<max; i++) inputSequence.push(i)
    inputSequence = inputSequence.map(Number)
    console.log(inputSequence)

    for (i=0; i<lengths.length; i++) {
        let currentLength = lengths[i]
        if (currentLength > inputSequence.length) {
          //  console.log('current length ' + currentLength + ' greater than sequence length')
            continue
          }
        if (currentLength <= 1) {
          //console.log('current length is zero or one, no change')
          index = (index + skipSize + currentLength) % max
          skipSize++
          //console.log('new index ' + index + ' new skip size: ' + skipSize)
          continue
        }

        let reversedSub = []
        let maxI = index + currentLength
        if (maxI >= inputSequence.length) {
          //console.log('length wraps around list')
          //console.log('current index: ' + index)
          //console.log('current length: ' + currentLength)
          for (n=index; n<max; n++){
            reversedSub.push(inputSequence[n])
          }
          //console.log('first part of sequence: ' + reversedSub)
          // overlap end of list
          for(n=0; n<(index + currentLength - max); n++){
          //  console.log('adding index ' + n )
            reversedSub.push(inputSequence[n])
          }
          //console.log('second part of sequence: ' + reversedSub)
          reversedSub = reversedSub.reverse()
          //console.log('reversed substring' + reversedSub)
          //console.log('reversed slice: ' + reversedSub.slice(0,max-index))
          inputSequence.splice(index, max-index+1, ...reversedSub.slice(0,max-index))
          //console.log('spliced in end of sequence ' + inputSequence)
          inputSequence.splice(0, (index + currentLength - max),
            ...reversedSub.slice(max-index))

          //console.log('updated inputsequence: ' + inputSequence)
        }
        else {
          if (currentLength-index > 0) {
            reversedSub = inputSequence.slice(index, currentLength).reverse()
            inputSequence.splice(index, currentLength, ...reversedSub)
          }
          else {
            reversedSub = inputSequence[index]
            inputSequence.splice(index, currentLength, reversedSub)
          }
          //console.log('reversed substring: ' + reversedSub)

        }

        //console.log('updated inputSequence: ' + inputSequence)
        index = (index + skipSize + currentLength) % max
        skipSize++
        //console.log('new index ' + index + ' new skip size: ' + skipSize)
    }
    console.log('output sequence')
    console.log(inputSequence)

}
