import { baseMapInfos } from "./src/baseMaps.js";
import { getBaseMap } from "./src/utils.js";


const mapInstance = L.map("map").setView([40.7128, -74.0060], 10);

const baseMaps = getBaseMap(baseMapInfos);

baseMaps.dark_all.addTo(mapInstance);
