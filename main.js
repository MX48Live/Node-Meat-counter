const fetchData = async () => {
  try {
    const resp = await fetch(`https://baconipsum.com/api/?type=meat-and-filler&paras=99&format=text`)
    const data = await resp.text()
    return data
  } catch (error) {
    console.log("Error: ", error)
  }
}

fetchData().then((data) => {
  const removeExtraWhiteSpace = data.replace(/  +/g, ' ')
  const removeTailCharactor = removeExtraWhiteSpace.replace(/[\.,"]/g, "")
  const dataArray = removeTailCharactor.split(' ')

  let counting = {}
  for (let i = 0; i < dataArray.length; i++) {
    let currentWord = counting[dataArray[i]]
    let count = currentWord ? currentWord: 0
    counting[dataArray[i]] = count + 1
  }
  let result = []
  for (let key in counting) {
    if (counting[key] === 31) {
      result.push(key)
    }
  }
  console.log(result)
  document.querySelector('#app').innerHTML = `<p><pre><strong>Result is:</strong> ${result.join(', ')}</pre></p>`
})





