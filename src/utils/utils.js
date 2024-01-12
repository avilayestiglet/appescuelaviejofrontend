const utils = {};

utils.validarEmail = (valor) => {
    let regex = /^([_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{1,6}))?$/;

    if(regex.test(valor)){
        return true;
    }else{
        return false;
    }
}
utils.validarNombreYApellido = (valor) => {
    const regexNombreApellido = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if(regexNombreApellido.test(valor)){
        return true;
    }else{
        return false;
    }
}

export default utils;