const container = document.querySelector(".container");

let page = 1;
let flag = false;

getData(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=8`);

window.addEventListener("scroll", () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  console.log(scrollTop, clientHeight, scrollHeight);

  if (Math.ceil(scrollHeight - clientHeight) <= Math.ceil(scrollTop)) {
    page++;
    getData(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=8`
    );
    flag = false;
  }
});

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayData(data);
}

function displayData(data) {
  data.forEach((ele) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = ele.url;

    const title = document.createElement("h3");
    title.textContent = ele.title;

    card.append(image, title);

    container.append(card);
  });
  flag = true;
}
