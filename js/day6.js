// given a tab delimited list of blocks redistribute
// blocks evenly across list until a sequence is seen again
const day61= function(matrix) {
  let dupeSequence = false
  let sequences = []
  let cycles = 0
  let sequence = matrix.split(/\s+/)
  sequence = sequence.map(Number)
  let sequenceLen = sequence.length

  console.log('starting sequence: ' + sequence)
  let sequenceRep = sequence.join(',')
  while (!sequences.includes(sequenceRep)) {
      sequences.push(sequenceRep)
      // reallocate
      let max = _.max(sequence)
      let currentIndex = _.indexOf(sequence, max)
      sequence[currentIndex] = 0
      //console.log('max: ' + max + 'at currentIndex ' + currentIndex)
      while (max > 0) {
        currentIndex = (currentIndex + 1) % sequenceLen
        //console.log('updated current index ' + currentIndex)
        sequence[currentIndex]++
        max--
      }
      sequenceRep = sequence.join(',')
      //console.log('sequence for next cycle: ' + sequenceRep)
      cycles++

  }
  console.log('redistribution in ' + cycles + ' cycles')
}

const day62= function(matrix) {

}
