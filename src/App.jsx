import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Registration from "./login/Registration";
import ElevatedRegistration from "./login/ElevatedRegistration";

function App() {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [idSelected, setIdSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 11.234058,
    lng: 76.0365978,
  });
  const [latandlng, setLatAndLng] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  if (loading) {
    // Optionally render a loader or return null while checking login state
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {!login ? (
        <Routes>
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route path="/register" element={<Registration setLogin={setLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      ) : (
        <div className="flex h-screen w-screen">
          <NavBar setLogin={setLogin} />
          <div className="flex flex-row fixed mt-20 h-full pb-24 pr-2 pl-2 w-full">
            <div className="flex flex-col gap-1 p-2 w-9/12">
              <div className="flex h-2/3 w-full border">
                <GoogleMap
                  mapCenter={mapCenter}
                  setMapCenter={setMapCenter}
                  setLatAndLng={setLatAndLng}
                  setIdSelected={setIdSelected}
                />
              </div>
              <Routes>
                <Route path="/camp" element={<CampDetails idSelected={idSelected} />} />
                <Route path="/" element={<Navigate to="/camp" replace={true} />} />
                <Route path="/hazard" element={<HazardForm latandlng={latandlng} />} />
                <Route path="/admin" element={<ElevatedRegistration setLogin={setLogin} />} />

                <Route
                  path="/adminCamp"
                  element={
                    <MoveToCampForm
                      latandlng={latandlng}
                      setIdSelected={setIdSelected}
                      setMapCenter={setMapCenter}
                    />
                  }
                />
                <Route path="/sos" element={<SOSForm latandlng={latandlng} />} />
              </Routes>
            </div>
            <div className="flex w-3/12">
              <Routes>
                <Route
                  path="/camp"
                  element={
                    <CampList
                      latandlng={latandlng}
                      setMapCenter={setMapCenter}
                      setIdSelected={setIdSelected}
                    />
                  }
                />
                <Route path="/hazard" element={<HazardList latandlng={latandlng} />} />
                <Route path="/registeradmin" element={<HazardList latandlng={latandlng} />} />
                <Route path="/sos" element={<HazardList latandlng={latandlng} />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
