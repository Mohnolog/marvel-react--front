import { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import ComicCard from "../components/ComicCard";

import Search from "../components/Search";
import SearchResults from "../components/SearchResults";

const Comics = ({
  search,
  setSearch,
  addFav,
  handleSubmit,
  searchData,
  setSkipCom,
  skipCom,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/comics?limit=100&skip=${offset}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [offset]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="com-cont-butt">
      <Search
        handleSubmit={handleSubmit}
        search={search}
        setSearch={setSearch}
      />
      <div className="comics-container">
        {searchData.results && searchData.results.length > 0 ? (
          <SearchResults category="comics" data={searchData} />
        ) : (
          data.results.map((comic, index) => {
            return <ComicCard heart addFav={addFav} key={index} data={comic} />;
          })
        )}
      </div>
      <div className="button-div">
        {offset !== 0 && (
          <button
            onClick={(e) => {
              if (search.length > 0) {
                let newSkip = skipCom - 100;
                setSkipCom(newSkip);
                handleSubmit(e, newSkip);
              } else {
                setOffset(offset - 100);
              }
            }}
          >
            Page précédente
          </button>
        )}
        {offset + 100 < data.count && (
          <button
            onClick={(e) => {
              if (search.length > 0) {
                let newSkip = skipCom + 100;
                setSkipCom(newSkip);
                handleSubmit(e, newSkip);
              } else {
                setOffset(offset + 100);
              }
            }}
          >
            Page suivante
          </button>
        )}
      </div>
    </div>
  );
};

export default Comics;
