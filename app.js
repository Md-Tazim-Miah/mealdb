const loadMeals = async() => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=fish`;
    const response = await fetch(url);
    const data = await response.json();
    displayMeals(data.meals); // Pass the array of meals
};

const displayMeals = (meals) => {
    const mealsContainer = document.getElementById("meals-container");
    mealsContainer.textContent = "";
    // Display no meals if the search is invalid
    const noMeal = document.getElementById("no-meal");
    if (meals === null || meals.length === 0) {
        noMeal.classList.remove("hidden");
    } else {
        noMeal.classList.add("hidden");
        meals.forEach(meal => {
            const mealDiv = document.createElement("div");
            mealDiv.classList.add("flex", "justify-center", "items-center", "w-full", "rounded", "overflow-hidden", "shadow-lg", "mx-auto");
            mealDiv.innerHTML = `
                <div class="w-1/2">
                    <img class="w-full h-52 object-cover rounded-xl" src="images/banner_1.png" alt="Food Image">
                </div>
                <div class="w-1/2">
                    <div class="px-6 py-4">
                        <div class="text-gray-600 font-bold text-3xl mb-2">${meal.strMeal}</div>
                        <p class="text-gray-700 text-xl">
                            ${meal.strTags}
                        </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <a href="#" class="text-yellow-600 font-semibold text-2xl">View Details</a>
                    </div>
                </div>
            `;
            mealsContainer.appendChild(mealDiv);
        });
    }
    toggleSpinner(false);
};

// Search function
const searchProcess = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadMeals(searchText, dataLimit);
};

// Toggle Spinner
const toggleSpinner = (isLoading) => {
    const spinnerContainer = document.getElementById("spinner-container");
    if (isLoading) {
      spinnerContainer.classList.remove("hidden");
    } else {
      spinnerContainer.classList.add("hidden");
    }
  };

// Show all button eventhandler
document.getElementById('btn-show-all').addEventListener("click", function(){
    searchProcess();
});

// Search button control by Enter key handler
const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        searchProcess();
    }
});

loadMeals();
