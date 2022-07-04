define(["js/Common.js", "esri/widgets/Directions"], function (
  Common,
  Directions
) {
  let isActive = false;

  


  Common.subscribe("DisablingWidgets", () => {
    isActive = false
    if($(".esri-directions__panel-content.esri-directions__panel-content--sign-in")) $(".esri-directions__panel-content.esri-directions__panel-content--sign-in").hide()
    if($(".esri-directions__panel-content")) $(".esri-directions__panel-content").hide() 
    document.getElementById("directionButton").classList.remove("active")
  });
  
let widgetLoaded= false




  document.getElementById("directionButton").addEventListener("click", () => {
    
    if (!widgetLoaded) {
      var directionsWidget = new Directions({
        view: window._view,
        container: "viewDiv",
        // Point the URL to a valid route service that uses an
        // ArcGIS Online hosted service proxy instead of the default service
        // routeServiceUrl: "https://utility.arcgis.com/usrsvcs/appservices/srsKxBIxJZB0pTZ0/rest/services/World/Route/NAServer/Route_World"
        routeServiceUrl:
          "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
      });
      widgetLoaded = true
    }
      
    
    if (!isActive) {
      
      Common.disableWidgets();

      
      if($(".esri-directions__panel-content.esri-directions__panel-content--sign-in")) $(".esri-directions__panel-content.esri-directions__panel-content--sign-in").show()
      if($(".esri-directions__panel-content")) $(".esri-directions__panel-content").show() 
     
      // document.getElementsByClassName("legend")[0].style.top = "984px";
      // $("#directionButton").css({
      //   "background-color": "#4B5D67",
      // });
      // $("#directionsvg").css({
      //   fill: "#F9F9F9 ",
      // });
      
      document.getElementById("directionButton").classList.add("active")

      isActive = true;
    } else {
      Common.disableWidgets();
    }
  });

});
