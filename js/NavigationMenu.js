window.menuData = {
    encroachment: null,
    development: null,
    landuse: null,
    timeline: null,
    complaints: null,
};
window.formatedMenuDataForCharts = {
    encroachment: null,
    development: null,
    landuse: null,
    timeline: null,
    complaints: null,
};


// attach events on changing map view type
let mapviewtypesNodes = document.querySelectorAll("[data-map-view-type]");
mapviewtypesNodes.forEach((node) =>
    node.addEventListener("click", (evt) => {
        let type = evt.currentTarget.dataset.mapViewType
        if (type != window._mapViewType) {
            navigationMenu_onCLick(type, evt.currentTarget);
            if(_statusPage == "chartDetails") return;
            Selection.clearHighlight();
            Selection.btnClear_onClick("clearGeometry")
        }
    })
);



let loaded = false

window.navigationMenu_onCLick = function (type, target) {
  
    
    window._mapViewType = type;

    if (_statusPage == "chartDetails")  {
        
            // on load target should be  first in navigation
            if (!target) target = document.querySelector(".menu ul li");


            // Remove highlighted nav apply highlight to clicked nav
            document.querySelectorAll(".menu ul li").forEach((n) => n.classList.remove("active"));
            target.classList.toggle("active");


            let data = JSON.parse(localStorage.getItem("formatedDataForMoreDetailsChartsPage"));
            window.drawDetailedCharts(type,data)
            dropdownType = document.getElementById("dropdownType").value
            if(type == "timeline") dropdownType =  null
            startYear =  2015
            endYear = 2016

            formatPercentageData(type, data, dropdownType, startYear, endYear)
            return
    };

     
        document.querySelectorAll(".moreDetailsCharts").forEach(node =>{
            node.addEventListener('click',function () {
                window.open(`Analytics.html?type=${window._mapViewType}`,'_blank'); 
            })
        })
        

    // on load target should be  first in navigation
    if (!target) target = document.querySelector("#lists .pagination li");


    // Remove highlighted nav apply highlight to clicked nav
    document.querySelectorAll("#lists .pagination li").forEach((n) => n.classList.remove("active"));
    target.classList.toggle("active");


 

    // Get data for the selected nav
    getBuildingTypeData(type, null).then(data => {

        
     
        
        // update timslider // render the color
        TimeSlider.updateMap(window._appState ? window._appState.selectedYear : 2015);
        
        // Clear filter
        Filter.clear()

        // load ssub attr
        key = type.split("").map((i, index) => index == 0 ? i.toUpperCase() : i).join("")
        Filter.LoadSubAttr(key)

        // set legend for the  selected nav
        Legend.setLegend(type);




        // Draw chart for the selected nav
        // Charts.chartsCarouselOpner(type);
        // getFormatedDataForChart(data,type).then(d => { 
        //     Charts.DrawChart( type, window._appState ? window._appState.selectedYear : 2015, d )
        // })


        if (!loaded) {
            // download all data
            ["development", "landuse", "timeline", "complaints"].forEach(n => {
                getBuildingTypeData(n, null).then((d) => getFormatedDataForChart(d, n))
            })
            loaded = true
             window.loadar.hide()
       
        }
    })

}
function getBuildingTypeData(type, objectIds) {

    return new Promise((res, rej) => {

        if (menuData[type]) {
            fs = Object.assign([], menuData[type].features);
            if (objectIds) {
                fs = fs.filter((f) => objectIds.indexOf(f.attributes.OBJECTID) > -1);
            }
            res(fs);
            return;
        }

        let wherecondition = "",
            outfields = [];

        if (type == "encroachment") {
            wherecondition = "Encroachment2015 IS NOT Null OR Encroachment2016 IS NOT Null OR Encroachment2017 IS NOT Null OR Encroachment2018 IS NOT Null OR Encroachment2019 IS NOT Null OR Encroachment2020 IS NOT Null OR Encroachment2021 IS NOT Null OR Encroachment2022 IS NOT Null OR Encroachment2023 IS NOT Null OR Encroachment2024 IS NOT Null OR Encroachment2025 IS NOT Null";
            outfields = ["OBJECTID", "area1", "Encroachment2015", "Encroachment2016", "Encroachment2017", "Encroachment2018", "Encroachment2019", "Encroachment2020", "Encroachment2021", "Encroachment2022", "Encroachment2023", "Encroachment2024", "Encroachment2025", "owner_name", "developer_name", "date_constructed", "area_name", "Description", "address"];
        } else if (type == "development") {
            wherecondition = "Development2015 IS NOT Null OR Development2016 IS NOT Null OR Development2017 IS NOT Null OR Development2018 IS NOT Null OR Development2019 IS NOT Null OR Development2020 IS NOT Null OR Development2021 IS NOT Null OR Development2022 IS NOT Null OR Development2023 IS NOT Null OR Development2024 IS NOT Null OR Development2025 IS NOT Null";
            outfields = ["OBJECTID", "area1", "Development2015", "Development2016", "Development2017", "Development2018", "Development2019", "Development2020", "Development2021", "Development2022", "Development2023", "Development2024", "Development2025", "owner_name", "developer_name", "date_constructed", "area_name", "Description", "address"];
        } else if (type == "landuse") {
            wherecondition = "Landuse2015 IS NOT Null OR Landuse2016 IS NOT Null OR Landuse2017 IS NOT Null OR Landuse2018 IS NOT Null OR Landuse2019 IS NOT Null OR Landuse2020 IS NOT Null OR Landuse2021 IS NOT Null OR Landuse2022 IS NOT Null OR Landuse2023 IS NOT Null OR Landuse2024 IS NOT Null OR Landuse2025 IS NOT Null";
            outfields = ["OBJECTID", "area1", "Landuse2015", "Landuse2016", "Landuse2017", "Landuse2018", "Landuse2019", "Landuse2020", "Landuse2021", "Landuse2022", "Landuse2023", "Landuse2024", "Landuse2025", "owner_name", "developer_name", "date_constructed", "area_name", "Description", "address", ];
        } else if (type == "complaints") {
            wherecondition = "Complaints2015 IS NOT Null OR Complaints2016 IS NOT Null OR Complaints2017 IS NOT Null OR Complaints2018 IS NOT Null OR Complaints2019 IS NOT Null OR Complaints2020 IS NOT Null OR Complaints2021 IS NOT Null OR Complaints2022 IS NOT Null OR Complaints2023 IS NOT Null OR Complaints2024 IS NOT Null OR Complaints2025 IS NOT Null";
            outfields = ["OBJECTID", "area1", "Complaints2015", "Complaints2016", "Complaints2017", "Complaints2018", "Complaints2019", "Complaints2020", "Complaints2021", "Complaints2022", "Complaints2023", "Complaints2024", "Complaints2025", "owner_name", "developer_name", "date_constructed", "area_name", "Description", "address"];
        } else if (type == "timeline") {
            wherecondition = "date_constructed IS NOT Null";
            outfields = ["OBJECTID", "date_constructed", "area1", "owner_name", "developer_name", "date_constructed", "area_name", "Description", "address"];
        }

        if (objectIds) wherecondition = `OBJECTID IN (${objectIds.join(",")}) and (${wherecondition})`

        try {

            require(["esri/layers/FeatureLayer"], function(FeatureLayer) {
                const layer = new FeatureLayer({ url: "https://services8.arcgis.com/DNeFZdA6rtbI0Fwv/arcgis/rest/services/HongKong_Final_Changedetection_5_WSL1/FeatureServer" });

                layer.queryFeatures({ where: wherecondition, outFields: outfields }).then((data) => {
                    menuData[type] = data;
                    res(data.features);
                }).catch((e) => {
                    console.error(e);
                });
            })

        } catch (e) {
            console.error(e);
        }
    })
};


function getFormatedDataForChart(data, type) {
    return new Promise((res, rej) => {
        if (!formatedMenuDataForCharts[type] && !formatedDataForMoreDetailsChartsPage[type])
            window.formatDataForGraph(data, type).then((d) => {
                formatedMenuDataForCharts[type] = d
                getformatDataForMoreDetailsChartsPage(d, type)
                res(d)
            })
        else {
            res(formatedMenuDataForCharts[type], formatedDataForMoreDetailsChartsPage[type])

        }
    })
}
let formatedDataForMoreDetailsChartsPage = {}



function getformatDataForMoreDetailsChartsPage(data, type) {
    year = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
    let attributes = {
        encroachment: ["legal change", "illegal change", "illegal", "for demolition", "demolished", "no change", "disputed", "verification pending"],
        development: ["under construction", "under maintainence", "completed", "demolished", "for demolition", "stopped", "depleted", "proposed", "planned"],
        timeline: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        landuse: ["residential", "commericial", "governmental", "mixed use", "commercial residential mix", "institutional", "educational", "utilities", "not specified ", "recreational", "industrial"],
        complaints: ["inspected", "complaint closed", "assigned", "reported", "no complaints"],
    };
    

    attributes[type].forEach(subattributes => {
        year.forEach(yrs => {
         
            if ((type == "timeline" ? data["date"][yrs] : data[yrs][subattributes])) {
                if (type == "timeline" ?(!formatedDataForMoreDetailsChartsPage[`${type}${yrs}`] || !formatedDataForMoreDetailsChartsPage[`${type}${yrs}`].find(i => i.subattributes == yrs)) : (!formatedDataForMoreDetailsChartsPage[`${type}${yrs}`] || !formatedDataForMoreDetailsChartsPage[`${type}${yrs}`].find(i => i.subattributes == subattributes))) {

                    obj = {}
                    type == "timeline" ? obj["subattributes"] = yrs : obj["subattributes"] = subattributes
                    type == "timeline" ? obj["count"] = data["date"][yrs]["totalcount"] : obj["count"] = data[yrs][subattributes]["totalcount"]

                   


                    //for indivisual subattributes data from start to end eg legalchange :[{year:2015,count:88}]
                    obj1 = {}
                    obj1["year"] = yrs 
                    // colors[type].forEach(colr =>{
                    //         if(colr["name"] == subattributes) obj1["color"] = colr.color
                    // })
                    type == "timeline" ? obj1["count"] = data["date"][yrs]["totalcount"] : obj1["count"] = data[yrs][subattributes]["totalcount"]
                  

                    formatedDataForMoreDetailsChartsPage[`${type}${yrs}`] = formatedDataForMoreDetailsChartsPage[`${type}${yrs}`] || []
                    formatedDataForMoreDetailsChartsPage[`${type}${yrs}`].push(obj)
                   
                    
                    if(subattributes == "demolished" || subattributes == "for demolition"){
                        formatedDataForMoreDetailsChartsPage[`${type} ${subattributes}`]  = 
                        formatedDataForMoreDetailsChartsPage[`${type} ${subattributes}`] || []
                        formatedDataForMoreDetailsChartsPage[`${type} ${subattributes}`].push(obj1)
                    }
                    else{
                        formatedDataForMoreDetailsChartsPage[`${subattributes}`]  = 
                        formatedDataForMoreDetailsChartsPage[`${subattributes}`] || []
                        formatedDataForMoreDetailsChartsPage[`${subattributes}`].push(obj1)
                    }


                }

            }
            else{
                
                 //for indivisual subattributes data from start to end eg legalchange :[{year:2015,count:88}]
                 obj1 = {}
                 obj1["year"] = yrs 
                 obj1["count"] = 0
               

                //  formatedDataForMoreDetailsChartsPage[`${type}${yrs}`] = formatedDataForMoreDetailsChartsPage[`${type}${yrs}`] || []
                //  formatedDataForMoreDetailsChartsPage[`${type}${yrs}`].push(obj1)
                
                 
                 if(subattributes == "demolished" || subattributes == "for demolition"){
                     formatedDataForMoreDetailsChartsPage[`${type} ${subattributes}`]  = 
                     formatedDataForMoreDetailsChartsPage[`${type} ${subattributes}`] || []
                     formatedDataForMoreDetailsChartsPage[`${type} ${subattributes}`].push(obj1)
                 }
                 else{
                     formatedDataForMoreDetailsChartsPage[`${subattributes}`]  = 
                     formatedDataForMoreDetailsChartsPage[`${subattributes}`] || []
                     formatedDataForMoreDetailsChartsPage[`${subattributes}`].push(obj1)
                 }


            }
            
        })


    })
    
    localStorage.setItem("formatedDataForMoreDetailsChartsPage",JSON.stringify(formatedDataForMoreDetailsChartsPage));
    // window.formatedDataForMoreDetailsChartsPage = formatedDataForMoreDetailsChartsPage
 

}
