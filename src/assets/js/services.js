const apiServices = {};
const options = {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
};

apiServices.login = async function ({body}) {
    return (await fetch('/login', {...options, body})).json()
}

apiServices.getUser = async function ({body}) {
    return (await fetch('/user', {...options, body})).json()
}

export default apiServices;