import config from "../config/config";
const storage = localStorage;
const server = `${config.name}:${config.server_port}`;
const apiServices = {};


apiServices.login = async ({email, password}) => {
    const options = {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
    };
    const body = JSON.stringify({email, password});
    
    return await fetch(`${server}/login`, {...options, body})
};


apiServices.deleteTeacher = async ({id}) => {
  const options = {
      method: 'DELETE', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
  };
  
  return await fetch(`${server}/profesor?id=${id}`, {...options})
};

apiServices.getTeachers = async ({ queryParams }) => {
  let params = "";
  const token = await storage.getItem("access_token");
  if(!token){
    return {"error": "no tienes acceso a este recurso", "status": 401};
  }
  if(Object.entries(queryParams).length!=0){
    params = `?${new URLSearchParams(queryParams).toString()}`;
  }

  const options = {
    method: 'GET', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json'
      },
    };
    return await fetch(`${server}/profesor${params}`, {...options});
};


apiServices.getStudents = async ({ queryParams }) => {
  let params = "";
  const token = await storage.getItem("access_token");

  if(!token){
    return {"error": "no tienes acceso a este recurso", "status": 401};
  }
  if(Object.entries(queryParams).length!=0){
    params = `?${new URLSearchParams(queryParams).toString()}`;
  }
  const options = {
    method: 'GET', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json'
      },
    };
    return await fetch(`${server}/alumnos${params}`, {...options});
};

apiServices.getMatriculas = async ({ queryParams }) => {
  let params = "";
  const token = await storage.getItem("access_token");

  if(!token){
    return {"error": "no tienes acceso a este recurso", "status": 401};
  }
  if(Object.entries(queryParams).length!=0){
    params = `?${new URLSearchParams(queryParams).toString()}`;
  }
  const options = {
    method: 'GET', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json'
      },
    };
    return await fetch(`${server}/matriculas${params}`, {...options});
};

apiServices.deleteMatricula = async ({ id }) => {
  const options = {
      method: 'DELETE', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
  };
  
  return await fetch(`${server}/profesor?id=${id}`, {...options})
};


apiServices.getUser = async () => {
  const token = await storage.getItem("access_token");
  if(!token){
    return {"error": "no tienes acceso a este recurso", "status": 401};
  }

  const options = {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json'
      },
    };
    return await fetch(`${server}/user`, {...options});
};

apiServices.register = async ({
  email, 
  password, 
}) => {
  const options = { 
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
};
const body = JSON.stringify({
  email, 
  password,
  tipo_usuario: 'usuario'
});

return await fetch(`${server}/register`, {...options, body})
};

apiServices.createTeacher = async ({teacher}) => {
  const options = { 
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
};
const body = JSON.stringify(teacher);

return await fetch(`${server}/create-teacher`, {...options, body})
};

apiServices.getBitacora = async ({ queryParams }) => {
  let params = "";
  const token = await storage.getItem("access_token");

  if(!token){
    return {"error": "no tienes acceso a este recurso", "status": 401};
  }
  if(Object.entries(queryParams).length!=0){
    params = `?${new URLSearchParams(queryParams).toString()}`;
  }
  const options = {
    method: 'GET', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json'
      },
    };
    return await fetch(`${server}/bitacora${params}`, {...options});
};
export default apiServices;