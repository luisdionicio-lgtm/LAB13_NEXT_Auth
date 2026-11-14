# Laboratorio 13 — NextAuth con Google OAuth

Implementación del procedimiento previo a la sección TAREA de GLAB-S13-EAREVALO-2026-1.

## Iniciar

1. Abre `.env.local` y completa `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`. `NEXTAUTH_SECRET` ya contiene el valor proporcionado por el usuario.
2. En Google Cloud configura origen `http://localhost:3000` y redirección `http://localhost:3000/api/auth/callback/google`.
3. Ejecuta `npm install` si es la primera vez y luego `npm run dev`.
4. Abre http://localhost:3000. Si cambias `.env.local` con el servidor abierto, reinícialo.

El botón de Google se habilita cuando las dos credenciales están configuradas. Si la aplicación OAuth está en modo de prueba, incluye tu cuenta en los usuarios de prueba de Google Cloud.

## Procedimiento implementado

- Next.js con TypeScript, ESLint, Tailwind CSS, App Router y Turbopack.
- NextAuth.js v4 y react-icons, proveedor Google, sesión JWT.
- Handler `src/app/api/auth/[...nextauth]/route.ts`.
- Componentes `LogoutButton` y `SessionProvider`.
- Navegación con perfil, foto y cierre de sesión; inicio redirigido a `/dashboard`.
- Páginas `/signIn`, `/dashboard` y `/profile`.
- Middleware para dashboard y perfil, más validación de sesión en el servidor.
- Imágenes de perfil de Google permitidas en `next.config.ts`.

Las opciones compartidas se guardan en `src/lib/auth.ts`, para que el handler solo exporte los métodos admitidos por Next.js. Los archivos con JSX usan `.tsx`. Se utiliza la redirección normal de OAuth con `signIn`, ya que `redirect: false` no es el flujo soportado para Google.

## Verificación y capturas

- Sin sesión, `/dashboard` y `/profile` deben redirigir a `/signIn`.
- Después de pegar las claves: iniciar sesión con Google, comprobar nombre en Dashboard y nombre/correo/foto en Profile.
- Cerrar sesión y confirmar que las rutas vuelven a estar protegidas.
- Capturar Sign In, Dashboard y Profile con la sesión real. El flujo completo se verificó con la cuenta real el 14 de noviembre de 2026. Las capturas se guardaron en la carpeta hermana `capturas-laboratorio`.

Comandos: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

No se incluye la sección TAREA: credenciales de usuario/contraseña, registro, bloqueo de intentos, bcrypt, GitHub, publicación ni conclusiones.
No subas `.env.local` al repositorio; está excluido por `.gitignore`.

Referencias: https://next-auth.js.org/providers/google y https://next-auth.js.org/configuration/nextjs.
