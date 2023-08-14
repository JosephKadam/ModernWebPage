const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


//when first page gets loaded give some animation
function firstPageAnimation(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.3,
        ease:Expo.easeInOut
    })

    tl.to(".boundingelem",{
        y: 0,
        ease: Expo.easeInOut,
        duration:1,
        stagger: .2
    })

    
    tl.from("#herofooter",{
        y:'-10',
        opacity: 0,
        duration:0.7,
        ease: Expo.easeInOut
    })

}


// to change the shape of circle of mouse when you move the mouse 
var timeout;
function mouseShapeChange(){
    // define defaul scale value
    var xscale = 1;
    var yscale =1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        
        xscale = gsap.utils.clamp(.8,1.2, dets.clientX-xprev);
        yscale = gsap.utils.clamp(.8,1.2, dets.clientY-yprev);


        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;      
        },100)
    });
}


// code to move the circle wherever the mouse goes
function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleMouseFollower();
firstPageAnimation();
mouseShapeChange();


// Now we have to display the photo when we hover the mouse on elem and move the photos where the mouse goes 
document.querySelectorAll(".elem").forEach(function(elem){

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(details){

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power1,
            duration:0.5
        })
       }) 

   elem.addEventListener("mousemove", function(details){

    var diff = details.clientY- elem.getBoundingClientRect().top;// because client y will give you the height of mouse from the start of screen but we want height of mouse from start of elem div

    diffrot = details.clientX-rotate;
    rotate = details.clientX;

    

    gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power1,
        top : diff,
        left : details.clientX,
        rotate:gsap.utils.clamp(-20,20,diffrot)
    })
   })  
});
