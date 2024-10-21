
document.querySelector('#button').addEventListener('click', getNews)

function getNews() {
    //key to be used in second fetch:
    const key = '53d41813eae249a397fcf1a59ad6600d'

    const zip = document.querySelector('#zip').value
    const keyword = document.querySelector('#keyword').value

    const url1 = `http://ZiptasticAPI.com/${zip}`

    console.log('This is the entered zip code:', zip)
    console.log('entered keyword/s', keyword) // to be used in 2nd fetch

    fetch(url1)
        .then(res => res.json())
        .then(data => {

            console.log(data)
            console.log(data.city)

            document.querySelector('#location').innerText = `${data.city}, ${data.state}`

            // ------- Begin API Numero Dos fetch command! ---

            //
            const searchCity = data.city;
            const lcSearchCity = searchCity.toLowerCase()
            const words = lcSearchCity.split(" ")
            const newWord = words.join(",")
            console.log(newWord)
            let newCity = `(${newWord})`
            console.log(newCity)

            const url2 = `https://newsapi.org/v2/everything?q=${keyword},${newCity}&apiKey=${key}`
            console.log(url2)
            fetch(url2)
                .then(res => res.json())
                .then(data => {

                    console.log(data)
                    console.log(data.articles.object)
                    console.log(data.articles[0])

                    // this function is currently displaying (object Object) on the dom instead of the content of the objects. To fix it, I had to change element.innerText to element.innerHTML> I also wanted the url to be clickable and be able to be opened in a new tab but that is currently not working.
                    function displayArray(array) {
                        const container = document.getElementById("Results");

                        // Clear any existing content
                        container.innerHTML = "";

                        array.forEach(item => {
                            const element = document.createElement("p");

                            const link = document.createElement("a");
                            link.href = item.url; // Set the URL from the item
                            link.target = "_blank"; // Open in a new tab

                            //parses through the object of the news array to display these specific items on the DOM.
                            element.innerHTML = `Title: ${item.title} <br> Description: ${item.description}<br>
                            link: ${link.href}`; //currently shows link, but url is not active.

                            container.appendChild(element); // creates or appends these new child elements inside of the container element in my HTML.
                        });
                    }
                })

        }).catch(err => {
            console.error(`error: ${err}`)
        });

}
