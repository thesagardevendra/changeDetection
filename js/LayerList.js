define(["js/Common.js", "esri/widgets/LayerList"], function (
  Common,
  LayerList
) {
  let isActive = false;

  let subname = (window._statusPage == "index" ? "DisablingTopRightWidgets" : "DisablingControlPanelWidgets")
  Common.subscribe(subname, () => {
    isActive = false
    $("#layerListDiv").removeClass("active")
    $("#layerlist").hide()
  });



  let widgetLoaded = false
  document.getElementById("layerListButton").addEventListener("click", () => {
    if (!isActive) {
      window._statusPage == "index" ?
      Common.disableTopRightWidgets() :
      Common.disableControlPanelWidgets();
      let layerlistcontainernode
      window._statusPage == "index" ? layerlistcontainernode = "viewDiv" : layerlistcontainernode = "layerlist"
      $('.esri-layer-list__list').show()
      if (!widgetLoaded) {

        var layerList = new LayerList({
          view: window._view,
          container: document.querySelector(`#${layerlistcontainernode}`)
        });
        widgetLoaded = true
      }




      // let layerList = new LayerList({
      //   view: window._view,
      //   container: document.querySelector("#viewDiv")
      // });
   
      


      // let layerList = new LayerList({
      //   view: window._view,
      //   container : document.querySelector("#layerlist")
      // });
      // widgetLoaded =true
      // Adds widget below other elements in the top left corner of the view
      // window._view.ui.add(layerList, {
      //   position: "top-left"
      // });

      // $("#layerListButton").css({
      //   fill: "#F9F9F9 ",
      // });
      // $("#layerListDiv").css({
      //   "background-color": "#4B5D67",
      // });

      // $(".esri-layer-list__list").css({
      //   display: "block",
      // });
      setTimeout(() => {
      
     
        $("#layerlist").show()
        $("#layerListDiv").addClass("active")
        isActive = true;
      }, 1000);

 

    } 
    else {
      window._statusPage == "index" ?
        Common.disableTopRightWidgets() :
        Common.disableControlPanelWidgets();
    }
  });
});
