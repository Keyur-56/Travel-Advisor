import { useEffect, useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import Itinerary from "./components/Itinerary/Itinerary";

import { getPlacesData} from "./api";

function App() {
  const [showItinerary, setShowItinerary] = useState(false);

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  useEffect(() => {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    setFilteredPlaces(
      places.filter((place) => place.rating > rating)
    );
  }, [rating, places]);

  useEffect(() => {
    if (!bounds.sw || !bounds.ne) return;

    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        console.log(type);
console.log(data);
        setPlaces(
          data?.filter(
            (place) =>
              place.name &&
              place.num_reviews > 20
          ) || []
        );

        setIsLoading(false);
      });
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />

      <Header
        showItinerary={showItinerary}
        setShowItinerary={setShowItinerary}
      />

      {showItinerary ? (
        <Itinerary />
      ) : (
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <List
              places={
                filteredPlaces.length
                  ? filteredPlaces
                  : places
              }
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Map
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              bounds={bounds}
              setBounds={setBounds}
              places={
                filteredPlaces.length
                  ? filteredPlaces
                  : places
              }
              setChildClicked={setChildClicked}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default App;