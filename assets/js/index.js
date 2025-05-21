//* HTML elements
let openBtn = document.querySelector("span");
let closeBtn = document.querySelector(".close");
let cate = document.querySelector(".categories");
let aside = document.querySelector("aside");
let btns = document.querySelector(".btns");
let btnsLinks = document.querySelectorAll("ul li a");
let mainBox = document.querySelector("#myRow");
let loader = document.querySelector("#loader");
//^ Global variables

//# Functions
async function getMales() {
  showLoader();
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  let data = await response.json();
  displayMeals(data.meals);
  hideLoader();
}
getMales();

function displayMeals(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!mainBox) return;
    mainBox.innerHTML += `
          <div class="col-md-3 gy-4">
            <div class="item position-relative overflow-hidden rounded-2"data-id = "${arr[i].idMeal}">
              <img src="${arr[i].strMealThumb}" class="w-100" />
              <div class="overlay p-2 position-absolute text-center text-black text-capitalize d-flex align-items-center justify-content-center">
                <h3>${arr[i].strMeal}</h3>
              </div>
            </div>
          </div>
    `;
  }

  let items = document.querySelectorAll(".item");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      let mealId = this.getAttribute("data-id");
      // window.location.href = "../../pages/meal.html?id=" + mealId;
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
openBtn.addEventListener("click", function () {
  openBtn.classList.add("d-none");
  closeBtn.classList.remove("d-none");
  aside.style.left = "265px";
  cate.style.transform = "translateX(0)";
  btns.style.transform = "translateY(0)";
});

closeBtn.addEventListener("click", function () {
  closeBtn.classList.add("d-none");
  openBtn.classList.remove("d-none");
  cate.style.transform = "translateX(-101%)";
  btns.style.transform = "translateY(50%)";
  aside.style.left = "0";
});

for (let i = 0; i < btnsLinks.length; i++) {
  btnsLinks[i].addEventListener("click", function (e) {
    for (let j = 0; j < btnsLinks.length; j++) {
      btnsLinks[j].classList.remove("active");
    }
    e.target.classList.add("active");
  });
}
