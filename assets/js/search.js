//* HTML elements
let searchName = document.querySelector("#search-name");
let searchLetter = document.querySelector("#search-letter");
let searchBox = document.querySelector("#search-box");
let loader = document.querySelector("#loader");
//^ Global variables
//# Functions
async function getMealBySearchName(nValue) {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nValue}`);
  let data = await response.json();
  console.log(data);
  displaySearchResult(data.meals);
  hideLoader();
}

async function getMealBySearchLetter(lValue) {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${lValue}`);
  let data = await response.json();
  displaySearchResult(data.meals);
  hideLoader();
}

function displaySearchResult(searchData) {
  searchBox.innerHTML = "";
  searchLetter.innerHTML = "";

  if (!searchData) {
    searchBox.innerHTML = `<p class="text-danger">No results found</p>`;
    searchLetter.innerHTML = `<p class="text-danger">No results found</p>`;
    return;
  }

  for (let i = 0; i < searchData.length; i++) {
    searchBox.innerHTML += `
            <div class="col-md-3">
            <div class="item position-relative overflow-hidden rounded-2" data-id="${searchData[i].idMeal}">
              <img src="${searchData[i].strMealThumb}"  class="w-100" />
              <div class="overlay p-2 position-absolute text-center text-black text-capitalize d-flex align-items-center justify-content-center">
                <h3>${searchData[i].strMeal}</h3>
              </div>
            </div>
          </div>
  `;
  }
  let items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      let mealId = this.getAttribute("data-id");
      console.log("Meal ID:", mealId);
      window.location.href = getBasePath() + "pages/meal.html?id=" + mealId;
    });
  }
}

function showLoader() {
  loader.classList.remove("d-none");
}
function hideLoader() {
  loader.classList.add("d-none");
}

//& Events
var debounceTimer;
if (searchName) {
  searchName.addEventListener("input", function () {
    let that = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      let nameValue = that.value;
      if (nameValue !== "") {
        getMealBySearchName(nameValue);
      } else {
        searchBox.innerHTML = "";
      }
    }, 300);
  });
}

if (searchLetter) {
  searchLetter.addEventListener("input", function () {
    let that = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      let letterValue = that.value;
      if (letterValue !== "") {
        getMealBySearchLetter(letterValue);
      } else {
        searchBox.innerHTML = "";
      }
    }, 300);
  });
}
