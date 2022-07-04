    _mapViewType = "encroachment", _view = null,
    _map = null, _statusPage = "index";


require([
    "esri/config",
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/Camera",
    "esri/widgets/Fullscreen",
    "js/NavigationMenu.js"

], function(esriConfig, WebScene, SceneView, Camera, Fullscreen, FeatureLayer) {
   

    // isAuthorized();

    //*************** This is For Enterprise **********/
    // // Set the default portalUrl value to the hostname of the on-premise portal
    // esriConfig.portalUrl = "https://globolive3d.gl3d.in/agportal";
    // // Create the portal instance
    //************** This is For Enterprise End**********/

    esriConfig.request.interceptors.push({
        urls: /FeatureServer\/\d+$/,
        after: function(response) {
            response.data.supportedQueryFormats = "JSON";
        },
    });


    // Load Map
    window._view = new SceneView({
        map: new WebScene({
            portalItem: {
                id: "4f32e39e12b8499a9f3bb6e728b92c21",
            },
        }),
        container: "viewDiv",
        highlightOptions: {
            color: "aqua",
        },
    });
    window._map = window._view.map;


    setTimeout(() => {
        require(["./js/LoadWidgets.js"]);
    }, 5000);

     

     
    /// Add fullscreen widget on map
    // fullscreen = new Fullscreen({
    //     view: window._view,
    // });
   

    const mapFullScreen=document.getElementById("mapFullScreen")
    mapFullScreen.addEventListener("click",()=>{
        fullscreen = new Fullscreen({
            view: window._view,
            container:document.getElementById("mapFullScreen")
        });
         window._view.ui.add(fullscreen, "bottom-right");
    })

 

    // document.getElementById("computerButton").addEventListener("click", () => {
    //     const user = JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY));
    //     const obj = Object.assign({}, user);
    //     $.ajax({
    //         type: "POST",
    //         url: `${CONSTANTS.API_URL}/controlPanel`,
    //         data: {
    //             obj,
    //         },
    //         headers: {
    //             Authorization: `Bearer ${user.token}`,
    //         },
    //         success: () => {
    //             window.open(`${CONSTANTS.APP_URL}/ControlPanel.html`);
    //         },
    //         error: (err) => {
    //             if (err.status === 500) {
    //                 swal({
    //                     title: "You are not Authorized for this service",
    //                     text: "",
    //                     icon: "error",
    //                     button: "Ok",
    //                 });
    //             }
    //         },
    //     });
    // });

    // navigationMenu_onCLick(window.window._mapViewType) // call on load for default enchrochment selection




    let dataForHighlight = {};
    window.formatDataForGraph = function(features, buildingType) {
        // buildingtype => Encrochment, developemt .....
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-FeatureSet.html

        // Format data for graph
        //pie
        // labels: ['Residential', 'Commercial', 'Educational', 'Recreational', 'Industrial', 'Governmental', 'Institutional', 'Utilities', 'MixedUse', 'Commercial Residential Mix'],
        // series: [10,12,13]

        //bar
        // [{
        //     name: 'Residential',
        //     data: [0]
        // }]

        //line
        // {
        //     name: 'Residential',
        //     data: count.landuse.residential
        // }

        // { attrVal(legal..) : {totalArea, totalCount}}

        // {
        // 2015 : {  attrVal(legal..) : {totalArea, totalCount} ,
        // 2016 : {  attrVal(legal..) : {totalArea, totalCount}
        // }
        //

        // encroachment, Legal, 2015,
        //line => encroachment, Legal, 2015-2025...,

        /*
                                                                                                                                                                                                                                                                                                                        data = {  attribute_value ( legal or illegal) : {totalcount, totalarea}}
                                                                                                                                                                                                                                                                                                                    */
        return new Promise((resolve, reject) => {
            // dataForHighlight = {};
            let data;
            try {
                data = features.reduce((acc, feature) => {
                    // let curMapyear = window._appState.selectedYear, //205,2016....
                    attrs = feature.attributes; //{}

                    for (let key in attrs) {
                        if (
                            key != "OBJECTID" &&
                            attrs[key] &&
                            key != "area1" &&
                            key != "owner_name" &&
                            key != "developer_name" &&
                            key != "area_name" &&
                            key != "Description" &&
                            key != "address"
                        ) {
                            if ((buildingType.toUpperCase() == "TIMELINE" &&
                                    key.toUpperCase() == "DATE_CONSTRUCTED") || //&& curMapyear == attrs[key]
                                key.toUpperCase().indexOf(buildingType.toUpperCase()) > -1
                            ) {
                                // get year from the attr key
                                // Key =>
                                let year = key.substr(key.length - 4, 4);
                                if (key.toUpperCase() == "DATE_CONSTRUCTED") year = "date";

                                attrs[key] = attrs[key].toString().toLowerCase();

                                // { 2015 : {xcbxv}}
                                acc[year] = acc[year] || {}; // {2015 : {}} or {2016: {}}
                                dataForHighlight[year] = dataForHighlight[year] || {};
                                // attrs => {Enchrochment2015 : "Legal"}

                                acc[year][attrs[key]] = acc[year][attrs[key]] || {}; // {2015 : {}} or {2016: {}}
                                dataForHighlight[year][attrs[key]] =
                                    dataForHighlight[year][attrs[key]] || [];
                                dataForHighlight[year][attrs[key]].push(attrs["OBJECTID"]);
                                acc[year][attrs[key]]["totalcount"] =
                                    acc[year][attrs[key]]["totalcount"] || 0;
                                acc[year][attrs[key]]["totalcount"] =
                                    acc[year][attrs[key]]["totalcount"] + 1;
                                acc[year][attrs[key]]["totalarea"] =
                                    acc[year][attrs[key]]["totalarea"] || 0;
                                acc[year][attrs[key]]["totalarea"] =
                                    acc[year][attrs[key]]["totalarea"] + attrs["area1"];
                            }
                        }
                    }

                    return acc;
                }, {});
            } catch (error) {
                console.error(error);
            }

            window.dataForHighlight = dataForHighlight;
            resolve(data);
        })
        let data = {};

    };

});



const chevronUp = document.getElementById("chevronUp");
const chevronDown = document.getElementById("chevronDown");
const toolbar = document.getElementById("toolbar");
chevronUp.addEventListener("click", () => {
    toolbar.scroll(0, 0)
})
chevronDown.addEventListener("click", () => {
    toolbar.scroll(0, toolbar.scrollHeight)
})
const closeDataTable=document.getElementById("closeDataTable")
closeDataTable.addEventListener("click",()=>{
    document.getElementById("dataTableContent").style.display = "none"
})
// before(params) {
//     if (params.url.includes("query")) {
//         params.requestOptions.query.f = 'json';
//     }
// }