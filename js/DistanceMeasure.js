define([
  "js/Common.js",
  "esri/widgets/DirectLineMeasurement3D",
  "esri/widgets/DirectLineMeasurement3D/DirectLineMeasurement3DViewModel",
], function (
  Common,
  DirectLineMeasurement3D,
  DirectLineMeasurement3DViewModel
) {

  let DirectLineMeasurement;
  let isActive = false;

  const distBtn = document.getElementById("distanceButton");

  Common.subscribe("DisablingWidgets", () => {
    isActive = false
    $(".esri-direct-line-measurement-3d__container").hide()
    distBtn.classList.remove("active")
    if (DirectLineMeasurement) DirectLineMeasurement.viewModel.clear();
  });

  let widgetloaded = false
  distBtn.addEventListener("click", () => {

    if(!widgetloaded){
      DirectLineMeasurement = new DirectLineMeasurement3D({
        view: window._view,
        container: "viewDiv",
      });
      widgetloaded = true
    }


    if (!isActive) {
      Common.disableWidgets();
      // document.getElementsByClassName("legend")[0].style.top = "984px";
      // $("#distanceButton").css({
      //   "background-color": "#4B5D67",
      // });
      // $("#distancesvg").css({
      //   fill: "#F9F9F9  !important",
      // });

      $(".esri-direct-line-measurement-3d__container").show()
      distBtn.classList.add("active")

      isActive = true;
    } else {
      Common.disableWidgets();
    }


    // window.distanceWidgets = DirectLineMeasurement;
  });
});