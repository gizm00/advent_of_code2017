// given a tab delimited list of blocks redistribute
// blocks evenly across list until a sequence is seen again
const day61= function(matrix) {
  let dupeSequence = false
  let sequences = []
  let cycles = 0
  let sequence = matrix.split('\t')
  let sequenceLen = sequence.length
  console.log('starting sequence: ' + sequence)
  while (!dupeSequence) {
    cycles++
    sequences.push(sequence.join(' '))
    //console.log('updated sequences list: ' + sequences)
    //console.log(_.uniq(sequences))
    if (_.uniq(sequences).length !== cycles) {
      console.log('redistribution done in: ' + cycles + " cycles")
      dupeSequence = true
    }
    let max = _.max(sequence)
    let index = _.indexOf(sequence, max)
    sequence[index] = 0
    index++
    while (max > 0) {
      if (index >= sequenceLen)
        index = 0

      sequence[index]++
      index++
      max--
    }
    //console.log('new sequence: ' + sequence)
  }

}

const day62= function(matrix) {

}
