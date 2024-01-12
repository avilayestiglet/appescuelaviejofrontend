export default function (message) {
    if(message == null || message == undefined) return message;
    switch (message.toUpperCase()) {
        case "Failed to fetch":
            return "No tienes conexión a internet o el servidor esta caido"
        break;
        case "failed_to_connect_database":
            return "Error al consultar la base de datos, contacta con tu proveedor de servicios";
        default:
            return message;
        break;
    }
};