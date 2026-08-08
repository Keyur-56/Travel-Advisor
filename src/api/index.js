import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "x-rapidapi-key": "0723514362msh5af1df5dbd5235dp17db5cjsna1b3e0d38aeb",
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Message:", error.message);

    return [];
  }
};

const url = "http://localhost:8000";

export const addInfo = async (data) => {
  try {
    const response = await axios.post(
      `${url}/addinfo`,
      data
    );

    return response.data;

  } catch (error) {
    console.log(
      "Error while addInfo API",
      error.message
    );
  }
};