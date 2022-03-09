let form = document.getElementById("tdeeForm");
// form.addEventListener('submit', handleSubmit);


//Build metric or imperial system for height and weight

let heightWeight = document.getElementById("heightWeight");
buildMetric();

let metric = document.getElementById("metricSystem");
metric.addEventListener("click", buildMetric);

let imperial = document.getElementById("imperialSystem");
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