import { useEffect, useState } from "react";
import axios from "axios";

import Card from "../components/Card";
import ComicCard from "../components/ComicCard";
import Loader from "../components/Loader";

const Favorites = ({ fav, handleRemoveFav }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/favorites`,
          {
            fav,
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [fav]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="favorites">
      {data.map((elem, index) => {
        return index === 0 ? (
          elem.length > 0 ? (
            <div key={index}>
              <p style={{ color: "white" }}>CHARACTERS</p>
              <div className="char-container">
                {elem.map((item) => {
                  return (
                    <Card
                      key={item._id}
                      data={item}
                      heart={false}
                      cross
                      handleRemoveFav={handleRemoveFav}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <p
              key={index}
              style={{ color: "white", fontSize: "20px", marginLeft: "30px" }}
            >
              No favorite characters yet !
            </p>
          )
        ) : elem.length > 0 ? (
          <div key={index}>
            <p style={{ color: "white" }}>COMICS</p>
            {elem.map((item) => {
              return (
                <ComicCard
                  key={item._id}
                  data={item}
                  heart={false}
                  cross
                  handleRemoveFav={handleRemoveFav}
                />
              );
            })}
          </div>
        ) : (
          <p
            key={index}
            style={{ color: "white", fontSize: "20px", marginLeft: "30px" }}
          >
            No favorite comics yet !
          </p>
        );
      })}
    </div>
  );
};

export default Favorites;
