import JustValidate from "just-validate";

const courierRequestFormEl = document.forms.courierRequestForm;
const validateForm = new JustValidate(courierRequestFormEl,{
    validateBeforeSubmitting:true
  });
  const localStorageKey="userData";
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
    "#pickuparea",
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

  
  const existingCourierData=localStorage.getItem(localStorageKey);
  // console.log(existingCourierData);

  const userDataArr=JSON.parse(existingCourierData)

  if(userDataArr){
    userDataArr.push(data);
    localStorage.setItem(localStorageKey,JSON.stringify(userDataArr))
  }
  else{
    const arr=[];
    arr.push(data);
    localStorage.setItem(localStorageKey,JSON.stringify(arr))
  }
alert("Form Successfully Submitted");
courierRequestFormEl.reset();
  })

  const tableEl=document.querySelector("table tbody");
function getAllCourierData(){
  //Get data from local storage
const courierData=localStorage.getItem(localStorageKey);
//Convert string data to js data format
const courierDataArr=JSON.parse(courierData);

// console.log(courierDataArr.length);

if(courierDataArr.length>0){
  const courierCard=document.getElementById('couriercard');
  courierCard.classList.remove('hidden');

  const fragment=document.createDocumentFragment();
  courierDataArr.map(courierData=>{
    // console.log(courierData.fullname);
  const tr=document.createElement('tr');
  // fullName element
  const td1=document.createElement('td');
  td1.textContent=courierData.fullname;
  td1.classList.add("table-input");
  // fullName element
  const td2=document.createElement('td');
  td2.textContent=courierData.phonenumber;
  td2.classList.add("table-input");
  // pickUpDate element
  const td3=document.createElement('td');
  td3.textContent=convertDateFormat(courierData.pickUpDate);
  td3.classList.add("table-input");
  // address element
  const td4=document.createElement('td');
  td4.textContent=courierData.pickuparea;
  td4.classList.add("table-input");
  // Action element
  const td5=document.createElement('td');
  td5.classList.add("table-input");
  const btnEl=document.createElement('button');
  btnEl.textContent='Delete';
  btnEl.classList.add("btn");
  td5.append(btnEl)
  
  tr.append(td1,td2,td3,td4,td5);
  
  fragment.append(tr);
})
tableEl.append(fragment);
}else{
  console.log('No Data Found')
}

}
getAllCourierData();


tableEl.addEventListener('click',(event)=>{
  console.log(event.target.parentNode);
  if(event.target.textContent==='Delete'){
    console.log('Delete btn');
  }
})

function convertDateFormat(val){
  const myDate=new Date(val);
  const currentDate=myDate.getDate();
  const currentMonth=myDate.toLocaleString("en-IN",{
    month:"short"
  })
  const currentYear=myDate.getFullYear();
  const finalDate=`${currentDate} - ${currentMonth} ${currentYear}`
   return finalDate;
}