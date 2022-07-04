define(["esri/core/Accessor"], function() {
    let subscribedEvents = {};

    return {
        subscribe: function(name, cb) {
            if (Array.isArray(subscribedEvents[name]) == false) {
                subscribedEvents[name] = [];
            }
            subscribedEvents[name].push(cb);
        },

        disableWidgets: function() {
            if (Array.isArray(subscribedEvents["DisablingWidgets"])) {
                subscribedEvents["DisablingWidgets"].forEach((cb) => cb());
            }

            
            // SET WIDGT DIV COUNT NULL FOR  WIDDGET
            // document.getElementById("widgetDivCont").innerHTML = "";
            // widgetDivCont.style.display = "none";

            // if (window.areaWidgets) window.areaWidgets.viewModel.clear();

            // if (window.distanceWidgets) window.distanceWidgets.viewModel.clear();

            // // if (activeWidgetDist) activeWidgetDist.viewModel.clear();

            // // SET ESRI STORAGE NONE FOR BASEMAP WIDGET
            // $(".esri-view .esri-view-user-storage").css({
            //     display: "none",
            // });

            // $("#filtersvg").css({
            //     fill: "",
            // });

            // $(".filter").hide();

            // $("#filterButton").css({
            //     "background-color": "",
            // });
            // $("#areaButton").css({
            //     "background-color": "",
            // });
            // $("#areasvg").css({
            //     fill: "",
            // });
            // $("#distanceButton").css({
            //     "background-color": "",
            // });
            // $("#distancesvg").css({
            //     fill: "",
            // });
            // $("#basemapBtn").css({
            //     "background-color": "",
            // });
            // $("#basemapsvg").css({
            //     fill: "",
            // });
            // $("#slideWidget").css({
            //     "background-color": "",
            // });
            // $("#slidersvg").css({
            //     fill: "",
            // });

            // $("#screenshotBtn").css({
            //     "background-color": "",
            // });
            // $("#screenshotsvg").css({
            //     fill: "",
            // });
            // $("#directionButton").css({
            //     "background-color": "",
            // });
            // $("#directionsvg").css({
            //     fill: "",
            // });

            // $("#dayBtn").css({
            //     "background-color": "",
            // });
            // $("#daysvg").css({
            //     fill: "",
            // });
            // $("#llBtn").css({
            //     "background-color": "",
            // });
            // $("#linesvg").css({
            //     fill: "",
            // });
            // $("#selectBtn").css({
            //     "background-color": "",
            // });
            // $("#selectsvg").css({
            //     fill: "",
            // });

            // $("#createSlideDiv").hide();
            // document.getElementById("slidesDiv").style.visibility = "hidden";
            // $("#buildingDetail").hide();
            // $(".esri-directions__panel-content").hide();
            // $(".esri-direct-line-measurement-3d__container").css({
            //     display: "none",
            // });
            // $(".esri-area-measurement-3d__container").css({
            //     display: "none",
            // });
            // $(".esri-line-of-sight__container").css({
            //     display: "none",
            // });

            // document.getElementById("widgetDivCont").innerHTML = "";
            // queryDiv.style.display = "none";

            // document.getElementById("dataTableContent").style.display = "none";
            // document.getElementsByClassName("closeCharts")[0].style.display = "none";
            // document.getElementById("charts_image").style.visibility = "visible";
            // document.getElementById("closeback").style.display = "none";
            // document.getElementsByClassName("charts")[0].style.display = "none";
            // document.getElementById("searchWidget").style.display = "none";
        },

        disableTopRightWidgets: () => {
            if (Array.isArray(subscribedEvents["DisablingTopRightWidgets"])) {
                subscribedEvents["DisablingTopRightWidgets"].forEach((cb) => cb());
            }

            $("#searchWidget").hide();
            // $(".legend").hide();
            $(".esri-layer-list__list").hide()
            $(".esri-component.esri-time-slider").hide();

            // $(".esri-layer-list__list").css({
            //     display: "none",
            // });

            // $("#layerListButton").css({
            //     fill: "",
            // });
            // $("#layerListDiv").css({
            //     "background-color": "",
            // });
            // $("#legendButton").css({
            //     fill: "",
            // });
            // $("#legendDiv").css({
            //     "background-color": "",
            // });
            // $("#timeSlideButton").css({
            //     fill: "",
            // });
            // $("#timeSlideDiv").css({
            //     "background-color": "",
            // });

            // document.getElementsByClassName("legend")[0].style.display = "none";
        },

        toCamelCase: (input) => {
            if (input) {
                if (input <= 2025) {
                    return input.replace(input, `timeline${input}`);
                } else {
                    let string = input
                        .toLowerCase()
                        .split(" ")
                        .map((string, index, arr) => {
                            if (arr.length == 1)
                                return string.replace(string[0], string[0].toLowerCase());
                            else
                                return string.replace(
                                    string.charAt(0),
                                    string.charAt(0).toUpperCase()
                                );
                        });
                    string[0] = string[0].toLowerCase();
                    return string.join("");
                }
            }
        },
        disableControlPanelWidgets: () => {
            if (Array.isArray(subscribedEvents["DisablingControlPanelWidgets"])) {
                subscribedEvents["DisablingControlPanelWidgets"].forEach((cb) => cb());
            }
            $(".esri-view .esri-view-user-storage").css({
                display: "none",
            });
            $("#searchWidget").hide();
            $("#legend-container").hide();
            $("#layerlist").hide()

             document.getElementById("forms").style.display = "none"

        },
    };
});
