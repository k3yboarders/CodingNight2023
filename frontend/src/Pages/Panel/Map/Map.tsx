import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DangerousPlaces from "./DangerousPlaces";
import DangerousAreas from "./DangerousAreas";
import ClickManager from "./ClickManager";
import { useState } from "react";
import { mapSettingsAtom } from "../../../logic/atoms";
import { useAtom } from "jotai";
import Shelters from "./Shelters";
import Ambulances from "./Ambulances";
import Reports from "./Reports";
import Tasks from "./Tasks";

const style = {
  width: "100vw",
  height: "100vh",
  position: "relative",
};

const Map = () => {
  const [refresh, setRefresh] = useState(true);
  const [mapSettings, setMapSettings] = useAtom(mapSettingsAtom);
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
        {refresh && mapSettings.showAmbulances && (
          <>
            <Tasks />
          </>
        )}
        {refresh && mapSettings.showAmbulances && (
          <>
            <Ambulances />
          </>
        )}
        {refresh && mapSettings.showReports && (
          <>
            <Reports/>
          </>
        )}
        {refresh && mapSettings.showShelters && (
          <>
            <Shelters />
          </>
        )}
        <ClickManager
          onChange={() => {
            setRefresh(false);
            setTimeout(() => setRefresh(true), 30);
          }}
        />
      </MapContainer>
      <Box
        sx={{
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#121212",
          width: 300,
          height: 350,
          pl: 2,
          position: "absolute",
          left: 0,
          bottom: 0,
        }}
      >
        <Typography sx={{ mt: 2 }} variant="h6">
          Pokazuj na mapie:
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={mapSettings.showTasks}
              onChange={(event) =>
                setMapSettings({
                  ...mapSettings,
                  showTasks: event.target.checked,
                })
              }
            />
          }
          label="Pokazuj zadania"
        />
        <FormControlLabel
          control={
            <Checkbox
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
            <Checkbox
              checked={mapSettings.showAmbulances}
              onChange={(event) =>
                setMapSettings({
                  ...mapSettings,
                  showAmbulances: event.target.checked,
                })
              }
            />
          }
          label="Pokazuj ambulanse"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={mapSettings.showReports}
              onChange={(event) =>
                setMapSettings({
                  ...mapSettings,
                  showReports: event.target.checked,
                })
              }
            />
          }
          label="Pokazuj zgłoszenia"
        />
        <FormControlLabel
          control={
            <Checkbox
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
