import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HomeIcon from "@mui/icons-material/Home";

const Header = ({
  showItinerary,
  setShowItinerary,
}) => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
        >
          Travel Advisor
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            {showItinerary
              ? "AI Trip Planner"
              : "Explore New Places"}
          </Typography>

          {showItinerary ? (
            <Button
              variant="contained"
              color="success"
              startIcon={<HomeIcon />}
              onClick={() =>
                setShowItinerary(false)
              }
              sx={{
    backgroundColor: "#fff",
    color: "primary.main",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    px: 2.5,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      boxShadow: "none",
    },
  }}
            >
              Home
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              startIcon={
                <TravelExploreIcon />
              }
              onClick={() =>
                setShowItinerary(true)
              }
              sx={{
    backgroundColor: "#fff",
    color: "primary.main",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    px: 2.5,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      boxShadow: "none",
    },
  }}
            >
              AI Trip Planner
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;