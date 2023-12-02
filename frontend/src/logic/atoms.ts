import { atom } from 'jotai';
import { MapSettings } from './interfaces';

const mapSettingsAtom = atom<MapSettings>({
    showDangerousPlaces: true,
    showAmbulances: true,
    showReports: true,
    showShelters: true
});

export { mapSettingsAtom };