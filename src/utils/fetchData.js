export const exerciseOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "02c3163ab5mshf9af4abdd3df0f2p1e514bjsn3b3bd3a33962",
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
  },
};

export const youTubeOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "02c3163ab5mshf9af4abdd3df0f2p1e514bjsn3b3bd3a33962",
    "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const fetchData = async (url, option) => {
  const response = await fetch(url, option);
  const data = await response.json();

  return data;
};
