"use strict";

// function for list view
async function getAllRecords() {
  let getResultElement = document.getElementById("Recipes");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patrweV2r5YdGuKlF.31cf698924ae3190b18d44bf63b8ab8bae5ccd399481b98c02324d57472a4820`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appJ6cSv5WOCHku6z/Baking`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); //response is an object w/ .records array

      getResultElement.innerHTML = ""; //clear Recipes

      let newHtml = "";
      // "<div class='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xl-5 row-cols-xl-6'>"; // Start a new row with responsive columns

      for (let i = 0; i < data.records.length; i++) {
        let nameOfDish = data.records[i].fields["Name of Dish"];
        let pictureOfDish = data.records[i].fields["Picture of Dish"]; //here we have our column values

        newHtml += `
            <div class="col-xxl-4 mb-4"> 
              <div class="card list move border-dark">
                <a href="baking.html?id=${data.records[i].id}">
                  ${
                    pictureOfDish
                      ? `<img class="card card-img-top rounded" alt="${nameOfDish}" src="${pictureOfDish[0].url}">`
                      : ``
                  }
                </a>
                <div class="card-body">
                  <h5 class="card-title">${nameOfDish}</h5>
                </div>
              </div>
            </div>
        `;
      }

      newHtml += "</div>"; // Close the row
      getResultElement.innerHTML = newHtml;
    });
}

// changes the comma in the string into a list item <li>
function formattedString(value) {
  return value.split(",").join("<li>");
}

//function for detail view
async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("Recipes");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patrweV2r5YdGuKlF.31cf698924ae3190b18d44bf63b8ab8bae5ccd399481b98c02324d57472a4820`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appJ6cSv5WOCHku6z/Baking/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let pictureOfDish = data.fields["Picture of Dish"];
      let nameOfDish = data.fields["Name of Dish"];
      let ingredients = data.fields["Ingredients"];
      let instructions = data.fields["Instructions"];
      let website = data.fields["Website"];

      let newHtml = `
        <!-- Dish Name Centered at the Top -->
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="font-weight-bold">${nameOfDish}</h1><br>
          </div>
        </div>

        <div class="row">
          <!-- Picture of Dish on the Left -->
          <div class="col-md-5 d-flex justify-content-end align-content-center">
            <div class="card mb-0.4">
              ${
                pictureOfDish
                  ? `<img class="card-img-top bake-img" alt="${nameOfDish}" src="${pictureOfDish[0].url}">`
                  : ``
              }
            </div>
          </div>

          <!-- Ingredients Card next to the Picture -->
          <div class="col-md-7  d-flex justify-content-center align-content-center">
            <div class="card ingredient-card mb-3"">
              <div class="card-body">
              <h5 class="card-title">Ingredients</h5>
                <ul>${formattedString(ingredients)}</ul>
              </div>
            </div>
          </div>
          </div>

          <!-- Instructions Card under the Picture -->
          <div class=""col d-flex justify-content-center">
            <div class="card instruction-card mb-4">
              <div class="card-body">
                <h5 class="card-title">Instructions</h5>
                <p class="card-text instructions">${instructions}</p></div>
                <a href="${website}" target="_blank">
                 <div class="d-flex justify-content-center mb-4"> <button type="button" class="btn btn-success btn-lg">Visit Website</button></div>
                </a>
              </div>
            </div>
    
      `;

      jobsResultElement.innerHTML = newHtml;
    });
}

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  //has at least["id=", "Our ID"]
  getOneRecord(idParams[1]); //create detail view HTML w/ our id
} else {
  getAllRecords(); //no id given, fetch summaries
}
