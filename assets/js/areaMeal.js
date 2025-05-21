redirectIfMissing("id");
let areaMealBox = document.querySelector("#areaMealRow");
let paramsAreaMeal = new URLSearchParams(window.location.search);
let areaName = paramsAreaMeal.get("a");
let loader = document.querySelector("#loader");

async function getAreaMeal() {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
  let data = await response.json();
  console.log(data.meals);
  displayAreaMeal(data.meals);
  hideLoader();
}
getAreaMeal();

function displayAreaMeal(areaNameData) {
  for (let i = 0; i < areaNameData.length; i++) {
    areaMealBox.innerHTML += `
          <div class="col-md-3 gy-4">
            <div class="item  position-relative overflow-hidden rounded-2" data-name="${areaNameData[i].idMeal}">
              <img src="${areaNameData[i].strMealThumb}" class="w-100" />
              <div class="overlay overflow-hiding p-2 position-absolute text-center text-black text-capitalize d-flex flex-column align-items-center justify-content-center">
                <h3 class="">${areaNameData[i].strMeal}</h3>
              </div>
            </div>
          </div>
    `;
  }

  let items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      let mealId = this.getAttribute("data-name");
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
