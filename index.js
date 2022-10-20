let app = document.getElementById("container");
let searchInput = document.getElementById("container-serchForm");
let drop = document.getElementById("drop");
let li1 = document.getElementById("drop-item0");
let li2 = document.getElementById("drop-item1");
let li3 = document.getElementById("drop-item2");
let li4 = document.getElementById("drop-item3");
let li5 = document.getElementById("drop-item4");
let backClose = document.getElementById("backclose");
let bottomContainer = document.getElementById("bottomContainer");
let res;
let r;

searchInput.addEventListener("keyup", searchDebounce.bind(this));

drop.addEventListener("click", (e) => {
  addBlock(res[e.target.dataset.number]);
  searchInput.value = "";
  close();
});

function open() {
  drop.classList.remove("drop");
  drop.classList.add("drop__open");
}
function close() {
  drop.classList.add("drop");
  drop.classList.remove("drop__open");
}

function addBlock(data) {
  let block = document.createElement("div");
  block.classList.add("block");
  let button = document.createElement("button");
  button.classList.add("button");
  let text = document.createElement("div", "block-text");
  text.classList.add("block-text");
  bottomContainer.append(block);
  block.append(text);
  text.innerHTML = `
      Name: ${data.name} <br>
      Owner: ${data.owner.login} <br>
      Stars: ${data.stargazers_count}
      `;
  block.append(button);
  button.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });
}
function searchDebounce() {
  function w() {
    clearTimeout(r);
    r = setTimeout(() => {
      searchRep.apply(this);
    }, 1000);
  }
  w.apply(this);
}
async function searchRep() {
  if (searchInput.value.length === 0) {
    close();
    return;
  }
  return await fetch(
    `https://api.github.com/search/repositories?q=${searchInput.value}`
  ).then((result) => {
    try {
      if (result.ok) {
        result.json().then((data) => {
          open.bind(this)();
          li1.innerHTML = `${data.items[0].name}`;
          li2.innerHTML = `${data.items[1].name}`;
          li3.innerHTML = `${data.items[2].name}`;
          li4.innerHTML = `${data.items[3].name}`;
          li5.innerHTML = `${data.items[4].name}`;
          res = data.items;

          return res;
        });
      }
    } catch {
      throw new Error("Git Error");
    }
  });
}
