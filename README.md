# Api Rest Node
 
Servidor basico de node donde se tienen 4 peticiones funcionales.
1. Iniciar sesión (Generando Token) (Front y Back).
2. Traer productos por usuario (Validación por Token) (Front y Back).
3. Traer todos los productos (Validación por Token y verifica si es un usuario administrador) (Solo en la Api, probar en Postman).
4. Registrar usuario (Generando Token y no valida username repetido, por defecto no administrador) (Solo en la Api, probar en Postman).
5. Traer todos los usuario (No hay validación de Token ni de administrador) (Solo en la Api, probar en Postman).

Se realiza autenticación basica con jsonwebtoken y encriptación de contraseña con bcryptjs.\
Hay otros endepoint definidos pero no tienen logica de procesamiento (Se pueden completar).\
Estructura de Servidor formada siguiendo buenas practicas y modularidad.