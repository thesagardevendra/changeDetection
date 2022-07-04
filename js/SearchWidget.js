define(["js/Common.js", "esri/widgets/Search"], function(Common, Search) {
    let isActive = false;

    let subname = (window._statusPage == "index" ? "DisablingTopRightWidgets":"DisablingControlPanelWidgets")
    Common.subscribe(subname, () => {
      isActive = false

      if(window._statusPage == "index"){
        document.getElementById("searchWidget").style.display = "none";
      }else{
        document.getElementsByClassName("searchWidgetDiv")[0].classList.remove('active')
        document.getElementById("searchWidget").innerHTML = "";
       
        

      }
    
    });
  

    document.getElementById("searchLogo").addEventListener("click", function() {
        
        console.log(isActive)
       
        if (!isActive) {
        
            let sceneLayer;
            sceneLayer = window._view.map.layers.find(function(layer) {
                return layer.title === "HongKong";
            });
            let searchWidget = new Search({
                view: window._view,
                allPlaceholder: "click dropdown",
                sources: [
                    {
                      layer: sceneLayer,
                      searchFields: ["OBJECTID"],
                      suggestionTemplate: "{OBJECTID}",
                      exactMatch: false,  
                      outFields: ["*"], 
                      placeholder: "example: 700",   
                      name: "OBJECTID",  
                      zoomScale: 500000,
                    }
    
                ],
                container: "searchWidget",
            });


            if (window._statusPage == "index") {
                Common.disableTopRightWidgets();
                Common.disableWidgets();
            } else {
                Common.disableControlPanelWidgets();
            }
            document.getElementById("searchWidget").style.display = "block";
            isActive = true
           
        }
        else{

            if(window._statusPage == "index"){
                Common.disableTopRightWidgets();
            }else{
                Common.disableControlPanelWidgets();
            }
            
           
        }  
      
     });

        document.getElementById("SearchCross").addEventListener("click", function() {
        document.getElementById("searchWidget").style.display = "none";
    });
});