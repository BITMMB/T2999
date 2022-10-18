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
    this.backClose = this.createElement("div", "backclose");
    this.bottomContainer = this.createElement("div", "bottomContainer");
    this.res;
    this.r;

    this.app.append(this.searchInput);
    this.app.append(this.drop);
    this.drop.append(this.li1);
    this.li1.dataset.number = 0;
    this.drop.append(this.li2);
    this.li2.dataset.number = 1;
    this.drop.append(this.li3);
    this.li3.dataset.number = 2;
    this.drop.append(this.li4);
    this.li4.dataset.number = 3;
    this.drop.append(this.li5);
    this.li5.dataset.number = 4;
    this.app.append(this.backClose);
    this.app.append(this.bottomContainer);

    this.searchInput.addEventListener("keyup", this.searchDebounce.bind(this));

    this.drop.addEventListener("click", (e) => {
      this.addBlock(this.res[e.target.dataset.number]);
      this.searchInput.value = "";
      this.close();
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
    this.block = this.createElement("div", "block");
    this.button = this.createElement("button", "button");
    this.text = this.createElement("div", "block-text");
    this.bottomContainer.append(this.block);
    this.block.append(this.text);
    this.text.innerHTML = `
      Name: ${data.name} <br>
      Owner: ${data.owner.login} <br>
      Stars: ${data.stargazers_count}
      `;
    this.block.append(this.button);
    this.button.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
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

//закрывать дроп
//кнопка закрытия
//макс блоков?
//стили
//подправить дебаунс
