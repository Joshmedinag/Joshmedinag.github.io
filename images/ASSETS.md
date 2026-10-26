# Imágenes y vídeo del portfolio

El material de Spaceship, R2-D2, FarmFlow, AOVGuard, Realtime Raytracer, Norwegian Lakeside, Going Merry, RenderMan y Broken Horizons procede de los archivos proporcionados por Joshua. FarmFlow combina material real de Maya y Arnold con un diagrama técnico construido en HTML y CSS. AOVGuard utiliza logotipos vectoriales de Maya y Python y un símbolo de AOVs creado para este portfolio. Los originales no se modifican. Las imágenes extraídas de los documentos conservan su resolución disponible, sin ampliación artificial. Los números de página indicados para los PDF cuentan desde la primera página, incluida la portada.

## Zelda: Lighting & Look Development

Fuentes entregadas por Joshua el 23 de octubre de 2026: `C:\Users\josha\Downloads\Zelda_Final_Shot.png`, `C:\Users\josha\Videos\ZELDA_BREAKDOWN.mp4` y `C:\Users\josha\Downloads\Zelda_Lighting_Lookdev_Case_Study_EN.pdf`. La página es `projects/zelda.html`, en inglés. La portada procede del PNG final suministrado, no de una captura del navegador ni de una imagen generada.

| Recurso | Procedencia y preparación |
| --- | --- |
| `zelda/final-shot.png` | Copia idéntica del original, 1920 × 1080, sin recorte ni ajuste de color |
| `zelda/final-shot.webp` | WebP sin pérdida de 1920 × 1080; píxeles decodificados idénticos al PNG |
| `zelda/final-shot-{640,1200}.webp` | Variantes proporcionales de 640 × 360 y 1200 × 675, calidad 92 |
| `zelda/clay-render-{960,1920}.webp` | Fotograma 37, 00:01,48, etapa rotulada Clay Render |
| `zelda/warm-key-light-{960,1920}.webp` | Fotograma 62, 00:02,48, etapa Warm Key Light |
| `zelda/soft-cream-fill-{960,1920}.webp` | Fotograma 87, 00:03,48, etapa Soft Cream Fill |
| `zelda/main-blade-reflection-{960,1920}.webp` | Fotograma 187, 00:07,48, etapa Main Blade Reflection |
| `../assets/video/zelda-breakdown.mp4` | 11,4 s, 1920 × 1080, 25 fps, H.264 Main / yuv420p y AAC. Remultiplexado con faststart; los payloads de los 285 paquetes de video y 535 de audio coinciden con el original |
| `../assets/documents/Zelda_Lighting_Lookdev_Case_Study_EN.pdf` | Copia idéntica del PDF inglés de diez páginas |

Los fotogramas de galería conservan la zona superior de 1920 × 984: solo se retiraron los 96 píxeles inferiores con rótulos de etapa/software. No se reconstruyeron píxeles ni se cambió la iluminación, el color o el contraste. Las copias de 1920 píxeles son WebP sin pérdida; las de 960 × 492 usan calidad 92. El video mantiene la progresión completa y sus rótulos. La reconstrucción de iluminación explica el estado aprobado v40; no se presenta como historial cronológico ni como AOVs aislados.

El PDF identifica el alcance: pose/contacto, materiales NPR, iluminación, atmósfera y composición. La geometría y las texturas de base son externas y no se atribuyen a Joshua. La documentación no identifica al autor/distribuidor específico de esos assets. Es fan art personal sin afiliación oficial; Zelda y The Legend of Zelda pertenecen a Nintendo. La evidencia de extracción y hashes queda en `.verification/20261023-zelda/media/`.

## Spaceship — Lighting TD Case Study

Fuentes: `CASE_STUDY_EN.md`, `spaceship_1st_version.mp4`, `material_detail.mp4`, nueve PNG de etapas y `spaceship_breakdown_2.mp4`, proporcionados por Joshua Medina. Joshua seleccionó `spaceship_1st_version.mp4` como vídeo principal del proyecto y entregó el breakdown actualizado el 4 de octubre de 2026.

| Archivo | Uso | Duración / resolución |
| --- | --- | --- |
| `spaceship-main.png` | Carrusel, tarjeta, cabecera y póster; plano final limpio extraído del breakdown actualizado | 1920 × 810 |
| `spaceship/01-clay.png` a `09-final-composite.png` | Nueve estados alineados del frame 541 | 1920 × 858 |
| `spaceship/material-stages.png` | Tablero 3 × 3 reconstruido con todas las etiquetas en inglés | 1920 × 2088 |
| `spaceship/nine-stages.png` | Tablero vertical y póster del breakdown, reconstruido en inglés | 1920 × 2435 |
| `spaceship/material-detail-en-1.png` a `material-detail-en-3.png` | Tres placas en inglés que forman el vídeo de detalle | 1920 × 858 |
| `../assets/video/spaceship-final.mp4` | Plano final | 15 s · 1920 × 858 |
| `../assets/video/spaceship-breakdown.mp4` | Breakdown actualizado entregado por Joshua | 14,08 s · 1920 × 1080 · 25 fps |
| `../assets/video/spaceship-material-detail.mp4` | Revisión de materiales reconstruida con títulos, descripciones y etiquetas en inglés | 1920 × 858 |

Las nueve imágenes individuales se copiaron sin recomprimir. Los dos tableros y el vídeo corto de materiales se reconstruyeron a partir de esas imágenes con Neue Montreal y textos íntegramente en inglés; no se alteró el render de cada etapa. El breakdown publicado se remultiplexó con `faststart` sin recomprimir la imagen ni el audio. La nueva portada procede de su plano final en 00:13,2; se recortaron únicamente las bandas negras y el rótulo para conservar un área limpia de 1920 × 810. La información técnica se resume del caso de estudio en inglés: 360 frames, 223 meshes USD, 1.080 EXR de render y 360 PNG finales. La página distingue el trabajo de Joshua de los recursos suministrados: la geometría base y varios paquetes de texturas no fueron creados por él. La Luna y el campo estelar forman una placa 2D creada en Nuke; no se atribuye parallax 3D. El proyecto no documenta una canalización ACES/OCIO. Las primeras cuatro etapas del breakdown son renders diagnósticos controlados, no capturas históricas del desarrollo.

## R2-D2 Desert Look Development & Lighting

Fuente: `C:\r2d2lighting\portfolio\R2D2_Lighting_TD_Case_Study`, proporcionada por Joshua Medina el 14 de septiembre de 2026.

| Archivo | Uso | Resolución |
| --- | --- | --- |
| `r2d2-main.jpg` | Último fotograma corregido de color del breakdown; carrusel, tarjeta y plano final | 1800 × 765 |
| `r2d2/pipeline.png` | Diagrama de Maya/Alembic a Katana, RenderMan y Nuke | 1800 × 540 |
| `r2d2/dome_before_after.jpg` | Comparación del material del domo | 890 × 348 |
| `r2d2/weathering_clean_vs_dirty.jpg` | Comparación de weathering | 1324 × 881 |
| `r2d2/upper_material_review.jpg` | Crop de revisión de material e iluminación | 585 × 576 |
| `r2d2/feet_contact_detail.jpg` | Revisión del contacto con el terreno | 365 × 145 |
| `r2d2/aov_mask_board.jpg` | AOVs, light group y máscaras de weathering | 1650 × 930 |
| `r2d2/render_vs_comp.jpg` | Comparación RenderMan/Nuke | 780 × 540 |
| `../assets/video/r2d2-breakdown.mp4` | Breakdown de lighting, look development y composición | 8,88 s · 1920 × 1080 · 25 fps |

Las imágenes del caso se copiaron sin recomprimir desde el paquete original. El breakdown se copió sin recomprimir desde `C:\Users\josha\Videos\r2d2_breakdown.mp4`; conserva la resolución y el encuadre entregados. `r2d2-main.jpg` se extrajo de su último fotograma válido, eliminando únicamente las bandas negras y redimensionando el área 2.35:1 a 1800 × 765 para sustituir la portada anterior y funcionar como póster. `assets/documents/R2D2_Lighting_TD_Case_Study.pdf` es la versión final de nueve páginas incluida en `qa_render_v003`. La página mantiene la declaración de autoría del documento: Joshua no modeló el asset base; su contribución comienza con la ingestión y comprende scene assembly, entorno, look development, weathering, lighting, rendering, compositing y automatización.

## FarmFlow

Fuente: `FarmFlow_documentacion_completa_1.9.0.docx`, versión documentada 1.9.0, con fecha de cierre 9 de septiembre de 2026.

La portada utiliza únicamente material real en una composición HTML/CSS de tres etapas: `farmflow-wireframe.png`, `farmflow-beauty.png` y `farmflow-sequence-verified.png`. El beauty procede del archivo `farmflow_1.0001.exr`, renderizado por Arnold en ACEScg; se convirtió a PNG para visualización web y el EXR original, junto con sus metadatos internos, no se publica. El wireframe y las capturas `farmflow-render-run.png` y `farmflow-sequence-verified.png` proceden de las imágenes proporcionadas el 9 de septiembre de 2026. La página conserva además el diagrama HTML/CSS que representa Maya scene → Preflight → Arnold render → EXR + report.

| Archivo | Contenido | Resolución |
| --- | --- | --- |
| `farmflow-beauty.png` | Beauty real de Arnold convertido de ACEScg a una imagen de visualización | 960 × 540 |
| `farmflow-wireframe.png` | Wireframe de la escena de prueba | 1413 × 1038 |
| `farmflow-render-run.png` | FarmFlow ejecutando y verificando un frame en Maya | 2048 × 1228 |
| `farmflow-sequence-verified.png` | Render view y diez salidas verificadas | 2048 × 1228 |

La página reproduce únicamente afirmaciones documentadas: 753 pruebas aprobadas, 2 omitidas, 90,40 % de cobertura y una aceptación local de 10 frames verificados en 29,7 segundos. También conserva la clasificación del informe entre funciones comprobadas, simuladas y pendientes.

## AOVGuard

### Actualización de la candidata el 19 de octubre de 2026

Las cinco imágenes de `aovguard-rc1-20261019/` proceden del material visual verificado de AOVGuard y se copian sin filtros ni cambios de color. No son capturas de una revisión manual aprobada. Los dos PNG de métricas tienen un recorte real de la franja superior de 72 px para excluir rutas locales; las métricas no se alteraron y los originales se conservan fuera de este portafolio.

| Archivo | Procedencia y alcance | Resolución |
| --- | --- | --- |
| `01-maya-metricas.png` | Qt offscreen automatizado, wheel instalado 1.4.0rc1, 19/10/2026. Un solo frame Maya, 56 canales, 17 AOVs; Cryptomatte fuera de luminancia. | 1460 × 908 |
| `02-venator-metricas.png` | Qt offscreen automatizado, wheel instalado 1.4.0rc1, 19/10/2026. 144 masters, frames 1065-1208, 55 canales y 18 AOVs de color; dos warnings esperados. | 1460 × 908 |
| `03-venator-outliers-ilustracion.png` | Interfaz rc1 que reproduce un informe JSON guardado, captura del 13/10/2026. 15 muestras AOV-frame en nueve frames, no 15 defectos confirmados. Las rutas visibles ya están anonimizadas. | 1460 × 980 |
| `04-documentacion-escritorio.png` | Comprobación automatizada de la documentación local en español con Edge headless, 19/10/2026, viewport de 1440 px. No acredita publicación remota. | 1440 × 1000 |
| `05-documentacion-movil.png` | Misma documentación, Edge headless, 19/10/2026, viewport de 320 px. No sustituye una evaluación de accesibilidad. | 320 × 1000 |

El PDF público `assets/documents/AOVGuard_revision_visual_2026-10-19_es.pdf` contiene seis páginas con estas imágenes, resultados y límites. La aceptación automatizada sustituye diálogos; la interacción con diálogos nativos, teclado/DPI y cierre durante trabajo sigue pendiente por un fallo del controlador de ventanas Computer Use. No se publican informes privados ni renders EXR. La galería actual sustituye las capturas históricas que mezclaban Cryptomatte con luminancia; esos archivos originales no se borran.

### Material histórico de la disertación

Fuente: `AOVGuard_MSc_Project_Joshua_Medina.pdf`.

| Archivo | Fuente | Resolución |
| --- | --- | --- |
| `brands/maya-original.svg` | Devicon: Autodesk Maya | Vectorial, viewBox 128 × 128 |
| `brands/python-original.svg` | Devicon: Python | Vectorial, viewBox 128 × 128 |
| `brands/aovs.svg` | Símbolo original de capas RGB/AOVs creado para el portfolio | Vectorial, viewBox 128 × 128 |
| `aovguard-architecture.jpg` | Página 19, figura 2: arquitectura | 1249 × 682 |
| `aovguard-ui.jpg` | Página 24, figura 4: GUI con ruta sanitizada | 799 × 549 |
| `aovguard-report.jpg` | Página 27, figura 6: validación de secuencia Maya/Arnold | 1249 × 824 |

Los SVG de Maya y Python proceden del proyecto Devicon y se guardan localmente para que la página no dependa de una CDN. Los nombres y logotipos pertenecen a sus respectivos propietarios y se utilizan para identificar las herramientas. El símbolo de AOVs representa capas RGB y un pass de imagen. Las figuras se extrajeron de sus imágenes incrustadas. Los PNG del informe se convirtieron a JPEG de calidad alta sin recorte. `aovguard-report.jpg` muestra los diagnósticos de la secuencia, no una captura de un informe HTML. La galería permite abrir las imágenes a tamaño completo. El contenido y las cifras se atribuyen al informe; la comprobación del sitio no vuelve a ejecutar las pruebas de AOVGuard. No se publica la portada ni el PDF completo.

## Going Merry

Fuente: `goingmerryvideo.mp4`, 53,5 segundos, 1920 × 1080 y 24 fps.

| Archivo | Contenido | Resolución |
| --- | --- | --- |
| `going-merry-main.jpg` | Fotograma a los 15 segundos; tarjeta y póster del vídeo | 1920 × 1080 |
| `going-merry-breakdown.jpg` | Fotograma a los 25 segundos; vista superior | 1920 × 1080 |
| `../assets/video/going-merry.mp4` | Copia web H.264/AAC, con faststart; 31.566.708 bytes | 1920 × 1080 |

El vídeo web se codificó con libx264, CRF 23, límite de 5 Mb/s y audio AAC de 160 kb/s. Se mantiene toda la duración, el encuadre y la marca de Houdini. La vista superior es un frame renderizado del vídeo, no un desglose de nodos o de simulación. Los créditos de la página distinguen el trabajo de Joshua del diseño de One Piece y del asset base de terceros; queda pendiente la fuente exacta del asset.

## RenderMan

Fuentes: renders refinados proporcionados en PNG y `JoshuaMG_RendermanProject_Orange_Report.pdf` para la información técnica.

| Archivo | Fuente | Resolución |
| --- | --- | --- |
| `renderman-main.png` | `final_closeup_1920x1080.png` | 1920 × 1080 |
| `renderman-top.png` | `final_top_1920x1080.png` | 1920 × 1080 |
| `renderman-breakdown.png` | `final_left_texture_1920x1080.png` | 1920 × 1080 |
| `renderman-wide.png` | `final_wide_1920x1080.png` | 1920 × 1080 |

Los cuatro PNG se copiaron sin recomprimir desde los renders refinados entregados. Sustituyen a las versiones de menor resolución extraídas anteriormente del informe. Las fotografías de referencia de las páginas 2–3 no se presentan como renders.

## Physically Based CPU Raytracer — Triforce

Fuentes: `triforce_final_premium_256.png` y `Joshua_Raytracer_Development_Report.docx`, proporcionados por Joshua Medina.

| Archivo | Fuente | Resolución |
| --- | --- | --- |
| `raytracer-main.png` | Render final entregado por separado | 1920 × 1080 |
| `raytracer-early.png` | Imagen incrustada 3 del informe | 960 × 540 |
| `raytracer-junction-upper.png` | Imagen incrustada 4 del informe | 1160 × 580 |
| `raytracer-junction-lower.png` | Imagen incrustada 5 del informe | 1240 × 630 |
| `raytracer-reflections.png` | Imagen incrustada 7 del informe | 1920 × 1080 |

Los cinco PNG se copiaron sin recomprimir. La página distingue el render final de las etapas de desarrollo y reproduce únicamente especificaciones y mediciones documentadas. No se publica la imagen de referencia externa incluida en el informe. La Trifuerza y The Legend of Zelda pertenecen a Nintendo; el proyecto se presenta como un estudio educativo independiente sin afiliación.

## Broken Horizons — Lighting & Look Development

Fuentes: `BrokenHorizons_Final_GroupProject.mp4` y `JoshuaMG_IndividualContribution.pdf`.

| Archivo | Fuente | Resolución |
| --- | --- | --- |
| `lighting-main.jpg` | Vídeo, 00:43; tarjeta y póster | 1920 × 1080 |
| `broken-horizons-atmosphere.jpg` | Vídeo, 00:25; paisaje con niebla | 1920 × 1080 |
| `broken-horizons-sculpture.jpg` | Vídeo, 01:05; Roy Dog | 1920 × 1080 |
| `lighting-breakdown.jpg` | PDF, página 6, primera captura: iluminación por plano | 1429 × 804 |
| `broken-horizons-render-settings.jpg` | PDF, página 7: preset de Movie Render Queue | 1441 × 956 |
| `broken-horizons-location-reference.jpg` | PDF, página 8, primera foto de Tout Quarry | 1159 × 772 |
| `broken-horizons-moodboard-reference.jpg` | PDF, página 9: tablero de referencias externas | 1370 × 921 |
| `../assets/video/broken-horizons.mp4` | Copia web H.264/AAC con faststart; 36.820.708 bytes | 1920 × 1080 |

El vídeo conserva los 118,29 segundos completos, incluidos títulos y créditos, y su audio. Codificación libx264 CRF 23, límite de 5 Mb/s y AAC de 160 kb/s. El informe describe una secuencia de alrededor de 90 segundos; la duración indicada en la página corresponde al vídeo entregado completo. Los fotogramas se extrajeron del original, sin retocar luz ni color. Las cuatro imágenes del PDF se convirtieron a JPEG de calidad 95, sin submuestreo de color ni recorte.

Los renders son del proyecto grupal. La aportación de Joshua es iluminación, cinematografía y render; Jessica Dong: dirección y entorno; Osher Shechter: producción, trabajo técnico, follaje y flores; Youyang Dong: assets y trabajo técnico, incluidos rocas y Roy Dog; Kyle Galenzoga: VFX Niagara, aves y mariposas. La supervisión corresponde a Valery Adzhiev. Los nombres y roles se contrastaron con los créditos del vídeo y el informe.

Las fotografías de Tout Quarry y el tablero externo se identifican como **referencias**, no como renders de Joshua. El PDF no identifica al fotógrafo ni la procedencia individual de todas las imágenes del tablero; se atribuyen al material del informe sin inventar autoría. Death Stranding está identificado en el informe como inspiración principal, y la página enlaza al sitio oficial del juego. La bibliografía técnica enlaza a documentación oficial de Epic Games. No se publica la portada, la evaluación de compañeros ni el PDF completo.

## Norwegian Lakeside

Fuentes: `nordic_breakdown.mp4`, `nordic8.mp4`, `nordic9.mp4`, `nordic10.mp4` y `nordic11.mp4`, proporcionados por Joshua Medina.

| Archivo | Contenido | Duración / resolución |
| --- | --- | --- |
| `nordic-main.jpg` | Fotograma del plano principal de la cabaña junto al lago | 1920 × 1080 |
| `nordic-exterior.jpg` | Fotograma del exterior de la terraza | 1920 × 1080 |
| `nordic-interior.jpg` | Fotograma del interior de la cabaña | 1920 × 1080 |
| `nordic-wide.jpg` | Fotograma de la vista amplia desde el lago | 1920 × 1080 |
| `nordic-cabin.jpg` | Fotograma de la aproximación a la cabaña | 1920 × 1080 |
| `../assets/video/nordic-breakdown.mp4` | Plano principal | 9,12 s · 1920 × 1080 |
| `../assets/video/nordic-exterior.mp4` | Exterior de la terraza | 9,34 s · 1920 × 1080 |
| `../assets/video/nordic-interior.mp4` | Interior de la cabaña | 8,34 s · 1920 × 1080 |
| `../assets/video/nordic-wide.mp4` | Vista amplia desde el lago | 8,34 s · 1920 × 1080 |
| `../assets/video/nordic-cabin.mp4` | Aproximación a la cabaña | 10,43 s · 1920 × 1080 |

Los cinco MP4 se optimizaron para web con H.264, CRF 21, límite de 6 Mb/s y `faststart`; mantienen la resolución y el encuadre originales. Pesan en conjunto 23,2 MiB frente a 128,7 MiB de los originales. Los pósteres se extrajeron de esos videos sin modificar la iluminación ni el color. La página presenta el trabajo visible de iluminación, look development, composición y continuidad entre interior y exterior; no atribuye el modelado ni la creación de los assets porque esa información no fue proporcionada.

## Snowbound Environment

Fuentes: `estaciones.mp4`, `estacion3_00000000.mp4`, `nieve_breakdown.mp4` y `nieve_paneo00000000.mp4`, proporcionados por Joshua Medina.

| Archivo | Fuente | Duración / resolución |
| --- | --- | --- |
| `snow-main.jpg` | `nieve_paneo00000000.mp4`, fotograma aproximado 00:07.5; póster de la secuencia final | 1920 × 1080 |
| `snow-environment.jpg` | `estaciones.mp4`, fotograma aproximado 00:05.5 | 1920 × 1080 |
| `snowfall.jpg` | `estacion3_00000000.mp4`, fotograma aproximado 00:03.5 | 1920 × 1080 |
| `snow-breakdown.jpg` | `nieve_breakdown.mp4`, fotograma aproximado 00:09; tarjeta y póster principal | 1920 × 1080 |
| `../assets/video/snow-pan.mp4` | Paneo final optimizado | 20,01 s · 1920 × 1080 · 24 fps |
| `../assets/video/snow-environment.mp4` | Vista ambiental optimizada | 13,76 s · 1920 × 1080 · 24 fps |
| `../assets/video/snowfall.mp4` | Estudio de nevada optimizado | 7,94 s · 1920 × 1080 · 24 fps |
| `../assets/video/snow-breakdown.mp4` | Breakdown optimizado | 12,12 s · 1920 × 1080 · 25 fps |

Las copias web utilizan H.264/AAC con `faststart`, CRF 25 y un límite de 3 Mb/s. Pesan aproximadamente 19,1 MB en conjunto frente a unos 391 MB de los originales. No se alteró creativamente la iluminación ni la corrección de color durante la compresión; los pósteres se extrajeron de las copias web. La página describe la aportación confirmada por Joshua: iluminación del entorno, look development, cámara cinematográfica y corrección de color, realizada con Unreal Engine y DaVinci Resolve.

## Venator Above Coruscant

La portada `venator/cover-from-breakdown.webp` proviene del fotograma 00:58 de `C:\Users\josha\Videos\Venator_breakdown_1.mp4`. Se recortó la zona de 1920 × 810 píxeles del plano final (sin bandas negras ni rótulo). El vídeo publicado `../assets/video/venator-breakdown.mp4` fue sustituido por `C:\Users\josha\Videos\venator_breakdown_2.mp4`: dura 61,92 segundos, usa H.264/AAC a 1920 × 1080 y 25 fps, y fue remultiplexado con `faststart` sin recomprimir la imagen ni el audio.

Las quince etapas `venator/{clay-neutral,base-color,roughness,clay-lit,sun-key,directional-fill,deck-bounce,right-bounce,ship-diffuse,ship-specular,planet-plate,city-emission,atmosphere,clean-master,previous-v13}-{960,1920}.webp` proceden de `D:\venator\venator_web_project\package\assets` y conservan las leyendas en inglés de `site_content.json`. La reconstrucción AOV del paquete era idéntica al máster limpio y se omitió para no presentar dos veces la misma imagen.

## Carrusel de portada

Fuente: `JoshuaMedina_DemoReel_2026.mp4`, 1:55,85, 1920 × 1080 y 29,97 fps.

| Archivo | Tiempo aproximado | Contenido | Resolución |
| --- | --- | --- | --- |
| `venator/cover-from-breakdown.webp` | 00:58 del breakdown Venator | Primer plano del carrusel: composición final sobre Coruscant | 1920 × 810 |
| `spaceship-main.png` | 00:13,2 del breakdown actualizado | Segundo plano del carrusel: estación frente a la Luna | 1920 × 810 |
| `hero/hero-reel-01.jpg` | 00:07 | Exterior gótico con niebla | 1600 × 900 |
| `hero/hero-reel-02.jpg` | 00:15 | Entorno industrial submarino | 1600 × 900 |
| `hero/hero-reel-03.jpg` | 00:31 | Bosque nevado | 1600 × 900 |
| `hero/hero-reel-04.jpg` | 00:56 | Cabaña en el bosque | 1600 × 900 |
| `hero/hero-reel-05.jpg` | 01:04 | Bodegón iluminado con velas | 1600 × 900 |
| `hero/hero-reel-06.jpg` | 01:36 | Retrato con iluminación de color | 1600 × 900 |
| `hero/hero-reel-07.jpg` | 01:48 | Interior con luz cálida | 1600 × 900 |
| `hero/hero-norwegian-01.jpg` | Fotograma del proyecto | Norwegian Lakeside: cabaña y lago | 1600 × 900 |
| `hero/hero-norwegian-02.jpg` | Fotograma del proyecto | Norwegian Lakeside: interior con luz cálida | 1600 × 900 |
| `hero/hero-snowbound-01.jpg` | Fotograma del proyecto | Snowbound Environment: camino nevado | 1600 × 900 |
| `hero/hero-snowbound-02.jpg` | Fotograma del proyecto | Snowbound Environment: nevada entre montañas | 1600 × 900 |

Los siete fotogramas del demo reel se recortaron desde el centro superior del original: 160 píxeles a cada lado y los 180 píxeles inferiores. El recorte elimina los rótulos de Unreal Engine, software y detalles de breakdown sin reconstruir píxeles, alterar el color ni modificar la iluminación. Los cuatro fotogramas recientes proceden de los shots finales de Norwegian Lakeside y Snowbound Environment y se redimensionaron a 1600 × 900 sin alterar creativamente su color o iluminación.

## Recursos de la primera maqueta

Estos archivos se conservan, pero los HTML ya no los utilizan:

- `hero-placeholder.webp`: océano ilustrativo generado con imagegen.
- `lighting-placeholder.webp`: cámara arquitectónica ilustrativa generada con imagegen.
- `renderman-placeholder.webp`: esferas ilustrativas generadas con imagegen; no corresponden al estudio real de la naranja.
- `aovguard-placeholder.svg`: diagrama original de flujo, no una captura de la herramienta.

Ninguna de esas imágenes se presenta como trabajo de Joshua Medina. `assets/favicon.svg` es el monograma tipográfico JM.

## Tipografía

La interfaz utiliza Roboto Regular, Medium, Bold e Italic desde `assets/fonts/roboto/`, procedente del paquete proporcionado por Joshua. Conserva el aviso `NOTICE.txt`. Arial y las familias sans-serif del sistema actúan como respaldo. Los archivos anteriores de Neue Montreal se conservan como material histórico y no están referenciados por el CSS activo.

## Variantes responsive y compresión sin pérdida — 17 de octubre de 2026

- `thumbs/farmflow-render-run-{640,1200,2559}-lossless.webp` y `thumbs/farmflow-sequence-verified-{640,1200,2559}-lossless.webp` proceden de los PNG públicos del mismo nombre. Las variantes de menor ancho conservan la proporción y permiten servir capturas adecuadas al panel. Los enlaces de ampliación mantienen los PNG originales.
- `thumbs/01-clay-{640,1200,1920}-lossless.webp` hasta `thumbs/09-final-composite-{640,1200,1920}-lossless.webp` proceden de los nueve estados PNG de `spaceship/`. `thumbs/material-stages-{640,1200,1920}-lossless.webp` procede del mosaico de materiales del mismo proyecto. Los originales no se sustituyen ni se recortan.
- `thumbs/aovguard-sequence-table-2559-lossless.webp` conserva toda la resolución de `aovguard-sequence-table.png`. Esta captura de texto comprime mejor a resolución completa que las variantes intermedias, por lo que se utiliza la copia de 2559 × 1527.
- La codificación WebP es sin pérdida. En cada derivado a resolución completa se compararon los píxeles RGBA decodificados con su PNG: coincidencia exacta en los trece originales convertidos. Las variantes más pequeñas se remuestrearon proporcionalmente, sin filtros de color, contraste, saturación ni regradación. Una versión reducida no contiene el mismo detalle que el original; por eso se conservan el acceso a tamaño completo y las descripciones textuales.
- Los scripts de generación y el detalle de tamaños/condiciones están en `.verification/20261017-audit/`. No requieren dependencias nuevas: utilizan el procesador de imágenes ya disponible en el entorno. Los resultados de transferencia se documentan como mediciones locales, no como métricas de campo.


## Asset Publisher & Loader — English 0.10.1
Las ocho capturas de `asset-publisher-0101/` proceden de la aceptación real de la interfaz en inglés de Maya 2026 y Katana 9.0v3 con el Master Sword de Zelda. Se copiaron exactamente del paquete de presentación validado del 26 de octubre de 2026, sin nuevos recortes, reescalados, filtros ni gradación. Los enlaces de galería conservan estas resoluciones completas.
Siete copias de presentación eliminan el cursor y su halo mediante áreas limpias de capturas nativas de la misma sesión. Se conservaron los glifos del valor actual de roughness 0.25 y se retiró su tinte azul. No se utilizaron píxeles generados por IA en las imágenes finales. Cada píxel RGB decodificado fuera de las regiones declaradas de edición coincide con su captura original; las originales permanecen en la evidencia de aceptación. La captura 04 es el JPG original sin cambios. El mapa completo de procedencia forma parte del ZIP del caso de estudio.
| Archivo | SHA-256 |
| --- | --- |
| `01-maya-publish-v002.png` | `b831b3d2c4e60a0ae3f33150f0df32313d5ebd87a2b95cdddf5426b589bb3dd5` |
| `02-katana-version-library.png` | `8630a036c4551acbb7d6e09f4cc64f4f134f2a150ec72f002e0bc552fefc7c66` |
| `03-semantic-impact-review.png` | `2258b9c93bdc84e758ce380c56c897b34916ecaca9b6d4b7f0bc78b07fd5795e` |
| `04-update-pending-verification.jpg` | `7a7de01fe3689cc3d5228499fa6c03a6e66710650ed7f9919ce83513632e276a` |
| `05-shot-light-exposure.png` | `626c1b0d27c57c4dc4edde2719b0da4d45779896bc9f086eee3ce59b2f6d5a0d` |
| `06-shot-shader-roughness.png` | `7823794f4f1f5cb15ecb29eee6c8dc5cd2571d02dc2eff57e7670b09dae55b7f` |
| `07-update-and-rollback-persisted.png` | `e4d10e8785e9f4d12560be3789a859dc6cd01fb0c27d5827e83dea2a814f9936` |
| `08-final-loader-v001.png` | `79c25ddbca6482f5ab5b4f8b83d457dc9de5d7ae4feeb80e5bc7e43e5f47a95a` |

El ZIP público `../assets/documents/asset-publisher-case-study-0.10.1-cursor-free.zip` es el artículo completo, imágenes y referencias de evidencia; no es el instalador de la herramienta. SHA-256: `9727d29d352893b973211cfdd053e50cd89ba9f740764f0d54639603c58de576`; 2.960.588 bytes.
La aceptación GUI nueva se limita a frame 1, una instancia de Master Sword, seed camera, 39 nodos nativos y el contrato RenderMan 27.3 definido sobre NTFS local. Update y rollback guardados/reabiertos alcanzaron PERSISTED; exposure 1 y roughness 0.25 se conservaron. Las cifras 1.297 pruebas y 69 subpruebas corresponden al informe de la herramienta, no a pruebas ejecutadas al integrar esta página. Dos pruebas se omitieron por privilegios de symlink de Windows. SMB permanece pendiente y las escrituras de producción sobre depósitos de red están deshabilitadas. Los resultados ampliados 0.10.0 dentro del ZIP mantienen su atribución histórica. No se afirma nueva equivalencia de píxeles renderizados, paridad con Arnold, certificación de cámara animada ni benchmark de rendimiento.
