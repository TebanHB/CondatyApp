# Condaty App Móvil

Este es el proyecto móvil de Condaty, desarrollado con [Expo](https://expo.dev) y [React Native](https://reactnative.dev), orientado a la gestión y participación en encuestas dentro del ecosistema Condaty.

## Demo Temporal

Puedes probar una versión en vivo de la app instalando Expo Go y escaneando el QR que aparece al iniciar el proyecto localmente.

### Credenciales de Prueba

Utiliza las siguientes cuentas para acceder a la demo:

```json
[
   { "email": "admin@admin.com", "password": "12345678", "role": "admin" },
   { "email": "guardia@guardia.com", "password": "12345678", "role": "guard" },
   { "email": "cliente@cliente.com", "password": "12345678", "role": "resident" }
]
```

## Alcance del Proyecto

### Funcionalidades Incluidas

- **Autenticación Segura**: Inicio de sesión con roles diferenciados (admin, guard, resident).
- **Gestión de Encuestas**:
   - Visualización de encuestas activas.
   - Responder encuestas desde la app.
- **Navegación basada en rutas**: Utiliza [file-based routing](https://docs.expo.dev/router/introduction) para una estructura clara.

### Funcionalidades Excluidas

- **Creación/Edición de encuestas**: Solo disponible en el panel web.
- **Notificaciones en Tiempo Real**: No implementadas en esta versión.
- **Exportación de Datos**: No disponible en la app móvil.
- **Bases de Datos Externas**: Utiliza datos locales o simulados.
- **Personalización avanzada**: No incluye temas personalizados (ej: DarkMode).

## Configuración del Entorno

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia la app en modo desarrollo:

   ```bash
   npx expo start
   ```

3. Escanea el QR con Expo Go para probar la app en tu dispositivo.

## Despliegue

Para generar una build de producción, consulta la [documentación de Expo](https://docs.expo.dev/build/introduction/).

## Aprende más

- [Expo documentación](https://docs.expo.dev/)
- [React Native documentación](https://reactnative.dev/)

## Comunidad

- [Expo en GitHub](https://github.com/expo/expo)
- [Discord de Expo](https://chat.expo.dev)

