/* start declar login inputs */
const lnEmail = document.getElementById("lnEmail");
const lgPassword = document.getElementById("lgPassword");
/* end declar login inputs */

/* start declar the email and the password what will check on them from local storage */
let storageEmail = JSON.parse(localStorage.getItem("client")).cEmail;
let storagePassword = JSON.parse(localStorage.getItem("client")).cPassword;
/* end declar the email and the password what will check on them from local storage */

/* start login btn declar and event */
const lgBtn = document.getElementById("lgBtn");
lgBtn.addEventListener("click",loginCheck);
/* end login btn declar and event */

/* start the function which responsible for the login event */
function loginCheck() { 
  if (localStorage.getItem("client") !== null) { 
    if ((lnEmail.value === storageEmail) && (lgPassword.value === storagePassword)) { 
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'You Are Logged Now',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(() => {
        window.location.href = "index.html"
      }, 3000);
    } 
    else { 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, Make Sure You Writting the Right Email And Password',
      })
    }
  } else { 
    alert("dassd")
  }
}
/* end the function which responsible for the login event */