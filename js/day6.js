// given a tab delimited list of blocks redistribute
// blocks evenly across list until a sequence is seen again
const day61= function(matrix) {
  let dupeSequence = false
  let sequences = []
  let cycles = 0
  let sequence = matrix.split('\t')
  let sequenceLen = sequence.length

  console.log('starting sequence: ' + sequence)
  while (!sequences.includes(sequence.join(' '))) {
    sequences.push(sequence.join(' '))
      // reallocate
      let max = _.max(sequence)
      let currentIndex = _.indexOf(sequence, max)
      sequence[currentIndex] = 0

      while (max > 0) {
        currentIndex = (currentIndex + 1) % sequenceLen
        sequence[currentIndex]++
        max--
      }
      console.log('sequence for next cycle: ' + sequence)
      cycles++

  }
  console.log('redistribution in ' + cycles + ' cycles')
}

const day62= function(matrix) {

}
