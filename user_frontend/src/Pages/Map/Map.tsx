import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DangerousPlaces from "./DangerousPlaces";
import DangerousAreas from "./DangerousAreas";
import { mapSettingsAtom } from "../../logic/atoms"
import { useAtom } from "jotai";
import Shelters from "./Shelters";
import { useState } from "react";

const style = {
  width: "100vw",
  height: "100vh",
  position: "relative",
};

const Map = () => {
  const [refresh, setRefresh] = useState(true);
  const [mapSettings, setMapSettings] = useAtom(mapSettingsAtom);
  let time = new Date().toLocaleTimeString();

    const [ctime,setTime] = useState(time);
    const UpdateTime=()=>{
        time =  new Date().toLocaleTimeString()
        setTime(time)
    }
    setInterval(UpdateTime);
  return (
   
      <Box sx={style}>
        <MapContainer
          center={[49.84, 24.03]}
          zoom={13}
          style={{ height: "100vh", zIndex: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {refresh && mapSettings.showDangerousPlaces && (
            <>
              <DangerousPlaces />
              <DangerousAreas />
            </>
          )}
          {refresh && mapSettings.showShelters && (
            <>
              <Shelters />
            </>
          )}
        </MapContainer>
        <Box
          sx={{
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#4045c9",
            width: 280,
            height: `60`,
            color: "white",
            pl: 2,
            position: "absolute",
            left: 0,
            bottom: 0,
            borderRadius: "0 2rem 0 0",
          }}
        >
          <Typography sx={{ mt: 2, fontWeight: 'bold'}} variant="h6">
            Pokazuj na mapie:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox style={{ color: "#fff" }}
                checked={mapSettings.showDangerousPlaces}
                onChange={(event) =>
                  setMapSettings({
                    ...mapSettings,
                    showDangerousPlaces: event.target.checked,
                  })
                }
              />
            }
            label="Pokazuj niebezpieczne miejsca"
          />
          <FormControlLabel
            control={
              <Checkbox style={{ color: "#fff" }}
                checked={mapSettings.showShelters}
                onChange={(event) =>
                  setMapSettings({
                    ...mapSettings,
                    showShelters: event.target.checked,
                  })
                }
              />
            }
            label="Pokazuj schrony"
          />
        </Box>
      </Box>
  );
};

export default Map;
