import { useEffect, useState } from "react";
import "./App.css";
import GoogleMap from "./map/GoogleMap";
import NavBar from "./nav/NavBar";
import CampDetails from "./camp/CampDetails";
import CampList from "./camp/CampList";
import MoveToCampForm from "./camp/MoveToCampForm";
import HazardList from "./hazard/HazardList";
import HazardForm from "./hazard/HazardForm";
import SOSForm from "./hazard/SOSForm";
import Login from "./login/Login";

function App() {
  const [page, setPage] = useState("home");
  const [login, setLogin] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 11.234058,
    lng: 76.0365978,
  });
  useEffect(() => {
    // Check if there's a "user" key in localStorage
    const user = localStorage.getItem('user');
    
    // If a user is found, set login to true
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  const [latandlng, setLatAndLng] = useState({});
  return (
    <>
      {login ? (
        <div className="flex h-screen w-screen">
          <NavBar setPage={setPage} />
          <div className="flex flex-row fixed mt-20  h-full pb-24 pr-2 pl-2 w-full">
            <div className="flex flex-col gap-1 p-2 w-9/12">
              <div className="flex h-2/3 w-full border">
                <GoogleMap
                  mapCenter={mapCenter}
                  setMapCenter={setMapCenter}
                  setLatAndLng={setLatAndLng}
                  setPage={setPage}
                  setIdSelected={setIdSelected}
                />
              </div>
              {page == "camp" && <CampDetails idSelected={idSelected} />}
              {page == "home" && <CampDetails idSelected={idSelected} />}
              {page == "hazard" && <HazardForm latandlng={latandlng} />}
              {page == "adminCamp" && (
                <MoveToCampForm
                  latandlng={latandlng}
                  setIdSelected={setIdSelected}
                  setMapCenter={setMapCenter}
                />
              )}
              {page == "sos" && <SOSForm latandlng={latandlng} />}
            </div>
            <div className="flex w-3/12 ">
              {page == "camp" && (
                <CampList
                  latandlng={latandlng}
                  setMapCenter={setMapCenter}
                  setIdSelected={setIdSelected}
                />
              )}
              {page == "home" && (
                <CampList
                  latandlng={latandlng}
                  setMapCenter={setMapCenter}
                  setIdSelected={setIdSelected}
                />
              )}
              {page == "sos" && <HazardList latandlng={latandlng} />}
              {page == "hazard" && <HazardList latandlng={latandlng} />}
            </div>
          </div>
        </div>
      ) : (
        <Login setLogin={setLogin} />
      )}
    </>
  );
}

export default App;
