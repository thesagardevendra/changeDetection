define(["js/Common.js", "esri/widgets/BasemapGallery"], function (
    Common,
    BasemapGallery
) {
    let isActive = false;


    let bmBtn = document.getElementById("basemapBtn");
    if (window._statusPage != "index") bmBtn = document.getElementById("basemapsvg");



    let subname = window._statusPage == "index" ? "DisablingWidgets" : "DisablingControlPanelWidgets";


    Common.subscribe(subname, () => {
        isActive = false;
        $("#widgetDivCont").hide();
        document.getElementById("widgetDivCont").innerHTML = "";
        $("#basemapBtn").removeClass('active')
    });

    // if (window._statusPage == "index")
    //   Common.subscribe("DisablingWidgets", () => (isActive = false));
    // else if (window._statusPage == "controlPanel") {
    //   Common.subscribe("DisablingControlPanelWidgets", () => (isActive = false));
    // }

    let widgetloaded = false;

    bmBtn.addEventListener("click", function () {
        $("#widgetDivCont").empty();
        var basemapGallery = new BasemapGallery({
            view: window._view,
            container: 'widgetDivCont',
        });
        widgetloaded = true;

        if (!isActive) {
            if (window._statusPage == "index") {
                // document.getElementsByClassName("legend")[0].style.top = "984px";
                Common.disableWidgets();
            } else if (window._statusPage == "controlPanel") {
                Common.disableControlPanelWidgets();
                $("#basemapBtn").addClass('active')
                $("#basemapBtn .box").css({
                    "display": "flex",
                    "width": "365px",
                    "height": "104px",
                    "border-radius": "4px",
                    "overflow-x": "auto",
                    "flex-flow": "nowrap",
                    "bottom": "52px",
                    "left": "230px"
                });

                document.querySelector("#basemapBtn .box").classList.add("active")
            }

            // $(".esri-view .esri-view-user-storage").css({
            //     "overflow-y": "scroll",
            //     display: "block",
            //     "margin-top": "100px",
            // });

            $('.esri-view-user-storage').show()
            $("#widgetDivCont").show();
            bmBtn.classList.add("active");

            isActive = true;
        } else {
            if (window._statusPage == "index") {
                // document.getElementsByClassName("legend")[0].style.top = "984px";
                Common.disableWidgets();
            } else if (window._statusPage == "controlPanel") {
                Common.disableControlPanelWidgets();
            }
        }
    });
});