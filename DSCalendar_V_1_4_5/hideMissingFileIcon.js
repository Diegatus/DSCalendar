/*Esconder el icono "missing file" si alguna img no tiene icono.*/
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelectorAll('img').forEach(function(img){
       img.onerror = function(){this.style.display='none';};
    })
});