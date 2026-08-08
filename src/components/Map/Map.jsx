import GoogleMapReact from "google-map-react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import useMediaQuery from "@mui/material/useMediaQuery";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Map = ({
  coordinates,
  setCoordinates,
  bounds,
  setBounds,
  places,
  setChildClicked,
  weatherData,
}) => {
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <Box
      sx={{
        width: "100%",
        height: "85vh",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }}
        center={coordinates}
        defaultCenter={coordinates}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl:true}}
        onChange={({ center, marginBounds }) => {
          console.log("Center:", center);
          console.log("Bounds:", marginBounds);

          setCoordinates(center);

          setBounds({
            ne: marginBounds.ne,
            sw: marginBounds.sw,
          });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, index) => (
          <Box
            key={index}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            sx={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              "&:hover": {
                zIndex: 2,
              },
            }}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon
                color="primary"
                fontSize="large"
              />
            ) : (
              <Paper
                elevation={3}
                sx={{
                  p: 1,
                  width: 110,
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>

                <Box
                  component="img"
                  src={
                    place.photo?.images?.large?.url ||
                    "https://via.placeholder.com/180x120"
                  }
                  alt={place.name}
                  sx={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />

                <Rating
                  value={Number(place.rating) || 0}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </Paper>
            )}
          </Box>
        ))}
      </GoogleMapReact>
    </Box>
  );
};

export default Map;