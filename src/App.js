import React, { useState } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";
import request from "./utils/request";
import requestPOI from "./utils/requestPOI";
import endpoints from "./endpoints";
import Loading from "./components/Loading";
import POI from "./components/POI";
import MyMap from "./components/MyMap";
import NavigationBar from "./components/NavigationBar";
import MENU_MODES from "./MenuModes";

function App() {
  let [pois, setPois] = useState([]);
  let [markers, setMarkers] = useState([]);
  let [prevMarkers, setPrevMarkers] = useState([]);
  let [canDeletePOI, setCanDeletePOI] = useState(false);
  let {
    user,
    loading,
    loginWithPopup,
    getTokenSilently,
    logout,
    isAuthenticated
  } = useAuth0();
  //component stock states : open/closed
  let [menuState, setMenuState] = useState(true);
  //Menu modes: DEFAULT displays POI list, ADD_POI opens add form
  let [menuMode, setMenuMode] = useState(MENU_MODES.DEFAULT);

  let handleLogin = async e => {
    e.preventDefault();
    try {
      let token = await getTokenSilently();
      await handleGetPOI();
    } catch (e) {
      console.error(e);
      await loginWithPopup();
    }
  };

  let handleLogout = () => {
    logout();
    setPois([]);
  };
  let toggleMenu = () => {
    setMenuState(!menuState);
  };
  let setMenu = isOpen => {
    setMenuState(isOpen);
  };
  let handleOpenGuide = () => {
    setMenuMode(MENU_MODES.USER_GUIDE);
    setMenu(true);
  };
  let handleGetPOI = async () => {
    // e.preventDefault();
    setCanDeletePOI(false);
    let pois = await request(
      `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`,
      getTokenSilently,
      loginWithPopup
    );
    setPois(pois);
    let markers = [];
    for (let i in pois) {
      let poi = pois[i];
      //initialisation for the pin with the content.
      markers.push({
        key: poi.id,
        position: [poi.lat, poi.lng],
        content: {
          name: poi.name,
          description: poi.description,
          poi: poi
        }
      });
      setMenuMode(MENU_MODES.DEFAULT);
    }
    // update all the marker in state
    setMarkers(markers);
    setPrevMarkers(markers);
    setMenu(true);
  };
  let handleForm = async newPOI => {
    let tokenForm = await getTokenSilently();
    try {
      let result = await requestPOI.addNewPOI(
        newPOI,
        getTokenSilently,
        loginWithPopup
      );
      setMenuMode(MENU_MODES.DEFAULT);
      handleGetPOI();
    } catch (error) {}
  };

  let handleMenuChange = isOpen => {
    setMenuState(isOpen);
  };
  let handleChangeMode = mode => {
    setMenuMode(mode);
  };
  let handleFilterGroup = group => {
    setCanDeletePOI(false);
    if (prevMarkers && prevMarkers.length > 0) {
      let filteredMarkers = prevMarkers.filter(
        prevMarkers => prevMarkers.content.poi.group == group
      );
      setMarkers(filteredMarkers);
    }
  };
  let handleFilterUser = () => {
    setCanDeletePOI(true);
    if (prevMarkers && prevMarkers.length > 0) {
      let filteredMarkers = prevMarkers.filter(
        prevMarkers => prevMarkers.content.poi.Creator.email == user.email
      );
      setMarkers(filteredMarkers);
    }
  };
  let handleDeletePOI = async id => {
    let result = await requestPOI.deletePOI(
      id,
      getTokenSilently,
      loginWithPopup
    );
    handleGetPOI();
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="App">
      <NavigationBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        handleGetPOI={handleGetPOI}
        isAuthenticated={isAuthenticated}
        user={user}
        handleOpenGuide={handleOpenGuide}
      />
      <header className="App-header">
        <MyMap
          markers={markers}
          menuState={menuState}
          menuMode={menuMode}
          isAuthenticated={isAuthenticated}
          toggleMenu={toggleMenu}
          setMenu={setMenu}
          handleMenuChange={handleMenuChange}
          handleForm={handleForm}
          handleChangeMode={handleChangeMode}
          handleFilterGroup={handleFilterGroup}
          handleFilterUser={handleFilterUser}
          canDeletePOI={canDeletePOI}
          handleDeletePOI={handleDeletePOI}
        />
      </header>
    </div>
  );
}

export default App;
