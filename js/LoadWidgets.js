require([
    "js/Legend.js",
    "js/TimeSlider.js",
    "js/LayerList.js",
    "js/Filter.js",
    "js/AreaMeasure.js",
    "js/DistanceMeasure.js",
    "js/BaseMap.js",
    "js/SlideWidget.js",
    "js/ScreenShot.js",
    "js/Direction.js",
    "js/DayLight.js",
    "js/LineOfSight.js",
    "js/Selection.js",
    "js/SearchWidget.js",
    "js/charts.js",
    "js/DataTable.js"
], function() { 
    TimeSlider.init();
    navigationMenu_onCLick(window._mapViewType); // call on load for default enchrochment selection
});