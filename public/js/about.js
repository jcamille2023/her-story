function show_member(name, description, url, role) {
    let element = document.getElementById("members");
    let basic = document.createElement("div");
    basic.classList.add('member');
    basic.appendChild(document.createElement("h1").appendChild(document.createTextNode(name)));
    basic.appendChild(document.createElement('p').appendChild(document.createTextNode(role)));
    let img = document.createElement('img');
    img.src = url;
    basic.appendChild(img);
    let bio = document.createElement("div");
    bio.appendChild(document.createElement("p").appendChild(document.createTextNode(description)));
    element.appendChild(basic);
    element.appendChild(bio);
}