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
    `
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
    `
}

// Listen to Submit form event

let form = document.getElementById("tdeeForm");
form.addEventListener('submit', handleSubmit);

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
        bmi.status = "Healthy Weight";
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

// Build BMI card
function buildBMI(bmi) {
    let html = `
    <div class="card text-center">
        <div class="card-header">
            Body Mass Index
        </div>
        <div class="card-body">
            <h5 class="card-title">
                Your BMI is 
                <span class="${bmi.color}">${bmi.number}</span> 
                and weight status is 
                <span class="${bmi.color}">${bmi.status}</span> 
            </h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
    </div>
    ` 
    return html;
}


function glueCards(bmi, tdee) {
    let html = `
        <div class="row">
            <div class="col">
                ${bmi}
            </div>
            <div class="col">
                ${tdee}
            </div>
        </div>
    `

    return html;
}

// on submit
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

    let tdeeResult = calcTDEE(person);
    let bmiResult = calcBMI(person.height, person.weight);
    let tdee = "aqui vem o tdee";
    let bmi = buildBMI(bmiResult);

    document.getElementById("cards").innerHTML = glueCards(bmi, tdee);
    
    //form.submit();
}

