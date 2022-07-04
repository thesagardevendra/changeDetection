require([
    "esri/config",
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/widgets/Fullscreen",
    "js/controlPanelTimeSlider.js",
     "js/Legend.js",
    "js/controlPanelLoadWidgets.js",
], function(
    esriConfig,
    WebScene,
    SceneView,
    FeatureLayer,
    Graphic,
    Fullscreen,
    TimeSlider,
) {
    // const user = JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY));
    // isAuthorized();
    /*
                                                                                                                Global variables 
                                                                                                            */
    window._mapViewType = "encroachment"; //default
    window._view = null;
    window._map = null;
    window._statusPage = "controlPanel";
    // before(params) {
    //     if (params.url.includes("query")) {
    //         params.requestOptions.query.f = 'json';
    //     }
    // }
  
    esriConfig.request.interceptors.push({
        urls: /FeatureServer\/\d+$/,
        after: function(response) {
            response.data.supportedQueryFormats = "JSON";
        },
    });
    //This Is For Enterprise
    // Set the default portalUrl value to the hostname of the on-premise portal
    // esriConfig.portalUrl = "https://globolive3d.gl3d.in/agportal";

    // map loading
    const view = new SceneView({
        map: new WebScene({
            portalItem: {
                id: "4f32e39e12b8499a9f3bb6e728b92c21",
            },
        }),
        container: "viewDiv",
        highlightOptions: {
            color: "red",
        },
    });
    window._view = view;
    window._map = view.map;
    
    view.when(function() {
        TimeSlider.init();
         navigationMenu_onCLick(window._mapViewType); // call on load for default enchrochment selection
    });

//     // Zoom to default extent
//     var camera = new Camera();
//     camera.position = {
//         latitude: 22.28243461819386,
//         longitude: 114.11128459073682,
//         z: 3762.2907671239227, // altitude in meters
//     };
//     camera.heading = 89.94190518013454;
//     camera.tilt = 65.10965027585844;
//     setTimeout(() => view.goTo(camera), 10000);

    /// Add fullscreen widget on map
    fullscreen = new Fullscreen({
        view: view,
    });
    view.ui.add(fullscreen, "bottom-left");
    // view.ui.add(fullscreenButton, "bottom-left");

//     //   let menuData = {
//     //     encroachment: null,
//     //     development: null,
//     //     landuse: null,
//     //     timeline: null,
//     //     complaints: null,
//     //   };

//     //   window.menuData = menuData;

//     // attach events on changing map view type

    let mapviewtypesNodes = document.querySelectorAll("[data-map-view-type]");
    mapviewtypesNodes.forEach((node) =>
        node.addEventListener("click", (evt) => {
            let type = evt.currentTarget.dataset.mapViewType;
            // window.clearHighlighting();
            if (type != window._mapViewType) {
                navigationMenu_onCLick(
                    evt.currentTarget.dataset.mapViewType,
                    evt.currentTarget
                );
            }
        })
    );

    $(document).ready(function() {
        $("#display_advance").hide();
        $(".carousel-indicators").hide();
        $(".esri-directions__panel-content").hide();
        // $(".carousel-inner").hide();
        $(".rightPanel2").css("margin-top", "7%");
        // $("#createSlideDiv").hide();
        // $("#slidesDiv").hide();
        // $("#searchWidget").hide();
        $("#unitData").show();
        $("#physicalform").hide();
        $("#statusContent").hide();

        // $('.filter').hide();
    });
    $("#homeDiv").on("click", function() {
        window.open(`${CONSTANTS.APP_URL}/index.html`);
    });

    $("#homeDiv").hover(function() {
        $("#homeText").css({
            display: "block",
        });
    });
    $("#homeDiv").mouseleave(function() {
        $("#homeText").css({
            display: "none",
        });
    });
    $("#computerDiv").hover(function() {
        $("#controlText").css({
            display: "block",
        });
    });
    $("#computerDiv").mouseleave(function() {
        $("#controlText").css({
            display: "none",
        });
    });
    $("#gavelDiv").hover(function() {
        $("#regulationText").css({
            display: "block",
        });
    });
    $("#gavelDiv").mouseleave(function() {
        $("#regulationText").css({
            display: "none",
        });
    });

    $("#calendarDiv").hover(function() {
        $("#calendarText").css({
            display: "block",
        });
    });
    $("#calendarDiv").mouseleave(function() {
        $("#calendarText").css({
            display: "none",
        });
    });
    $("#aboutDiv").hover(function() {
        $("#aboutText").css({
            display: "block",
        });
    });
    $("#aboutDiv").mouseleave(function() {
        $("#aboutText").css({
            display: "none",
        });
    });

    $("#rightSide li").click(function() {
        $("#rightSide .formPagination li").removeClass("active");
        $(this).toggleClass("active");

        // this.style = "background-color: #4B5D67;color: #F9F9F9 ;padding: 2px;border-radius: 40px 40px 40px 40px;margin-top:5px"
        // last-child.style.removeProperty("background-color");
    });

    $("#openStatus").click(function() {
        $("#statusContent").show();
        $("#unitData").hide();
        $("#physicalform").hide();
        $("#openStatus").addClass("active")
        $("#openUnit").removeClass("active")
        $("#openPhysical").removeClass("active")

    });

    $("#openPhysical").click(function() {
        $("#unitData").hide();
        $("#physicalform").show();
        $("#statusContent").hide();
        $("#openPhysical").addClass("active");
        $("#openStatus").removeClass("active");
        $("#openUnit").removeClass("active")

    });

    $("#openUnit").click(function() {
        $("#unitData").show();
        $("#physicalform").hide();
        $("#statusContent").hide();
        $("#openUnit").addClass("active")
        $("#openPhysical").removeClass("active");
        $("#openStatus").removeClass("active");
    });

    view.on("click", function(evt) {
        // view.popup = null;

        // Search for symbols on click's position
        view.hitTest(evt.screenPoint).then(function(response) {
            // Retrieve the first symbol
            var graphic = response.results[0].graphic;
            var specLayer = response.results[0].graphic.layer.id;
            objID = graphic.attributes.OBJECTID;

            $("#objectId").val(objID).prop("readonly", true);
            try {
                const layer = new FeatureLayer({
                    url: "https://services8.arcgis.com/DNeFZdA6rtbI0Fwv/arcgis/rest/services/HongKong_Final_Changedetection_5_WSL1/FeatureServer",
                });

                layer.queryFeatures({
                        where: `OBJECTID = '${objID}'`,
                        outFields: ["*"],
                    })
                    .then((data) => {
                        let feature = data.features.find(
                            (i) => i.attributes.OBJECTID === objID
                        );
                        console.log(data);
                        if (feature) {
                            $("#unitNameUnitDetails")
                                .val(feature.attributes.unit_name)
                                .focus();
                            $("#ownerNameUnitDetails")
                                .val(feature.attributes.owner_name)
                                .focus();
                            $("#developerNameUnitDetails")
                                .val(feature.attributes.developer_name)
                                .focus();
                            $("#addressUnitDetails").val(feature.attributes.address).focus();
                            $("#areaNameUnitDetails")
                                .val(feature.attributes.area_name)
                                .focus();
                            $("#descriptionUnitDetails")
                                .val(feature.attributes.Description)
                                .focus();
                            $("#objectIdPhysicalAttribute")
                                .val(objID)
                                .focus()
                                .prop("readonly", true);
                            $("#unitNamePhysicalAttribute")
                                .val(feature.attributes.unit_name)
                                .focus();
                            $("#areaPhysicalAttribute")
                                .val(feature.attributes.area1)
                                .focus()
                                .prop("readonly", true);
                            $("#zminPhysicalAttribute")
                                .val(feature.attributes.Z_Min)
                                .focus()
                                .prop("readonly", true);
                            $("#zmaxPhysicalAttribute")
                                .val(feature.attributes.Z_Max)
                                .focus()
                                .prop("readonly", true);
                            $("#volumePhysicalAttribute")
                                .val(feature.attributes.volume)
                                .focus()
                                .prop("readonly", true);
                            $("#heightPhysicalAttribute")
                                .val(feature.attributes.Height)
                                .focus()
                                .prop("readonly", true);
                            $("#longitudePhysicalAttribute")
                                .val(feature.attributes.longitude)
                                .focus()
                                .prop("readonly", true);
                            $("#latitudePhysicalAttribute")
                                .val(feature.attributes.latitude)
                                .focus()
                                .prop("readonly", true);
                            $("#complaints2015")
                                .val(feature.attributes.Complaints2015)
                                .focus();
                            $("#development2015")
                                .val(feature.attributes.Development2015)
                                .focus();
                            $("#landuse2015").val(feature.attributes.Landuse2015).focus();
                            $("#encroachment2015")
                                .val(feature.attributes.Encroachment2015)
                                .focus();
                            $("#complaints2016")
                                .val(feature.attributes.Complaints2016)
                                .focus();
                            $("#development2016")
                                .val(feature.attributes.Development2016)
                                .focus();
                            $("#landuse2016").val(feature.attributes.Landuse2016).focus();
                            $("#encroachment2016")
                                .val(feature.attributes.Encroachment2016)
                                .focus();
                            $("#complaints2017")
                                .val(feature.attributes.Complaints2017)
                                .focus();
                            $("#development2017")
                                .val(feature.attributes.Development2017)
                                .focus();
                            $("#landuse2017").val(feature.attributes.Landuse2017).focus();
                            $("#encroachment2017")
                                .val(feature.attributes.Encroachment2017)
                                .focus();
                            $("#complaints2018")
                                .val(feature.attributes.Complaints2018)
                                .focus();
                            $("#development2018")
                                .val(feature.attributes.Development2018)
                                .focus();
                            $("#landuse2018").val(feature.attributes.Landuse2018).focus();
                            $("#encroachment2018")
                                .val(feature.attributes.Encroachment2018)
                                .focus();
                            $("#complaints2019")
                                .val(feature.attributes.Complaints2019)
                                .focus();
                            $("#development2019")
                                .val(feature.attributes.Development2019)
                                .focus();
                            $("#landuse2019").val(feature.attributes.Landuse2019).focus();
                            $("#encroachment2019")
                                .val(feature.attributes.Encroachment2019)
                                .focus();
                            $("#complaints2020")
                                .val(feature.attributes.Complaints2020)
                                .focus();
                            $("#development2020")
                                .val(feature.attributes.Development2020)
                                .focus();
                            $("#landuse2020").val(feature.attributes.Landuse2020).focus();
                            $("#encroachment2020")
                                .val(feature.attributes.Encroachment2020)
                                .focus();
                            $("#complaints2021")
                                .val(feature.attributes.Complaints2021)
                                .focus();
                            $("#development2021")
                                .val(feature.attributes.Development2021)
                                .focus();
                            $("#landuse2021").val(feature.attributes.Landuse2021).focus();
                            $("#encroachment2021")
                                .val(feature.attributes.Encroachment2021)
                                .focus();
                            $("#complaints2022")
                                .val(feature.attributes.Complaints2022)
                                .focus();
                            $("#development2022")
                                .val(feature.attributes.Development2022)
                                .focus();
                            $("#landuse2022").val(feature.attributes.Landuse2022).focus();
                            $("#encroachment2022")
                                .val(feature.attributes.Encroachment2022)
                                .focus();
                            $("#complaints2023")
                                .val(feature.attributes.Complaints2023)
                                .focus();
                            $("#development2023")
                                .val(feature.attributes.Development2023)
                                .focus();
                            $("#landuse2023").val(feature.attributes.Landuse2023).focus();
                            $("#encroachment2023")
                                .val(feature.attributes.Encroachment2023)
                                .focus();
                            $("#complaints2024")
                                .val(feature.attributes.Complaints2024)
                                .focus();
                            $("#development2024")
                                .val(feature.attributes.Development2024)
                                .focus();
                            $("#landuse2024").val(feature.attributes.Landuse2024).focus();
                            $("#encroachment2024")
                                .val(feature.attributes.Encroachment2024)
                                .focus();
                            $("#complaints2025")
                                .val(feature.attributes.Complaints2025)
                                .focus();
                            $("#development2025")
                                .val(feature.attributes.Development2025)
                                .focus();
                            $("#landuse2025").val(feature.attributes.Landuse2025).focus();
                            $("#encroachment2025")
                                .val(feature.attributes.Encroachment2025)
                                .focus();
                            $("#attachments").val(feature.attributes.photo);
                            $("#surfaceAreaPhysicalAttribute").val(feature.attributes.SArea);
                            $("#commentPhysicalAttribute").val(feature.attributes.comment);
                            $("#carpetAreaPhysicalAttribute").val(
                                feature.attributes.Carpet_Area
                            );
                            $("#yearConstructed").val(feature.attributes.date_constructed);
                            $("#yearDemolished").val(feature.attributes.date_demolished);
                            $("#recordDate").val(feature.attributes.Record_Data);
                            $("#physicalAttributeyearConstructed").val(
                                feature.attributes.date_constructed
                            );
                            $("#physicalAttributeyearDemolished").val(
                                feature.attributes.date_demolished
                            );
                            $("#physicalAttributerecordDate").val(
                                feature.attributes.Record_Data
                            );
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            } catch (e) {
                console.log(e);
            }
        });
    });

    function isInvalid() {
        let isInvalid = false;

        if (!$("#objectId").val()) {
            $("#objectId").next().show();
            isInvalid = true;
        } else {
            $("#objectId").next().hide();
        }
        if (!$("#ownerNameUnitDetails").val()) {
            $("#ownerNameUnitDetails").next().show();
            isInvalid = true;
        } else {
            $("#ownerNameUnitDetails").next().hide();
        }
        if (!$("#unitNameUnitDetails").val()) {
            $("#unitNameUnitDetails").next().show();
            isInvalid = true;
        } else {
            $("#unitNameUnitDetails").next().hide();
        }
        if (!$("#developerNameUnitDetails").val()) {
            $("#developerNameUnitDetails").next().show();
            isInvalid = true;
        } else {
            $("#developerNameUnitDetails").next().hide();
        }
        if (!$("#addressUnitDetails").val()) {
            $("#addressUnitDetails").next().show();
            isInvalid = true;
        } else {
            $("#addressUnitDetails").next().hide();
        }
        if (!$("#areaNameUnitDetails").val()) {
            $("#areaNameUnitDetails").next().show();
            isInvalid = true;
        } else {
            $("#areaNameUnitDetails").next().hide();
        }
        if (!$("#descriptionUnitDetails").val()) {
            $("#descriptionUnitDetails").next().show();
            isInvalid = true;
        } else {
            $("#descriptionUnitDetails").next().hide();
        }
        if (!$("#yearConstructed").val()) {
            $("#yearConstructed").next().show();
            isInvalid = true;
        } else {
            $("#yearConstructed").next().hide();
        }
        if (!$("#yearDemolished").val()) {
            $("#yearDemolished").next().show();
            isInvalid = true;
        } else {
            $("#yearDemolished").next().hide();
        }
        if (!$("#recordDate").val()) {
            $("#recordDate").next().show();
            isInvalid = true;
        } else {
            $("#recordDate").next().hide();
        }
        // if (!$("#customFile").val()) {
        //   $("#customFile").next().show();
        //   isInvalid = true;
        // } else {
        //   $("#customFile").next().hide();
        // }
        return isInvalid;
    }
    $("#saveUnitDetail").on("click", (event) => {
        if (!objID) {
            swal({
                title: "Select Id First",
                text: "",
                icon: "warning",
                button: "Ok",
            });
            return;
        }
        // const formData = new FormData();
        // formData.append("avatar", $("#attachments")[0].files[0]);

        if (isInvalid()) {
            return;
        } else {
            let test = parseInt($("#yearConstructed").val());
            const attributes = {
                OBJECTID: $("#objectId").val(),
                unit_name: $("#unitNameUnitDetails").val(),
                owner_name: $("#ownerNameUnitDetails").val(),
                developer_name: $("#developerNameUnitDetails").val(),
                address: $("#addressUnitDetails").val(),
                area_name: $("#areaNameUnitDetails").val(),
                Description: $("#descriptionUnitDetails").val(),
                date_constructed: test,
                date_demolished: parseInt($("#yearDemolished").val()),
                Record_Data: parseInt($("#recordDate").val()),
            };

            let graphics_edit = new Graphic(null, null, attributes);
            let hongkong_fl = new FeatureLayer(
                "https://services8.arcgis.com/DNeFZdA6rtbI0Fwv/arcgis/rest/services/HongKong_Final_Changedetection_5_WSL1/FeatureServer"
            );

            console.log(graphics_edit);
            hongkong_fl
                .applyEdits({
                    updateFeatures: [graphics_edit],
                }, {
                    rollbackOnFailureEnabled: true,
                })
                .then(({ updateFeatureResults }) => {
                    if (updateFeatureResults[0].error) {
                        // error log
                        alert("error");
                    } else {
                        swal({
                            title: "Id Updated",
                            text: "",
                            icon: "success",
                            button: "Ok",
                        });
                    }
                })
                .catch((err) => {});
        }
        // $.ajax({
        //     type: 'Post',
        //     data: JSON.stringify(attributes),
        //     contentType: 'application/json',
        //     url: 'http://localhost:3000/postData',
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`
        //     },
        //     success: function (response) {
        //

        //         // $.ajax({
        //         //     url: 'http://localhost:3000/upload-file',
        //         //     data: formData,
        //         //     type: 'POST',
        //         //     headers: {
        //         //         'Authorization': `Bearer ${user.token}`
        //         //     },

        //         //     contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        //         //     processData: false, // NEEDED, DON'T OMIT THIS
        //         //     success: function () {

        //         //     },
        //         //     error: (e) => {
        //         //         if (e) {

        //         //         }

        //         //     }

        //         // });

        //     },
        //     error: (err) => {
        //
        //     }
        // });
    });

    //physical attribute code starts
    function isphysicalInvalid() {
        let isphysicalInvalid = false;

        if (!$("#commentPhysicalAttribute").val()) {
            $("#commentPhysicalAttribute").next().show();
            isphysicalInvalid = true;
        } else {
            $("#commentPhysicalAttribute").next().hide();
        }
        if (!$("#carpetAreaPhysicalAttribute").val()) {
            $("#carpetAreaPhysicalAttribute").next().show();
            isphysicalInvalid = true;
        } else {
            $("#carpetAreaPhysicalAttribute").next().hide();
        }
        if (!$("#physicalAttributerecordDate").val()) {
            $("#physicalAttributerecordDate").next().show();
            isphysicalInvalid = true;
        } else {
            $("#physicalAttributerecordDate").next().hide();
        }
        if (!$("#physicalAttributeyearDemolished").val()) {
            $("#physicalAttributeyearDemolished").next().show();
            isphysicalInvalid = true;
        } else {
            $("#physicalAttributeyearDemolished").next().hide();
        }
        if (!$("#physicalAttributeyearConstructed").val()) {
            $("#physicalAttributeyearConstructed").next().show();
            isphysicalInvalid = true;
        } else {
            $("#physicalAttributeyearConstructed").next().hide();
        }

        return isphysicalInvalid;
    }
    $("#savePhysicalAttribute").on("click", (event) => {
        if (isphysicalInvalid()) {
            return;
        }
        let yearConstruct = parseInt($("#yearConstructed").val());

        const attributes = {
            OBJECTID: $("#objectIdPhysicalAttribute").val(),
            unit_name: $("#unitNamePhysicalAttribute").val(),
            area1: $("#areaPhysicalAttribute").val(),
            volume: $("#volumePhysicalAttribute").val(),
            address: $("#addressUnitDetails").val(),
            Z_Max: $("#zmaxPhysicalAttribute").val(),
            Z_Min: $("#zminPhysicalAttribute").val(),
            Height: $("#heightPhysicalAttribute").val(),
            latitude: $("#latitudePhysicalAttribute").val(),
            longitude: $("#longitudePhysicalAttribute").val(),
            comment: $("#commentPhysicalAttribute").val(),
            Carpet_Area: $("#carpetAreaPhysicalAttribute").val(),
            SArea: $("#surfaceAreaPhysicalAttribute").val(),
            date_constructed: yearConstruct,
            date_demolished: parseInt($("#yearDemolished").val()),
            Record_Data: parseInt($("#recordDate").val()),
        };

        let graphics_edit = new Graphic(null, null, attributes);
        let hongkong_fl = new FeatureLayer(
            "https://services8.arcgis.com/DNeFZdA6rtbI0Fwv/arcgis/rest/services/HongKong_Final_Changedetection_5_WSL1/FeatureServer"
        );

        hongkong_fl
            .applyEdits({
                updateFeatures: [graphics_edit],
            }, {
                rollbackOnFailureEnabled: true,
            })
            .then(({ updateFeatureResults }) => {
                if (updateFeatureResults[0].error) {
                    // error log
                    alert("error");
                } else {
                    swal({
                        title: "Id Updated",
                        text: "",
                        icon: "success",
                        button: "Ok",
                    });
                }
            })
            .catch((err) => {});

        // $.ajax({
        //     type: 'Post',
        //     data: JSON.stringify(attributes),
        //     contentType: 'application/json',
        //     url: 'http://localhost:3000/postData',
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`
        //     },

        //     success: function (response) {

        //         swal({
        //             title: "Id Updated",
        //             text: "",
        //             icon: "success",
        //             button: "Ok",
        //         });
        //     },
        //     error: () => {

        //     }
        // });
    });

    $("#deleteUnitDetail").on("click", () => {
        if (!objID) {
            return;
        }
        const attributes = {
            OBJECTID: $("#objectId").val(),
            unit_name: "",
            owner_name: "",
            developer_name: "",
            address: "",
            area_name: "",
            Description: "",
            date_constructed: "",
            date_demolished: "",
            Record_Data: "",
        };
        let graphics_edit = new Graphic(null, null, attributes);
        let hongkong_fl = new FeatureLayer(
            "https://services8.arcgis.com/DNeFZdA6rtbI0Fwv/arcgis/rest/services/HongKong_Final_Changedetection_5_WSL1/FeatureServer"
        );

        hongkong_fl
            .applyEdits({
                updateFeatures: [graphics_edit],
            }, {
                rollbackOnFailureEnabled: true,
            })
            .then(({ updateFeatureResults }) => {
                if (updateFeatureResults[0].error) {
                    // error log
                    alert("error");
                } else {
                    swal({
                        title: "Id Deleted",
                        text: "",
                        icon: "info",
                        button: "Ok",
                    });
                }
            })
            .catch((err) => {});

        // $.ajax({
        //     type: 'Post',
        //     data: JSON.stringify(attributes),
        //     contentType: 'application/json',
        //     url: 'http://localhost:3000/postData/',
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`
        //     },
        //     success: function (response) {
        //         res = response;

        //         swal({
        //             title: "Id Deleted",
        //             text: "",
        //             icon: "info",
        //             button: "Ok",
        //         });

        //     },
        //     error: () => {

        //     }
        // });
    });

    $("#deletePhysicalAttribute").on("click", () => {
        if (!objID) {
            return;
        }
        const attributes = {
            OBJECTID: $("#objectIdPhysicalAttribute").val(),
            unit_name: "",
            area1: "",
            volume: "",
            address: "",
            Z_Max: "",
            Z_Min: "",
            Height: "",
            latitude: "",
            longitude: "",
            comment: "",
            Carpet_Area: "",
            SArea: "",
        };

        let graphics_edit = new Graphic(null, null, attributes);
        let hongkong_fl = new FeatureLayer(
            "https://services8.arcgis.com/DNeFZdA6rtbI0Fwv/arcgis/rest/services/HongKong_Final_Changedetection_5_WSL1/FeatureServer"
        );

        hongkong_fl
            .applyEdits({
                updateFeatures: [graphics_edit],
            }, {
                rollbackOnFailureEnabled: true,
            })
            .then(({ updateFeatureResults }) => {
                if (updateFeatureResults[0].error) {
                    // error log
                    alert("error");
                } else {
                    alert("id deleted");
                }
            })
            .catch((err) => {});
    });

    // Status Form post data
    $("#stausSaveBtn").on("click", (event) => {
        if (!objID) {
            swal({
                title: "Select Id First",
                text: "",
                icon: "warning",
                button: "Ok",
            });
            return;
        }
        
        
   

        

        const years = [
            2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ];
        const attr = {};

        years.forEach((year) => {
            attr[`Complaints${year}`] = $(`#complaints${year}`).val();
            attr[`Development${year}`] = $(`#development${year}`).val();
            attr[`Encroachment${year}`] = $(`#encroachment${year}`).val();
            attr[`Landuse${year}`] = $(`#landuse${year}`).val();
        });
        attr["OBJECTID"] = objID;

        let graphics_edit = new Graphic(null, null, attr);
        let hongkong_fl = new FeatureLayer(
            "https://services8.arcgis.com/DNeFZdA6rtbI0Fwv/arcgis/rest/services/HongKong_Final_Changedetection_5_WSL1/FeatureServer"
        );

        hongkong_fl
            .applyEdits({
                updateFeatures: [graphics_edit],
            }, {
                rollbackOnFailureEnabled: true,
            })
            .then(({ updateFeatureResults }) => {
                if (updateFeatureResults[0].error) {
                    // error log
                    alert("error");
                } else {
                    swal({
                        title: "Id Updated",
                        text: "",
                        icon: "success",
                        button: "Ok",
                    });
                }
            })
            .catch((err) => {});

        // $.ajax({
        //     type: 'Post',
        //     data: JSON.stringify(attr),
        //     contentType: 'application/json',
        //     url: 'http://localhost:3000/postData',
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`
        //     },
        //     success: function (response) {

        //         swal({
        //             title: "Id Updated",
        //             text: "",
        //             icon: "success",
        //             button: "Ok",
        //         });

        //     },
        //     error: () => {

        //     }
        // });
    });

    $("#statusDeleteBtn").on("click", (event) => {
        if (!objID) {
            swal({
                title: "Select Id First",
                text: "",
                icon: "warning",
                button: "Ok",
            });
            return;
        }

        // data.objectId = $("#objectId").val();
        // data.ownerNameUnitDetails = $("#ownerNameUnitDetails").val()
        // data.unitNameUnitDetails = $("#unitNameUnitDetails").val()
        // data.developerNameUnitDetails = $("#developerNameUnitDetails").val()
        // data.areaNameUnitDetails = $("#areaNameUnitDetails").val()
        // data.addressUnitDetails = $("#addressUnitDetails").val()
        // data.descriptionUnitDetails = $("#descriptionUnitDetails").val()
        // data.yearConstructed = $("#yearConstructed").val()
        // data.yearDemolished = $("#yearDemolished").val()

        const years = [
            2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
        ];
        const attr = {};

        years.forEach((year) => {
            attr[`Complaints${year}`] = "";
            attr[`Development${year}`] = "";
            attr[`Encroachment${year}`] = "";
            attr[`Landuse${year}`] = "";
        });
        attr["OBJECTID"] = objID;

        let graphics_edit = new Graphic(null, null, attr);
        let hongkong_fl = new FeatureLayer(
            "https://services8.arcgis.com/DNeFZdA6rtbI0Fwv/arcgis/rest/services/HongKong_Final_Changedetection_5_WSL1/FeatureServer"
        );

        hongkong_fl
            .applyEdits({
                updateFeatures: [graphics_edit],
            }, {
                rollbackOnFailureEnabled: true,
            })
            .then(({ updateFeatureResults }) => {
                if (updateFeatureResults[0].error) {
                    // error log
                    alert("error");
                } else {
                    swal({
                        title: "Id deleted",
                        text: "",
                        icon: "info",
                        button: "Ok",
                    });
                }
            })
            .catch((err) => {});
    });
    //   const obj = Object.assign({}, user);
    //   document.getElementById("computerButton").addEventListener("click", () => {
    //     $.ajax({
    //       type: "POST",
    //       url: `${CONSTANTS.API_URL}/controlPanel`,
    //       data: {
    //         obj,
    //       },
    //       headers: {
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //       success: () => {
    //         window.open(`${CONSTANTS.APP_URL}/controlPanel.html`);
    //       },
    //       error: (err) => {
    //         if (err.status === 500) {
    //           swal({
    //             title: "You are not Authorized for this service",
    //             text: "",
    //             icon: "error",
    //             button: "Ok",
    //           });
    //         }
    //       },
    //     });
    //   });

    // navigationMenu_onCLick(window._mapViewType) // call on load for default enchrochment selection

    function navigationMenu_onCLick(type, target) {
        if (!target) target = document.querySelector(".menu ul li");
        Legend.setLegend(type);
        // let type = evt.currentTarget.dataset.mapViewType
        document
            .querySelectorAll(".menu ul li")
            .forEach((n) => n.classList.remove("active"));
        target.classList.toggle("active");
        window._mapViewType = type;
        let bdgLayer = window._map.layers.find((l) => l.title == "HongKong");
        TimeSlider.updateMap(window._appState ? window._appState.selectedYear : 2015);
        // window.renderingBuildingColor(
        //     type,
        //     window._appState ? window._appState.selectedYear : 2015,
        //     bdgLayer
        // );
    }
});