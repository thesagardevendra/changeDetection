window.Legend = {
    color_config: null,
    setLegend: null,
};

define(["js/Common.js"], function (Common) {
    let isActive = false;
    Common.subscribe('DisablingControlPanelWidgets', () => {
        isActive = false;
        $("#legendDiv").removeClass('active')
    });
    document.getElementById("legendDiv").addEventListener("click", (evt) => {
        if (window._statusPage == "controlPanel") {
            if (!isActive) {
                if (window._statusPage == "controlPanel") {
                    Common.disableControlPanelWidgets();
                }
                document.getElementById("legend-container").style.display = "flex";
                isActive = true;
            } else {
                document.getElementById("legend-container").style.display = "none";
                isActive = false;
            }
        }
        });
        
    let legends = {
        Encroachment: [
            { name: "legal change", color: "#39F9BC" },
            { name: "illegal change", color: "#CB2C2A" },
            {
                name: "illegal",
                color: "#F07167",
            },
            {
                name: "for demolition",
                color: "#6A7DDC",
            },
            {
                name: "demolished",
                color: "#0070FF",
            },
            {
                name: "no change",
                color: "#FCEFEF",
            },
            {
                name: "disputed",
                color: "#FFFD70",
            },
            {
                name: "verification pending",
                color: "#51E5FF",
            },
        ],
        Development: [{
            name: "under construction",
            color: "#FFFD70",
        },
        {
            name: "under maintainence",
            color: "#51E5FF",
        },
        {
            name: "completed",
            color: "#39F9BC",
        },
        {
            name: "demolished",
            color: "#0070FF",
        },
        {
            name: "for demolition",
            color: "#6A7DDC",
        },
        {
            name: "stopped",
            color: "#F07167",
        },
        {
            name: "depleted",
            color: "#CB2C2A",
        },
        {
            name: "proposed",
            color: "#B730E8",
        },
        {
            name: "planned",
            color: "#FFA500",
        },
        {
            name: "unaffected",
            color: "#FCEFEF",
        },
        ],
        Timeline: [
            { name: "2015", color: "#1E6091" },
            { name: "2016", color: "#1A759F" },
            { name: "2017", color: "#168AAD" },
            { name: "2018", color: "#34A0A4" },
            { name: "2019", color: "#52B69A" },
            { name: "2020", color: "#76C893" },
            { name: "2021", color: "#99D98C" },
            { name: "2022", color: "#B5E48c" },
            { name: "2023", color: "#D9ED92" },
            { name: "2024", color: "#E1F1A7" },
            { name: "2025", color: "#092134" },
        ],
        Landuse: [
            { name: "residential", color: "#FE938C" },
            { name: "commericial", color: "#5CB9FF" },
            { name: "governmental", color: "#A1DB43" },
            { name: "mixed use", color: "#F2E863" },
            { name: "commercial residential mix", color: "#F68551" },
            { name: "institutional", color: "#B730E8" },
            { name: "educational", color: "#D2504B" },
            { name: "utilities", color: "#FC30CD" },
            { name: "not specified ", color: "#FCEFEF" },
            { name: "recreational", color: "#0070FF" },
            { name: "industrial", color: "#FF0000" },
        ],

        Complaints: [
            { name: "inspected", color: "#39B0FF" },
            { name: "complaint closed", color: "#39F9BC" },
            { name: "assigned", color: "#FFFD70" },
            { name: "reported", color: "#CB2C2A" },
            { name: "no complaints", color: "#FCEFEF" },
        ],
    };

    let visibleLegends = [];

    toCapitalCase = (input) => {
        if (input <= 2025) {
            return input
        } else {
            return input.replace(/([a-z])([A-Z][a-z])/g, "$1 $2").charAt(0).toUpperCase() + input.slice(1).replace(/([a-z])([A-Z][a-z])/g, "$1 $2");
        }
    }

    function setLegend(buildingType) {
        sublegend.splice(0, sublegend.length);
        if (buildingType) {
            buildingType = buildingType
                .split("")
                .map((a, i) => (i == 0 ? a.toUpperCase() : a))
                .join("");
            // buildingType = buildingType.toLowerCase()

            let container = document.querySelector("#legend-container");
            container.setAttribute("data-building-type", buildingType);

            // CLear legends in container
            container.innerHTML = "";

            try {
                let legend = legends[buildingType];

                visibleLegends = legend.map((l) => {
                    let section = document.createElement("section");
                    let lbl = document.createElement("label");
                    let span = document.createElement("span");
                    a = toCapitalCase(l.name)
                    lbl.innerHTML = a;
                    lbl.classList.add("legendbtn");

                    span.classList.add("checkmark9");
                    span.style.backgroundColor = l.color;
                    lbl.appendChild(span);
                    section.appendChild(lbl);

                    section.setAttribute("data-active-status", "OFF");
                    // section.setAttribute("data-legend-name", l.name)
                    section.legendinfo = l;
                    section.onclick = (evt) => {
                        // section.setAttribute("data-active-status", "ON")
                        onLegendClick(section, buildingType);
                    };

                    container.appendChild(section);

                    return section;
                });
            } catch (err) {
                console.error(err);
                alert("Something went wrong");
            }
        }
    }

    let sublegend = [];

    function onLegendClick(target, buildingType) {
        if (target) {
            // let target = evt.target // one section

            let isActive = target.dataset.activeStatus == "ON";
            if (isActive) target.dataset.activeStatus = "OFF";
            else target.dataset.activeStatus = "ON";

            let bdgLayer = window._map.layers.find((l) => l.title == "HongKong");

            if (target.dataset.activeStatus == "ON") {
                // document
                //   .querySelectorAll(".checkmark9")
                //   .forEach((element) => (element.style.border = "none"));

                // document
                //   .querySelectorAll("section")
                //   .forEach((i) => (i.dataset.activeStatus = "OFF"));

                target.childNodes[0].getElementsByClassName(
                    "checkmark9"
                )[0].style.border = "3px solid black";

                target.dataset.activeStatus = "ON";

                sublegend.push(
                    visibleLegends.find(
                        (vl) => vl.legendinfo.name == target.legendinfo.name
                    )
                );

                let fieldName = `${buildingType}${window._appState.selectedYear}`;
                if (buildingType == "Timeline") fieldName = "date_constructed";
                // bdgLayer

                bdgLayer.renderer = {
                    type: "unique-value",
                    field: fieldName, //"Landuse2017",
                    // field2:"Landuse2016",
                    defaultSymbol: {
                        type: "mesh-3d", // autocasts as new MeshSymbol3D()
                        symbolLayers: [{
                            type: "fill", // autocasts as new FillSymbol3DLayer()
                            material: {
                                color: [230, 230, 230, 0.7],
                                // We are not interested in these buildings, but we keep them for context
                                // We want to remove the texture so we set the colorMixMode to replace
                                colorMixMode: "replace",
                            },
                            edges: {
                                type: "solid",
                                color: [0, 0, 0, 0.6],
                                size: 1,
                            },
                        },],
                    },

                    uniqueValueInfos: sublegend.map((i) => ({
                        // All features with value of "North" will be blue
                        value: i.legendinfo.name,
                        label: i.legendinfo.name,
                        symbol: {
                            type: "mesh-3d",
                            symbolLayers: [{
                                type: "fill",
                                material: {
                                    color: i.legendinfo.color,
                                },
                                edges: {
                                    type: "solid",
                                    color: [0, 0, 0, 0.6],
                                    size: 1,
                                },
                            },],
                        },
                    })),
                };
            } else {
                // remove render

                target.childNodes[0].getElementsByClassName(
                    "checkmark9"
                )[0].style.border = "none";
                sublegend = sublegend.filter(
                    (i) => i.legendinfo.name != target.legendinfo.name
                );
                let fieldName = `${buildingType}${window._appState.selectedYear}`;
                if (buildingType == "Timeline") fieldName = "date_constructed";
                bdgLayer.renderer = {
                    type: "unique-value",
                    field: fieldName, //"Landuse2017",
                    // field2:"Landuse2016",
                    defaultSymbol: {
                        type: "mesh-3d", // autocasts as new MeshSymbol3D()
                        symbolLayers: [{
                            type: "fill", // autocasts as new FillSymbol3DLayer()
                            material: {
                                color: [230, 230, 230, 0.7],
                                // We are not interested in these buildings, but we keep them for context
                                // We want to remove the texture so we set the colorMixMode to replace
                                colorMixMode: "replace",
                            },
                            edges: {
                                type: "solid",
                                color: [0, 0, 0, 0.6],
                                size: 1,
                            },
                        },],
                    },
                    uniqueValueInfos: sublegend.map((i) => ({
                        // All features with value of "North" will be blue
                        value: i.legendinfo.name,
                        label: i.legendinfo.name,
                        symbol: {
                            type: "mesh-3d",
                            symbolLayers: [{
                                type: "fill",
                                material: {
                                    color: i.legendinfo.color,
                                },
                                edges: {
                                    type: "solid",
                                    color: [0, 0, 0, 0.6],
                                    size: 1,
                                },
                            },],
                        },
                    })),
                };
            }
        }
        if (window._statusPage == "index" && buildingType != "Timeline") legendChartsUpdate(buildingType);

    }

    function legendChartsUpdate(buildingType) {

        buildingType = buildingType
            .split("")
            .map((a, i) => (i == 0 ? a.toLowerCase() : a))
            .join("");

        window.formatDataForGraph(window.menuData[buildingType]["features"], buildingType).then((data) => {
            graphs = {};

            sublegend.forEach((i) => {
                if (data[window._appState["selectedYear"]][i.legendinfo.name]) {
                    graphs[window._appState["selectedYear"]] =
                        graphs[window._appState["selectedYear"]] || {};

                    graphs[window._appState["selectedYear"]][i.legendinfo.name] =
                        graphs[window._appState["selectedYear"]][i.legendinfo.name] || {};

                    graphs[window._appState["selectedYear"]][i.legendinfo.name] =
                        data[window._appState["selectedYear"]][i.legendinfo.name];
                }
            });

            Charts.DrawChart(buildingType, window._appState["selectedYear"], graphs);
        })

    }

    window.Legend.color_config = legends;
    window.Legend.setLegend = setLegend;

});