//* HTML elements
let cateBox = document.querySelector("#cate-box");
//^ Global variables
//# Functions
async function getCategories() {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let data = await response.json();
  console.log(data.categories[0]);
  displayCate(data.categories);
  hideLoader();
}
getCategories();

function displayCate(dataCate) {
  for (let i = 0; i < dataCate.length; i++) {
    cateBox.innerHTML += `
              <div class="col-md-3 gy-4">
            <div class="item position-relative overflow-hidden rounded-2" data-name="${dataCate[i].strCategory}">
              <img src="${dataCate[i].strCategoryThumb}" class="w-100" />
              <div class="overlay overflow-hiding p-2 position-absolute text-center text-black text-capitalize d-flex flex-column align-items-center justify-content-center">
                <h3 class="">${dataCate[i].strCategory}</h3>
                <p class="cate-desc m-0">${dataCate[i].strCategoryDescription.slice(0, 70)}</p>
              </div>
            </div>
          </div>
    `;
  }
  let items = document.querySelectorAll(".item");
  // console.log(items);
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      let CateName = this.getAttribute("data-name");
      window.location.href = `/Yummy/cateMeal.html?id=${CateName}`;
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
