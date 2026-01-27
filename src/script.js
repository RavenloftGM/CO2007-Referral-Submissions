const form = document.getElementById("referralForm");
const progressBar = document.getElementById("progressBar");

// Fields and their validators
const fields = {
    ref_physician: {
        el: form.ref_physician,
        validator: val => val.trim().length >= 3,
        errorEl: document.getElementById("errorPhysician"),
        errorMsg: "Physician name must be at least 3 characters.",
        touched: false
    },
    ref_clinic: {
        el: form.ref_clinic,
        validator: val => val.trim().length >= 3,
        errorEl: document.getElementById("errorClinic"),
        errorMsg: "Clinic name must be at least 3 characters.",
        touched: false
    },
    patient_name: {
        el: form.patient_name,
        validator: val => val.trim().length >= 5 && val.trim().split(" ").length >= 2,
        errorEl: document.getElementById("errorPatient"),
        errorMsg: "Full name must be at least 5 characters and include at least 2 names.",
        touched: false
    },
    patient_dob: {
        el: form.patient_dob,
        validator: val => val && new Date(val) < new Date(),
        errorEl: document.getElementById("errorDob"),
        errorMsg: "Date of birth must be before today.",
        touched: false
    },
    urgency: {
        el: form.urgency,
        validator: val => val !== "",
        errorEl: document.getElementById("errorUrgency"),
        errorMsg: "Please select an urgency level.",
        touched: false
    }
};

// Validate a single field and optionally show error
function validateField(field) {
    const value = field.el.value;
    const isValid = field.validator(value);

    if (field.touched) {
        field.errorEl.textContent = isValid ? "" : field.errorMsg;
    } else {
        field.errorEl.textContent = ""; // hide error if not touched
    }

    return isValid;
}

// Validate all fields, update progress
function validateAllFields() {
    let validCount = 0;
    const total = Object.keys(fields).length;

    Object.values(fields).forEach(field => {
        if (validateField(field)) validCount++;
    });

    progressBar.style.width = (validCount / total) * 100 + "%";

    return validCount === total;
}

// Attach listeners for focus/typing
Object.values(fields).forEach(field => {
    field.el.addEventListener("input", () => {
        field.touched = true; // mark as touched when user types
        validateAllFields();
    });
    field.el.addEventListener("blur", () => {
        field.touched = true; // mark as touched when leaving field
        validateAllFields();
    });
});

// Form submission: mark all as touched to show errors if invalid
form.addEventListener("submit", function(e) {
    Object.values(fields).forEach(field => (field.touched = true));
    if (!validateAllFields()) e.preventDefault();
});

// Initialize progress bar (no errors yet)
validateAllFields();
