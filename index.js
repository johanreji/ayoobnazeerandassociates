function toggleMenu() {
    let navItems = document.getElementsByClassName("navItems")[0];
    if (navItems.style.height == "140px") {
        navItems.style.height = "0px";
    } else {
        navItems.style.height = "140px";
    }
    document.getElementsByClassName("ham")[0].classList.toggle('active')
}

function menuItemClicked(item) {
    let offsetTop = 0;
    switch (item) {
        case 1:
            offsetTop = document.getElementsByClassName("home")[0].offsetTop;
            break;
        case 2:
            offsetTop = document.getElementsByClassName("about")[0].offsetTop;
            break;
        case 3:
            offsetTop = document.getElementsByClassName("services")[0].offsetTop;
            break;
        case 4:
            offsetTop = document.getElementsByClassName("contact")[0].offsetTop;
            break;
        default:
            break;
    }
    scroll({
        top: offsetTop - 50,
        behavior: "smooth"
    });
    toggleMenu();
}


function onFormSubmit(form) {
    if (form.name.value == "") {
        alert('Please enter name!');
        return;
    } else if (form.message.value == "") {
        alert('Please enter message!');
        return;
    }
    let emailBody = `Hi \n ${form.message.value}`;
    window.open(`mailto:ayoobnazeerandassociates@gmail.com?cc=&subject=Enquiry from ${form.name.value} (${form.tel.value})&body=${emailBody}`, '_self');
}

// Creating map options
var mapOptions = {
    center: [9.899417911965054, 76.72045885317041],
    zoom: 16
}
function loadMaps() {// Creating a map object
    var map = new L.map('map');
    // Add OSM tile leayer to the Leaflet map.
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Target's GPS coordinates.
    var target = L.latLng('9.899417911965054', '76.72045885317041');

    // Set map's center to target with zoom 14.
    map.setView(target, 16);

    // Place a marker on the same location.
    let marker = L.marker(target).addTo(map);
    marker.on("click", function (event) {
        window.location.href = 'http://maps.google.com/?q=9.899417911965054, 76.72045885317041';
    });

}
console.log('deployment testing again')
window.onload = function(){
    console.log('deployment test again')
    loadMaps();
}