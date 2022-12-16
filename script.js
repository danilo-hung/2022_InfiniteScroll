const imgContainer = document.getElementById("img-container")
const loader = document.getElementById("loader")
const apiForm = document.getElementById("api-form")
const apiContainer = document.getElementById("api-container")
let photoArray = []
let loaded = false
let load = 0
let totalLoaded = 0


//set unsplash api paramater
const count = 30;
let unsplashUrl = ``
let apiKey = ""


//create setAttribute helper function
const setAttributes = (element, featureObjects) => {
    for (let i in featureObjects) {
        element.setAttribute(i, featureObjects[i])
    }
}

//check if loaded photos
const checkLoaded = () => {
    load++
    if (load == totalLoaded) {
        loaded = true;
        load = 0
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
        img.addEventListener("load", checkLoaded)
        // check if all img is loaded
        // img.addEventListener("load", imgLoaded)
        //put img in item and put item in imgContainer
        item.appendChild(img);
        imgContainer.appendChild(item);

    }))
}

// get photo from api
const getPhoto = async () => {
    loader.removeAttribute("hidden")
    setTimeout(async () => {
        try {
            photoArray = []
            const res = await fetch(unsplashUrl);
            let datas = await res.json();
            photoArray.push(...datas)
            // console.log(photoArray);
            displayPhoto();
            loader.setAttribute("hidden", "")
        }
        catch (e) {
            alert("api讀取失敗, 請嘗試正確的api key")
            location.reload()
            console.log(e)
        }
    }, "500")

}

// get api key first and then onload
apiForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    apiKey = api.value;
    unsplashUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&per_page=${count}`
    apiContainer.setAttribute("hidden","")
    //On load
    getPhoto()
})



//check if scroll to the buttom and load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 && loaded == true) {
        loaded = false;
        getPhoto()
    }
})