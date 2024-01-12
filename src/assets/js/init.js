const init = {};
import access from '/js/auth_token.js';
import { getUser } from '/js/services.js';

const token = async () => await access.getToken();

init.getInitUser = async () => {
    const tk = await token();
    if(tk == null || tk === undefined){
        return window.location.href = "/home"
    }
    const result = await getUser();

}

export default init;