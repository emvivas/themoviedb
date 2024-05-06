import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../../services";

const Favorites = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [favs, setFavs] = useState<any[]>([]);
  const favorites:string | null = localStorage.getItem('favorites'); // Use null instead of empty string

  const runGetFavorites = async () => {
    if (favorites) { // Check if favorites exist
      try {
        const favoritesArray = JSON.parse(favorites);
        const favs = await Promise.all(
          favoritesArray.map(async (favoriteId: string) => {
            try {
              const response = await getMovieDetails(favoriteId);
              return response.data;
            } catch (error) {
              console.log("Error fetching movie details:", error);
              return null;
            }
          })
        );
        setFavs(favs.filter((fav) => fav !== null));
      } catch (error) {
        console.log("Error parsing favorites from localStorage:", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    runGetFavorites();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-semibold text-4xl mb-2 ml-2">Favorites</h1>
      {loading && <div> Loading...</div>}
      
      {favs?.length === 0 && !loading && <p className="text-5xl">Add Favorites :D</p>}
      
      <div className="movie-grid">
      {favs?.length > 0 &&
        favs.map((fav) => (
          <div key={fav.id} className="movie-card">
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
              alt={fav.title}
            />
            <div className="movie-info">
              <h3>{fav.title}</h3>
              <p>{fav.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;