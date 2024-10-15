document.addEventListener("DOMContentLoaded", () => {
    const filmsUrl = "http://localhost:3000/films";
    const filmList = document.getElementById("films");
    const poster = document.getElementById("poster");
    const title = document.getElementById("title");
    const runtime = document.getElementById("runtime");
    const filmInfo = document.getElementById("film-info");
    const showtime = document.getElementById("showtime");
    const ticketNum = document.getElementById("ticket-num");
    const buyTicketBtn = document.getElementById("buy-ticket");
  
    let selectedFilm;
  
    
    fetch(filmsUrl)
      .then(response => response.json())
      .then(films => {
        films.forEach(film => {
          const li = document.createElement("li");
          li.className = "film item";
          li.textContent = film.title;
          li.addEventListener("click", () => displayFilmDetails(film));
          const del= document.createElement('button')
          del.textContent = "Delete"
          li.appendChild(del)
          filmList.appendChild(li);
        });
  
       
        if (films.length > 0) {
          displayFilmDetails(films[0]);
        }
      });
  
    function displayFilmDetails(film) {
      selectedFilm = film;
      poster.src = film.poster;
      poster.alt = film.title;
      title.textContent = film.title;
      runtime.textContent = `${film.runtime} minutes`;
      filmInfo.textContent = film.description;
      showtime.textContent = film.showtime;
      ticketNum.textContent = film.capacity - film.tickets_sold;
    }
  
    buyTicketBtn.addEventListener("click", () => {
      if (selectedFilm.tickets_sold < selectedFilm.capacity) {
        selectedFilm.tickets_sold++;
        ticketNum.textContent = selectedFilm.capacity - selectedFilm.tickets_sold;
  
        fetch(`${filmsUrl}/${selectedFilm.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            tickets_sold: selectedFilm.tickets_sold
          })
        });
      } else {
        alert("Sorry, this movie is sold out!");
      }
    });
  });
