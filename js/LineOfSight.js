define([
  "js/Common.js",
  "esri/widgets/LineOfSight",
  "esri/geometry/Point",
  "esri/core/watchUtils",
  "esri/widgets/Expand",
], function (Common, LineOfSight, Point, watchUtils, Expand) {
  
  let isActive = false;
  let lineOfSight = null;
  
  const LosBtn = document.getElementById("llBtn");
  
  lineOfSight = new LineOfSight({
    view: window._view,
    container: "viewDiv",
  });
  
  Common.subscribe("DisablingWidgets", () => {
    isActive = false
    $(".esri-line-of-sight__container").hide()
    LosBtn.classList.remove("active")
  });

  LosBtn.addEventListener("click", () => {

    if (lineOfSight != null) {
      lineOfSight.viewModel.clear();
    }

    if (!isActive) {
      Common.disableWidgets();
      // document.getElementsByClassName("legend")[0].style.top = "984px";
      //Line of sight start
      window._view.graphics.removeAll();

      // $("#llBtn").css({
      //   "background-color": "#4B5D67",
      // });
      // $("#linesvg").css({
      //   fill: "#F9F9F9  !important",
      // });

      $(".esri-line-of-sight__container").show()

      getlineofsight();
      LosBtn.classList.add("active")

      isActive = true;
    } else {
      Common.disableWidgets();
    }

    function getlineofsight() {
      /**************************************
       * Add symbols to mark the intersections
       * for the line of sight
       **************************************/
      const viewModel = lineOfSight.viewModel;
      // watch when observer location changes
      viewModel.watch("observer", function (value) {
        setIntersectionMarkers();
      });
      // watch when a new target is added or removed
      viewModel.targets.on("change", function (event) {
        event.added.forEach(function (target) {
          setIntersectionMarkers();
          // for each target watch when the intersection changes
          target.watch("intersectedLocation", setIntersectionMarkers);
        });
      });
      // an inverted cone marks the intersection that occludes the view
      const intersectionSymbol = {
        type: "point-3d",
        symbolLayers: [
          {
            type: "object",
            resource: {
              primitive: "inverted-cone",
            },
            material: {
              color: [255, 100, 100],
            },
            height: 10,
            depth: 10,
            width: 10,
            anchor: "relative",
            anchorPosition: {
              x: 0,
              y: 0,
              z: -0.7,
            },
          },
        ],
      };

      function setIntersectionMarkers() {
        window._view.graphics.removeAll();
        viewModel.targets.forEach(function (target) {
          if (target.intersectedLocation) {
            window._view.graphics.removeAll();
            const graphic = new Graphic({
              symbol: intersectionSymbol,
              geometry: target.intersectedLocation,
            });
            window._view.graphics.add(graphic);
          }
        });
      }
      /**************************************
       * Create an analysis by setting
       * the initial observer and four targets
       **************************************/
      viewModel.observer = new Point({
        latitude: 42.3521,
        longitude: -71.0564,
        z: 139,
      });
      viewModel.targets = [
        createTarget(42.3492, -71.0529),
        createTarget(42.3477, -71.0542),
        createTarget(42.3485, -71.0533),
        createTarget(42.3467, -71.0549),
      ];

      function createTarget(lat, lon, z) {
        return {
          location: new Point({
            latitude: lat,
            longitude: lon,
            z: z || 0,
          }),
        };
      }
      // start the tool to create the line of sight analysis
      viewModel.start();
      // resume the analysis
      watchUtils.whenEqualOnce(
        viewModel,
        "state",
        "creating",
        function (value) {
          viewModel.stop();
        }
      );
      // add an Expand widget to make the menu responsive
      widgetDivCont.style.display = "none";
      const expand = new Expand({
        expandTooltip: "Expand line of sight widget",
        view: window._view,
        content: "viewDiv",
        expanded: true,
      });

      window._view.graphics.removeAll();
    }
    //Line of sight end
  });
});
