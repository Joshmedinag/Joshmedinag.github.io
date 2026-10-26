# Joshua Medina — Portfolio

Portafolio estático en inglés de **Lighting TD / Compositor / Technical Artist / Pipeline TD**, con una edición española del caso AOVGuard. HTML, CSS y JavaScript sin compilación, CMS, backend ni dependencias de ejecución. Tipografía **Roboto**, alojada localmente desde el paquete entregado por Joshua.

La versión publicada está en https://joshmedinag.github.io/. La revisión del **17 de octubre de 2026** se validó primero en local; Joshua autorizó después su publicación.

## Vista previa local

En PowerShell:

```powershell
Set-Location C:\Joshua_Portfolio
python -m http.server 4173 --bind 127.0.0.1
```

Abre http://127.0.0.1:4173/. Si `python` no existe, utiliza `py`. Detén el servidor con `Ctrl+C`. Las páginas de proyecto se abren directamente, por ejemplo http://127.0.0.1:4173/projects/aovguard.html.

## Recorridos y contenido

- La presentación conecta las cuatro especialidades. Son áreas de orientación, no empleos anteriores.
- El hero permite seleccionar Venator, Spaceship y R2-D2. Empieza **pausado**; Play slideshow activa la rotación de ocho segundos. La navegación manual pausa, al salir de pantalla o cambiar de pestaña no se rota y el movimiento reducido evita las transiciones. Texto e imagen están separados: no hay filtros de color ni capas de sombreado sobre los renders.
- El showreel principal usa https://vimeo.com/1232872369. Un póster real y un enlace externo están en el HTML; iframe y SDK se cargan tras pulsar Play. Sin JavaScript se mantiene el enlace a Vimeo. No hay reproducción automática con sonido al abrir la página.
- Lighting & Compositing presenta Venator, Spaceship, R2-D2 y Zelda, en ese orden. Broken Horizons se conserva como primer estudio de More Work.
- Technical Art & Pipeline muestra AOVGuard y FarmFlow en la misma página, sin una pestaña que oculte uno de ellos. Cada caso documenta qué hace la herramienta, evidencia y limitaciones.
- AOVGuard conserva `projects/aovguard.html` en inglés y añade `projects/aovguard-es.html` en español, con enlaces de idioma que funcionan sin JavaScript. La candidata 1.4.0rc1 presenta la evidencia del 19 de octubre de 2026, cinco imágenes con procedencia y la revisión manual de Windows explícitamente pendiente. No se traduce el resto del portafolio.
- More Work es un desplegable HTML nativo con siete estudios adicionales: Broken Horizons, RenderMan, CPU Raytracer, Norwegian Lakeside, Snowbound Environment, Going Merry y Cinematography. Se puede abrir sin JavaScript. Sus filtros mejoran progresivamente el catálogo; no ocultan los seis proyectos principales.
- Las URLs `?category=lighting`, `?category=rendering` y `?category=cinematography` abren y filtran More Work. `?category=pipeline` lleva al recorrido técnico. Las doce rutas originales se conservan y Zelda añade una decimotercera.
- Los comparadores mantienen sus imágenes originales y la separación render/composite. Funcionan con arrastre, flechas, Home/End y tres botones de vista. El par R2-D2 procede de las dos mitades alineadas de un mismo archivo de referencia.
- Las galerías abren imágenes originales con flechas, Escape y restauración del foco. El menú móvil soporta teclado y Escape.
- Email me abre mailto; Copy email copia con confirmación de 1,8 segundos solo tras éxito. La dirección permanece como texto seleccionable; sin JavaScript el botón de copiar está oculto y mailto sigue funcionando.

## Configuración compartida

`js/site-config.js` contiene correo público, GitHub, LinkedIn, Vimeo y reel. `js/main.js` actualiza los elementos marcados sin reconstruir la navegación o el contacto. Si cambian datos públicos, actualiza también los respaldos HTML para mantenerlos disponibles sin JavaScript.

Los headers y footers se mantienen como HTML estático en la portada y los trece casos, más la edición española de AOVGuard; no se descargan con fetch. Esta duplicación pequeña es deliberada. `tools/verify_portfolio.cjs` comprueba su coherencia, enlaces, identidad y recorridos. No se añade un sistema de plantillas ni build para generar las páginas.

El CV existente es `assets/documents/Joshua_Medina_Lighting_Artist_CV_2026.pdf`. View CV abre el PDF y Download PDF tiene el atributo de descarga para alojamiento del mismo origen. No se reescribe el documento en esta revisión. El PDF tiene una página; el enlace interno de reel y sus metadatos requieren una actualización separada (véase REVIEW_2026-10-17.md).

## Material y fidelidad

Consulta `images/ASSETS.md` para procedencia y `REVIEW_2026-10-17.md` para decisiones, validación y pendientes. Los originales no se sustituyen al optimizar miniaturas. `images/thumbs/` contiene variantes reales; `srcset` y `sizes` seleccionan la resolución. Las capturas técnicas nuevas usan WebP sin pérdida; los enlaces de galería conservan el archivo original.

- Venator y Spaceship usan portadas extraídas de los breakdowns actualizados entregados por Joshua. Su aportación se limita a iluminación, look development, render y composición documentados.
- R2-D2 documenta ingestión, assembly, OSL, iluminación RenderMan y acabado Nuke; el modelado del asset no se atribuye a Joshua.
- Zelda documenta pose/contacto, materiales NPR, iluminación Arnold CPU y composición Nuke Non-Commercial. Utiliza el PNG final entregado, el breakdown de 11,4 segundos y cuatro fotogramas reales del mismo. El PDF inglés completo está disponible. Los assets de base son externos; no se atribuye su modelado o texturizado a Joshua.
- Broken Horizons conserva vídeo, evidencia de Unreal y créditos de equipo. Snowbound abre con el plano final antes del proceso.
- Cinematography utiliza Vimeo 1230422221 y catorce capturas del MP4 original; no las capturas de pantalla de referencia. Roles confirmados: Director / Cinematographer / Camera Operator.
- AOVGuard y FarmFlow presentan evidencia fechada: sus cifras de pruebas y cobertura son resultados documentados de las herramientas, no pruebas ejecutadas al revisar la web. FarmFlow separa Maya/Arnold verificado, cola/Qube simulado y adaptadores pendientes.
- La actualización visual de AOVGuard usa capturas Qt offscreen del wheel instalado y vistas de documentación con Edge headless del 19 de octubre. La ilustración de outliers es una reproducción JSON del 13 de octubre, no una nueva decodificación. Maya corresponde a un solo frame; Venator a 144 masters. No se afirma revisión manual aprobada, evaluación con participantes ni versión estable 1.4.0. El PDF público conserva estos límites.
- El benchmark del CPU Raytracer procede del informe de desarrollo; no es una promesa general ni una medición del equipo que sirve la web.

MSc Computer Animation & Visual Effects, Bournemouth University: **completado**, confirmado por Joshua el 17 de octubre de 2026. No implica experiencia profesional en un estudio.

## Estructura

```text
index.html                   Portada y doce accesos de proyecto
projects/*.html              Doce casos, más AOVGuard en español; URLs preservadas
css/style.css                Reglas base y componentes históricos compartidos
css/site-system.css          Tokens, navegación, contacto y medios compartidos
css/home-experience.css      Composición editorial de la portada
css/project-experience.css   Casos de estudio y galerías
css/aovguard-case.css        Idiomas, estado y evidencia del caso AOVGuard
js/site-config.js            Datos públicos confirmados
js/main.js                   Menú, carrusel, filtros y configuración
js/site-experience.js        Navegación, copiado e imágenes ampliadas
js/video-experience.js       Vimeo bajo demanda, errores y vídeos locales
js/home-experience.js        Comparadores, teclado en catálogo y controles de reel
assets/fonts/roboto/         Roboto local
assets/documents/            CV y documentos públicos autorizados
assets/video/               Copias web optimizadas; originales conservados aparte
images/                     Material real y miniaturas
tools/verify_portfolio.cjs   Pruebas reproducibles de recorridos críticos
404.html                    Recuperación de URL desconocida
robots.txt / sitemap.xml    Descubrimiento y rutas canónicas
.nojekyll                   Publicación estática directa en GitHub Pages
```

## Verificación

Con servidor local activo y Node/Playwright ya disponibles:

```powershell
$env:PORTFOLIO_BASE_URL = 'http://127.0.0.1:4173'
node tools/verify_portfolio.cjs
```

El script permite configurar la ruta existente de Playwright y el navegador con `PORTFOLIO_PLAYWRIGHT_PATH` y `PORTFOLIO_BROWSER_PATH`; no instala paquetes. Resultados y capturas se guardan en `.verification/20261017-audit/`, ignorado por Git. Las pruebas bloquean MP4 y aíslan servicios externos cuando se indica; no envían correo y simulan el clipboard sin modificar el del usuario.

Para comprobar la actualización bilingüe sin sobrescribir la evidencia anterior:

```powershell
$env:PORTFOLIO_VERIFICATION_OUTPUT = '.verification/20261019-aovguard/full'
node tools/verify_portfolio.cjs
$env:PORTFOLIO_VERIFICATION_OUTPUT = '.verification/20261019-aovguard/case'
node tools/verify_aovguard_update.cjs
```

La segunda prueba comprueba idioma, cifras, advertencias metodológicas, recursos, galería, teclado, versiones sin JavaScript y anchos de 320 a 1440 px. Son comprobaciones del sitio, no nuevas ejecuciones del analizador EXR ni certificación de accesibilidad.

Resultado local del 19 de octubre de 2026: **17 comprobaciones generales y 17 específicas de AOVGuard aprobadas**, con 90 configuraciones de página/ancho en la regresión general y 12 configuraciones bilingües adicionales en la prueba del caso. Los 169 recursos locales comprobados respondieron correctamente. Los resultados finales están en `.verification/20261019-aovguard/full-final/` y `case-final/`; no sobrescriben la revisión del 17 de octubre. Las imágenes y el PDF copiados coinciden con los hashes del paquete visual verificado.

La revisión visual conservó la tipografía Roboto y la identidad existente, y ajustó únicamente la longitud de las notas de verificación. El aviso mecánico de color `#333` corresponde a reglas de impresión, no al color calculado en pantalla de los textos revisados; las comprobaciones de contraste de esos textos y del estado pendiente pasan en ambos idiomas. No se ejecutó Lighthouse porque no está disponible en el runtime; Firefox y WebKit tampoco están instalados. Los resultados corresponden a Edge Chromium headless, no a pruebas de campo ni a una certificación WCAG.

Una prueba de interfaz con Vimeo simulado no acredita reproducción real ni permisos de inserción. Las mediciones locales sin throttling no son Core Web Vitals de campo ni certifican WCAG. No se incorpora analítica ni seguimiento.

## Publicación

GitHub Pages está conectado a `main` del repositorio Joshmedinag/Joshmedinag.github.io. Los cambios se revisan localmente y solo se publican tras autorización expresa. Joshua autorizó el 23 de octubre de 2026 la publicación del nuevo caso Zelda, las mejoras de presentación del portafolio y la actualización bilingüe de AOVGuard. La publicación se realiza mediante un push a `main` y se comprueba en el sitio público. No ejecutar generadores antiguos de placeholders sobre el material final.
