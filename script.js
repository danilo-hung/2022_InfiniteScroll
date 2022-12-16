const imgContainer = document.getElementById("img-container")
const loader = document.getElementById("loader")
let photoArray = []
let repeat = false

//set unsplash api paramater
const count = 30;
const apiKey = "apiKey"
const unsplashUrl = `https://api.unsplash.com/collections/99144643/photos/?client_id=${apiKey}&per_page=${count}`


//create setAttribute helper function
const setAttributes = (element, featureObjects) => {
    for (let i in featureObjects) {
        element.setAttribute(i, featureObjects[i])
    }
}

//create link and photo, add to DOM
const displayPhoto = () => {
    totalLoaded = photoArray.length;
    photoArray.forEach((photo => {
        const description = photo.description;
        const imgSrc = photo.urls.regular;
        const link = photo.links.html;
        //add <a> for unsplash photo's link
        const item = document.createElement("a");
        setAttributes(item, {
            href: link,
            target: "new_Tab"
        })
        item.classList.add("img-card")
        //add <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: imgSrc,
            alt: description,
            title: description
        })
        // check if all img is loaded
        // img.addEventListener("load", imgLoaded)
        //put img in item and put item in imgContainer
        item.appendChild(img);
        imgContainer.appendChild(item);

    }))
}



// get photo from api
const getPhoto = async () => {

    if (repeat == false) {
        try {
            photoArray = []
            const res = await fetch(unsplashUrl);
            const data = await res.json();
            photoArray.push(...data);
            // console.log(photoArray);
            displayPhoto();
        }
        catch (e) {
            console.log(e)
        }
    }

}


//On load
getPhoto()

//check if scroll to the buttom and load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        getPhoto()
    }
})