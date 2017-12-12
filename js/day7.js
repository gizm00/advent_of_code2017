const getWeight = function(weightStr) {
  return weightStr.trim().substring(1,weightStr.trim().length-1)
}
const day71 = function(matrix) {
  let lines = matrix.split('\n')
  let tower = []

  // sort lines by length, processing the elements without children first
  lines = lines.sort(function(a,b) {return a.length - b.length})
  lines.forEach ((line) => {
    let values = line.split(/\s+/)
    if (values.length > 2) {
      let elementName = values[0].trim()
      console.log('identified parent element: ' + elementName)
      // then the entry is a parent w/ comma separated list of children
      // first, see if we already have the parent from an earlier entry
      let element = tower.find(x => x.name === elementName)
      if (element !== undefined) {
        // update element and all children
        console.log('already have an entry for ' + elementName)
        console.log(tower)
      }
      else {
        element = {
          name: elementName,
          weight: getWeight(values[1]),
          generation: 1,
          parent: undefined
        }

      }

      let children = values[3].split(',')

      // find the children in the list and assign the parent
      for (i=0; i< children.length; i++ ) {
        let child = children[i]
        childElementIndex = tower.findIndex(x => x.name === child.trim())
        if (childElementIndex > 0) {
          if (tower[childElementIndex].parent !== undefined) {
            console.log('child already has a parent')
            console.log(childElement)
          }
          else {
            tower[childElementIndex].parent = elementName
          }

          if (tower[childElementIndex].generation !== 0) {
            // the child element also has children, need to update the generation
            // of both this child and its children
            console.log('child ' + tower[childElementIndex].name + ' has children')
            element.generation = tower[childElementIndex].generation + 1
          }
        }
      }
      tower.push(element)
      // try to find the children in the existing list
    }
    else {
      tower.push({
        name: values[0].trim(),
        weight: getWeight(values[1]),
        generation: 0,
        parent: undefined
      })
    }
  })
  console.log(tower)
}
