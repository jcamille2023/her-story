let above = true;
let assets_loaded = false;
let body = document.scrollingElement;
let navbar = document.getElementById("navbar");

let header = document.getElementById("header");
// let links = [{"home":'/'},{"about":'/about'},{"blog":'/blog'},{"interviews":'/interviews'}]
document.addEventListener("scroll", (event) => {
    if(body.scrollTop + 58 > header.scrollHeight && above == true) {
        above = false;
        navbar.style.backgroundColor = "#2a083b";
    }
    if(body.scrollTop + 58 < header.scrollHeight && above == false) {
        above = true;
        navbar.style.backgroundColor = "";
    }
});

function add_links(links) {
    console.log(body.clientWidth);
console.log(navbar.offsetWidth)
if (body.offsetWidth < navbar.offsetWidth) {
    let menu_button = document.createElement('a');
    menu_button.appendChild(document.createTextNode("Links"))
    menu_button.setAttribute("href","#");
    menu_button.addEventListener('click', () => {
        menu_button.style.display = 'none';
        let table = document.createElement('table');
        table.setAttribute('id','menu');
        table.style.height = "100%";
        table.style.width = "100%";
        table.style.position = "absolute";
        table.style.top = "0";
        table.style.left = "0";
        table.style.backgroundColor = "#2a083b";
        table.style.color = "white";
        for(obj of links) {
            let link = Object.keys(obj)[0]
            let row = table.insertRow();
            let a = document.createElement('a');
            a.setAttribute('href',obj[link]);
            a.innerHTML = link;
            row.appendChild(a);
            let run = 0;
            let interval = setInterval(() => {
                console.log("run");
                let opacity = Number(a.style.opacity);
                opacity += 0.02;
                console.log(opacity);
                a.style.opacity = opacity;
                run += 1;
                if(run >= 50) {
                    clearInterval(interval);
                }
            },10);
        }
        let exit_row = table.insertRow(-1);
        let exit_button = document.createElement('a');
        exit_button.href = "#"; 
        exit_button.innerHTML = "Close";
        exit_button.addEventListener('click', () => {
            table.remove();
            menu_button.style.display = '';
        })
        exit_row.appendChild(exit_button);
        body.appendChild(table);

    });
    navbar.innerHTML = "";
    navbar.appendChild(menu_button);
}
else {
    navbar.style.width = "100%";
    for(obj of links) {
        let link = Object.keys(obj)[0]
        let a = document.createElement('a');
        a.setAttribute('href',obj[link]);
        a.innerHTML = link;
        navbar.appendChild(a);
        let interval = setInterval(() => {
            let run = 0;
            console.log("run");
            let opacity = Number(a.style.opacity);
            opacity += 0.02;
            console.log(opacity);
            a.style.opacity = opacity;
            run += 1;
            if(run >= 50) {
                clearInterval(interval);
            }
        },10);
    }
}
}


