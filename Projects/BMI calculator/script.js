function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const weightUnit = document.getElementById("weightUnit").value;

  const height = parseFloat(document.getElementById("height").value);
  const heightUnit = document.getElementById("heightUnit").value;

  let nWeight = weight;
  let nHeight = height; 

  if (isNaN(weight) || isNaN(height)) {
    document.getElementById("result").textContent = "Please fill in both weight and height.";
    return;
  }
  // If wight is in pound then Converting weight to kg
  if (weightUnit === "lb") {
    nWeight = weight * 0.453592;
  }

  // If height is in cm or ft Convert height to meters
  if (heightUnit === "cm") {
    nHeight = height / 100;
  } else if (heightUnit === "ft") {
    nHeight = height * 0.3048;
  }

  // Calculate BMI and the formula of BMI : Wight(Kg) / Square of height in meters)
  const bmi = nWeight / (nHeight * nHeight);
  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  const resultText = `Your BMI is ${bmi.toFixed(2)}. You are ${category}.`;
  document.getElementById("result").textContent = resultText;
}


document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" ) {
    calculateBMI();
  }
});