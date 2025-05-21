//* HTML elements
let ingredientsRow = document.querySelector("#ingredientsRow");
//^ Global variables
//# Functions
async function getAllAreas() {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let data = await response.json();
  console.log(data.meals);
  displayAreas(data.meals);
  hideLoader();
}
getAllAreas();

function displayAreas(areas) {
  for (let i = 0; i < 25; i++) {
    ingredientsRow.innerHTML += `
                  <div class="col-md-3 gy-4">
                      <div class="item text-center position-relative overflow-hidden rounded-2" data-name="${areas[i].strIngredient}">
                        <i class="fas fa-utensils"></i>
                        <h3 class="pt-3">${areas[i].strIngredient}</h3>
                        <p class="pt-3">${areas[i].strDescription ? areas[i].strDescription.slice(0, 85) : "there is no des"}</p>
                      </div>
                  </div>
    `;
  }

  let items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      let ingredName = this.getAttribute("data-name");
      window.location.href = `/Yummy/ingredList.html?i=${ingredName}`;
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
