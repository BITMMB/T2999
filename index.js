class Search {
  constructor() {
    this.app = document.getElementById("app");
    this.searchInput = this.createElement("input", "container-serchForm");
    this.drop = this.createElement("ul", "drop");
    this.li1 = this.createElement("li", "drop-item");
    this.li2 = this.createElement("li", "drop-item");
    this.li3 = this.createElement("li", "drop-item");
    this.li4 = this.createElement("li", "drop-item");
    this.li5 = this.createElement("li", "drop-item");
    this.res;
    this.r;

    this.app.append(this.searchInput);
    this.app.append(this.drop);
    this.drop.append(this.li1);
    this.drop.append(this.li2);
    this.drop.append(this.li3);
    this.drop.append(this.li4);
    this.drop.append(this.li5);

    // this.searchInput.addEventListener("click", this.open.bind(this));
    this.searchInput.addEventListener("keyup", this.searchDebounce.bind(this));
    this.drop.addEventListener("click", (e) => {
      this.addBlock(this.res[0]);
      console.log(e.target);
    });
  }
  open() {
    this.drop.classList.remove("drop");
    this.drop.classList.add("drop__open");
  }

  close() {
    this.drop.classList.add("drop");
    this.drop.classList.remove("drop__open");
  }
  addBlock(data) {
    console.log(data);
    this.block = this.createElement("div", "block");
    this.button = this.createElement("button", "button");
    this.app.append(this.block);
    this.block.append(this.button);
    this.block.innerHTML = `
      Name: ${data.name} 
      Owner: ${data.owner.login} 
      Stars: ${data.stargazers_count}
      `;
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }

  searchDebounce() {
    function w() {
      clearTimeout(this.r);
      this.r = setTimeout(() => {
        this.searchRep.apply(this);
      }, 1000);
    }
    w.apply(this);
  }

  async searchRep() {
    if (this.searchInput.value.length === 0) {
      this.close();
      return;
    }
    return await fetch(
      `https://api.github.com/search/repositories?q=${this.searchInput.value}`
    ).then((result) => {
      if (result.ok) {
        result.json().then((res) => {
          this.open.bind(this)();
          this.li1.innerHTML = `${res.items[0].name}`;
          this.li2.innerHTML = `${res.items[1].name}`;
          this.li3.innerHTML = `${res.items[2].name}`;
          this.li4.innerHTML = `${res.items[3].name}`;
          this.li5.innerHTML = `${res.items[4].name}`;
          this.res = res.items;
        });
      } else {
        throw new Error("fuck off");
      }
    });
  }
}

new Search();
//отлавливать клик/ дата?
//очиска дропа при пустом поле
//закрывать дроп
//кнопка закрытия
//макс блоков?
//стили
//подправить дебаунс
