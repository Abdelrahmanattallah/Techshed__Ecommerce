/*start declar form inputs */
const spName = document.getElementById("spName");
const spEmail = document.getElementById("spEmail");
const spPassword = document.getElementById("spPassword");
const spcPassword = document.getElementById("spcPassword");
/*end declar form inputs */

/*start create account event */
const spBtn = document.getElementById("spBtn");
spBtn.addEventListener("click", signUpNew);
/*end create account event */

/*start the function which responsible on the events*/
function signUpNew() {
  // check if the inputs are not empty
  if ((spName.value && spEmail.value && spPassword.value && spcPassword.value) !== "") {
    // check if the password fields are matches and the password not less than 8
    if ((spPassword.value !== spcPassword.value)  || spPassword.value.length < 8 ) { 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Make Sure the password fileds are matching and not less than 8 chracters',
      })
      // if all is good 
    } else { 
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Your account has been created succesfully',
        showConfirmButton: true,
        timer: 2500
      })
    let clientObj = {
      cName: spName.value,
      cEmail: spEmail.value,
      cPassword: spPassword.value,
      passConfirm: spcPassword.value,
    };
    localStorage.setItem("client", JSON.stringify(clientObj));
    spName.value = "";
    spEmail.value = "";
    spPassword.value = "";
    spcPassword.value = "";
    setTimeout(() => {
      window.location.href = "login.html"
    }, 3000);
    }
    // if the inputs is empty 
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Make Sure the fields is full fill',
    })
  }
}
/*end the function which responsible on the events*/