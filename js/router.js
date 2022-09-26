const route = (event) => {
    //Capture the click event for the link
    event = event || window.event;
    //Prevent the behavior to navigator to the link target
    event.preventDefault();

    //Browser history to push the value pf the anchor tag
    //Update the URL on the browser
    //state, unsend, url
    //1º Object to send parameters
    //2º Exists only for historical reasons and cannot be omitted
    //3º The new history entry's URL
    window.history.pushState({}, "", event.target.href);

    //Call the function to handle the url request
    handleLocation();    
};

/**
 * Routes
 */
const routes = {
    404: "/pages/404.html",
    "/": "/pages/home.html",
    "/about": "/pages/about.html",
    "/lorem": "/pages/lorem.html"
};

//Watching changes
//Called every time the navigation is clicked
const handleLocation = async () => {
    //Current location
    const path = window.location.pathname;

    //Search in routes object
    const route = routes[path] || routes[404]

    //Passing route as argument. Transform the response to text
    const html = await fetch(route).then((data) => data.text());
    
    //Assign the content to load into the container
    document.getElementById("main").innerHTML = html
};

//Set the watching to the browser router functionality
//onpopstate is fired always the active history entry changes
window.onpopstate = handleLocation;

//Global access to the function
window.route = route;

//First time calling function to load the first page
handleLocation();