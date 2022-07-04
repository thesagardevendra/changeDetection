define(["js/Common.js"], function (Common) {
    let isActive = false;


    Common.subscribe("DisablingControlPanelWidgets", () => {
        isActive = false
        document.getElementById("forms").style.display = "none"
    });

    document.getElementById("closeControlPanel").addEventListener("click", () => {
        document.getElementById("forms").style.display = "none"
        isActive = false
    })

    document.getElementById("showControlPanel").addEventListener("click", () => {
        if (!isActive) {
            Common.disableControlPanelWidgets();
            document.getElementById("forms").style.display = "block"
            isActive = true
        }
        else  Common.disableControlPanelWidgets();
    });
})