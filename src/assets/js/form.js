const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const textModalError = document.getElementById("textModalError");
import access from './auth_token';
import apiServices from './services';



form.onsubmit = async (e) => {
    e.preventDefault();
    const user = email.value;
    const pwd = password.value;
    const result = await apiServices.login({body: JSON.stringify({email: user,password: pwd})});
    if(result.status === 200){
        await access.saveToken(result.token);
        window.location.href = '/dashboard';
        return;
    }else{
        showModal({message: result.error ?? "Error al iniciar sesión"})
    }
};




const showModal = ({ message }) => {
    textModalError.innerHTML = message;
    $("#modalError").modal("show");
}

const closeModal = () => $("#modalError").modal("hide");