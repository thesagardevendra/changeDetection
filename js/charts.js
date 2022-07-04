window.Charts = {
    DrawChart: null,
    chartsCarouselOpner: null,
    chartsCarouselCloser: null,
    openChart: null,
    closeChart: null
}

// bar
//  series, colors, title, catagaries,

// line
//  series,  colors, title

//pie
// series, labels, colors, title

// div ids
// landusePieChart
// landuseAreaPieChart
// landuseLineChart
// landuseAreaLineChart
// landuseBarChart
// landuseAreaBarChart
// developmentPieChart
// developmentAreaPieChart
// developmentLineChart
// developmentAreaBarChart
// developmentAreaLineChart
// encroachmentPieChart
// encroachmentAreaPieChart
// encroachmentBarChart
// encroachmentLineChart
// encroachmentAreaLineChart
// complaintsPieChart
// complaintsLineChart
// complaintsBarChart
// timelinePieChart
// timelineBarChart

define(["js/Common.js"], function (Common) {
    var chartHeight = "280px";
    var BarChartHeight = "380px";

    let chartConfigs = {
        line: {
            series: [],
            chart: {
                height: chartHeight,
                type: "line",
                zoom: {
                    enabled: false,
                },
            },
            colors: [],
            dataLabels: {
                enabled: false,
                colors: "#4B5D67",
            },
            stroke: {
                curve: "smooth",
                width: 2
            },
            fill: {
                opacity: 1,
                type: "solid"
            },
            title: {
                text: "",
                align: "left",
                style: {
                    color: "#4B5D67",
                },
            },
            grid: {
                row: {
                    colors: ["transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },

            xaxis: {
                categories: [
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019",
                    "2020",
                    "2021",
                    "2022",
                    "2023",
                    "2024",
                    "2025",
                ],
                labels: {
                    style: {
                        colors: [
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                        ],
                        fontSize: "12px",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                        ],
                        fontSize: "12px",
                    },
                },
            },
            legend: {
                show: false,
            },
        },
        bar: {
            series: [],
            chart: {
                height: BarChartHeight,
                type: "bar",
                events: {
                    dataPointSelection: function (event, chartContext, config) {
                        // console.log(config.w.config.series[config.dataPointIndex]); // total area value
                        // console.log(config.w.config.labels[config.dataPointIndex]); // category name

                        onClickChart(config.w.config.series[config.seriesIndex].name);
                    },
                },
            },
            colors: [],
            title: {
                text: "",
                align: "left",
                style: {
                    color: "#4B5D67",
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: "45%",
                    horizontal: false,
                },
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            xaxis: {
                categories: [],
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    },
                },
            },

            yaxis: {
                labels: {
                    style: {
                        colors: [
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                            "#4B5D67",
                        ],
                        fontSize: "12px",
                    },
                },
            },
        },
        pie: {
            series: [],
            labels: [],
            colors: [],
            chart: {
                width: "100%",
                type: "donut",
                height: chartHeight,
                foreColor: 'white',
                events: {
                    dataPointSelection: function (event, chartContext, config) {
                        // console.log(config.w.config.series[config.dataPointIndex]); // total area value
                        // console.log(config.w.config.labels[config.dataPointIndex]); // category name

                        onClickChart(config.w.config.labels[config.dataPointIndex]);
                    },
                },
                title: {
                    text: "",
                    align: "left",
                    style: {
                        color: "#4B5D67",
                    },
                },
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                    donut: {
                        labels: {
                            show: true,
                            color: []
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '14px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 'bold',
                            colors: []
                        },
                        textAnchor: 'middle',
                        distributed: true,


                    },
                },

                fill: {
                    type: "solid",
                    colors: ["white"],
                },
                legend: {
                    show: false,
                },

                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },],
            },
            stroke: {
                show: false
                // colors: [],
            },
            legend: {
                show: false,
            },
        },
    };

    let charts = {
        landuse: [{
            type: "pie",
            title: "Landuse By Count",
            labels: [
                "Residential",
                "Commericial",
                "Educational",
                "Recreational",
                "Industrial",
                "Governmental",
                "Institutional",
                "Utilities",
                "Mixed Use",
                "Commercial Residential Mix",
                "not specified",
            ],
            colors: [
                "#FE938C",
                "#5CB9FF",
                "#D2504B",
                "#0070FF",
                "#FF0000",
                "#A1DB43",
                "#B730E8",
                "#FC30CD",
                "#F2E863",
                "#F68551",
                "#FCEFEF",
            ],
            series: [],
        },
        {
            type: "pie",
            title: "Landuse By Area",
            labels: [
                "Residential",
                "Commericial",
                "Educational",
                "Recreational",
                "Industrial",
                "Governmental",
                "Institutional",
                "Utilities",
                "Mixed Use",
                "Commercial Residential Mix",
                "not specified",
            ],
            colors: [
                "#FE938C",
                "#5CB9FF",
                "#D2504B",
                "#0070FF",
                "#FF0000",
                "#A1DB43",
                "#B730E8",
                "#FC30CD",
                "#F2E863",
                "#F68551",
                "#FCEFEF",
            ],
            series: [],
        },
        {
            type: "line",
            series: [{
                name: "Residential",
                data: [],
            },
            {
                name: "Commericial",
                data: [],
            },
            {
                name: "Educational",
                data: [],
            },
            {
                name: "Recreational",
                data: [],
            },
            {
                name: "Industrial",
                data: [],
            },
            {
                name: "Governmental",
                data: [],
            },
            {
                name: "Institutional",
                data: [],
            },
            {
                name: "Utilities",
                data: [],
            },
            {
                name: "Mixed Use",
                data: [],
            },
            {
                name: "Commercial Residential Mix",
                data: [],
            },
            {
                name: "not specified",
                data: [],
            },
            ],
            title: "Landuse Line Chart (Count)",
            colors: [
                "#FE938C",
                "#5CB9FF",
                "#D2504B",
                "#0070FF",
                "#FF0000",
                "#A1DB43",
                "#B730E8",
                "#FC30CD",
                "#F2E863",
                "#F68551",
                "#FCEFEF",
            ],
        },
        {
            type: "line",
            series: [{
                name: "Residential",
                data: [],
            },
            {
                name: "Commericial",
                data: [],
            },
            {
                name: "Educational",
                data: [],
            },
            {
                name: "Recreational",
                data: [],
            },
            {
                name: "Industrial",
                data: [],
            },
            {
                name: "Governmental",
                data: [],
            },
            {
                name: "Institutional",
                data: [],
            },
            {
                name: "Utilities",
                data: [],
            },
            {
                name: "Mixed Use",
                data: [],
            },
            {
                name: "Commercial Residential Mix",
                data: [],
            },
            {
                name: "not specified",
                data: [],
            },
            ],
            title: "Landuse Line Chart (Area)",
            colors: [
                "#FE938C",
                "#5CB9FF",
                "#D2504B",
                "#0070FF",
                "#FF0000",
                "#A1DB43",
                "#B730E8",
                "#FC30CD",
                "#F2E863",
                "#F68551",
                "#FCEFEF",
            ],
        },
        {
            type: "bar",
            series: [{
                name: "Residential",
                data: [],
            },
            {
                name: "Commericial",
                data: [],
            },
            {
                name: "Educational",
                data: [],
            },
            {
                name: "Recreational",
                data: [],
            },
            {
                name: "Industrial",
                data: [],
            },
            {
                name: "Governmental",
                data: [],
            },
            {
                name: "Institutional",
                data: [],
            },
            {
                name: "Utilities",
                data: [],
            },
            {
                name: "Mixed Use",
                data: [],
            },
            {
                name: "Commercial Residential Mix",
                data: [],
            },
            {
                name: "not specified",
                data: [],
            },
            ],
            title: "Landuse Bar Chart (Count)",
            colors: [
                "#FE938C",
                "#5CB9FF",
                "#D2504B",
                "#0070FF",
                "#FF0000",
                "#A1DB43",
                "#B730E8",
                "#FC30CD",
                "#F2E863",
                "#F68551",
                "#FCEFEF",
            ],
            categories: [
                "Residential",
                "Commericial",
                "Educational",
                "Recreational",
                "Industrial",
                "Governmental",
                "Institutional",
                "Utilities",
                "Mixed Use",
                "Commercial Residential MixArea",
                "not specified",
            ],
        },
        {
            type: "bar",
            series: [{
                name: "Residential",
                data: [],
            },
            {
                name: "Commericial",
                data: [],
            },
            {
                name: "Educational",
                data: [],
            },
            {
                name: "Recreational",
                data: [],
            },
            {
                name: "Industrial",
                data: [],
            },
            {
                name: "Governmental",
                data: [],
            },
            {
                name: "Institutional",
                data: [],
            },
            {
                name: "Utilities",
                data: [],
            },
            {
                name: "Mixed Use",
                data: [],
            },
            {
                name: "Commercial Residential Mix",
                data: [],
            },
            ],
            title: "Landuse Bar Chart (Area)",
            colors: [
                "#FE938C",
                "#5CB9FF",
                "#D2504B",
                "#0070FF",
                "#FF0000",
                "#A1DB43",
                "#B730E8",
                "#FC30CD",
                "#F2E863",
                "#F68551",
                "#FCEFEF",
            ],
            categories: [
                "Residential",
                "Commericial",
                "Educational",
                "Recreational",
                "Industrial",
                "Governmental",
                "Institutional",
                "Utilities",
                "Mixed Use",
                "Commercial Residential MixArea",
                "not specified",
            ],
        },
        ],
        development: [{
            type: "pie",
            series: [],
            labels: [
                "Completed",
                "Demolished",
                "Under Construction",
                "Depleted",
                "Planned",
                "Proposed",
                "Under Maintainence",
                "Stopped",
                "For Demolition",
            ],
            colors: [
                "#39F9BC",
                "#0070FF",
                "#FFFD70",
                "#CB2C2A",
                "#FFA500",
                "#B730E8",
                "#51E5FF",
                "#F07167",
                "#6A7DDC",
            ],
            title: "Development By Count",
        },
        {
            type: "pie",
            series: [],
            labels: [
                "Completed",

                "Demolished",
                "Under Construction",
                "Depleted",
                "Planned",
                "Proposed",
                "Under Maintainence",
                "Stopped",
                "For Demolition",
            ],
            colors: [
                "#39F9BC",
                "#0070FF",
                "#FFFD70",
                "#CB2C2A",
                "#FFA500",
                "#B730E8",
                "#51E5FF",
                "#F07167",
                "#6A7DDC",
            ],
            title: "Development By Area",
        },
        {
            type: "bar",
            series: [{
                name: "Completed",
                data: [],
            },

            {
                name: "Demolished",
                data: [],
            },
            {
                name: "Under Construction",
                data: [],
            },
            {
                name: "Depleted",
                data: [],
            },
            {
                name: "Planned",
                data: [],
            },
            {
                name: "Proposed",
                data: [],
            },
            {
                name: "Under Maintainence",
                data: [],
            },
            {
                name: "Stopped",
                data: [],
            },
            {
                name: "For Demolition",
                data: [],
            },
            ],
            colors: [
                "#39F9BC",
                "#0070FF",
                "#FFFD70",
                "#CB2C2A",
                "#FFA500",
                "#B730E8",
                "#51E5FF",
                "#F07167",
                "#6A7DDC",
            ],
            title: "Development Bar Chart (Area)",
            categories: [
                "Completed",

                "Demolished",
                "Under Construction",
                "Depleted",
                "Planned",
                "Proposed",
                "Under Maintainence",
                "Stopped",
                "For Demolition",
            ],
        },
        {
            type: "line",
            series: [{
                name: "Completed",
                data: [],
            },
            {
                name: "Demolished",
                data: [],
            },
            {
                name: "Under Construction",
                data: [],
            },
            {
                name: "Depleted",
                data: [],
            },
            {
                name: "Planned",
                data: [],
            },
            {
                name: "Proposed",
                data: [],
            },
            {
                name: "Under Maintainence",
                data: [],
            },
            {
                name: "Stopped",
                data: [],
            },
            {
                name: "For Demolition",
                data: [],
            },
            ],
            colors: [
                "#39F9BC",
                "#0070FF",
                "#FFFD70",
                "#CB2C2A",
                "#FFA500",
                "#B730E8",
                "#51E5FF",
                "#F07167",
                "#6A7DDC",
            ],
            title: "Development Line Chart (Count)",
        },
        {
            type: "line",
            series: [{
                name: "Completed",
                data: [],
            },
            {
                name: "Demolished",
                data: [],
            },
            {
                name: "Under Construction",
                data: [],
            },
            {
                name: "Depleted",
                data: [],
            },
            {
                name: "Planned",
                data: [],
            },
            {
                name: "Proposed",
                data: [],
            },
            {
                name: "Under Maintainence",
                data: [],
            },
            {
                name: "Stopped",
                data: [],
            },
            {
                name: "For Demolition",
                data: [],
            },
            ],
            colors: [
                "#39F9BC",
                "#0070FF",
                "#FFFD70",
                "#CB2C2A",
                "#FFA500",
                "#B730E8",
                "#51E5FF",
                "#F07167",
                "#6A7DDC",
            ],
            title: "Development Line Chart (Area)",
        },
        ],
        encroachment: [{
            type: "pie",
            series: [],
            labels: [
                "Legal Change",
                "Illegal Change",
                "Disputed",
                "Verification Pending",
                "Illegal",
                "Demolished",
                "For Demolition",

            ],
            colors: [
                "#39F9BC",
                "#CB2C2A",
                "#FFFD70",
                "#51E5FF",
                "#F07167",
                "#0070FF",
                "#6A7DDC",

            ],
            title: "Encroachments By Count",
        },
        {
            type: "pie",
            series: [],
            labels: [
                "Legal Change",
                "Illegal Change",
                "Disputed",
                "Verification Pending",
                "Illegal",
                "Demolished",
                "For Demolition",
            ],
            colors: [
                "#39F9BC",
                "#CB2C2A",
                "#FFFD70",
                "#51E5FF",
                "#F07167",
                "#0070FF",
                "#6A7DDC",
            ],
            title: "Encroachments By Area",
        },
        {
            type: "bar",
            series: [{
                name: "Legal Change",
                data: [],
            },

            {
                name: "Illegal Change",
                data: [],
            },
            {
                name: "Disputed",
                data: [],
            },
            {
                name: "Verification Pending",
                data: [],
            },
            {
                name: "Illegal",
                data: [],
            },
            {
                name: "Demolished",
                data: [],
            },
            {
                name: "For Demolition",
                data: [],
            },
            ],
            colors: [
                "#39F9BC",
                "#CB2C2A",
                "#FFFD70",
                "#51E5FF",
                "#F07167",
                "#0070FF",
                "#6A7DDC",
            ],
            title: "Encroachment Bar Chart (Count)",
            categories: [
                "Legal Change",
                "Illegal Change",
                "Disputed",
                "Verification Pending",
                "Illegal",
                "Demolished",
                "For Demolition",
            ],
        },
        {
            type: "line",
            series: [{
                name: "Legal Change",
                data: [],
            },

            {
                name: "Illegal Change",
                data: [],
            },
            {
                name: "Disputed",
                data: [],
            },
            {
                name: "Verification Pending",
                data: [],
            },
            {
                name: "Illegal",
                data: [],
            },
            {
                name: "Demolished",
                data: [],
            },
            {
                name: "For Demolition",
                data: [],
            },
            ],
            colors: [
                "#39F9BC",
                "#CB2C2A",
                "#FFFD70",
                "#51E5FF",
                "#F07167",
                "#0070FF",
                "#6A7DDC",
            ],
            title: "Encroachment Line Chart (Count)",
        },
        {
            type: "line",
            series: [{
                name: "Legal Change",
                data: [],
            },

            {
                name: "Illegal Change",
                data: [],
            },
            {
                name: "Disputed",
                data: [],
            },
            {
                name: "Verification Pending",
                data: [],
            },
            {
                name: "Illegal",
                data: [],
            },
            {
                name: "Demolished",
                data: [],
            },
            {
                name: "For Demolition",
                data: [],
            },
            ],
            colors: [
                "#39F9BC",
                "#CB2C2A",
                "#FFFD70",
                "#51E5FF",
                "#F07167",
                "#0070FF",
                "#6A7DDC",
            ],
            title: "Encroachment Line Chart (Area)",
        },
        ],
        complaints: [{
            type: "pie",
            series: [],
            labels: [
                "Assigned",
                "Reported",
                "Complaint Closed",
                "Inspected",
                "Demolished",
            ],
            colors: ["#FFFD70", "#CB2C2A", "#39F9BC", "#39B0FF", "green"],
            title: "Complaints By Count",
        },
        {
            type: "bar",
            series: [{
                name: "Assigned",
                data: [],
            },

            {
                name: "Reported",
                data: [],
            },
            {
                name: "Complaint Closed",
                data: [],
            },
            {
                name: "Inspected",
                data: [],
            },
            {
                name: "Complaints Demolished",
                data: [],
            },
            ],
            colors: ["#FFFD70", "#CB2C2A", "#39F9BC", "#39B0FF", "green"],
            title: "Complaints Bar Chart (Count)",
            categories: [
                "Assigned",
                "Reported",
                "Complaint Closed",
                "Inspected",
                "Complaints Demolished",
            ],
        },
        {
            type: "line",
            series: [{
                name: "Assigned",
                data: [],
            },

            {
                name: "Reported",
                data: [],
            },
            {
                name: "Complaint Closed",
                data: [],
            },
            {
                name: "Inspected",
                data: [],
            },
            {
                name: "Complaints Demolished",
                data: [],
            },
            ],
            colors: ["#FFFD70", "#CB2C2A", "#39F9BC", "#39B0FF", "green"],
            title: "Complaints Line Chart (Count)",
        },
        ],
        timeline: [{
            type: "pie",
            series: [],
            labels: [
                "2015",
                "2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
            ],
            colors: [
                "#1E6091",
                "#1A759F",
                "#168AAD",
                "#34A0A4",
                "#52B69A",
                "#76C893",
                "#99D98C",
                "#B5E48c",
                "#D9ED92",
                "#E1F1A7",
                "#092134",
            ],
            title: "Timeline By Count",
        },
        {
            type: "bar",
            series: [{
                name: "2015",
                data: [],
            },
            {
                name: "2016",
                data: [],
            },
            {
                name: "2017",
                data: [],
            },
            {
                name: "2018",
                data: [],
            },
            {
                name: "2019",
                data: [],
            },
            {
                name: "2020",
                data: [],
            },
            {
                name: "2021",
                data: [],
            },
            {
                name: "2022",
                data: [],
            },
            {
                name: "2023",
                data: [],
            },
            {
                name: "2024",
                data: [],
            },
            {
                name: "2025",
                data: [],
            },
            ],
            colors: [
                "#1E6091",
                "#1A759F",
                "#168AAD",
                "#34A0A4",
                "#52B69A",
                "#76C893",
                "#99D98C",
                "#B5E48c",
                "#D9ED92",
                "#E1F1A7",
                "#092134",
            ],
            title: "Timeline Bar Chart (Count)",
            categories: [
                "2015",
                "2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
            ],
        },
        {
            type: "line",
            series: [{
                name: "2015",
                data: [],
            },
            {
                name: "2016",
                data: [],
            },
            {
                name: "2017",
                data: [],
            },
            {
                name: "2018",
                data: [],
            },
            {
                name: "2019",
                data: [],
            },
            {
                name: "2020",
                data: [],
            },
            {
                name: "2021",
                data: [],
            },
            {
                name: "2022",
                data: [],
            },
            {
                name: "2023",
                data: [],
            },
            {
                name: "2024",
                data: [],
            },
            {
                name: "2025",
                data: [],
            },
            ],
            colors: [
                "#1E6091",
                "#1A759F",
                "#168AAD",
                "#34A0A4",
                "#52B69A",
                "#76C893",
                "#99D98C",
                "#B5E48c",
                "#D9ED92",
                "#E1F1A7",
                "#092134",
            ],
            title: "Timeline Line Chart (Count)",
        },
        ],
    };

    function onClickChart(data) {
        Selection.clearHighlight();
        buildingLayer = window._map.layers.find((l) => l.title == "HongKong");
        window._view.whenLayerView(buildingLayer).then(function (layerView) {
            if (
                data &&
                window.dataForHighlight[window._appState.selectedYear][data.toLowerCase()]
            ) {
                window.highlightHandle = layerView.highlight(
                    window.dataForHighlight[window._appState.selectedYear][
                    data.toLowerCase()
                    ]
                );
            }
        });
    }

    function chartsCarouselOpner(buildingType) {
        let carouselNames = [
            "encroachment",
            "development",
            "landuse",
            "complaints",
            "timeline",
        ];
        carouselNames.forEach((i) => {
            if (i == buildingType)
                document.getElementsByClassName(i)[0].classList.remove("d-none");
            else document.getElementsByClassName(i)[0].classList.add("d-none");
        });
    }

    function chartsCarouselCloser() {
        let carouselNames = [
            "encroachment",
            "development",
            "landuse",
            "complaints",
            "timeline",
        ];
        carouselNames.forEach((i) => {
            if (i) document.getElementsByClassName(i)[0].classList.add("d-none");
        });
    }


    let isActive = false;
    function openChart() {
        Common.disableWidgets();

        if (!isActive) {
            chartsCarouselOpner(window._mapViewType);
            document.getElementsByClassName("closeCharts")[0].style.display = "block";
            document.getElementById("charts_image").style.visibility = "hidden";
            document.getElementById("closeback").style.display = "block";
            document.getElementById("legend-container").style.bottom="366px"
            document.getElementsByClassName("charts")[0].style.display = "block";
            isActive = true;
            // document.getElementsByClassName("legend")[0].style.display = "flex"
        }
    }

    function closeChart() {
        chartsCarouselCloser();
        document.getElementById("legend-container").style.bottom="32px"
        document.getElementById("charts_image").style.visibility = "visible";
        document.getElementsByClassName("closeCharts")[0].style.display = "none";
        document.getElementById("closeback").style.display = "none";
        // document.getElementsByClassName("legend")[0].display = "none"
        isActive = false;
    }

    window.Charts.openChart = openChart
    window.Charts.closeChart = closeChart


    Common.subscribe("DisablingWidgets", () => {
        closeChart()
    });
    document.getElementsByClassName("closeCharts")[0].addEventListener("click", () => {
        closeChart()
    });

    document.getElementById("charts_image").addEventListener("click", () => {
        openChart()
    });
    // $(".clearHighlighting").on('click', () => {

    //     clearHighlighting();
    // });

    document.querySelectorAll(".clearHighlighting").forEach((i) => {
        i.addEventListener("click", () => {
            Selection.clearHighlight();
            Selection.btnClear_onClick("clearGeometry")
        });
    });
    // variables

    let drawnChartsCollection = [];

    function DrawChart(buildingType, timelineYear, datas) {
        openChart()
        // document.getElementsByClassName("closeCharts")[0].style.display = "block";
        // document.getElementById("charts_image").style.visibility = "hidden";
        // document.getElementById("closeback").style.display = "block";
        // document.getElementsByClassName("legend")[0].style.top = "641px;";
        // document.getElementsByClassName("charts")[0].style.display = "block";


        drawnChartsCollection.forEach((c) => c.destroy());
        drawnChartsCollection = [];

        // Get all charts for the given building type
        let building_charts = JSON.parse(
            JSON.stringify(charts[buildingType.toLowerCase()])
        );

        let data;
        if (buildingType.toLowerCase() == "timeline") {
            data = datas["date"];
            chartConfigs.bar.chart.height = "300px";
        } else {
            data = datas[timelineYear];
            chartConfigs.bar.chart.height = "380px";
        }
        if (data) {
            building_charts.forEach((chart_data) => {
                let chartConfig = JSON.parse(
                    JSON.stringify(chartConfigs[chart_data.type])
                );

                if (chart_data.type == "pie") {
                    let series = Object.assign([], chart_data.series);
                    //fill series on basis of labels
                    if (buildingType.toLowerCase() != "timeline") {
                        chartConfig.chart.events.dataPointSelection = function (
                            event,
                            chartContext,
                            config
                        ) {
                            onClickChart(config.w.config.labels[config.dataPointIndex]);
                        };
                    }

                    for (let label of chart_data.labels) {
                        // let data = datas[timelineYear][label.toLowerCase()]
                        chartConfig.plotOptions.pie.dataLabels.style.colors.push("black")
                        // chartConfig.stroke.colors.push("black")

                        if (data[label.toString().toLowerCase()]) {
                            if (chart_data.title.toLowerCase().indexOf("by count") > -1) {
                                series.push(data[label.toString().toLowerCase()].totalcount);
                            } else if (
                                chart_data.title.toLowerCase().indexOf("by area") > -1
                            ) {
                                series.push(
                                    Math.round(data[label.toString().toLowerCase()].totalarea)
                                );
                            }
                        } else {
                            series.push(0);
                        }
                    }
                    chartConfig.series = series;
                    chartConfig.labels = chart_data.labels;
                    chartConfig.colors = chart_data.colors;
                    // chartConfig.plotOptions.pie.donut.labels.color = chart_data.colors;

                    chartConfig.chart.title.text = chart_data.title;

                    if (chart_data.title.indexOf("Count") > -1) {
                        let countPieCharts = new ApexCharts(
                            document.getElementById(`${buildingType}PieChart`),
                            chartConfig
                        );
                        countPieCharts.render();
                        drawnChartsCollection.push(countPieCharts);
                    } else if (chart_data.title.indexOf("Area") > -1) {
                        let areaPieCharts = new ApexCharts(
                            document.getElementById(`${buildingType}AreaPieChart`),
                            chartConfig
                        );
                        areaPieCharts.render();
                        drawnChartsCollection.push(areaPieCharts);
                    }
                } else if (chart_data.type == "bar") {
                    let series = Object.assign([], chart_data.series);

                    if (buildingType.toLowerCase() != "timeline") {
                        chartConfig.chart.events.dataPointSelection = function (
                            event,
                            chartContext,
                            config
                        ) {
                            onClickChart(config.w.config.series[config.seriesIndex].name);
                        };
                    }

                    series.forEach((ser) => {
                        // let data = datas[timelineYear][ser.name.toLowerCase()]
                        if (data[ser.name.toString().toLowerCase()]) {
                            if (chart_data.title.toLowerCase().indexOf("count") > -1) {
                                let d = series.find((i) => i.name == ser.name);
                                if (d)
                                    d.data.push(
                                        Math.round(
                                            data[ser.name.toString().toLowerCase()].totalcount
                                        )
                                    );
                            } else if (chart_data.title.toLowerCase().indexOf("area") > -1) {
                                let d = series.find((i) => i.name == ser.name);
                                if (d)
                                    d.data.push(
                                        Math.round(
                                            data[ser.name.toString().toLowerCase()].totalarea
                                        )
                                    );
                            }
                        } else {
                            series.find((i) => {
                                if (i.name == ser.name.toString().toLowerCase())
                                    return i.data.push(0);
                            });
                        }
                    });
                    chartConfig.series = series;
                    chartConfig.colors = chart_data.colors;
                    chartConfig.title.text = chart_data.title;
                    chartConfig.xaxis.categories = chart_data.categories;
                    if (chart_data.title.toLowerCase().indexOf("count") > -1) {
                        let countBarCharts = new ApexCharts(
                            document.getElementById(`${buildingType}BarChart`),
                            chartConfig
                        );
                        countBarCharts.render();
                        drawnChartsCollection.push(countBarCharts);
                    } else if (chart_data.title.toLowerCase().indexOf("area") > -1) {
                        let areaBarCharts = new ApexCharts(
                            document.getElementById(`${buildingType}AreaBarChart`),
                            chartConfig
                        );
                        areaBarCharts.render();
                        drawnChartsCollection.push(areaBarCharts);
                    }
                } else if (chart_data.type == "line") {
                    let series = Object.assign([], chart_data.series);

                    series.forEach((ser) => {
                        let data;
                        if (buildingType.toLowerCase() == "timeline") data = datas["date"];
                        else data = datas;
                        let year = [
                            2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
                        ];
                        year.forEach((yrs) => {
                            if (
                                (data[yrs] && data[yrs][ser.name.toString().toLowerCase()]) ||
                                data[ser.name.toString().toLowerCase()]
                            ) {
                                if (chart_data.title.toLowerCase().indexOf("count") > -1) {
                                    let d = series.find((i) => i.name == ser.name);

                                    if (d)
                                        if (buildingType.toLowerCase() == "timeline")
                                            d.data.push(
                                                Math.round(
                                                    data[ser.name.toString().toLowerCase()].totalcount
                                                )
                                            );
                                        else
                                            d.data.push(
                                                Math.round(
                                                    data[yrs][ser.name.toString().toLowerCase()]
                                                        .totalcount
                                                )
                                            );
                                } else if (
                                    chart_data.title.toLowerCase().indexOf("area") > -1
                                ) {
                                    let d = series.find((i) => i.name == ser.name);
                                    if (d) {
                                        if (buildingType.toLowerCase() == "timeline")
                                            d.data.push(
                                                Math.round(
                                                    data[ser.name.toString().toLowerCase()].totalarea
                                                )
                                            );
                                        else
                                            d.data.push(
                                                Math.round(
                                                    data[yrs][ser.name.toString().toLowerCase()].totalarea
                                                )
                                            );
                                    }
                                }
                            } else {
                                series.find((i) => {
                                    if (i.name.toString().toLowerCase() == ser.name.toString().toLowerCase())
                                        return i.data.push(0);
                                });
                            }
                        });
                    });
                    chartConfig.series = series;
                    chartConfig.colors = chart_data.colors;
                    chartConfig.title.text = chart_data.title;
                    if (chart_data.title.toLowerCase().indexOf("count") > -1) {
                        let countLineCharts = new ApexCharts(
                            document.getElementById(`${buildingType}LineChart`),
                            chartConfig
                        );
                        countLineCharts.render();
                        drawnChartsCollection.push(countLineCharts);
                    } else if (chart_data.title.toLowerCase().indexOf("area") > -1) {
                        let areaLineCharts = new ApexCharts(
                            document.getElementById(`${buildingType}AreaLineChart`),
                            chartConfig
                        );
                        areaLineCharts.render();
                        drawnChartsCollection.push(areaLineCharts);
                    }
                }
            });
        }
    };


    window.Charts.DrawChart = DrawChart
    window.Charts.chartsCarouselOpner = chartsCarouselOpner
    window.Charts.chartsCarouselCloser = chartsCarouselCloser
});