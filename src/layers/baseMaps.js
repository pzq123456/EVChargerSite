const cartodbUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/";
const OSMUrl = "https://tile.openstreetmap.org";

let baseMapInfos = [
    {
        name: "light_all",
        url: cartodbUrl,
        style: "light_all",
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    },
    {
        name: "dark_all",
        url: cartodbUrl,
        style: "dark_all",
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    },
    // {
    //     name: "rastertiles/voyager",
    //     url: cartodbUrl,
    //     style: "rastertiles/voyager",
    //     attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    // },
    // {
    //     name: "rastertiles/voyager_nolabels",
    //     url: cartodbUrl,
    //     style: "rastertiles/voyager_nolabels",
    //     attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    // },
    {
        name: "OSM",
        url: OSMUrl,
        style: "",
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
]

export { baseMapInfos };