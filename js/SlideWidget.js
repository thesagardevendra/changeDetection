define(["js/Common.js", "esri/webscene/Slide"], function(Common, Slide) {
    let slides = [];

    // on widget load- load all slides in from storage
    slides = JSON.parse(localStorage.getItem("slides") || "[]");
    slides.forEach((slide) => {
        slide = Slide.fromJSON(slide);
        window._map.presentation.slides.add(slide);
        createSlideUI(slide, "first");
    });

    let isActive = false;

    let subname =
        window._statusPage == "index" ?
        "DisablingWidgets" :
        "DisablingControlPanelWidgets";
    Common.subscribe(subname, () => {
        isActive = false;
        document.getElementById("slidesDiv").style.visibility = "hidden";
        $("#createSlideDiv").hide();
        $("#slideWidget").removeClass("active");
        $(".esri-view .esri-view-user-storage").hide();
    });

    document.getElementById("slideWidget").addEventListener("click", () => {
        if (!isActive) {
            if (window._statusPage == "index") {
                Common.disableWidgets();
            } else if (window._statusPage == "controlPanel") {
                Common.disableControlPanelWidgets();
                $(".esri-view .esri-view-user-storage").show();

                $("#slideWidget").css({
                    "background-color": "#4B5D67",
                });
                $("#slidersvg").css({
                    fill: "#F9F9F9 ",
                });
            }

            document.getElementById("slidesDiv").style.visibility = "visible";
            $("#createSlideDiv").show();

            // const slides = window._map.presentation.slides;

            // $("#slideWidget").css({
            //   "background-color": "#4B5D67",
            // });
            // $("#slidersvg").css({
            //   fill: "#F9F9F9 ",
            // });

            // slides.forEach(createSlideUI);

            $("#slideWidget").addClass("active");

            isActive = true;
        } else {
            if (window._statusPage == "index") {
                Common.disableWidgets();
            } else if (window._statusPage == "controlPanel") {
                Common.disableControlPanelWidgets();
            }
        }
    });

    document.getElementById("createSlideButton").addEventListener("click", () => {
        Slide.createFrom(window._view).then((slide) => {
            slide.title.text = document.getElementById("createSlideTitleInput").value;
            window._map.presentation.slides.add(slide);
            slides.push(slide);
            localStorage.setItem("slides", JSON.stringify(slides));
            createSlideUI(slide, "first");
        });
    });

    function createSlideUI(slide, placement) {
        const slideElement = document.createElement("div");
        // Assign the ID of the slide to the <span> element
        slideElement.id = slide.id;
        slideElement.classList.add("slide");

        const slidesDiv = document.getElementById("slidesDiv");
        if (placement === "first") {
            slidesDiv.insertBefore(slideElement, slidesDiv.firstChild);
        } else {
            slidesDiv.appendChild(slideElement);
        }

        const title = document.createElement("div");
        title.innerText = slide.title.text;
        // Place the title of the slide in the <div> element
        slideElement.appendChild(title);

        const img = new Image();
        // Set the src URL of the image to the thumbnail URL of the slide
        img.src = slide.thumbnail.url;
        // Set the title property of the image to the title of the slide
        img.title = slide.title.text;
        // Place the image inside the new <div> element
        slideElement.appendChild(img);

        slideElement.addEventListener("click", () => {
            const slides = document.querySelectorAll(".slide");
            Array.from(slides).forEach((node) => {
                node.classList.remove("active");
            });

            slideElement.classList.add("active");

            slide.applyTo(window._view);
        });
    }
});