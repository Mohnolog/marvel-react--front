import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ComicCard from "../components/ComicCard";

const ComicsPerCharacter = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.characterId;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/comics/${id}`
      );
      setData(response.data.comics);
    };
    fetchData();
  }, [id]);

  return (
    <div className="comic-per-character-container">
      {data &&
        data.map((comic, index) => {
          return <ComicCard key={index} data={comic} />;
        })}
    </div>
  );
};

export default ComicsPerCharacter;
