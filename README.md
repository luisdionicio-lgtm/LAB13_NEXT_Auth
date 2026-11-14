# El Refugio — Laboratorio 13

Aplicación académica de autenticación con Next.js y NextAuth.js, inspirada en The Walking Dead.

- Aplicación: https://lab-13-next-auth.vercel.app
- Repositorio: https://github.com/luisdionicio-lgtm/LAB13_NEXT_Auth

## Funcionalidades

- Inicio de sesión con Google, GitHub o correo y contraseña mediante CredentialsProvider.
- Registro con validación en el servidor y contraseñas almacenadas como hashes bcrypt con costo 12.
- Bloqueo de 15 minutos después de 5 intentos fallidos, persistido en la base de datos.
- Sesiones JWT, cierre de sesión y rutas `/dashboard` y `/profile` protegidas.
- SQLite local para desarrollo y Turso en producción; también admite PostgreSQL mediante `DATABASE_URL`.
- Diseño adaptable con imágenes promocionales acreditadas en `public/images/CREDITOS.md`.

## Inicio local

Usa Node.js compatible con Next.js 16. Ejecuta `npm install` y completa `.env.local` siguiendo `.env.example`. Nunca compartas ni publiques las claves. Después ejecuta `npm run dev` y visita http://localhost:3000.

Google requiere autorizar `http://localhost:3000/api/auth/callback/google`. El cliente de GitHub de producción está configurado para `https://lab-13-next-auth.vercel.app/api/auth/callback/github`; para probar GitHub localmente añade `http://localhost:3000/api/auth/callback/github` en los URI de la aplicación OAuth, o crea otro cliente para desarrollo. Reinicia el servidor tras cambiar `.env.local`.

## Configuración de producción

Vercel necesita `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN`. La base de datos Turso debe ser persistente. Cada proveedor debe tener el URI de retorno de producción autorizado. Un cambio de variables requiere volver a desplegar. Si Google está en modo de prueba, la cuenta debe estar en la lista de usuarios de prueba.

## Comprobaciones

- `npm run lint` y `npm run build`.
- Registrar una cuenta, cerrar sesión e iniciar con correo y contraseña.
- Verificar que después de cinco contraseñas incorrectas la cuenta permanezca bloqueada durante 15 minutos.
- Iniciar con Google y GitHub, visitar perfil, cerrar sesión e intentar entrar a las rutas protegidas.

La limitación de intentos es por correo, no sustituye una protección por IP o CAPTCHA. El registro no verifica la propiedad del correo y no incluye recuperación de contraseña: esta implementación es para el laboratorio, no para almacenar cuentas sensibles en un servicio público.
