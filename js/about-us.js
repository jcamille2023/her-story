let section = document.getElementById("about-us");
let logo_section = section.getElementsByClassName('logo')[0];
let descrip_section = section.getElementsByClassName('description')[0];

logo_section.offsetHeight >= descrip_section.offsetHeight ? section.style.height = logo_section.offsetHeight : section.style.height = descrip_section.offsetHeight 