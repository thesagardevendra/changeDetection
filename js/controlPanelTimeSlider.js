define(["js/Common.js", "esri/widgets/TimeSlider"], function (
  Common,
  TimeSlider
) {
  window._appState = {
    selectedYear: 2015,
    minYear: new Date(2015, 0, 1),
    maxYear: new Date(2025, 0, 1),
    startYearField: "date_constructed",
    endYearField: "date_demolished",
  };

  let isActive = false;
  Common.subscribe("DisablingControlPanelWidgets", () => {
    isActive = false;
    $(
      ".esri-component.esri-time-slider.esri-widget.esri-time-slider__mode--instant.esri-time-slider__layout--compact"
  ).hide();
 
  $("#timeSlideDiv").removeClass('active')
  });
  document.getElementById("timeSlideDiv").addEventListener("click", () => {
    if (!isActive) {
      // Common.disableTopRightWidgets();
      Common.disableControlPanelWidgets();
      // $("#timeSlideButton").css({
      //   fill: "#F9F9F9 ",
      // });

      // $("#timeSlideButton").css({
      //   "background-color": "#4B5D67",
      // });
      $("#timeSlideDiv").addClass('active')
    

      $(
        ".esri-component.esri-time-slider.esri-widget.esri-time-slider__mode--instant.esri-time-slider__layout--compact"
      ).show();
      //Closing Filter
      isActive = true;
    } else {
      Common.disableControlPanelWidgets();
    }

    // if (isActive) timeSliderContainer.style.display = "block";
    // else timeSliderContainer.style.display = "none"
  });

  function init() {
    const start = _appState.minYear;
    const end = _appState.maxYear;

    //Adding  timeSlider
    const timeSlider = new TimeSlider({
      container: "timeSliderDiv",
      view: window._view,
      mode: "instant",
      // show data within a given time range
      // in this case data within one year
      fullTimeExtent: {
        // entire extent of the timeSlider
        start: _appState.minYear,
        end: _appState.maxYear,
      },
      values: [
        // location of timeSlider thumbs
        _appState.minYear,
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

    window._view.ui.add(timeSlider, "manual");
    timeSlider.watch("timeExtent", function (timeExtent) {
      _appState.selectedYear = timeExtent.end.getFullYear();
      updateMap(_appState.selectedYear);
      Legend.setLegend(window._mapViewType);
    });
  }

  function updateMap(year) {
    let bdgLayer = window._map.layers.find((l) => l.title == "HongKong");
    bdgLayer.definitionExpression = `(${_appState.startYearField} IS  NULL OR ${year} >=  ${_appState.startYearField}) AND  (${year} <=  ${_appState.endYearField} OR ${_appState.endYearField} IS  NULL)`;

    renderingBuildingColor(window._mapViewType, year, bdgLayer);
  }

  window.renderingBuildingColor = function (buildingType, year, bdgLayer) {
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

  //  init();
  return { init, updateMap };
});
