//Loader Animation code start

let loadernode = document.getElementById('anim')


var animation = bodymovin.loadAnimation({
    container:loadernode,
    renderer:'svg',
    loop:true,
    autoplay:true,
    path:'./assests/loader/loader.json'
});


window.loadar = {
    show : function(){
        loadernode.style.display = "block"
    },
    hide : function(){
        loadernode.style.display = "none"
    }
}