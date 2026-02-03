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
    ref_phone: {
        el: form.ref_phone,
        validator: val => /^((\\+44\\s?|0)7\\d{3}\\s?\\d{6}|(\\+44\\s?|0)1\\d{2,4}\\s?\\d{5,7})$/.test(val.replace(/\s+/g, '')),
        errorEl: document.getElementById("errorPhone"),
        errorMsg: "Please enter a valid UK phone number.",
        touched: false
    },
    ref_email: {
        el: form.ref_email,
        validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        errorEl: document.getElementById("errorEmail"),
        errorMsg: "Please enter a valid email address.",
        touched: false
    },
    ref_fax: {
        el: form.ref_fax,
        validator: val => val.trim() === "" || /^[0-9\s\-+()]{7,20}$/.test(val),
        errorEl: document.getElementById("errorFax"),
        errorMsg: "Please enter a valid fax number or leave blank.",
        touched: false
    },
    patient_name: {
        el: form.patient_name,
        validator: val => val.trim().split(/\s+/).length >= 2 && val.trim().length >= 5,
        errorEl: document.getElementById("errorPatient"),
        errorMsg: "Enter at least two names (First and Last).",
        touched: false
    },
    patient_dob: {
        el: form.patient_dob,
        validator: val => val !== "" && new Date(val) < new Date(),
        errorEl: document.getElementById("errorDob"),
        errorMsg: "Date of birth must be in the past.",
        touched: false
    },
    // ADDED: Urgency Validation
    urgency: {
        el: form.urgency,
        validator: val => val !== "",
        errorEl: document.getElementById("errorUrgency"),
        errorMsg: "Please select an urgency level.",
        touched: false
    },
    // ADDED: Reason/Notes Validation
    reason: {
        el: form.reason,
        validator: val => val.trim().length >= 10,
        errorEl: document.getElementById("errorReason"),
        errorMsg: "Please provide a brief reason (min 10 chars).",
        touched: false
    }
};

// ... keep existing validateField and validateAllFields functions ...

// ADDED: Real-time Character Counter Logic
const textarea = form.reason;
const charCount = document.getElementById("charCount");

textarea.addEventListener("input", () => {
    const remaining = 500 - textarea.value.length;
    charCount.textContent = `${remaining} characters remaining`;
    
    // Visual cue if running out of space
    charCount.style.color = remaining < 50 ? "#d93025" : "#666";
});

// Attach listeners for focus/typing
Object.values(fields).forEach(field => {
    field.el.addEventListener("input", () => {
        field.touched = true; 
        validateAllFields();
    });
    field.el.addEventListener("blur", () => {
        field.touched = true; 
        validateAllFields();
    });
});

form.addEventListener("submit", (e) => {
    Object.values(fields).forEach(f => f.touched = true);
    if (!validateAllFields()) {
        e.preventDefault();
        // Scroll to the first error
        const firstError = document.querySelector(".error:not(:empty)");
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Initialize progress bar on load
validateAllFields();
