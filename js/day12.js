function findConnections(phonebook, initId, connections) {
	let chattyCathies = connections
  if (phonebook.length === 0) {
  	return chattyCathies
  }
  else {
  	console.log('finding entries for id %s', initId)
    console.log(chattyCathies)
  	let chunk = phonebook.filter((entry) => ((entry.from === initId) || (entry.to === initId)))

    // to avoid double counting, filter out any from/to entries that we have already processed
    chunk = chunk.filter((entry) => !chattyCathies.includes(entry.from) && !chattyCathies.includes(entry.to))
    console.log(chunk)
    let remainder = phonebook.filter((entry) => (entry.from !== initId) && (entry.to !== initId))
    console.log('remainder')
    console.log(remainder)

    // with the chunk of the phonebook, extract the id(s) that talk to the input id
    console.log('chunk length:%s', chunk.length)
    if (chunk.length > 0) {
      chattyIds = Array.from(new Set(chunk.map((entry) => Object.values(entry)).reduce((a,b) => a.concat(b))))
      chattyIds = chattyIds.filter((x) => !chattyCathies.includes(x))
      console.log('found %s chatty ids:',chattyIds.length)
      console.log(chattyIds)
      chattyIds.forEach((id) => {
        findConnections(remainder, id, chattyCathies.concat(initId))
      })
    }
    else {
    	return chattyCathies
    }
  }
  return chattyCathies
}

function pipes(input, id) {
	let pipelines = input.split('\n')
  let traversed = 0
  let chattyCathies = 0
  let phonebook = []
  // find out who can talk to program id
  // decompose the input into a dictionary of who talks to who
  pipelines.forEach((pipet) => {
  	let [leftProg, rightProg] = pipet.split('<->')
    let progs = rightProg.trim().split(', ')
    progs.forEach((prog) => {
    	phonebook.push({from: prog.trim(), to:leftProg.trim()})
    })
  })
  console.log(phonebook)
  chattyCathies = findConnections(phonebook, id, [])
  console.log('found connections:')
  console.log(chattyCathies)
  return chattyCathies

}

input = "0 <-> 2\n\
1 <-> 1\n\
2 <-> 0, 3, 4\n\
3 <-> 2, 4\n\
4 <-> 2, 3, 6\n\
5 <-> 6\n\
6 <-> 4, 5"

pipes(input, "0")
