import JustValidate from "just-validate";

const courierRequestFormEl = document.forms.courierRequestForm;
const validateForm = new JustValidate(courierRequestFormEl,{
  validateBeforeSubmitting:true
});