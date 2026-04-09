PAQUETE LISTO PARA FIREBASE + GITHUB PAGES

Archivos nuevos:
- firebase-config.js
- firebase-config.example.js
- firestore.rules.txt

PASOS RAPIDOS
1) En Firebase crea el proyecto.
2) Activa Firestore Database.
3) Activa Authentication > Anonymous.
4) Copia la configuración web de Firebase.
5) Abre firebase-config.js y pega tus datos.
6) Cambia enabled a true.
7) Sube todo el contenido del paquete a tu repositorio.
8) Abre la app en PC y celular con el mismo workspaceId.

QUE HACE ESTA VERSION
- Firebase/Firestore sincroniza tareas, reuniones y equipo en tiempo real.
- localStorage se mantiene como respaldo local y para preferencias de interfaz.
- Si Firebase no está configurado, la app sigue funcionando en modo local.

IMPORTANTE
- workspaceId debe ser el mismo en todos los dispositivos del equipo.
- Si cambias workspaceId, entras a otro espacio de trabajo.
- Las reglas incluidas son una base simple para empezar con autenticación anónima.
- Si luego quieres más seguridad, el siguiente paso es crear usuarios reales y reglas por miembro.

Firebase activo con workspaceId=equipo-1
