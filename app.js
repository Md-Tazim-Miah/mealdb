const loadMeals = async(searchText, dataLimit) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    displayMeals(data.meals, dataLimit); // Pass the array of meals
};

const displayMeals = (meals, dataLimit) => {
    const mealsContainer = document.getElementById("meals-container");
    mealsContainer.textContent = "";
    // Display no meals if the search is invalid
    const noMeal = document.getElementById("no-meal");
    if (meals === null || meals.length === 0) {
        noMeal.classList.remove("hidden");
    } else {
        noMeal.classList.add("hidden");

        // Display 6 dishes
        const showAll = document.getElementById('show-all');
        if(dataLimit && meals.length > 6){
        meals = meals.slice(0, 6);
        showAll.classList.remove('hidden');
        } else{
        showAll.classList.add('hidden');
        }
        meals.forEach(meal => {
            const mealDiv = document.createElement("div");
            mealDiv.classList.add("flex", "justify-center", "items-center", "w-full", "rounded", "overflow-hidden", "shadow-lg", "mx-auto");
            mealDiv.innerHTML = `
                <div class="w-1/2">
                    <img class="w-full h-52 object-cover rounded-xl" src="${meal.strMealThumb
                    }" alt="Food Image">
                </div>
                <div class="w-1/2">
                    <div class="px-6 py-4">
                        <div class="text-gray-600 font-bold text-3xl mb-2">${meal.strMeal}</div>
                        <p class="text-gray-700 text-xl">
                            ${meal.strTags}
                        </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <a onclick="openModal(); loadMealsDetails(${meal.idMeal})" href="#" class="text-yellow-600 font-semibold text-2xl">View Details</a>
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
    // Start the spinner
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadMeals(searchText, dataLimit);
    searchField.value = '';
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

// Search button eventhandler
document.getElementById("btn-search").addEventListener("click", function (event) {
    event.preventDefault();
    searchProcess(6);
  });

// Search button control by Enter key handler
const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        searchProcess(6);
    }
});


loadMeals('fish', 6);

//Show the meal details
const loadMealsDetails = async id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayMealDetails(data.meals[0]);
  };

  const displayMealDetails = meal => {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <p><strong>Origin:</strong> ${meal.strArea}</p>
      <p><strong>Dish Category:</strong> ${meal.strCategory || 'N/A'}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        <li><strong>1:</strong> ${meal.ingredient1 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures1 || 'N/A'}</li>
        <li><strong>2:</strong> ${meal.ingredient2 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures2 || 'N/A'}</li>
        <li><strong>3:</strong> ${meal.ingredient3 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures3 || 'N/A'}</li>
        <li><strong>4:</strong> ${meal.ingredient4 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures4 || 'N/A'}</li>
        <li><strong>5:</strong> ${meal.ingredient5 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures5 || 'N/A'}</li>
        <li><strong>6:</strong> ${meal.ingredient6 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures6 || 'N/A'}</li>
        <li><strong>7:</strong> ${meal.ingredient7 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures7 || 'N/A'}</li>
        <li><strong>8:</strong> ${meal.ingredient8 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures8 || 'N/A'}</li>
        <li><strong>9:</strong> ${meal.ingredient9 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures9 || 'N/A'}</li>
        <li><strong>10:</strong> ${meal.ingredient10 || 'N/A'}</li>
        <li><strong>Measures:</strong> ${meal.strMeasures10 || 'N/A'}</li>
      </ul>
      <p class="mb-10"><strong>Instructions:</strong> ${meal.strInstructions || 'N/A'}</p>
      <a href="${meal.strYoutube}" target="_blank" class="text-red-600 px-2 py-1 rounded border shadow-sm"><strong>Tutorial</strong></a>
    `;
  };

  // Modal open function
function openModal() {
    document.getElementById('myModal').classList.remove('hidden');
}

// Modal close function
function closeModal() {
    document.getElementById('myModal').classList.add('hidden');
}