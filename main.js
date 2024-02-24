const API_KEY = "b6b9c6844e12441f8bdc9b756514988";

document.querySelectorAll(".sportBtn").forEach((button) => {
  button.addEventListener("click", () => searchByCategory("sports"));
});
document.querySelectorAll(".techBtn").forEach((button) => {
  button.addEventListener("click", () => searchByCategory("technology"));
});
document.querySelectorAll(".generalBtn").forEach((button) => {
  button.addEventListener("click", () => searchByCategory("general"));
});
document.querySelectorAll(".healthBtn").forEach((button) => {
  button.addEventListener("click", () => searchByCategory("health"));
});
document.querySelectorAll(".businessBtn").forEach((button) => {
  button.addEventListener("click", () => searchByCategory("business"));
});
document.querySelectorAll(".entertainmentBtn").forEach((button) => {
  button.addEventListener("click", () => searchByCategory("entertainment"));
});
document.querySelectorAll(".scienceBtn").forEach((button) => {
  button.addEventListener("click", () => searchByCategory("science"));
});
// pageSize 정
// page 현재 몇페 정?
// totalResults 정해져나옴
// pageGroup 정
// totalPage 정해져 나온걸 계산
// 첫페막페
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchNews();
    }
  });
let url = new URL(
  `https://seokwon-times1.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
);

const getNews = async () => {
  try {
    url.searchParams.set("page", page); // &page=page
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    console.log("r", response);
    console.log("d", data);
    totalResults = data.totalResults;
    if (response.status === 200) {
      if (totalResults === 0) {
        throw new Error("No matches for your search");
      }
      newsList = data.articles;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error);
  }
};

const searchByCategory = async (category) => {
  url = new URL(
    `https://seokwon-times1.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  page = 1;
  getNews();
};

const getLatestNews = async () => {
  url = new URL(
    `https://seokwon-times1.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  );
  getNews();
};

const searchNews = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://seokwon-times1.netlify.app/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const emptyBox = () => {
  document.getElementById("search-input").value = "";
};

const render = () => {
  const newsHTML = newsList
    .map((news) => {
      const timeAgo = moment(news.publishedAt).fromNow();
      const truncatedDescription =
        news.description && news.description.length > 200
          ? `${news.description.slice(0, 200)}...`
          : news.description || "";

      return `<div class="row news">
          <div class="col-lg-4">
            <img class="news-img-size" src="${
              news.urlToImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
            }" />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${truncatedDescription}</p>
            <div>${news.source.name || "no source"} * ${timeAgo}</div>
          </div>
        </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (error) => {
  document.getElementById(
    "news-board"
  ).innerHTML = `<div class="alert alert-danger" role="alert">
  ${error.message}
</div>`;
};

const paginationRender = () => {
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  let totalPages = Math.ceil(totalResults / pageSize);
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  let firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
  let paginationHtml =
    pageGroup == 1
      ? ""
      : ` <li class="page-item" title="Go to First Page">
  <a class="page-link" onclick="moveToPage(${1})" href="#" aria-label="First">
    <span aria-hidden="true">&laquo;</span>
  </a>
</li>
<li class="page-item" onclick="moveToPage(${page - 1})">
<a class="page-link" href="#"><span aria-hidden="true">&lsaquo;</span></a>
</li>`;
  for (
    let i = lastPage / 5 != 0 && lastPage > 5 ? lastPage - 4 : firstPage;
    i <= lastPage;
    i++
  ) {
    paginationHtml += `<li class="page-item ${
      i === page ? "active" : ""
    }"onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  paginationHtml +=
    pageGroup == Math.ceil(totalPages / groupSize)
      ? ""
      : `<li class="page-item" onclick="moveToPage(${
          page + 1
        })"><a class="page-link" href="#"><span aria-hidden="true">&rsaquo;</span></a></li>
  <li class="page-item"  title="Go to Last Page">
  <a class="page-link" onclick="moveToPage(${totalPages})" href="#" aria-label="Last">
    <span aria-hidden="true">&raquo;</span>
  </a>
</li>`;
  document.querySelector(".pagination").innerHTML = paginationHtml;
  //   <nav aria-label="Page navigation example">
  //   <ul class="pagination">
  //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //     <li class="page-item"><a class="page-link" href="#">1</a></li>
  //     <li class="page-item"><a class="page-link" href="#">2</a></li>
  //     <li class="page-item"><a class="page-link" href="#">3</a></li>
  //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
  //   </ul>
  // </nav>
};
const moveToPage = (pageNum) => {
  console.log(pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();
