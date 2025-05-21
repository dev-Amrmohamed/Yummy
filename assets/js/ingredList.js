redirectIfMissing("i");
let params = new URLSearchParams(window.location.search);
let ingredValue = params.get("i");
let ingredListBox = document.querySelector("#ingredListRow");
let loader = document.querySelector("#loader");

async function showIngredList() {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredValue}`);
  let data = await response.json();
  console.log(data);
  displayIngredList(data.meals);
  hideLoader();
}
showIngredList();

function displayIngredList(data) {
  for (let i = 0; i < data.length; i++) {
    ingredListBox.innerHTML += `
            <div class="col-md-3 gy-4">
            <div class="item position-relative overflow-hidden rounded-2" data-id="${data[i].idMeal}">
              <img src="${data[i].strMealThumb}"  class="w-100" />
              <div class="overlay p-2 position-absolute text-center text-black text-capitalize d-flex align-items-center justify-content-center">
                <h3>${data[i].strMeal}</h3>
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
