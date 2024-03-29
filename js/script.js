//initialized all input fields
const form = document.getElementById('jobApplicationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const resumeInput = document.getElementById('resume');
const submitBtn = document.getElementById('submitBtn');

// Validation
const validateNameEmpty = () => nameInput.value.trim().length > 0;
const validateName = () => /^[a-zA-Z ]+$/.test(nameInput.value.trim());
const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
const validatePhone = () => /^\d{3}-\d{3}-\d{4}$/.test(phoneInput.value.trim());
const validateAddress = () => addressInput.value.trim().length > 0;
const validateResume = () => {
  const allowedExtensions = ['pdf', 'docx'];
  console.log("file inpt", resumeInput)
  const fileName = resumeInput.value.trim();
  const extension = fileName.split('.').pop();
  const fileSize = resumeInput.files[0].size / 1024 / 1024; // in MB
  return allowedExtensions.includes(extension) && fileSize <= 5;
};


const errorMessages = {
  nameEmpty: 'Name cannot be empty.',  
  nameInvalid: 'Name must contain only letters and cannot contain numbers, Special Characters.',
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number (format: XXX-XXX-XXXX).',
  address: 'Address cannot be empty.',
  resume: 'Please upload a file with .pdf or .docx extension and maximum size of 5MB.'
};

// displayb error on id
const showError = (input, message) => {
  const errorSpan = document.getElementById(input.id + 'Error');
  errorSpan.textContent = message;
};

//clear error message on id
const clearError = input => {
  const errorSpan = document.getElementById(input.id + 'Error');
  errorSpan.textContent = '';
};

// validate button
const checkFormValidity = () => {
  const isValid = validateName() && validateEmail() && validatePhone() && validateAddress() && validateResume();
  submitBtn.disabled = !isValid;
};

// Event listeners 
nameInput.addEventListener('input', () => {
   if(!validateNameEmpty()){
    showError(nameInput, errorMessages.nameEmpty);
   }else if (!validateName()) {
    showError(nameInput, errorMessages.nameInvalid);
  } else {
    clearError(nameInput);
  }
  checkFormValidity();
});

emailInput.addEventListener('input', () => {
  if (!validateEmail()) {
    showError(emailInput, errorMessages.email);
  } else {
    clearError(emailInput);
  }
  checkFormValidity();
});

phoneInput.addEventListener('input', () => {
  if (!validatePhone()) {
    showError(phoneInput, errorMessages.phone);
  } else {
    clearError(phoneInput);
  }
  checkFormValidity();
});

addressInput.addEventListener('input', () => {
  if (!validateAddress()) {
    showError(addressInput, errorMessages.address);
  } else {
    clearError(addressInput);
  }
  checkFormValidity();
});

resumeInput.addEventListener('change', () => {
  if (!validateResume()) {
    showError(resumeInput, errorMessages.resume);
  } else {
    clearError(resumeInput);
  }
  checkFormValidity();
});

// Form submission
form.addEventListener('submit', event => {
  event.preventDefault();
  alert('Form submitted successfully!');
});
