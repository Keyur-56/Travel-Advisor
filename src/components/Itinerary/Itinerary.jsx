import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { addInfo } from "../../api";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const interestsList = [
  "Food",
  "Adventure",
  "Nature",
  "History",
  "Shopping",
  "Nightlife",
  "Beaches",
  "Photography",
  "Culture",
  "Mountains",
  "Road Trip",
  "Luxury",
];

const Itinerary = () => {
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 2,
    budget: "Medium",
    travelStyle: "Couple",
    notes: "",
    interests: [],
  });

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const toggleInterest = (interest) => {
    if (trip.interests.includes(interest)) {
      setTrip({
        ...trip,
        interests: trip.interests.filter(
          (item) => item !== interest
        ),
      });
    } else {
      setTrip({
        ...trip,
        interests: [...trip.interests, interest],
      });
    }
  };

  const generateTrip = async () => {
  try {
  setLoading(true);

  const response = await addInfo(trip);

  console.log(response);

  if (response?.success) {
    setItinerary(response.itinerary);
  } else {
    alert("Failed to generate itinerary.");
  }

} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}
};

  return (
    <Box
      sx={{
        background: "#f5f7fb",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 5,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          align="center"
        >
          ✈ AI Trip Planner
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 1, mb: 4 }}
        >
          Generate personalized travel itineraries using AI
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Destination"
              name="destination"
              value={trip.destination}
              onChange={handleChange}
              placeholder="e.g. Paris"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="date"
              name="startDate"
              label="Start Date"
              value={trip.startDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="date"
              name="endDate"
              label="End Date"
              value={trip.endDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Travelers"
              name="travelers"
              value={trip.travelers}
              onChange={handleChange}
            >
              {[1,2,3,4,5,6,7,8].map((num)=>(
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Budget"
              name="budget"
              value={trip.budget}
              onChange={handleChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Luxury">Luxury</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              select
              fullWidth
              label="Travel Style"
              name="travelStyle"
              value={trip.travelStyle}
              onChange={handleChange}
            >
              <MenuItem value="Solo">Solo</MenuItem>
              <MenuItem value="Couple">Couple</MenuItem>
              <MenuItem value="Family">Family</MenuItem>
              <MenuItem value="Friends">Friends</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >
              Interests
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {interestsList.map((interest) => (
                <Chip
                  key={interest}
                  label={interest}
                  clickable
                  color={
                    trip.interests.includes(interest)
                      ? "primary"
                      : "default"
                  }
                  onClick={() =>
                    toggleInterest(interest)
                  }
                />
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Special Requirements"
              name="notes"
              value={trip.notes}
              onChange={handleChange}
              placeholder="Vegetarian food, wheelchair accessibility, kids friendly..."
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<TravelExploreIcon />}
              disabled={loading}
              onClick={generateTrip}
              sx={{
                py: 1.8,
                fontSize: 18,
                borderRadius: 3,
              }}
            >
              {loading
                ? "Generating..."
                : "Generate AI Itinerary"}
            </Button>
          </Grid>
        </Grid>

        {itinerary && (
  <>
    <Divider sx={{ my: 4 }} />

    <Typography
      variant="h4"
      fontWeight={700}
      gutterBottom
    >
      Your AI Itinerary
    </Typography>

    <Paper
      elevation={2}
      sx={{
        p: 3,
        bgcolor: "#fafafa",
        whiteSpace: "pre-wrap",
        lineHeight: 2,
        borderRadius: 3,
      }}
    >
      {itinerary}
    </Paper>
  </>
)}
      </Paper>
    </Box>
  );
};

export default Itinerary;