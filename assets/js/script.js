//Build metric or imperial system for height and weight on start

let heightWeight = document.getElementById("heightWeight");
let metric = document.getElementById("metricSystem");
let imperial = document.getElementById("imperialSystem");

// // Check to build so it build correctly if browser is refreshed
if (metric.checked) {
    buildMetric();
} else if (imperial.checked) {
    buildImperial();
}

//Build metric or imperial system for height and weight after click

metric.addEventListener("click", buildMetric);
imperial.addEventListener("click", buildImperial);

function buildMetric(event) {
    heightWeight.innerHTML = `
        <div class="row mb-4">
            <div class="col">
                <div class="form-floating">
                    <input required type="number" class="form-control" placeholder="Enter your height" id="height"></input>
                    <label for="height" class="black">Height</label>
                </div>
            </div>
            <div class="col">
                <span>centimeters</span>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col">
                <div class="form-floating">
                    <input required type="number" class="form-control" placeholder="Enter your weight" id="weight"></input>
                    <label for="weight" class="black">Weight</label>
                </div>
            </div>
            <div class="col">
                <span>kilograms</span>
            </div>
        </div>
    `;
}

function buildImperial(event) {
    heightWeight.innerHTML = `
        <div class="row mb-4">
            <div class="col">
                <div class="form-floating">
                    <input required type="number" class="form-control" placeholder="Enter your height" id="heightFeet"></input>
                    <label for="height" class="black">Height</label>
                </div>
            </div>
            <div class="col">
                <span>feet</span>
            </div>
            <div class="col">
                <div class="form-floating">
                    <input required type="number" class="form-control" placeholder="Enter your height" id="heightInches"></input>
                    <label for="height" class="black"></label>
                </div>
            </div>
            <div class="col">
                <span>inches</span>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col">
                <div class="form-floating">
                    <input required type="number" class="form-control" placeholder="Enter your weight" id="weightPounds"></input>
                    <label for="weight" class="black">Weight</label>
                </div>
            </div>
            <div class="col">
                <span>pounds</span>
            </div>
        </div>
    `;
}

// Listen to Submit (tdee) and click (bmi) form event

let form = document.getElementById("form");
form.addEventListener('submit', handleSubmit);

let formB = document.getElementById("calculate");
formB.addEventListener('click', handleSubmitB);

// Convert Imperial to metric 
function convertImperial(iHeightF, iHeightIn, iWeight) {
    let feetCM = iHeightF * 30.48;
    let inchesCM = iHeightIn * 2.54;
    let heightConverted = Math.floor(feetCM + inchesCM);
    let weightKG =  Math.floor(iWeight / 2.205);
    let result = {
        height: heightConverted,
        weight: weightKG
    }
    return result;
}

// Calculate BMI
function calcBMI(height, weight) {
    let bmi = {};
    // Convert cm to meters
    height = height / 100;
    // pow gives meters squared - round ((value) * 100) / 100 so I can get 2 decimal places 
    bmi.number = Math.round( (weight / Math.pow(height, 2)) * 100) / 100;
    
    if (bmi.number < 18.5) {
        bmi.status = "Underweight";
        bmi.color = "text-warning";
    } else if (bmi.number >= 18.5 && bmi.number <= 24.9) {
        bmi.status = "Healthy";
        bmi.color = "text-success";
    } else if (bmi.number >= 25.0 && bmi.number <= 29.9) {
        bmi.status = "Overweight";
        bmi.color = "text-warning";
    } else if (bmi.number >= 30.0) {
        bmi.status = "Obesity";
        bmi.color = "text-danger";
    }

    return bmi;
}

//Calculate TDAA
function calcTDEE(person) {
    let tdee;
    let activity;
    switch(person.activity) {
        case "sedentary":
            activity = 1.2;
            break;
        case "light":
            activity = 1.375;
            break;
        case "moderate":
            activity = 1.55;
            break;
        case "very":
            activity = 1.725;
            break;
        case "extra":
            activity = 1.9;
            break;
        default:
            activity = 1.2;
      } 
      
    // calculate tdee based on gender
    if (person.gender == "male") {
        tdee = ((10 * person.weight) + (6.25 * person.height) - (5 * person.age) + 5) * activity;
    } else if (person.gender == "female") {
        tdee = ((10 * person.weight) + (6.25 * person.height) - (5 * person.age) - 161) * activity;
    }

    return Math.round(tdee);
}

// Calculate macros
function calcMacros(tdee) {
    let tdeeCut = tdee - 500;
    let macros = {
        //Maintain weight
        main: {
            tdee: tdee,
            carbs: Math.round((tdee * 0.40) / 4),
            fats: Math.round((tdee * 0.30) / 9),
            proteins: Math.round((tdee * 0.30) / 4)
        },
        //Lose weight
        cut: {
            tdee: tdeeCut,
            carbs: Math.round((tdeeCut * 0.40) / 4),
            fats: Math.round((tdeeCut * 0.30) / 9),
            proteins: Math.round((tdeeCut * 0.30) / 4)
        }
    };
   
    return macros;
}

// Build BMI card
function buildBMI(bmi) {
    let html = `
    <div class="card bg-dark border-dark text-center">
        <div class="card-header">
            Body Mass Index
        </div>
        <div class="card-body">
            <h5 class="card-title">
                Your BMI is 
                <p class="${bmi.color} h2 fw-bolder">${bmi.number}</p> 
                and weight status is 
                <span class="${bmi.color}">${bmi.status}</span> 
            </h5>
            <p class="card-text fw-lighter">
                BMI does not take into account whether the weight is carried as muscle or fat.
            </p>
        </div>
    </div>
    `;
    return html;
}

// Build TDEE card
function buildTDEE(tdee) {
    let html = `
    <div class="card bg-dark border-dark text-center">
        <div class="card-header">
         Total Daily Energy Expenditure
        </div>
        <div class="card-body">
            <h5 class="card-title">
                Your TDEE is 
                <p class="text-info h2 fw-bolder">${tdee}</p> 
                calories daily
            </h5>
            <p class="card-text fw-lighter">
                Calculaded using Mifflin-St. Jeor equation.
            </p>
        </div>
    </div>
    `;
    return html;
}

// Build macro card
function buildMacros(macros) {
    let html = `
        <div class="card bg-dark border-dark text-center">
            <div class="card-header">
                Average Macronutrients Recommendation
            </div>
            <div class="card-body">
                <p class="card-text">
                    Based on <span class="fw-bolder">${macros.main.tdee}</span> cal. to maintain weight or <span class="fw-bolder">${macros.cut.tdee}</span>
                     cal. to lose weight
                </p>
                <p class="card-text">
                    <span class="text-muted">(40% carbs 30% fats 30% proteins)</span>
                </p>
                <p class="card-text"> 
                    <span class="fw-bolder text-info">Maintain</span> Weight:
                    <span class="h2">${macros.main.carbs}</span> Carbs
                    <span class="h2">${macros.main.fats}</span> Fats
                    <span class="h2">${macros.main.proteins}</span> Proteins
                </p>
                <p class="card-text"> 
                    <span class="fw-bolder text-info">Lose</span>  Weight:
                    <span class="h2">${macros.cut.carbs}</span> Carbs
                    <span class="h2">${macros.cut.fats}</span> Fats
                    <span class="h2">${macros.cut.proteins}</span> Proteins
                </p>
                <p class="card-text fw-lighter">
                    Keep in mind that these recommendations may not fit your specific needs.
                    Your ratio can be fine-tuned in order to achieve specific objectives.
                </p>
            </div>
        </div>
    `;
    return html;

}
// Build recomendations card
function buildTips(tdee) {
    let html = `
        <div class="card bg-dark border-dark text-center">
            <div class="card-header">
                Tools Recomendation
            </div>
            <div class="card-body">
                <h5 class="card-title">
                    Tools to help you achieve your goals
                </h5>
                <p class="card-text"> 
                    <span class="fw-bolder text-info">Calorie Tracker: </span>
                    App for iOS and Android
                    <a href="https://www.myfitnesspal.com">MyFitnessPal</a>.
                </p>
                <p class="card-text"> 
                    <span class="fw-bolder text-info">Recipes: </span>
                    Create personalized meal plans based on your food preferences, budget, and schedule with 
                    <a href="https://www.eatthismuch.com/?generate=1&diet_type=anything&cals=${tdee}" target="_blank">EatThisMuch</a>.
                </p>
                 <p class="card-text"> 
                    <span class="fw-bolder text-info">Have at home: </span>
                    A good <strong>food scale</strong> and <strong>bathroom scale.</strong>
                    
                </p>
                <p class="card-text fw-lighter">
                    Keep track of your vitamins needs especially Vitamin D.
                </p>
            </div>
        </div>
    `;
    return html;

}

// put all cards together
function glueCards(bmi, tdee = "", macros = "", tips = "") {
    let html = `
        <div class="row">
            <div class="col-md-6 col-sm-12 mt-4">
                ${bmi}
            </div> 
        `;
    if (tdee != "") {
        html += `
            <div class="col-md-6 col-sm-12 mt-4">
                ${tdee}
            </div>
        `;
    }
    if (macros != "") {
        html += `
            <div class="col-md-6 col-sm-12 mt-4">
                ${macros}
             </div>
        `;
    }
    if (tips != "") {
        html += `
            <div class="col-md-6 col-sm-12 mt-4">
                ${tips}
            </div>
        `;
    }
            
    html += `
        </div>
    `;

    return html;
}

// on submit tdee
function handleSubmit(event){
    event.preventDefault();

    let person = {};
    person.activity = document.getElementById("activity").value;
    person.age = document.getElementById("age").value;

    let male = document.getElementById("male");
    let female = document.getElementById("female");
    if (male.checked) {
        person.gender = "male";
    } else if (female.checked) {
        person.gender = "female"
    }

    if (imperial.checked) {
        let heightFeet = document.getElementById("heightFeet").value;
        let heightInches = document.getElementById("heightInches").value;
        let weightPounds = document.getElementById("weightPounds").value;

        // convert imperial to metric system
        let convertion = convertImperial(heightFeet, heightInches, weightPounds);
        person.height = convertion.height;
        person.weight = convertion.weight;

    }  else {
        person.height = document.getElementById("height").value;
        person.weight = document.getElementById("weight").value;
    }

    let tdee = calcTDEE(person);
    let bmi = calcBMI(person.height, person.weight);
    let macros = calcMacros(tdee);

    let tdeeHTML = buildTDEE(tdee);
    let bmiHTML = buildBMI(bmi);
    let macrosHTML = buildMacros(macros);
    let tips = buildTips(tdee);

    let cards = document.getElementById("cards");
    cards.innerHTML = glueCards(bmiHTML, tdeeHTML, macrosHTML, tips);
    cards.scrollIntoView();

}

// on submit bmi
function handleSubmitB(event){
    let person = {};
    
    if (imperial.checked) {
        let heightFeet = document.getElementById("heightFeet").value;
        let heightInches = document.getElementById("heightInches").value;
        let weightPounds = document.getElementById("weightPounds").value;

        // convert imperial to metric system
        let convertion = convertImperial(heightFeet, heightInches, weightPounds);
        person.height = convertion.height;
        person.weight = convertion.weight;

    }  else {
        person.height = document.getElementById("height").value;
        person.weight = document.getElementById("weight").value;
    }

    let bmi = calcBMI(person.height, person.weight);
    let bmiHTML = buildBMI(bmi);
    let tips = buildTips("");

    let cards = document.getElementById("cards");
    cards.innerHTML = glueCards(bmiHTML, "", "", tips);
    cards.scrollIntoView();
}



