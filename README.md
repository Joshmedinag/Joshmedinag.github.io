# Joshua Medina — Portfolio

Portfolio estático en inglés para **Lighting Artist | Pipeline TD | VFX Artist**, hecho con HTML, CSS y JavaScript. La portada prioriza el showreel y una selección breve de proyectos; las siete páginas de proyecto contienen las responsabilidades, retos y resultados proporcionados por Joshua. La tipografía principal es **Neue Montreal**, integrada localmente con sus pesos Regular, Medium, Bold e Italic.

No requiere instalar paquetes ni compilar. El sitio está publicado en [joshmedinag.github.io](https://joshmedinag.github.io/).

## Vista previa local

Desde PowerShell, dentro de esta carpeta:

```powershell
py -m http.server 4173 --bind 127.0.0.1
```

Usa `python` en lugar de `py` si lo requiere tu instalación. Abre [la vista previa](http://127.0.0.1:4173/). Detén el servidor con `Ctrl+C`.

## Sustituir las imágenes sin editar HTML

Los recursos ya están conectados a sus ubicaciones. **Exporta cada imagen en el formato indicado y reemplaza el archivo con el mismo nombre**. No es necesario cambiar HTML, JavaScript ni ningún manifiesto. Los proyectos utilizan material real proporcionado por Joshua; la presentación de AOVGuard utiliza logotipos vectoriales de Maya y Python y un símbolo de AOVs creado para el sitio. FarmFlow utiliza una portada de tres etapas construida exclusivamente con el wireframe de Maya, el beauty real de Arnold y la verificación EXR, conserva el diagrama técnico en HTML/CSS y añade capturas reales de ejecución. La portada general utiliza una selección del demo reel.

| Archivo en `images/` | Dónde aparece | Contenido previsto |
| --- | --- | --- |
| `hero/hero-reel-01.jpg` a `hero-reel-07.jpg` | Carrusel de portada | Siete fotogramas limpios del demo reel 2026 |
| `brands/maya-original.svg` | Tarjeta y cabecera de AOVGuard | Logotipo de Autodesk Maya |
| `brands/python-original.svg` | Tarjeta y cabecera de AOVGuard | Logotipo de Python |
| `brands/aovs.svg` | Tarjeta y cabecera de AOVGuard | Símbolo de AOVs creado para el portfolio |
| `farmflow-beauty.png` | Portada y evidencia de FarmFlow | Conversión limpia del beauty ACEScg generado por Arnold |
| `farmflow-wireframe.png` | Portada y evidencia de FarmFlow | Wireframe de la escena de prueba en Maya |
| `farmflow-render-run.png` | Evidencia de FarmFlow | Render de Arnold ejecutado y comprobado desde el panel |
| `farmflow-sequence-verified.png` | Evidencia de FarmFlow | Secuencia de diez archivos verificada dentro de Maya |
| `aovguard-architecture.jpg` | Sección System design de AOVGuard | Diagrama de arquitectura del informe MSc |
| `aovguard-ui.jpg` | Galería de AOVGuard | Interfaz real del informe MSc |
| `aovguard-report.jpg` | Galería de AOVGuard | Diagnósticos de una secuencia real |
| `going-merry-main.jpg` | Tarjeta y póster del vídeo | Frame del vídeo a los 15 segundos |
| `going-merry-breakdown.jpg` | Galería de Going Merry | Vista superior del vídeo a los 25 segundos |
| `lighting-main.jpg` | Tarjeta de Lighting y póster del vídeo | Frame de Broken Horizons a los 43 segundos |
| `lighting-breakdown.jpg` | Proceso de Lighting | Captura de iluminación y cámara en Unreal, del informe |
| `broken-horizons-atmosphere.jpg` | Galería de Lighting | Frame del paisaje con niebla a los 25 segundos |
| `broken-horizons-sculpture.jpg` | Galería de Lighting | Frame del Roy Dog a los 65 segundos |
| `broken-horizons-render-settings.jpg` | Proceso de Lighting | Preset de Movie Render Queue del informe |
| `broken-horizons-location-reference.jpg` | Referencias de Lighting | Fotografía de Tout Quarry del informe |
| `broken-horizons-moodboard-reference.jpg` | Referencias de Lighting | Tablero de referencias visuales externas del informe |
| `nordic-main.jpg` | Tarjeta y póster principal de Norwegian Lakeside | Cabaña junto al lago en luz cálida |
| `nordic-exterior.jpg` | Galería y póster de Norwegian Lakeside | Exterior de la terraza y el lago |
| `nordic-interior.jpg` | Galería y póster de Norwegian Lakeside | Interior iluminado desde puertas y ventanas |
| `nordic-wide.jpg` | Galería y póster de Norwegian Lakeside | Vista amplia desde el agua |
| `nordic-cabin.jpg` | Póster de Norwegian Lakeside | Aproximación a la cabaña desde el lago |
| `snow-main.jpg` | Póster de la secuencia final de Snowbound Environment | Fotograma del paneo final de invierno |
| `snow-environment.jpg` | Galería y póster de Snowbound Environment | Vista del lago con capas de profundidad |
| `snowfall.jpg` | Galería y póster de Snowbound Environment | Estudio de nevada intensa |
| `snow-breakdown.jpg` | Tarjeta y póster principal de Snowbound Environment | Estado final de la transformación invernal |
| `renderman-main.png` | Tarjeta y cabecera de RenderMan | Render refinado de la naranja en primer plano |
| `renderman-breakdown.png` | Galería de RenderMan | Render refinado lateral de la superficie |
| `renderman-top.png` | Galería de RenderMan | Render refinado desde arriba |
| `renderman-wide.png` | Galería de RenderMan | Render refinado de encuadre amplio |

El carrusel cambia de imagen cada **5,6 segundos** con un desplazamiento suave. Se detiene cuando la pestaña queda en segundo plano y para usuarios que prefieren movimiento reducido. Los fotogramas proceden de `JoshuaMedina_DemoReel_2026.mp4`; se recortó la franja inferior que contenía nombres de software y detalles de breakdown, sin retocar la iluminación ni el color.

Los fotogramas de Going Merry y Broken Horizons y los cuatro renders refinados de RenderMan miden **1920 × 1080 px**. Las imágenes extraídas de los PDF conservan su resolución disponible, sin ampliación artificial; las galerías y cabeceras de estos proyectos muestran su proporción completa. Las tarjetas pueden recortar la imagen y la portada utiliza un recorte amplio: deja margen alrededor del sujeto. Para sustituir el placeholder de 1600 × 900 px, se recomienda una imagen panorámica de al menos 1600 px de ancho.

No renombres un PNG a `.jpg`: expórtalo realmente como JPEG. Después de sustituirlo, recarga con `Ctrl+F5` si el navegador conserva la versión anterior. No ejecutes el generador interno de placeholders después de añadir tus imágenes finales.

## Contacto y vídeo

`js/site-config.js` ya contiene:

- Correo: **Joshalexmedina@hotmail.com**
- GitHub: [Joshmedinag](https://github.com/Joshmedinag)
- Vimeo/showreel: [Demo Reel Lighting Joshua Medina](https://vimeo.com/1213395733)
- LinkedIn: [Joshua Alexander Medina Gracia](https://www.linkedin.com/in/joshua-alexander-medina-gracia-3561981a3/).

Los datos públicos de contacto se limitan al correo y los enlaces profesionales. No se muestran teléfono, dirección particular ni ubicación personal.

El Vimeo está incrustado en `index.html`, funciona sin JavaScript y tiene un enlace alternativo **Watch on Vimeo**. No hay reproducción automática. El código evita volver a cargar el mismo iframe cuando la configuración coincide con el HTML.

Para cambiarlo más adelante, actualiza `showreel` en `js/site-config.js`. Acepta Vimeo, YouTube o una ruta a un MP4/WebM/OGV local. Si necesitas conservar la versión sin JavaScript, actualiza también el iframe y enlace estáticos en `index.html`. Los enlaces estáticos de contacto sirven igualmente como respaldo sin JavaScript.

Vimeo carga recursos externos y debe permitir la inserción en el dominio donde publiques. Se utiliza el parámetro `dnt=1`; el sitio no incorpora analítica propia.

Going Merry tiene un reproductor HTML nativo en `projects/going-merry.html` y un enlace directo al MP4. El archivo `assets/video/going-merry.mp4` es una copia optimizada del vídeo entregado: **53,5 segundos, 1920 × 1080, 24 fps, H.264 y audio AAC**, aproximadamente **31,6 MB** frente a los 97,3 MB del original. Incluye `faststart` para comenzar la reproducción sin descargar el archivo completo, controles, reproducción en línea en móvil y carga inicial de metadatos. No tiene autoplay. La marca de Houdini del material original se conserva.

Snowbound Environment abre con el breakdown de la transformación hacia invierno y utiliza su estado final como portada. Después presenta el paneo final, una vista ambiental y un estudio de nevada intensa. Las copias web mantienen 1920 × 1080, H.264/AAC y `faststart`; pesan en conjunto aproximadamente **19,1 MB** frente a unos **391 MB** de los originales. La página atribuye a Joshua la iluminación del entorno, look development, cámara y corrección de color. El trabajo se realizó en Unreal Engine y el acabado de color en DaVinci Resolve.

Norwegian Lakeside tiene cinco reproductores HTML nativos para el plano principal, el exterior de la terraza, el interior, la vista amplia del lago y la aproximación a la cabaña. Las copias web mantienen 1920 × 1080, utilizan H.264/AAC y `faststart`, y pesan en conjunto **23,2 MiB** frente a **128,7 MiB** de los originales. Los clips duran entre 8,34 y 10,43 segundos. La página se limita a las responsabilidades visuales confirmadas por el material y no atribuye el modelado ni la creación de assets.

## Material de los informes

La página de FarmFlow resume `FarmFlow_documentacion_completa_1.9.0.docx`. Presenta la arquitectura neutral al DCC, el plug-in para Maya 2026, preflight, render Arnold por frame, verificación EXR, diagnósticos, cola y handoff. Las cifras publicadas —**753 pruebas**, **90,40 % de cobertura documentada** y **10 de 10 frames verificados**— proceden de ese informe. La web distingue el flujo Maya/Arnold comprobado, el comportamiento de cola/Qube simulado y las integraciones pendientes. La captura incluida en el DOCX no se publica porque muestra rutas personales del equipo local.

Lighting & Look Development presenta **Broken Horizons** con vídeo y material de `JoshuaMG_IndividualContribution.pdf`. La aportación de Joshua se describe como iluminación, cinematografía y preparación del render en Unreal Engine. Incluye capturas del setup y de Movie Render Queue, fotogramas, referencias de Tout Quarry y un tablero visual externo inspirado en Death Stranding. Los créditos del equipo proceden del vídeo y del informe; no se publica la evaluación académica de los compañeros ni el PDF completo.

`assets/video/broken-horizons.mp4` conserva los **118,29 segundos** del archivo entregado, incluidos títulos y créditos, a **1920 × 1080, 24 fps, H.264/AAC**, con faststart, controles y sin autoplay. La copia web pesa **36,8 MB** frente a los 219,5 MB del original. El informe describe una secuencia de unos 90 segundos; la web indica la duración real del archivo completo. Las capturas y referencias se abren a tamaño completo al seleccionarlas. Los ajustes de render y enlaces a documentación de Epic Games están en desplegables.

La página de RenderMan utiliza los cuatro renders refinados de 1920 × 1080 proporcionados por Joshua. La explicación del modelado por Python, los poros geométricos, PxrSurface y la iluminación procede del informe de la naranja.

La página de AOVGuard describe la versión 2.0 documentada en el informe MSc, con arquitectura, GUI y validación de secuencias. Las cifras de 229 pruebas y 95,24 % de cobertura se atribuyen a la evaluación del **14 de agosto de 2026**; no son pruebas ejecutadas al comprobar esta web. Los detalles desplegables indican el alcance del benchmark y las limitaciones del prototipo.

Consulta `images/ASSETS.md` para la procedencia exacta. Los originales entregados no se modifican y los PDF completos no forman parte de los archivos públicos del sitio.

## Créditos por plano

La sección **Shot credits** bajo el reel incluye campos para:

- Project / shot
- My role
- Software used
- Other artists / collaborators
- Asset credits

Está plegada inicialmente para mantener la portada breve. Dentro de `index.html`, busca `shot-credit-fields`, duplica la lista por cada plano y sustituye los valores pendientes. La página `projects/lighting.html` ya tiene los créditos de Broken Horizons, con responsabilidades de Joshua y del equipo.

No se han inventado responsabilidades por plano, colaboradores o fuentes de assets. En Going Merry se distingue expresamente el trabajo de Joshua del diseño de One Piece y del asset base de terceros.

## Información pendiente

1. Confirmar si el MSc ya está completado o sigue en curso. Actualmente se muestra **September 2025 – 2026**, sin atribuir un estado definitivo.
2. Créditos de cada plano del showreel. Broken Horizons ya tiene sus créditos de equipo.
3. Fuente exacta del asset 3D de Going Merry y su atribución.

Las fechas confirmadas de educación ya están incorporadas: **Lost Boys, 2023–2024**; **UAG, agosto de 2019–diciembre de 2022**.

Las fechas desconocidas y los enlaces sin proporcionar se omiten del sitio. AOVGuard enlaza al repositorio indicado: [NCCA-mastersproject](https://github.com/Joshmedinag/NCCA-mastersproject).

## Archivos principales

```text
index.html                  Portada y siete secciones
css/style.css               Diseño y adaptación a móvil
css/blue-theme.css          Paleta azul y blanca aplicada al sitio
js/site-config.js           Datos de contacto y reel
js/main.js                  Menú, sección activa y reproductor
images/*.{jpg,png}          Imágenes de proyectos y recursos de portada
images/hero/*.jpg           Siete fotogramas del carrusel de portada
images/ASSETS.md             Procedencia y mapa de recursos
projects/aovguard.html       Herramienta de validación EXR/AOV
projects/farmflow.html       Pipeline Maya/Arnold para Lighting TD
projects/lighting.html       Lighting y look development
projects/norwegian-lakeside.html  Iluminación de entorno nórdico
projects/snow-environment.html  Iluminación de entorno nevado
projects/going-merry.html    Simulación de océano
projects/renderman.html      Estudio de una naranja
assets/favicon.svg          Monograma JM
assets/fonts/neue-montreal/  Neue Montreal y licencia del paquete entregado
assets/video/going-merry.mp4  Vídeo optimizado de la simulación
assets/video/broken-horizons.mp4  Corto grupal completo optimizado
assets/video/nordic-*.mp4    Cinco planos de Norwegian Lakeside
assets/video/snow-*.mp4      Cuatro clips optimizados del entorno nevado
.nojekyll                   Publicación estática directa
```

La navegación y el pie se mantienen en los ocho HTML. Si cambias su estructura, actualiza todos. El contenido sigue disponible sin JavaScript; las funciones de menú móvil y actualización automática de contacto utilizan JavaScript.

`.verification/` contiene herramientas de comprobación local y no se incluye en Git. Los WebP y el SVG de la primera maqueta se conservan como recursos anteriores, pero ya no se usan en los HTML.

## Publicar en GitHub Pages

1. Crea un repositorio de portfolio en tu cuenta de GitHub. Con GitHub Free, utiliza un repositorio público.
2. Sube los archivos con `index.html` en la raíz.
3. En **Settings → Pages → Build and deployment**, selecciona **Deploy from a branch**.
4. Elige **main** y **/ (root)** y pulsa **Save**.
5. Cuando termine el despliegue, abre **Visit site**.

Si creas el repositorio vacío con el nombre `JoshuaPortfolio`, puedes usar:

```powershell
git init
git add index.html css js images projects assets README.md .gitignore .nojekyll
git commit -m "Create Joshua Medina portfolio"
git branch -M main
git remote add origin https://github.com/Joshmedinag/JoshuaPortfolio.git
git push -u origin main
```

Estos comandos son una referencia para otros repositorios. Este sitio ya está conectado a GitHub Pages y publica desde la rama `main`.

Las rutas relativas funcionan tanto en un sitio de usuario como en un sitio de proyecto bajo `/JoshuaPortfolio/`. Conserva `.nojekyll`. Revisa los créditos y sustituye las imágenes antes de publicar la versión definitiva.

Guías oficiales: [crear un sitio de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) y [configurar la fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Referencia

La [web de Yuqian He](https://yuqian-he.github.io/myWebsite/#home) se consultó como referencia estructural inicial. El código y el diseño de este portfolio se crearon para Joshua Medina.
