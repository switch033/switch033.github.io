let genre = "adventure";

const movieRecommendations = [];
const url = `https://moviesverse1.p.rapidapi.com/movies/genre/${genre}/1`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '5a4d115286msh9b7fa056b99eb71p11ef47jsn4d7875d88124',
    'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
  }
};
                                    
function createThumbnails() {
  const thumbnailContainer = document.getElementById('thumbnails-container');

  // Clear existing content
  thumbnailContainer.innerHTML = '';

  // Iterate through movie recommendations and create thumbnails
  movieRecommendations.forEach(movie => {
    let thumbnail = document.createElement('div');
    let imageURL = document.createElement('img');
    let movieURL = document.createElement('a');

    thumbnail.className = 'thumbnail';
    imageURL.src = movie.img;
    imageURL.alt = 'Movie Image';
    movieURL.href = movie.link;
    movieURL.target = '_blank';

    thumbnail.appendChild(imageURL);
    thumbnail.appendChild(movieURL);
    thumbnailContainer.appendChild(thumbnail);
  });
}

const getMovies = async () => {
  try {
    let response = await fetch(url, options);
    let data = await response.json();

    if (data.movies) {
      const collectedData = data.movies.map(movie => ({
        img: movie.img,
        link: movie.link
      }));

      movieRecommendations.push(...collectedData);
      createThumbnails();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

window.onload = getMovies;
