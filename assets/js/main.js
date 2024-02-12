import JustValidate from "just-validate";

const courierRequestFormEl = document.forms.courierRequestForm;
const validateForm = new JustValidate(courierRequestFormEl,{
    validateBeforeSubmitting:true
  });
// console.log(validateForm);
// console.log(courierRequestFormEl);

validateForm
  .addField(
    "#fullname",
    [
      {
        rule: "required",
      },
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "maxLength",
        value: 20,
      },
    ],
    {
      errorFieldCssClass: ["form-error"], //Adding tailwindcss classes to err msg
    }
  )
  .addField(
    "#phonenumber",
    [
      {
        rule: "required",
      },
      {
        rule: "number",
      },
      {
        rule: "minLength",
        value: 10,
      },
      {
        rule: "maxLength",
        value: 10,
      },
    ],
    {
      errorFieldCssClass: ["form-error"], //Adding tailwindcss classes to err msg
    }
  )
  .addField(
    "#pickUpDate",
    [
      {
        rule: "required",
      }
    ],
    {
      errorFieldCssClass: ["form-error"], //Adding tailwindcss classes to err msg
    }
  )
  .addField(
    "#pickup-area",
    [
      {
        rule: "required",
      },
      {
        rule: "minLength",
        value: 10,
      },
      {
        rule: "maxLength",
        value: 30,
      },
    ],
    {
      errorFieldCssClass: ["form-error"], //Adding tailwindcss classes to err msg
    }
  );

  validateForm.onSuccess((e)=>{
   const formData = new FormData(courierRequestFormEl);
   const data=Object.fromEntries(formData);
  //  for (const val of formData.values()) {
  //   console.log(val);
  //  }

  
  const existingCourierData=localStorage.getItem('userData');
  // console.log(existingCourierData);

  const userDataArr=JSON.parse(existingCourierData)

  if(userDataArr){
    userDataArr.push(data);
    localStorage.setItem('userData',JSON.stringify(userDataArr))
  }
  else{
    const arr=[];
    arr.push(data);
    localStorage.setItem('userData',JSON.stringify(arr))
  }
alert("Form Successfully Submitted");
courierRequestFormEl.reset();
  })


