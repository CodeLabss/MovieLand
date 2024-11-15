import React, { useState, useEffect } from "react";
import MovieCard from "./Card";
import SearchIcon from "./assets/search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=42ceb662";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Track current page of search results
  const [totalResults, setTotalResults] = useState(0); // Track total number of results

  // Fetch movies when the component first loads
  useEffect(() => {
    searchMovies("movie", page); // Use a broad search term like "movie" initially
  }, [page]);

  // Function to search for movies by title and page number
  const searchMovies = async (title, page = 1) => {
    const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
    const data = await response.json();

    // Update state with movie results
    if (data.Search) {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
      setTotalResults(data.totalResults); // Store total number of results
    } else {
      setMovies([]);
      setTotalResults(0);
    }
  };

  // Load more movies when user scrolls to the bottom
  const loadMoreMovies = () => {
    if (movies.length < totalResults) {
      setPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      {/* Search bar to look for movies */}
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (searchTerm.trim()) {
                setMovies([]); // Clear existing results
                setPage(1); // Reset to page 1 for new search
                searchMovies(searchTerm, 1); // Search with the new term
              } else {
                alert("Please enter a movie name to search");
              }
            }
          }}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            if (searchTerm.trim()) {
              setMovies([]); // Clear existing results
              setPage(1); // Reset to page 1 for new search
              searchMovies(searchTerm, 1); // Search with the new term
            } else {
              alert("Please enter a movie name to search");
            }
          }}
        />
      </div>

      {/* Display movies */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {/* Load more button */}
      {movies.length < totalResults && (
        <button className="load-more" onClick={loadMoreMovies}>
         <h1 className=""> Load More Movies</h1> 
        </button>
      )}
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from "react";

// import MovieCard from "./Card";
// import SearchIcon from "./assets/search.svg";
// import "./App.css";

// const API_URL = "http://www.omdbapi.com?apikey=42ceb662";

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     searchMovies("Batman"); // Initial search for "Batman"
//   }, []);

//   const searchMovies = async (title) => {
//     const response = await fetch(`${API_URL}&s=${title}`);
//     const data = await response.json();

//     setMovies(data.Search);
//   };

//   return (
//     <div className="app">
//       <h1>MovieLand</h1>

//       <div className="search">
//         <input
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               if (searchTerm.trim()) {
//                 searchMovies(searchTerm);
//               } else {
//                 alert("Please enter a movie name to search");
//               }
//             }
//           }}
//           placeholder="Search for movies"
//         />
//         <img
//           src={SearchIcon}
//           alt="search"
//           onClick={() => {
//             if (searchTerm.trim()) {
//               searchMovies(searchTerm);
//             } else {
//               alert("Please enter a movie name to search");
//             }
//           }}
//         />
//       </div>

//       {movies?.length > 0 ? (
//         <div className="container">
//           {movies.map((movie) => (
//             <MovieCard key={movie.imdbID} movie={movie} />
//           ))}
//         </div>
//       ) : (
//         <div className="empty">
//           <h2>No movies found</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
