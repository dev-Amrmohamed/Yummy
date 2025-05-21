//* HTML elements
let areaRow = document.querySelector("#areaRow");
let loader = document.querySelector("#loader");
//^ Global variables
//# Functions
async function getAllAreas() {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let data = await response.json();
  console.log(data.meals);
  displayAreas(data.meals);
  hideLoader();
}
getAllAreas();

function displayAreas(areas) {
  for (let i = 0; i < areas.length; i++) {
    areaRow.innerHTML += `
                  <div class="col-md-3 gy-4">
                      <div class="item position-relative overflow-hidden rounded-2" data-name="${areas[i].strArea}">
                        <i class="fas fa-home"></i>
                        <h3 class="pt-3">${areas[i].strArea}</h3>
                      </div>
                  </div>
    `;
  }

  let items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      let areaName = this.getAttribute("data-name");
      window.location.href = getBasePath() + "pages/areaMeal.html?a=" + areaName;
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
