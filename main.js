import './style.css'
import JustValidate from 'just-validate';

const courierRequestFormEl = document.forms.courierRequestForm
const validateForm = new JustValidate(courierRequestFormEl);
// console.log(validateForm);
// console.log(courierRequestFormEl);

validateForm.addField('#fullname',[
{
    rule:'required'
},
{
    rule:'minLength',
    value: 3,
},
{
    rule:'maxLength',
    value: 20,
}
],
{
    errorFieldCssClass:["form-error"] //Adding tailwindcss classes to err msg
})
.addField('#phonenumber',[
    {
        rule:'required'
    },
    {
        rule:'number'
    },
    {
        rule:'minLength',
        value: 10,
    },
    {
        rule:'maxLength',
        value: 10,
    }
    ],
    {
        errorFieldCssClass:["form-error"] //Adding tailwindcss classes to err msg
    })

// const formData = new FormData(courierRequestFormEl);
// console.log([...formData]);