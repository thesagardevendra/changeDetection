window.Selection = {
  clearHighlight: null,
  btnClear_onClick:null
};

define([
  "js/Common.js",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Sketch/SketchViewModel",
  "js/DataTable.js",
], function (Common, GraphicsLayer, SketchViewModel, DataTable) {
  
  document.getElementById("polygon-geometry-button").addEventListener("click", btnPolygon_onClick);
  document.getElementById("clearGeometry").addEventListener("click", () => btnClear_onClick("clearGeometry"));

  let isActive = false;
  Common.subscribe("DisablingWidgets", () => {
    isActive = false
    queryDiv.style.display = "none";
    $("#selectBtn").removeClass("active")
  });

  document.getElementById("selectBtn").addEventListener("click", () => {
    if (!isActive) {
      
      Common.disableWidgets();

      // document.getElementsByClassName("legend")[0].style.top = "984px";
      // $("#selectBtn").css({
      //   "background-color": "#4B5D67",
      // });

      // $("#selectsvg").css({
      //   fill: "#F9F9F9 ",
      // });
      
      queryDiv.style.display = "block";
      window._view.ui.add([queryDiv], "bottom-right");
      $("#selectBtn").addClass("active")

      isActive = true;
    } else {
      // document.getElementsByClassName("legend")[0].style.top = "984px";
      Common.disableWidgets();
    }
  });

  // Add temp layer to draw on
  let sketchLayer = new GraphicsLayer();

  // Widget ref
  let sketchViewModel = null;

  let buildingLayer, building_scenelayer;

  // Initialize method after map load complete
  function init() {
    window._map.addMany([sketchLayer]);

    // get layers
    buildingLayer = window._map.layers.find((l) => l.title == "HongKong");
    window._view.whenLayerView(buildingLayer).then(function (layerView) {
      building_scenelayer = layerView;
      queryDiv.style.display = "none";
    });

    sketchViewModel = new SketchViewModel({
      layer: sketchLayer,
      defaultUpdateOptions: {
        tool: "reshape",
        toggleToolOnClick: false,
      },
      view: window._view,
      defaultCreateOptions: {
        hasZ: false,
      },
    });

    // Save graphic and highlighlight building after drawing
    let drawnGraphic = null;
    sketchViewModel.on("create", function (event) {
      if (event.state === "complete") {
        drawnGraphic = event.graphic; //obj
        if (drawnGraphic) highlightBuildingOnDrawArea(drawnGraphic);
      }
    });

    sketchViewModel.on("update", function (event) {
      if (event.state === "complete") {
        drawnGraphic = event.graphics[0]; //[obj]
        if (drawnGraphic) highlightBuildingOnDrawArea(drawnGraphic);
      }
    });
  }

  function btnPolygon_onClick(evt) {
    btnClear_onClick("btnPolygon_onClick");
    const geometryType = evt.target.value;
    sketchViewModel.create(geometryType);
  }

  function btnClear_onClick(value) {
    sketchViewModel.cancel();
    sketchLayer.removeAll();
    // bufferLayer.removeAll();
    clearHighlight();
    $("#example").DataTable().destroy();

    $("#example").find("tbody").empty();
    document.getElementById("dataTableButton").style.display = "none";
    if (value == "btnPolygon_onClick") return;
    //updating charts with formated data
    Charts.DrawChart(
      window._mapViewType,
      window._appState.selectedYear,
      window.formatedMenuDataForCharts[window._mapViewType]
    );
  }

  function clearHighlight() {
    if (window.highlightHandle) {
      window.highlightHandle.remove();
      window.highlightHandle = null;
    }
  }

  function highlightBuildingOnDrawArea(graphic) {
    // get layer of buyilding

    if (buildingLayer) {
      const query = buildingLayer.createQuery();
      query.geometry = graphic.geometry;

      buildingLayer.queryObjectIds(query).then((objectIds) => {
        if (objectIds && objectIds.length > 0) {
          window.highlightHandle = building_scenelayer.highlight(objectIds);

          window
            .getBuildingTypeData(window._mapViewType, objectIds)
            .then((data, err) => {
              // data => Featureset

              if (err || data.length == 0) {
                    swal({
                      title: `No Records Found`,
                      text: "",
                      icon: "error",
                      button: "Ok",
                  });
                  Charts.closeChart()
                  return  
              };
              
              document.getElementById("dataTableButton").style.display =
                "block";

              DataTable.dataTableInfo(data);

              window
                .formatDataForGraph(data, window._mapViewType)
                .then((data) => {

                 
                    if(data[window._appState.selectedYear]["unaffected"] && Object.keys(data[window._appState.selectedYear]).length == 1){
                        swal({
                          title: `No Records Found`,
                          text: "",
                          icon: "error",
                          button: "Ok",
                        });
                      Charts.closeChart()
                      return
                    }
                 
                  
                      

                  Charts.DrawChart(
                    window._mapViewType,
                    window._appState.selectedYear || 2015,
                    data
                  );

                  swal({
                    title: `${objectIds.length} Records Found`,
                    text: "",
                    icon: "success",
                    button: "Ok",
                  });
              });
            });
        } else {
            swal({
              title: `No feature found for drawn graphic`,
              text: "",
              icon: "warning",
              button: "Ok",
          });
        }
      });
    } else{
        swal({
          title:"Building layer not found.",
          text: "",
          icon: "warning",
          button: "Ok",
      });
    } 
  }

  init();

  window.Selection.clearHighlight = clearHighlight;
  window.Selection.btnClear_onClick = btnClear_onClick
});
