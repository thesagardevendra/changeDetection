// const user = JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY));
// isAuthorized();
toCamelCase = (input) => {
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
}
toCapitalCase = (input) =>{
    if (input <= 2025) {
        return input.replace(input, `timeline${input}`);
    } else {
        return input.replace(/([a-z])([A-Z][a-z])/g, "$1 $2").charAt(0).toUpperCase()+input.slice(1).replace(/([a-z])([A-Z][a-z])/g, "$1 $2");
    }
}


let type = null
if(location.href.indexOf("type=")>-1) type = location.href.split("=")[1]
window._mapViewType = type
window.drawDetailedCharts = function (type, data){

    clearDetailedCharts()
    let attributes = {
        encroachment: ["legal change", "illegal change", "illegal", "encroachment for demolition", "encroachment demolished", "disputed", "verification pending"],
        development: ["under construction", "under maintainence", "completed", "development demolished", "development for demolition", "stopped", "depleted", "proposed", "planned"],
        timeline: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        landuse: ["residential", "commericial", "governmental", "mixed use", "commercial residential mix", "institutional", "educational", "utilities", "not specified ", "recreational", "industrial"],
        complaints: ["inspected", "complaint closed", "assigned", "reported", "no complaints"],
    };
    attributes[type].forEach(i => { 
    
    if (type == "timeline" ? i == 2015 : 1==1) {

        a = toCamelCase(i)
        //Creating Bar Charts div
        divBar = document.createElement('div')
        cardBarDiv =  document.createElement('div')
        cardBody =  document.createElement('div')
        
        cardBody.classList.add("card-body")
        cardBody.id = `${a}BarCharts`
       
        divBar.classList.add("col-sm-12","col-md-12", "col-lg-12","col-xl-6","col-xxl-4");
        
        cardBarDiv.style.backgroundColor = "#4B5D67"
        cardBarDiv.classList.add("card" ,"mb-5", "p-2");
      
        cardBarDiv.append(cardBody)
        divBar.append(cardBarDiv)
        document.getElementById("ChartsAppend").append(divBar)
        //Creating Pie Charts div
        divPie = document.createElement('div')
        cardPieBody =  document.createElement('div')
        cardPieDiv =  document.createElement('div')
        
        cardPieDiv.style.backgroundColor = "#4B5D67"
        cardPieDiv.classList.add("card" ,"mb-5", "p-2");

        cardPieBody.classList.add("card-body")
        cardPieBody.id = `${a}PieCharts`
        // i = Common.toCamelCase(i)
        divPie.classList.add("col-sm-12","col-md-12","col-lg-12","col-xl-6","col-xxl-4");
        // divPie.style.borderRadius = "20px"
        // divPie.style.height= "420px";
        cardPieDiv.append(cardPieBody)
        divPie.append(cardPieDiv)
        document.getElementById("ChartsAppend").append(divPie)
    }

        Object.keys(data).forEach(j => {
            if ((type == "timeline" ? i <= 2015 : i == j) && (type == "timeline" ? j <= 2015 : i == j)) {
                am4core.useTheme(am4themes_animated);
                // am4core.useTheme(am4themes_);
                am4core.useTheme(am4themes_myTheme);
                // am4core.useTheme(am4themes_material);
                //For Creating Bar Charts
                a = toCamelCase(i)
                let barChart = am4core.create(`${a}BarCharts`, am4charts.XYChart);
                barChart.data = data[i]
                    let categoryAxis = barChart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "year";
                    categoryAxis.title.text = "Year";
                    categoryAxis.title.fill = am4core.color("white");
                    categoryAxis.renderer.minGridDistance = 10;
                    categoryAxis.renderer.labels.template.fill = am4core.color("white");
                    categoryAxis.renderer.labels.template.rotation = -45;
                    categoryAxis.renderer.labels.template.horizontalCenter = "right";
                    categoryAxis.renderer.labels.template.verticalCenter = "middle";

                    let valueAxis = barChart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.title.text = "Count";
                    valueAxis.title.fill = am4core.color("white");
                    valueAxis.renderer.labels.template.fill = am4core.color("white");
                    
                    let series = barChart.series.push(new am4charts.ColumnSeries());
                    series.name = toCapitalCase(a);
                    series.columns.template.fill = am4core.color("#4B5D67"); // fill
                    series.columns.template.tooltipText = "[bold]Series: [bold]{name}\nCategory: [bold]{categoryX}\nValue: [bold]{valueY}";
                    series.dataFields.valueY = "count";
                    series.dataFields.categoryX = "year";
                    series.tooltip.autoTextColor = false; 
                    series.tooltip.label.fill = am4core.color("#4B5D67");
                    var valueLabel = series.bullets.push(new am4charts.LabelBullet());
                    valueLabel.label.text = "[bold]{count}";
                    valueLabel.label.fontSize = 15;
                    valueLabel.label.fill = am4core.color("#4B5D67");
                    valueLabel.locationY = 0.5;

                    // Add cursor
                    barChart.cursor = new am4charts.XYCursor();
                    barChart.cursor.lineX.stroke = am4core.color("#4B5D67");
                    barChart.cursor.lineY.stroke = am4core.color("#4B5D67");
                    //adding legends
                    if (type !="timeline") {
                        
                        barChart.legend = new am4charts.Legend();
                        barChart.legend.fill = am4core.color("white")
                        barChart.legend.maxHeight = 50;
                        barChart.legend.scrollable = true;
                        barChart.legend.maxWidth = 100;
                        barChart.legend.labels.template.fill = am4core.color("white");
                        barChart.legend.valueLabels.template.fill = am4core.color("white"); 
                        barChart.legend.labels.template.text = "[bold]{name}[/]";
                    }
                    barChart.responsive.enabled = true;
                    // // Set cell size in pixels
                    //     var cellSize = 30;
                    //     barChart.events.on("datavalidated", function(ev) {
                        
                    //     // Get objects of interest
                    //     var chart = ev.target;
                    //     let categoryAxis = barChart.xAxes.getIndex(0);
                        
                    //     // Calculate how we need to adjust chart height
                    //     var adjustHeight = barChart.data.length * cellSize - categoryAxis.pixelHeight;

                    //     // get current chart height
                    //     var targetHeight = barChart.pixelHeight + adjustHeight;

                    //     // Set it on chart's container
                    //     barChart.svgContainer.htmlElement.style.height = targetHeight + "px";
                    //     });

                    
                //For Creating Pie Charts
                    let pieChart = am4core.create(`${a}PieCharts`, am4charts.PieChart);
                    pieChart.data = data[i]
                    let pieSeries = pieChart.series.push(new am4charts.PieSeries());
                    pieSeries.name = toCapitalCase(a);
                    pieSeries.dataFields.value = "count";
                    pieSeries.dataFields.category = "year";
                    pieChart.innerRadius = am4core.percent(40);
                    pieSeries.slices.template.stroke = am4core.color("grey");
                    pieSeries.slices.template.strokeWidth = 0.5;
                    pieSeries.slices.template.strokeOpacity = 1;
                    pieSeries.slices.template.tooltipText = "[bold] Series: [bold]{name}\n [bold]Count: [bold]{value} \n [bold]Year: [bold]{category}";
                    pieSeries.labels.template.fill = am4core.color("white");
                  
                 
                    pieChart.legend = new am4charts.Legend();
                    pieChart.legend.maxHeight = 100;
                    pieChart.legend.scrollable = true;
                    pieChart.legend.maxWidth = 100;
                    pieChart.legend.labels.template.fill = am4core.color("white");
                    pieChart.legend.valueLabels.template.fill = am4core.color("white");
                    pieChart.responsive.enabled = true;

                    var markerTemplate = pieChart.legend.markers.template;
                        markerTemplate.width = 20;
                        markerTemplate.height = 20;

                    if(type=="timeline"){
                        series.columns.template.tooltipText = "[bold]Series: [bold]Construction\nCategory: [bold]{categoryX}\nValue: [bold]{valueY}";
                        pieSeries.slices.template.tooltipText = "[bold] Series: [bold]Construction\n [bold]Count: [bold]{value} \n [bold]Year: [bold]{category}";
                  
                   
                    }
                    // document.getElementById(`${a}BarCharts`).firstChild.style.position = "absolute"
                    // document.getElementById(`${a}BarCharts`).firstChild.style.height = "100%"

                    // document.getElementById(`${a}PieCharts`).firstChild.style.position = "absolute"
                    // document.getElementById(`${a}PieCharts`).firstChild.style.height = "100%"

                    //For Bar Charts CArd Title
                    //  barCardTitle = document.createElement('h5')
                     barCardHeader =  document.createElement('div')  
                     barCardHeader.classList.add('card-header')
                    //  barCardTitle.classList.add('card-title','display-5')
                    //  barCardTitle.style.color = '#4B5D67'
                     capitalCase = toCapitalCase(a)
                     if(capitalCase.indexOf("2015") > 0)  capitalCase = capitalCase.substring(0,capitalCase.length - 4)
                     barCardHeader.innerHTML = `${capitalCase}`
                    //  barCardHeader.append(barCardTitle)
                     cardBarDiv.prepend(barCardHeader)
                     //For Pie Charts Card Title
                    //  pieCardTitle = document.createElement('h5')
                     pieCardHeader =  document.createElement('div')
                     pieCardHeader.classList.add('card-header')
                    //  pieCardTitle.classList.add('card-title','display-5')
                    //  pieCardTitle.style.color = '#4B5D67'
                     pieCardHeader.innerHTML = `${capitalCase}:`
                    //  pieCardHeader.append(pieCardTitle)
                     cardPieDiv.prepend(pieCardHeader)

                     if(pieChart.logo || barChart.logo){
                        barChart.logo.disabled = true
                        pieChart.logo.disabled = true
                     }

            }

        })

     
        document.getElementById('dropdownType').style.display = "block"
        option = document.createElement("option");
        option.value = i;
        option.text = i;
        if(i == "legal change" || i == "under construction" || i == "residential" || i == "inspected") option.setAttribute("selected","selected")
        select = document.getElementById("dropdownType")
        select.appendChild(option);
        if (type == "timeline") document.getElementById('dropdownType').style.display = "none"



    })


}

window.formatPercentageData = function(type, data, dropDownType, startYear, endYear) {
    startYear = parseInt(startYear)
    endYear = parseInt(endYear)
    let attributes = {
        encroachment: ["legal change", "illegal change", "illegal", "encroachment for demolition", "encroachment demolished", "disputed", "verification pending"],
        development: ["under construction", "under maintainence", "completed", "development demolished", "development for demolition", "stopped", "depleted", "proposed", "planned"],
        timeline: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        landuse: ["residential", "commericial", "governmental", "mixed use", "commercial residential mix", "institutional", "educational", "utilities", "not specified ", "recreational", "industrial"],
        complaints: ["inspected", "complaint closed", "assigned", "reported", "no complaints"],
    };

    let count = {}
    Object.keys(attributes).forEach(i => {
        if (i == type && type != "timeline") {
            attributes[i].forEach(j => {
                if (j == dropDownType) {
                    data[dropDownType].forEach(elements => {
                        if (startYear < endYear) {
                            if (elements["year"] == startYear) {
                                count["startYearCount"] = elements["count"]
                            }
                            else if(elements["year"] == endYear){
                                count["endYearCount"] = elements["count"]
                            }
                        }
                        
                    })
                }
            })
        }
        else if(type  == "timeline"){
          startYear = document.getElementById("startYeardropDown").value
          endYear = document.getElementById("endYeardropDown").value
          count["startYearCount"] =  data[`timeline${startYear}`][0]["count"]
          count["endYearCount"] = data[`timeline${endYear}`][0]["count"]
        }
    })
        if (startYear < endYear) {


            type == "timeline" ? count["growth"] = (((count["endYearCount"] - count["startYearCount"])/count["startYearCount"]) * 100).toFixed(2) : count["growth"] = (((count["endYearCount"] - count["startYearCount"])/count["startYearCount"]) * 100).toFixed(2)
            
            if(count["startYearCount"] == 0){
                type == "timeline" ? count["growth"] = (count["endYearCount"] * 100).toFixed(2) : count["growth"] = (count["endYearCount"] * 100).toFixed(2)
            }

            startYear =  document.getElementById("startYeardropDown").value
            endYear =  document.getElementById("endYeardropDown").value

            document.getElementById("startYearTitle").innerHTML  = `${startYear}`
            document.getElementById("endYearTitle").innerHTML = `${endYear}`
            document.getElementById("startYearCount").innerHTML = `${count["startYearCount"]} Count`
            document.getElementById("endYearCount").innerHTML = `${count["endYearCount"]} Count`
            document.getElementById("percentageYear").innerHTML = `${count["growth"]}%`
            
            // document.getElementById("percentageGrowth").innerHTML = `${count["growth"]}%`
            
            if(count["endYearCount"]  == 0) document.getElementById("percentageGrowth").innerHTML = `0%`

        }
       
        else{
            swal({
                title: `Please Enter Year in Proper Sequence`,
                text: "",
                icon: "error",
                button: "Ok",
            });
        
        }


    

}

let data = JSON.parse(localStorage.getItem("formatedDataForMoreDetailsChartsPage"));
if (!type) {
    type = "encroachment"
    dropDownType = "legal change"
} 
drawDetailedCharts(type, data)
dropdownType = document.getElementById("dropdownType").value
formatPercentageData(type, data, dropdownType, 2015, 2016)
document.querySelectorAll(".menu ul li").forEach((n) => n.classList.remove("active"));

let nodes = document.querySelectorAll(".menu ul li")
nodes.forEach((node) =>{
if(node.dataset.mapViewType == type) node.classList.toggle("active")
    
})

    // window._mapViewType = "encroachment"; //default
    // window._view = null;
    // window._map = null;
   
    window._statusPage = "chartDetails";

    let colors = {
        encroachment: [
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
                color: "#3066BE",
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
        development: [{
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
                color: "#3066BE",
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
                color: "#F68551",
            },
            {
                name: "proposed",
                color: "#FFFF00",
            },
            {
                name: "planned",
                color: "#FFA500",
            },
        ],
        timeline: [
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
        landuse: [
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

        complaints: [
            { name: "inspected", color: "#39B0FF" },
            { name: "complaint closed", color: "#39F9BC" },
            { name: "assigned", color: "#FFFD70" },
            { name: "reported", color: "#CB2C2A" },
            { name: "no complaints", color: "#FCEFEF" },
        ],
    };

    function am4themes_myTheme(target) {
        if (target instanceof am4core.ColorSet) {
        target.list = [
            am4core.color("#FE938C"),
            am4core.color("#5CB9FF"),
            am4core.color("#A1DB43"),
            am4core.color("#F2E863"),
            am4core.color("#F68551"),
            am4core.color("#B730E8"),
            am4core.color("#D2504B"),
            am4core.color("#FC30CD"),
            am4core.color("#FCEFEF"),
            am4core.color("#0070FF"),
            am4core.color("#FF0000"),
        ];
        }
    }

    function clearDetailedCharts() {
        document.getElementById("ChartsAppend").innerHTML = ""
        // am4core.disposeAllCharts();
        document.getElementById("dropdownType").innerHTML = ""
    }
   
    document.getElementById("dropDownSubmit").addEventListener('click',() =>{
        
        dropdownType = document.getElementById("dropdownType").value
        startYear =  document.getElementById("startYeardropDown").value
        endYear =  document.getElementById("endYeardropDown").value
        if(startYear == endYear){
            swal({
                title: `StartYear and EndYear Can't Be Same `,
                text: "",
                icon: "error",
                button: "Ok",
            });
            return
        }
        formatPercentageData(window._mapViewType, data, dropdownType, startYear, endYear)
    })
   


           


    


