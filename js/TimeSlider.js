window.TimeSlider = {
  init : null, updateMap : null, renderBldgColor:null
}

window._appState = {
  selectedYear: 2015,
  minYear: new Date(2015, 0, 1),
  maxYear: new Date(2025, 0, 1),
  startYearField: "date_constructed",
  endYearField: "date_demolished",
};



define([
  "js/Common.js",
  "esri/widgets/TimeSlider"
], function (Common, TimeSlider) {
  
  let isActive = false;

  Common.subscribe("DisablingTopRightWidgets", () => {
    isActive = false
    $("#timeSlideDiv").removeClass("active");
  });

  document.getElementById("timeSlideDiv").addEventListener("click", () => {
    if (!isActive) {

      Common.disableTopRightWidgets();
      
      // $("#timeSlideButton").css({
      //   fill: "#F9F9F9 ",
      // });
      // $("#timeSlideDiv").css({
      //   "background-color": "#4B5D67",
      // });

      $(".esri-component.esri-time-slider").show();
      $("#timeSlideDiv").addClass("active");


      //Closing Filter
      // document.querySelector(".filter").style.display = "none";
      //Filter Button removing css
      // $("#filterButton").css({
      //   "background-color": "",
      // });
      // $("#filtersvg").css({
      //   fill: "",
      // });
      isActive = true;
    } else {
      // $(
      //   ".esri-component.esri-time-slider.esri-widget.esri-time-slider__mode--instant.esri-time-slider__layout--compact"
      // ).hide(); 
      Common.disableTopRightWidgets();
    }
    // if (isActive) timeSliderContainer.style.display = "block";
    // else timeSliderContainer.style.display = "none"
  });

  
  function init() {
    const start = window._appState.minYear;
    const end = window._appState.maxYear;

    //Adding  timeSlider
    const timeSlider = new TimeSlider({
      container: "timeSliderDiv",
      view: window._view,
      mode: "instant",
      // show data within a given time range
      // in this case data within one year
      fullTimeExtent: {
        // entire extent of the timeSlider
        start: window._appState.minYear,
        end: window._appState.maxYear,
      },
      values: [
        // location of timeSlider thumbs
        window._appState.minYear,
      ],
      stops: {
        interval: {
          value: 1,
          unit: "years",
        },
        timeExtent: {
          start,
          end,
        },
      },
    });
    // Start a time slider animation that advances
    // ten times a second and stops when it reaches the end.
    timeSlider.set({
      loop: true,
      playRate: 2000
    });
 

    window._view.ui.add(timeSlider, "manual");

    timeSlider.watch("timeExtent", function (timeExtent) {
      onYearChange(timeExtent)
    });
  }

  function onYearChange(timeExtent) {
    window._appState.selectedYear = timeExtent.end.getFullYear();
    Selection.clearHighlight();
    Selection.btnClear_onClick("clearGeometry")
    updateMap(window._appState.selectedYear);
    //To reset legend
    window.Legend.setLegend(window._mapViewType);
  }

  function updateMap(year) {
    let bdgLayer = window._map.layers.find((l) => l.title == "HongKong");
    bdgLayer.definitionExpression = `(${_appState.startYearField} IS  NULL OR ${year} >=  ${_appState.startYearField}) AND  (${year} <=  ${_appState.endYearField} OR ${_appState.endYearField} IS  NULL)`;

    // startYearField = window._appState.startYearField;
    // endYearField = window._appState.endYearField;

    // bdgLayer.definitionExpression = `( ${startYearField} <= '12/31/${year}' OR ${startYearField} IS NULL) AND (${endYearField} >='1/1/${year}' or ${endYearField} IS NULL)`;
    renderBldgColor(window._mapViewType, year, bdgLayer);
    updatingCharts(window._mapViewType, year)
  }

  function renderBldgColor(buildingType, year, bdgLayer) {
    function getRendererProp(fieldName, name_colors = []) {
      return {
        type: "unique-value",
        field: fieldName, //"Landuse2017",
        defaultSymbol: {
          type: "mesh-3d", // autocasts as new MeshSymbol3D()
          symbolLayers: [
            {
              type: "fill", // autocasts as new FillSymbol3DLayer()
              material: {
                color: [230, 230, 230, 0.7],
                colorMixMode: "replace",
              },
              edges: {
                type: "solid",
                color: [0, 0, 0, 0.6],
                size: 1,
              },
            },
          ],
        },
        uniqueValueInfos: name_colors.map((a) => ({
          value: a.name,
          label: a.name,
          symbol: {
            type: "mesh-3d",
            symbolLayers: [
              {
                type: "fill",
                material: {
                  color: a.color,
                },
                edges: {
                  type: "solid",
                  color: [0, 0, 0, 0.6],
                  size: 1,
                },
              },
            ],
          },
        })),
      };
    }
    buildingType = buildingType
      .split("")
      .map((a, i) => (i == 0 ? a.toUpperCase() : a))
      .join("");
    let fieldName = `${buildingType}${year}`;
    if (buildingType == "Timeline") fieldName = "date_constructed";
    bdgLayer.renderer = getRendererProp(
      fieldName,
      Legend.color_config[buildingType]
    );

  };
  

  function updatingCharts(buildingType, year) {
    if (window.menuData[buildingType]) {
      // let graphdata = window.formatDataForGraph( window.menuData[buildingType].features, buildingType );
      Charts.chartsCarouselOpner(buildingType);
      // Charts.DrawChart(buildingType, year, graphdata);
      getFormatedDataForChart(window.menuData[buildingType].features,buildingType).then(d => { 
        Charts.DrawChart( buildingType, year, d )
      })
    }

    // Charts.chartsCarouselOpner(type);
    // getFormatedDataForChart(data,type).then(d => { 
    //     Charts.DrawChart( type, window._appState ? window._appState.selectedYear : 2015, d )
    // })
    
  }
  

  window.TimeSlider.init = init
  window.TimeSlider.updateMap = updateMap
  window.TimeSlider.renderBldgColor = renderBldgColor
  window.TimeSlider.updatingCharts = updatingCharts

});