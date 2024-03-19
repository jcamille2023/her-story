function show_member(name, description, url, role) {
    let element = document.getElementById("members");
    let container = document.createElement("div");
    container.classList.add('member');
    let basic = document.createElement("div");
    let h1 = document.createElement("h1");
    let p_role = document.createElement("p");
    h1.appendChild(document.createTextNode(name));
    p_role.appendChild(document.createTextNode(role))
    basic.appendChild(h1);
    basic.appendChild(p_role);
    let img = document.createElement('img');
    img.src = url;
    basic.appendChild(img);
    let bio = document.createElement("div");
    let p_des = document.createElement("p");
    p_des.appendChild(document.createTextNode(description))
    bio.appendChild(p_des);
    container.appendChild(basic);
    container.appendChild(bio);
    element.appendChild(container);
}