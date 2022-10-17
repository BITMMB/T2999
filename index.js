class Search {
  constructor() {
    this.app = document.getElementById('app')
    this.searchInput = this.createElement('input', 'container-serchForm')
    this.app.append(this.searchInput)

    this.searchInput.addEventListener('keyup', this.searchDebounce.bind(this))
  }
  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag)
    if (elementClass) {
      element.classList.add(elementClass)
    }
    return element
  }
  searchDebounce() {
    let t
    g.apply(this)
    function g() {
      clearTimeout(t)
      t = setTimeout(() => {
        // this.searchRep.bind(this)
        console.log(this)
      }, 1000)
    }
  }

  async searchRep() {
    return await fetch(
      `https://api.github.com/search/repositories?q=${this.searchInput.value}`
    ).then((result) => {
      if (result.ok) {
        console.log(result)
      } else {
        throw new Error('fuck off')
      }
    })
  }
}

new Search()
