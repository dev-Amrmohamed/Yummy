//* HTML elements
let cateMealBox = document.querySelector("#cateMealRow");
//^ Global variables
let params = new URLSearchParams(window.location.search);
let cate1 = params.get("id");
console.log(params);
console.log(cate1);

//# Functions
async function listedCateMeal() {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate1}`);
  let data = await response.json();
  console.log(data.meals);
  displaycateMeal(data.meals);
  hideLoader();
}
listedCateMeal();

function displaycateMeal(cateData) {
  for (let i = 0; i < cateData.length; i++) {
    cateMealBox.innerHTML += `
          <div class="col-md-3 gy-4">
            <div class="item position-relative overflow-hidden rounded-2" data-id="${cateData[i].idMeal}">
              <img src="${cateData[i].strMealThumb}" class="w-100" />
              <div class="overlay p-2 position-absolute text-center text-black text-capitalize d-flex align-items-center justify-content-center">
                <h3>${cateData[i].strMeal}</h3>
              </div>
            </div>
          </div>
    `;
  }

  let items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      let mealId = this.getAttribute("data-id");
      window.location.href = `/Yummy/meal.html?id=${mealId}`;
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
