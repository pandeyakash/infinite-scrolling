//Selected the container in which the images will be appended on scroll
const container = document.querySelector(".container");

//This variable represents the current page number used in the url as query parameter
let page = 1;

//Used a flag variable for not making unnecessary fetch call until the data is fully loaded
let flag = false;

//Called getData function to get 1st page data.
getData(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=8`);

//Added event listener on window object for scroll. And will call the get data function when the scroll bar reaches its end.
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

//Async funtion for fetching the data and calling dislayData() function for appending data to the container
async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayData(data);
  } catch (error) {
    console.log(error);
  }
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
