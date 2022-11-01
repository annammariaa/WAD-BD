/**
 * Loads a josn file
 * @param file_location
 * @returns {Promise<any>}
 */
async function load_json(file_location) {
    // Get the json file
    const response = await fetch(file_location,
        {
            headers: {accept: "application/json"}
        });
    // Turn the data into a JS json object and return it
    return await response.json();
}

/**
 * Appends posts from a json file
 * @param file_location
 * @returns {Promise<void>}
 */
async function create_posts(file_location) {
    const mainContainer = document.getElementById("middle-panel");
    // Loop through
    const jsonDataRecord = await load_json(file_location);
    const jsonData = jsonDataRecord.record;

    // Creates a div per post and appends it to the page
    for (let i = 0; i < jsonData.length; i++) {
        // Create the div and add the `post` class to it
        let div = document.createElement("div");
        div.classList.add("post");
        const data = jsonData[i];

        // If the json object contains an image
        if (data.img !== undefined) {
            // Essentially the same post HTML from the original version
            div.innerHTML = `
            <ul class="post-header">
                <li style="text-align: right">${data.time}</li>
                <li><img src="${data.author}" alt="Profile photo" style="width: 40px"></li>
            </ul>

            <div class="post-text">
                ${data.body}
                <br>

                <img src="${data.img}" alt="Body photo" class="post-img">
            </div>

            <img src="res/img/like.png" alt="Profile photo" style="width: 30px">
        `
        } else {
            // Essentially the same post HTML from the original version
            div.innerHTML = `
            <ul class="post-header">
                <li style="text-align: right">${data.time}</li>
                <li><img src="${data.author}" alt="Profile photo" style="width: 40px"></li>
            </ul>

            <div class="post-text">
                ${data.body}
                <br>
            </div>

            <img src="res/img/like.png" alt="Profile photo" style="width: 30px">
        `
        }

        // Append the newly created post div to the main container
        mainContainer.append(div);
    }
}