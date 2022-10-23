let app = document.getElementById("container");
let searchInput = document.getElementById("container-serchForm");
let drop = document.getElementById("drop");
let bottomContainer = document.getElementById("bottomContainer");
let res;
let liArr = Array.from(document.querySelectorAll("li"));
let r;
let l = 0;
let open = false;

searchInput.addEventListener("keypress", () => {
  if (l == searchInput.value.length) {
    return;
  }
  l = searchInput.value.length;
  searchDebounce.bind(this)();
});

drop.addEventListener("click", (e) => {
  addBlock(res[e.target.dataset.number]);
  searchInput.value = "";
  drop.classList.toggle("drop__open");
  open = false;
});

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
    drop.classList.toggle("drop__open");
    open = false;
    return;
  }
  const result = await fetch(
    `https://api.github.com/search/repositories?q=${searchInput.value}`
  );
  const result2 = await result.json();
  data = result2;
  addResult(data);
}

function addResult(data) {
  if (open == false) {
    drop.classList.toggle("drop__open");
  }
  for (let i = 0; i < 5; i++) {
    liArr[i].innerHTML = `${data.items[i].name}`;
  }
  open = true;
  res = data.items;
  return res;
}
