
define([
    "js/Common.js",
    "esri/widgets/AreaMeasurement3D",
    "esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel",
], function(Common, AreaMeasurement3D, AreaMeasurement3DViewModel) {
    
    let isActive = false;
    let AreaMeasurement;

    Common.subscribe("DisablingWidgets", () => {
        isActive = false
        $(".esri-area-measurement-3d__container").hide()
        $("#areaButton").removeClass("active")
        if (AreaMeasurement) AreaMeasurement.viewModel.clear();
    });

    let widgetloaded = false
    document.getElementById("areaButton").addEventListener("click", () => {

        if(!widgetloaded){
            AreaMeasurement = new AreaMeasurement3D({
                view: window._view,
                container: "viewDiv",
            });
            widgetloaded = true
        }

        if (!isActive) {
            Common.disableWidgets();
            // document.getElementsByClassName("legend")[0].style.top = "984px";
            // $("#areaButton").css({
            //     "background-color": "#4B5D67",
            // });
            // $("#areasvg").css({
            //     fill: "#F9F9F9  !important",
            // });

            $(".esri-area-measurement-3d__container").show()
            $("#areaButton").addClass("active")

            isActive = true;
        } else {
            Common.disableWidgets(); //isActive = false
            
        }
        // window.areaWidgets = AreaMeasurement;
    });
});