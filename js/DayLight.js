define(["js/Common.js", "esri/widgets/Daylight"], function (
  Common,
  Daylight
) {
  let isActive = false;
  let widgetloaded= false
  

  $(".esri-view .esri-view-user-storage").hide()

  const daylightBtn = document.getElementById("dayBtn");
  Common.subscribe("DisablingWidgets", () => {
    isActive = false
    daylightBtn.classList.remove("active")
    $(".esri-view .esri-view-user-storage").hide()
  });

  daylightBtn.addEventListener("click", function () {
    
      $("#widgetDivCont").empty();
      const daylightWidget = new Daylight({
        view: window._view,
        container: "widgetDivCont",
        // plays the animation twice as fast than the default one
        playSpeedMultiplier: 2,
        // disable the timezone selection button
        visibleElements: {
          timezone: false,
        },
      });
      widgetloaded= true
   
    if (!isActive) {
      Common.disableWidgets();
      // document.getElementsByClassName("legend")[0].style.top = "984px";
      // $("#dayBtn").css({
      //   "background-color": "#4B5D67",
      // });
      // $("#daysvg").css({
      //   fill: "#F9F9F9 ",
      // });

      $(".esri-view .esri-view-user-storage").css({
        "overflow-y": "scroll",
        "display": "block",
      });

      $("#widgetDivCont").show()


      // const btnDaylight = document.getElementById("buttonDaylight");
      // hide and show widget for display on small devices
      daylightBtn.classList.add("active")

      isActive = true;
    } else {
      Common.disableWidgets();
    }
  });
});
