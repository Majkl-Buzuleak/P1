/* -------------------------------------------------------------------------- */
/*                               form validation                              */
/* -------------------------------------------------------------------------- */
// RegEx patterns for validating input fields
const regExEmail = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const regExAddress =
    /^[\wäöüßÄÖÜ.,'-\s]+\d+[\wäöüßÄÖÜ.,'-\s]*\d*(?:[\wäöüßÄÖÜ.,'-\s]+)?$/i;
const regExZipCode = /^\d{4,5}(-\d{4})?$/;
const regExCity = /^[\wäöüßÄÖÜ.-]+$/;

// checks if input fields are valid/invalid and changes the CSS
function toggleValidationClasses(element, isValid) {
    element.classList.remove(isValid ? "invalid" : "valid");
    element.classList.add(isValid ? "valid" : "invalid");
    const label = document.querySelector(`label[for="${element.id}"]`);
    label.classList.remove(isValid ? "invalid-text" : "valid-text");
    label.classList.add(isValid ? "valid-text" : "invalid-text");

    const errorMessage = document.querySelector(`small#error-${element.id}`);
    if (!isValid) {
        errorMessage.textContent = `Please enter a valid ${label.textContent.toLowerCase()}.`;
    } else {
        errorMessage.textContent = "";
    }
}

// tests the input field's value against the corresponding RegEx pattern
function validateField(field, regex) {
    const isValid = regex.test(field.value);
    toggleValidationClasses(field, isValid);
    return isValid;
}

function validateForm() {
    let isValidForm = true;
    document.querySelectorAll("input, textarea").forEach((input) => {
        switch (input.id) {
            case "email":
                isValidForm = validateField(input, regExEmail) && isValidForm;
                break;
            case "adress":
                isValidForm = validateField(input, regExAddress) && isValidForm;
                break;
            case "zip-code":
                isValidForm = validateField(input, regExZipCode) && isValidForm;
                break;
            case "city":
                isValidForm = validateField(input, regExCity) && isValidForm;
                break;
            default:
                isValidForm = input.value.trim() !== "" && isValidForm;
        }
    });
    return isValidForm;
}

// listen to input-fields and check if validateField() function is true
document.querySelectorAll(".input-field").forEach((input) => {
    input.addEventListener("focusout", () => {
        switch (input.id) {
            case "email":
                validateField(input, regExEmail);
                break;
            case "adress":
                validateField(input, regExAddress);
                break;
            case "zip-code":
                validateField(input, regExZipCode);
                break;
            case "city":
                validateField(input, regExCity);
                break;
            default:
                toggleValidationClasses(input, input.value.trim() !== "");
        }
    });
});

// listen to the submit button in the form and check validation
// if validation is false, throw error message and mark appropriate fields red
document.querySelector("form").addEventListener("submit", (event) => {
    if (!validateForm()) {
        event.preventDefault();

        document.querySelector(".submit-error").textContent =
            "Please fill out all fields.";

        // marks all input-fields red if nothing was written
        document.querySelectorAll(".input-field").forEach((input) => {
            if (input.value.trim() === "") {
                toggleValidationClasses(input, false);
            }
        });
    }
});

// create error messages and append them under input fields
document.querySelectorAll(".input-field").forEach((input) => {
    const errorMessage = document.createElement("small");
    errorMessage.id = `error-${input.id}`;
    errorMessage.classList.add("error-message");
    errorMessage.style.display = "flex";
    input.parentNode.appendChild(errorMessage);
});