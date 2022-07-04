
window.Filter = {
    LoadSubAttr: null, clear: null
}



define([
    "js/Common.js",
    "esri/layers/FeatureLayer",
    "js/DataTable.js"
], function (Common, FeatureLayer, DataTable) {
    // data
    // cht = new Chart(data)
    // div -> chrt

    let isActive = false;

    let btnFilter = document.getElementById("filterButton");
    let filterContainer = document.querySelector(".filter");
    let filterByNodeContainer = document.querySelector(".filterBy1");

    Common.subscribe("DisablingWidgets", () => {
        isActive = false
        filterContainer.style.display = "none";
        $("#filterButton").removeClass("active")
    });

    btnFilter.addEventListener("click", function () {
        if (!isActive) {
            Common.disableWidgets();

            // $("#filterButton").css({
            //     "background-color": "#4B5D67",
            // });
            // $("#filtersvg").css({
            //     fill: "#F9F9F9 ",
            // });

            filterContainer.style.display = "flex";
            $("#filterButton").addClass("active")
            // window.Charts.chartsCarouselOpner(window._mapViewType);

            // document.getElementsByClassName("closeCharts")[0].style.display = "block";
            // document.getElementById("charts_image").style.visibility = "hidden";
            // document.getElementById("closeback").style.display = "block";
            // document.getElementsByClassName("legend")[0].style.top = "641px";
            // document.getElementsByClassName("charts")[0].style.display = "block";

            Charts.closeChart()

            // //Removing timeSlider
            // $("#timeSlideButton").css({
            //     fill: "",
            // });
            // $("#timeSlideDiv").css({
            //     "background-color": "",
            // });

            $(".esri-component.esri-time-slider").hide();

            isActive = true;
        } else {
            //    window.Charts.chartsCarouselOpner(window._mapViewType);

            // document.getElementsByClassName("closeCharts")[0].style.display = "block";
            // document.getElementById("charts_image").style.visibility = "hidden";
            // document.getElementById("closeback").style.display = "block";
            // document.getElementsByClassName("legend")[0].style.top = "984px";
            // document.getElementsByClassName("charts")[0].style.display = "block";


            Common.disableWidgets(); //isActive = false
        }
    });

    document.getElementById("clearBtn").addEventListener("click", () => {

        Clear()
        window.formatDataForGraph(
            window.menuData[window._mapViewType].features,
            window._mapViewType
        ).then(d => Charts.DrawChart(window._mapViewType, window._appState.selectedYear, d))

    });

    let filterBy = {
        Area: 115000,
        "Area name": [
            "Causeway Bay",
            "Central District",
            "Central District(Extension)",
            "Cheung Sha Wan",
            "Ho Man Tin",
            "Hung Hom",
            "Jardine''s Lookout & Wong Nai Chung Gap",
            "Kai Tak",
            "Kennedy Town & Mount Davis",
            "Kowloon Tong",
            "Kwai Chung",
            "Lai Chi Kok",
            "Ma Tau Kok",
            "Mid-Levels East",
            "Mid-Levels West",
            "Mong Kok",
            "North Point",
            "Pok Fu Lam",
            "Sai Ying Pun & Sheung Wan",
            "Shek Kip Mei",
            "South West Kowloon",
            "Stonecutters Island",
            "The Peak Area",
            "Tsim Sha Tsui",
            "Tsz Wan Shan,Diamond Hill & San Po Kong",
            "Wan Chai",
            "Wan Chai North",
            "Wang Tau Hom & Tung Tau",
            "Wong Nai Chung",
            "Yau Ma Tei",
        ],
        Complaints: [
            "reported",
            "assigned",
            "inspected",
            "demolished",
            "complaint closed",
        ],
        Development: [
            "depleted",
            "planned",
            "proposed",
            "under construction",
            "under maintainence",
            "completed",
            "stopped",
            "demolished",
            "for demolition",
            "unchanged",
        ],
        Encroachment: [
            "demolished",
            "disputed",
            "for demolition",
            "illegal",
            "illegal change",
            "legal change",
            "unaffected",
            "verification pending",
        ],
        Height: 500,

        Landuse: [
            "residential",
            "commericial",
            "governmental",
            "mixed use",
            "commercial residential mix",
            "institutional",
            "educational",
            "utilities",
            "not specified",
            "recreational",
            "industrial",
        ],
        Volume: 50000,
    };

    Object.keys(filterBy).forEach((key) => {
        let smnode = document.createElement("small");
        smnode.innerHTML = key;
        smnode.classList.add("filterText");
        filterByNodeContainer.appendChild(smnode);

        smnode.onclick = () => loadSubAtttr(key);
    });

    let userSelectedFilter = {};

    function closeBadge(event, attribute) {
        document.getElementById(`${event.currentTarget.title}Parent`).remove();
        document.getElementById("filterSelection").innerHTML = "";
        document.getElementById("filterSelection").style.display = "none";
        if (Array.isArray(userSelectedFilter[attribute]))
            userSelectedFilter[attribute].splice(
                0,
                userSelectedFilter[attribute].length
            );
        else {
            userSelectedFilter[attribute] = null;
            userSelectedFilter[attribute] = null;
        }
    }

    function checkBoxClick(value, attribute) {
        let checkBox = document.getElementById(value);
        if (checkBox.checked == true) {
            let camelCase = Common.toCamelCase(attribute);
            userSelectedFilter[attribute] =
                userSelectedFilter[attribute] || [];
            if (userSelectedFilter[attribute].indexOf(value) == -1) {
                userSelectedFilter[attribute].push(value);
            }

            let div = document.createElement("div");
            div.style.Height = "0px"

            div.id = `${camelCase}BadgeParent`;

            let badgeDiv = document.createElement("div");
            badgeDiv.id = `${camelCase}Badge`;

            let badge = document.createElement("div");

            let span = document.createElement("span");

            span.title = `${camelCase}Badge`;
            span.onclick = () => closeBadge(event, attribute);
            span.innerHTML = `${camelCase} x`;

            badge.append(span);
            div.append(badgeDiv);

            if (document.getElementById(`${camelCase}Badge`)) return;
            document.getElementById("filtersBadge").prepend(div);
            document.getElementById(`${camelCase}Badge`).append(badge);
        } else {
            index = userSelectedFilter[attribute].findIndex((i) => i == value);
            if (index > -1) userSelectedFilter[attribute].splice(index, 1);
        }
    }


    document.getElementById("searchEncroch").addEventListener("click", () => onclickSearch());

    function onclickSearch() {
        try {
            if (Object.keys(userSelectedFilter).length == 0) {
                swal({
                    title: ` Please Select Some Valid Filter Value `,
                    text: "",
                    icon: "warning",
                    button: "Ok",
                });
                return;
            }
            Selection.clearHighlight();
            const loader = '<i class="fas fa-circle-notch fa-spin"></i>';
            $("#searchLoader").append(loader);
            $("#searchTextField").hide();
            let wherein = "";
            for (let key in userSelectedFilter) {
                if (wherein != "") wherein += "AND";
                if (key == "Area") {
                    let keys = key.toLowerCase() + "1";
                    wherein += `(${keys} >= ${userSelectedFilter[key]["areaRangeMin"]} AND ${keys} <= ${userSelectedFilter[key]["areaRangeMax"]})`;
                }
                if (key == "Volume")
                    wherein += `(${key.toLowerCase()} >= ${userSelectedFilter[key]["areaRangeMin"]
                        } AND  ${key.toLowerCase()} <= ${userSelectedFilter[key]["areaRangeMax"]
                        })`;
                else if (key == "Height")
                    wherein += `(${key} >= ${userSelectedFilter[key]["areaRangeMin"]} AND  ${key} <= ${userSelectedFilter[key]["areaRangeMax"]})`;

                if (Array.isArray(userSelectedFilter[key])) {
                    wherein += "(";
                    userSelectedFilter[key].forEach((i) => {
                        if (key == "Area name") {
                            let keys = key.toLowerCase().split(" ").join("_");
                            wherein += `${keys} = '${i}' OR `;
                        } else {
                            wherein += `${key}${window._appState.selectedYear} = '${i}' OR `;
                        }
                    });
                    wherein = wherein.substr(0, wherein.length - 4);
                    wherein += ")";
                }
            }

            const layer = new FeatureLayer({
                url: "https://services8.arcgis.com/DNeFZdA6rtbI0Fwv/arcgis/rest/services/HongKong_Final_Changedetection_5_WSL1/FeatureServer",
            });

            layer
                .queryFeatures({
                    where: wherein,
                    outFields: ["*"],
                })
                .then((data) => {
                    if (data["features"].length == 0) {
                        swal({
                            title: `${data["features"].length} Records found `,
                            text: "",
                            icon: "warning",
                            button: "Ok",
                        });
                    } else {
                        swal({
                            title: `Records found ${data["features"].length}`,
                            text: "",
                            icon: "success",
                            button: "Ok",
                        });
                    }
                    $("#searchLoader").empty();
                    $("#searchTextField").show();
                    window.formatDataForGraph(
                        data.features,
                        window._mapViewType
                    ).then(d => {
                        Charts.DrawChart(
                            window._mapViewType,
                            window._appState.selectedYear,
                            d
                        );
                    })

                    let buildingLayer;
                    buildingLayer = window._map.layers.find(
                        (l) => l.title == "HongKong"
                    );

                    window._view
                        .whenLayerView(buildingLayer)
                        .then(function (layerView) {
                            let objectId = data.features.reduce((acc, i) => {
                                acc.push(i.attributes.OBJECTID);
                                return acc;
                            }, []);

                            window.highlightHandle = layerView.highlight(objectId);
                        });
                    DataTable.dataTableInfo(data.features);//calling datatable
                    document.getElementById("dataTableButton").style.display = "block";

                })
                .catch((e) => {
                    // cb(null, err)
                    console.error(e);
                });
        } catch (e) {
            // cb(null, err)
            console.error(e);
        }
    }



    function loadSubAtttr(key) {
        document.getElementById("filterSelection").innerHTML = "";
        document.getElementById("filterSelection").style.display = "block";

        if (!filterBy[key]) return

        if (typeof filterBy[key] != "number") {
            let newDiv;
            let labelNameValue;
            filterBy[key].forEach((i) => {
                if (i.length <= 13) labelNameValue = i;
                else labelNameValue = i.substr(0, 13) + "....";
                let checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.value = `${i}`;
                checkBox.id = `${i}`;
                checkBox.style.marginRight = "10px";
                checkBox.style.marginTop = "4px";
                checkBox.onclick = () => checkBoxClick(i, key);
                if (window._mapViewType == key.toLowerCase()) {
                    if (
                        i == "unaffected" ||
                        i == "unchanged" ||
                        i == "complaint closed" ||
                        i == "not specified"
                    )
                        checkBox.checked = false;
                    else checkBox.checked = true;
                }

                if (userSelectedFilter[key]) {
                    // else checkBox.checked = true;

                    userSelectedFilter[key].forEach((j) => {
                        if (i == j) {
                            checkBox.checked = true;
                        }
                    });
                }

                let labelName = document.createElement("label");
                labelName.title = `${i}`;
                labelName.style.textTransform="capitalize"
                labelName.innerHTML = `${labelNameValue}`;

                newDiv = document.createElement("div");
                newDiv.append(checkBox);
                newDiv.append(labelName);

                document.getElementById("filterSelection").append(newDiv);
                if (window._mapViewType == key.toLowerCase()) {
                    checkBoxClick(i, key);
                }
            });
        } else if (typeof filterBy[key] == "number") {
            let slider = "";
            slider += `<div class="slider-box">
            <label for="areaRange" style="
            margin-left: 7px;">Range:</label>
            <input type="text" id="areaRange" readonly>
            <input type="hidden" value=0 id="areaRangeMin" >
            <input type="hidden" value=${filterBy[key]} id="areaRangeMax">
            <div id="area-range" class="slider"></div>
            </div>`;

            document.getElementById("filterSelection").innerHTML = slider;

            $("#area-range").slider({
                range: true,
                min: 0,
                max: filterBy[key],
                values: [0, filterBy[key]],
                slide: function (event, ui) {
                    $("#areaRange").val(
                        ui.values[0] + " sqft  -  " + ui.values[1] + " sqft"
                    );
                    $("#areaRangeMin").val(ui.values[0]);
                    $("#areaRangeMax").val(ui.values[1]);

                    let camelCase = Common.toCamelCase(key);
                    let div = document.createElement("div");


                    div.id = `${camelCase}BadgeParent`;

                    let badgeDiv = document.createElement("div");
                    badgeDiv.id = `${camelCase}Badge`;

                    let badge = document.createElement("div");

                    let span = document.createElement("span");

                    span.title = `${camelCase}Badge`;
                    span.onclick = (e) => closeBadge(e, key);
                    span.innerHTML = `${camelCase} x`;

                    badge.append(span);
                    div.append(badgeDiv);

                    userSelectedFilter[key] = userSelectedFilter[key] || {};
                    userSelectedFilter[key]["areaRangeMin"] =
                        userSelectedFilter[key]["areaRangeMin"] || {};
                    userSelectedFilter[key]["areaRangeMin"] =
                        document.getElementById("areaRangeMin").value;
                    userSelectedFilter[key]["areaRangeMax"] =
                        userSelectedFilter[key]["areaRangeMax"] || {};
                    userSelectedFilter[key]["areaRangeMax"] =
                        document.getElementById("areaRangeMax").value;

                    if (document.getElementById(`${camelCase}Badge`)) return;
                    document.getElementById("filtersBadge").prepend(div);
                    document.getElementById(`${camelCase}Badge`).append(badge);

                    $("#areaRange").val(
                        $("#area-range").slider("values", 0) +
                        " sqft  -   " +
                        $("#area-range").slider("values", 1) +
                        " sqft"
                    );
                },
            });
        }

    };


    function Clear() {
        Selection.clearHighlight();
        $("#searchLoader").empty();
        $("#searchTextField").show();
        if (userSelectedFilter) {
            userSelectedFilter = {};
            let temp = [
                "complaints",
                "development",
                "encroachment",
                "landuse",
                "timeline",
                "areaName",
                "area",
                "height",
                "volume",
            ];
            temp.forEach((i) => {
                if (document.getElementById(`${i}BadgeParent`))
                    document.getElementById(`${i}BadgeParent`).remove();
                document.getElementById("filterSelection").innerHTML = "";
            });
        }

    }


    window.Filter.LoadSubAttr = loadSubAtttr
    window.Filter.clear = Clear
});