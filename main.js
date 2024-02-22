  const API_KEY='b6b9c6844e12441f8bdc9b7565149888'
  // 각 버튼에 클릭 이벤트 리스너 추가
  document.querySelectorAll('.sportBtn').forEach(button => {
    button.addEventListener('click', () => searchByCategory("sports"));
  });
  document.querySelectorAll('.techBtn').forEach(button => {
    button.addEventListener('click', () => searchByCategory("technology"));
  });
  document.querySelectorAll('.generalBtn').forEach(button => {
    button.addEventListener('click', () => searchByCategory("general"));
  });
  document.querySelectorAll('.healthBtn').forEach(button => {
    button.addEventListener('click', () => searchByCategory("health"));
  });
  document.querySelectorAll('.businessBtn').forEach(button => {
    button.addEventListener('click', () => searchByCategory("business"));
  });
  document.querySelectorAll('.entertainmentBtn').forEach(button => {
    button.addEventListener('click', () => searchByCategory("entertainment"));
  });
  document.querySelectorAll('.scienceBtn').forEach(button => {
    button.addEventListener('click', () => searchByCategory("science"));
  });

  document.getElementById("search-input").addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
      searchNews();
    }
  })

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

  const searchByCategory = async (category) => {
    const url = new URL(
      `https://seokwon-times1.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
  };



const emptyBox = () =>{
  document.getElementById("search-input").value = '';
}



  const getLatestNews = async () => {
      const url = new URL(
          `https://seokwon-times1.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
          );
      const response = await fetch(url)
      const data = await response.json()
      console.log('rrr',response)
      newsList = data.articles
      render();
      console.log('nnn',newsList)
      
  }

  const searchNews =async () => {
    const keyword = document.getElementById('search-input').value
    const url = new URL(
      `https://seokwon-times1.netlify.app/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log('rrr',response)
    console.log('ddd',data)
    newsList = data.articles;
    render();
  };












  const render = () => {
    const newsHTML = newsList.map(
      (news) => {
        const timeAgo = moment(news.publishedAt).fromNow();
        const truncatedDescription = (news.description && news.description.length > 200) ?
    `${news.description.slice(0, 200)}...` :
      (news.description || '');  

        return `<div class="row news">
          <div class="col-lg-4">
            <img class="news-img-size" src="${news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${truncatedDescription}</p>
            <div>${news.source.name || "no source"} * ${timeAgo}</div>
          </div>
        </div>`;
      }
    ).join('');
      
    
      
      document.getElementById("news-board").innerHTML = newsHTML
  }
  getLatestNews();    