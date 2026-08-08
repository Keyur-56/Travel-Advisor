import { useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const PlaceDetails = ({ place, selected, refProp }) => {

  useEffect(() => {
    if (selected && refProp?.current) {
      refProp.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selected, refProp]);

  return (
    <div ref={refProp}>
      <Card
        elevation={6}
        sx={{
          borderRadius: 3,
        }}
      >
        <CardMedia
          component="img"
          height="350"
          image={
            place.photo?.images?.large?.url ||
            "https://via.placeholder.com/600x350?text=No+Image"
          }
          alt={place.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" fontWeight="bold">
            {place.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Rating
              value={Number(place.rating) || 0}
              precision={0.5}
              readOnly
            />

            <Typography>
              {place.num_reviews} reviews
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography>Price</Typography>

            <Typography>{place.price_level}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography>Ranking</Typography>

            <Typography>{place.ranking}</Typography>
          </Box>

          {place?.awards?.map((award) => (
            <Box
              key={award.display_name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <img
                src={award.images.small}
                alt={award.display_name}
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {award.display_name}
              </Typography>
            </Box>
          ))}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              my: 2,
            }}
          >
            {place?.cuisine?.map(({ name }) => (
              <Chip
                key={name}
                label={name}
                size="small"
              />
            ))}
          </Box>

          {place?.address && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                my: 1,
              }}
            >
              <LocationOnIcon fontSize="small" />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {place.address}
              </Typography>
            </Box>
          )}

          {place?.phone && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                my: 1,
              }}
            >
              <PhoneIcon fontSize="small" />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {place.phone}
              </Typography>
            </Box>
          )}
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            TripAdvisor
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default PlaceDetails;