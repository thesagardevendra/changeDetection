define(["js/Common.js"], function(Common) {
    window._view.on("click", function(evt) {
        //         Common.disableWidgets();
        //         window._view.popup = null;
        // Search for symbols on click's position
        window._view.hitTest(evt.screenPoint).then(function(response) {
            // Retrieve the first symbol
            var graphic = response.results[0].graphic;
            var specLayer = response.results[0].graphic.layer.id;
            var objID = graphic.attributes.OBJECTID;
            var test = graphic.attributes;
            var buildingNameData = graphic.attributes.unit_name;
            console.log("hello anupam");

            $("#buildingDetail").show();

            $("#UnitOwner")
                .val(graphic.attributes.owner_name)
                .focus()
                .prop("readonly", true);
            $("#UnitDeveloper")
                .val(graphic.attributes.developer_name)
                .focus()
                .prop("readonly", true);
            $("#UnitYearconstruct")
                .val(graphic.attributes.date_constructed)
                .focus()
                .prop("readonly", true);
            $("#UnitAreaname")
                .val(graphic.attributes.area_name)
                .focus()
                .prop("readonly", true);
            $("#UnitAreasq")
                .val(graphic.attributes.area1)
                .focus()
                .prop("readonly", true);
            $("#UnitDescription")
                .val(graphic.attributes.Description)
                .focus()
                .prop("readonly", true);
            $("#addressUnitDetails")
                .val(graphic.attributes.address)
                .focus()
                .prop("readonly", true);
            $("#ObjectID")
                .val(graphic.attributes.OBJECTID)
                .focus()
                .prop("readonly", true);

            document.getElementById("buildingName").innerHTML = buildingNameData;
            if ($("#UnitOwner").val() == "") {
                $("#UnitOwner").val("-");
            }
            if ($("#UnitDeveloper").val() == "") {
                $("#UnitDeveloper").val("-");
            }
            if ($("#UnitYearconstruct").val() == "") {
                $("#UnitYearconstruct").val("-");
            }
            if ($("#UnitAreaname").val() == "") {
                $("#UnitAreaname").val("-");
            }
            if ($("#UnitAreasq").val() == "") {
                $("#UnitAreasq").val("-");
            }
            if ($("#UnitDescription").val() == "") {
                $("#UnitDescription").val("-");
            }
            if ($("#addressUnitDetails").val() == "") {
                $("#addressUnitDetails").val("-");
            }
        });
    });
    document.getElementById("closedetail").addEventListener("click", () => {
        $("#buildingDetail").hide();
    });
});