import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicsPerCharacter from "./pages/ComicsPerCharacter";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
library.add(faHeart, farHeart, faXmark);

function App() {
  const [searchChar, setSearchChar] = useState("");
  const [skipChar, setSkipChar] = useState(0);
  const [searchCom, setSearchCom] = useState("");
  const [skipCom, setSkipCom] = useState(0);
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(Cookies.get("username") || "");
  const [token, setToken] = useState(Cookies.get("token") || null);
  let cookie = Cookies.get("fav");
  const [fav, setFav] = useState((cookie && JSON.parse(cookie)) || [[], []]);

  // SIGNUP AND LOGIN
  const onLogin = (token, username) => {
    setToken(token);
    setUsername(username);
    Cookies.set("token", token);
    Cookies.set("username", username);
  };
  // RECHERCHE

  const handleSubmitChar = async (e, skip) => {
    e.preventDefault();
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/search-characters?name=${searchChar}&skip=${skip}`
    );
    setData(response.data);
  };

  const handleSubmitCom = async (e, skip) => {
    try {
      e.preventDefault();
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/search-comics?title=${searchCom}&skip=${skip}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // FAVORIS
  const addFav = (id, from) => {
    let favCopy = [...fav];
    if (from === "char") {
      if (favCopy[0].indexOf(id) === -1) {
        favCopy[0].push(id);
        alert("Favoris ajouté !");
      } else {
        alert("Déjà en favoris !");
      }
    } else if (favCopy[1].indexOf(id) === -1) {
      favCopy[1].push(id);
      alert("Favoris ajouté !");
    } else {
      alert("Déjà en favoris !");
    }

    setFav(favCopy);
    Cookies.set("fav", JSON.stringify(favCopy));
  };

  const handleRemoveFav = (id) => {
    const fav = Cookies.get("fav");
    const tabFav = fav && JSON.parse(fav);

    let newFav = [[], []];
    for (let i = 0; i < tabFav.length; i++) {
      for (let j = 0; j < tabFav[i].length; j++) {
        if (i === 0) {
          if (tabFav[i][j] !== id) {
            newFav[0].push(tabFav[i][j]);
          }
        } else {
          if (tabFav[i][j] !== id) {
            newFav[1].push(tabFav[i][j]);
          }
        }
      }
    }
    setFav(newFav);
    Cookies.set("fav", JSON.stringify(newFav));
  };

  return (
    <Router>
      <div>
        <Header
          setData={setData}
          setToken={setToken}
          token={token}
          username={username}
          setSearchChar={setSearchChar}
          setSearchCom={setSearchCom}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                searchData={data}
                search={searchChar}
                setSearch={setSearchChar}
                addFav={addFav}
                handleSubmit={handleSubmitChar}
                setSkipChar={setSkipChar}
                skipChar={skipChar}
              />
            }
          ></Route>
          <Route
            path="/comics/:characterId"
            element={<ComicsPerCharacter />}
          ></Route>
          <Route
            path="/comics"
            element={
              <Comics
                addFav={addFav}
                searchData={data}
                search={searchCom}
                setSearch={setSearchCom}
                handleSubmit={handleSubmitCom}
                setSkipCom={setSkipCom}
                skipCom={skipCom}
              />
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <Favorites
                handleRemoveFav={handleRemoveFav}
                fav={fav}
                token={token}
              />
            }
          ></Route>
          <Route path="/login" element={<Login onLogin={onLogin} />}></Route>
          <Route path="/signup" element={<SignUp onLogin={onLogin} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
