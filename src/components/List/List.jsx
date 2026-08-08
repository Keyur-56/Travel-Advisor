import { useState, useEffect, createRef } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({
  places = [],
  childClicked,
  type,
  setType,
  rating,
  setRating,
  isLoading,
}) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <Box
      sx={{
        p: 3,
        height: "100%",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ mb: 2 }}
      >
        Restaurants, Hotels & Attractions
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            height: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Filters */}
          <Grid
            container
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Grid size={{ xs: 6 }}>
              <FormControl
                fullWidth
                size="small"
              >
                <InputLabel>Type</InputLabel>

                <Select
                  value={type}
                  label="Type"
                  onChange={(e) =>
                    setType(e.target.value)
                  }
                >
                  <MenuItem value="restaurants">
                    Restaurants
                  </MenuItem>

                  <MenuItem value="hotels">
                    Hotels
                  </MenuItem>

                  <MenuItem value="attractions">
                    Attractions
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <FormControl
                fullWidth
                size="small"
              >
                <InputLabel>Rating</InputLabel>

                <Select
                  value={rating}
                  label="Rating"
                  onChange={(e) =>
                    setRating(e.target.value)
                  }
                >
                  <MenuItem value="">
                    All
                  </MenuItem>

                  <MenuItem value={3}>
                    Above 3 ⭐
                  </MenuItem>

                  <MenuItem value={4}>
                    Above 4 ⭐
                  </MenuItem>

                  <MenuItem value={4.5}>
                    Above 4.5 ⭐
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Places */}
          <Box
            sx={{
              height: "73vh",
              overflowY: "auto",
              pr: 1,

              "&::-webkit-scrollbar": {
                width: "6px",
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#bdbdbd",
                borderRadius: "10px",
              },
            }}
          >
            <Grid
              container
              spacing={2}
            >
              {places?.map((place, index) => (
                <Grid
                  key={
                    place.location_id || index
                  }
                  size={{ xs: 12 }}
                >
                  <PlaceDetails
                    place={place}
                    selected={
                      Number(childClicked) ===
                      index
                    }
                    refProp={elRefs[index]}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default List;