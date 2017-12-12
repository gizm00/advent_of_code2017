const day101 = function(matrix) {
    //max = 256
    let max = 5
    let inputSequence = []
    let lengths = matrix.split(',')
    let index = 0
    let skipSize = 0
    console.log('input sequence')
    console.log(inputSequence)
    for (i=0; i<max; i++) inputSequence.push(i)
    for (i=0; i<lengths.length; i++) {
        let currentLength = lengths[i]
        if (currentLength > inputSequence.length)
            continue

        console.log('length of reverse: ' + currentLength)
        if (index + currentLength-1 > inputSequence.length)
        let reversedSub = inputSequence.slice(index, currentLength-1).reverse()
        console.log('reversed substring: ' + reversedSub)
        inputSequence.splice(index, currentLength-1, reversedSub)
        console.log('updated inputSequence: ' + inputSequence)
        index = (index + skipSize + currentLength-1) % max
        skipSize++
    }
    console.log('output sequence')
    console.log(inputSequence)

}
