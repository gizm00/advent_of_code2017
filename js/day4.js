const checkPassphrase = function(pass, anagram=False) {
  let passRows = pass.split('\n')
  let sumGood = 0
  let passArr = undefined
  for (i=0; i<passRows.length; i++) {
    if (anagram) {
      passArr = passRows[i].split(' ').map(function(x) {
      return x.split('').sort().join('')}).sort()
    }
    else {
      passArr = passRows[i].split(' ').sort()
    }
    let uniqueArr = passArr.filter((value, index, array) => {
      return value !== array[index+1]
    })
    if (passArr.length !== uniqueArr.length) {
      //console.log('password must not contain the same string multiple times')
    }
    else {
      console.log('good password!')
      sumGood += 1
    }
  }

  console.log('total good passwords: ' + sumGood)
}
