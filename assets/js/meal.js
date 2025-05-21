redirectIfMissing("id");
//* HTML elements
let mealBox = document.querySelector("#meal-row");
let params = new URLSearchParams(window.location.search);
let mealId = params.get("id");
let loader = document.querySelector("#loader");

//# Functions
async function getMeal() {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  let data = await response.json();
  let meal = data.meals[0];
  displayMeal(meal);
  getRecipes(meal);
  getTags(meal);
  hideLoader();
}
getMeal();

function getRecipes(data) {
  let list = "";
  for (let i = 1; i < 20; i++) {
    let ingredient = data[`strIngredient${i}`];
    let measure = data[`strMeasure${i}`];
    if (ingredient && measure.trim() !== "") {
      // there is no DOM, so create var and store in it.
      list += `
      <li class="alert alert-info m-2 p-1 px-2">${measure} ${ingredient}</li>
      `;
    }
  }
  return list;
}

function getTags(data) {
  if (!data.strTags) return `<li class="alert alert-danger m-2 p-1 px-2">NO TAGS!</li>`;
  let tag = data.strTags.split(",");
  console.log(tag);
  let list = "";
  for (let i = 0; i < tag.length; i++) {
    list += `<li class="alert alert-danger m-2 p-1 px-2">${tag[i].trim()}</li>`;
  }
  return list;
}

function displayMeal(data) {
  if (!mealBox) return;
  mealBox.innerHTML += `
          <div class="col-md-4 pe-4 ">
          <div class="inner p-3">
            <img src="${data.strMealThumb}" class="w-100" />
            <h2 class="pt-3">${data.strMeal}</h2>
          </div>
          </div>
          
          <div class="col-md-8">
            <h2 class="fw-bold">Instructions</h2>
            <p class="mb-4">${data.strInstructions}</p>
            <h3 class="fw-bold">
              Area :
              <span class="fw-normal"> ${data.strArea} </span>
            </h3>
            <h3 class="fw-bold my-4">
              Category :
              <span class="fw-normal"> ${data.strCategory} </span>
            </h3>

            <span class="fs-3 fw-bold">
              Recipes :
              <ul class="list fw-normal fs-6 list-unstyled d-flex g-3 flex-wrap">
                  ${getRecipes(data)}
              </ul>
            </span>

              <h3>Tags :</h3>
              <ul class="fw-normal fs-6 list-unstyled d-flex g-3 flex-wrap">
                  ${getTags(data)}
              </ul>
              <div class="d-flex gap-2">
                <button class="btn btn-success px-4"><a href="${data.strSource ? `<a href="${data.strSource}" target="_blank">Source</a>` : ""}">Source</a></button>
                <button class="btn btn-danger px-4"><a href="${data.strYoutube ? `<a href="${data.strYoutube}" target="_blank">YouTube</a>` : ""}">Youtube</a></button>
              </div>

          </div>
    `;
}
function showLoader() {
  loader.classList.remove("d-none");
}
function hideLoader() {
  loader.classList.add("d-none");
}
