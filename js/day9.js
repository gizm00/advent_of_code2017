
const findGroups = function(input) {
	let groupStarted = false
  let groupClosed = false
  let garbageStarted = false
  let garbageClosed = false
  let ignoreNext = false
  let groupScore = []
  let countOpenGroups = 0
	let countGarbageChar = 0
  const isGroupOpen = value => value === '{' ? true : false
  const isGroupClose = value => value === '}' ? true : false
  const isGarbageOpen = value => value === '<' ? true : false
  const isGarbageClose = value => value === '>' ? true : false
  const isIgnore = value => value === '!' ? true : false
	for(i=0; i<input.length; i++) {
  	let char = input[i]
  	// discern what the current character is
    let openGroup = isGroupOpen(char)
    let closeGroup = isGroupClose(char)
    let openGarbage = isGarbageOpen(char)
    let closeGarbage = isGarbageClose(char)
    let ignore = isIgnore(char)
    let lastGroupScore = groupScore[groupScore.length-1] || 0
    let state = 'current char: ' + char + ' latestGroupScore: ' + lastGroupScore
    if (openGroup) state = state + ' openGroup'
    if (closeGroup) state = state + ' closeGroup'
    if (openGarbage) state = state + ' openGarbage'
    if (closeGarbage) state = state + ' closeGarbage'
    //console.log(state)

    // figure out what this means in the context of our current
    // state
    if (ignoreNext) {
     // doesnt matter what this character is.
     // reset ignoreNext, skip to next character
     ignoreNext = false
     continue
    }
    if (ignore) {
    	// set ignoreNext to true
      ignoreNext = true
      continue
    }

    // now that ignore is taken care of...
    // garbage should be next, because it dgaf about the chars inside (including {})
    // unless it is close garbage
    if (garbageStarted && closeGarbage) { garbageStarted = false; continue}
		if (garbageStarted && (openGarbage || openGroup || closeGroup)) continue

		// if we are not in garbage...
      // if a group is started:
      // { - open another group
      // } - close group, add to group list
      // < - start garbage
      // > - ignore
    if (groupStarted && openGroup) { countOpenGroups++; continue }
    if (groupStarted && closeGroup) { groupScore.push(countOpenGroups); countOpenGroups--; groupStarted=countOpenGroups > 0 ? true: false; continue;}
    if (groupStarted && openGarbage) { garbageStarted = true; continue;}
    if (groupStarted && closeGarbage) {continue;}

    // if we are here, neither group nor garbage has been started
    if (openGroup && !groupStarted) { countOpenGroups++; groupStarted=true}
    if (openGarbage && !garbageStarted) garbageStarted=true
  }

	const add = (a,b) => a+b
	//console.log(groupScore)
	if (groupScore.length != 0) {
		let sum = groupScore.reduce(add)
		console.log(sum)
	  }
}
