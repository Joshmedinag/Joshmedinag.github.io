# Imágenes y vídeo del portfolio

El material de FarmFlow, AOVGuard, Norwegian Lakeside, Going Merry, RenderMan y Broken Horizons procede de los archivos proporcionados por Joshua. La presentación principal de FarmFlow se construye con HTML y CSS. AOVGuard utiliza logotipos vectoriales de Maya y Python y un símbolo de AOVs creado para este portfolio. Los originales no se modifican. Las imágenes extraídas de los PDF conservan su resolución disponible, sin ampliación artificial. Los números de página siguientes cuentan desde la primera página del PDF, incluida la portada.

## FarmFlow

Fuente: `FarmFlow_documentacion_completa_1.9.0.docx`, versión documentada 1.9.0, con fecha de cierre 9 de septiembre de 2026.

La tarjeta y la cabecera usan un diagrama original construido directamente en HTML/CSS que representa el recorrido Maya scene → Preflight → Arnold render → EXR + report. No se generó una captura falsa de la interfaz. La única imagen incrustada en el documento es una captura real de aceptación en Maya 2026, pero contiene rutas locales personales; por esa razón no forma parte de los archivos públicos del portfolio.

La página reproduce únicamente afirmaciones documentadas: 753 pruebas aprobadas, 2 omitidas, 90,40 % de cobertura y una aceptación local de 10 frames verificados en 29,7 segundos. También conserva la clasificación del informe entre funciones comprobadas, simuladas y pendientes.

## AOVGuard

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
| `snow-main.jpg` | `nieve_paneo00000000.mp4`, fotograma aproximado 00:07.5 | 1920 × 1080 |
| `snow-environment.jpg` | `estaciones.mp4`, fotograma aproximado 00:05.5 | 1920 × 1080 |
| `snowfall.jpg` | `estacion3_00000000.mp4`, fotograma aproximado 00:03.5 | 1920 × 1080 |
| `snow-breakdown.jpg` | `nieve_breakdown.mp4`, fotograma aproximado 00:09 | 1920 × 1080 |
| `../assets/video/snow-pan.mp4` | Paneo final optimizado | 20,01 s · 1920 × 1080 · 24 fps |
| `../assets/video/snow-environment.mp4` | Vista ambiental optimizada | 13,76 s · 1920 × 1080 · 24 fps |
| `../assets/video/snowfall.mp4` | Estudio de nevada optimizado | 7,94 s · 1920 × 1080 · 24 fps |
| `../assets/video/snow-breakdown.mp4` | Breakdown optimizado | 12,12 s · 1920 × 1080 · 25 fps |

Las copias web utilizan H.264/AAC con `faststart`, CRF 25 y un límite de 3 Mb/s. Pesan aproximadamente 19,1 MB en conjunto frente a unos 391 MB de los originales. No se alteró creativamente la iluminación ni la corrección de color durante la compresión; los pósteres se extrajeron de las copias web. La página describe la aportación confirmada por Joshua: iluminación del entorno, look development, cámara cinematográfica y corrección de color, realizada con Unreal Engine y DaVinci Resolve.

## Carrusel de portada

Fuente: `JoshuaMedina_DemoReel_2026.mp4`, 1:55,85, 1920 × 1080 y 29,97 fps.

| Archivo | Tiempo aproximado | Contenido | Resolución |
| --- | --- | --- | --- |
| `hero/hero-reel-01.jpg` | 00:07 | Exterior gótico con niebla | 1600 × 900 |
| `hero/hero-reel-02.jpg` | 00:15 | Entorno industrial submarino | 1600 × 900 |
| `hero/hero-reel-03.jpg` | 00:31 | Bosque nevado | 1600 × 900 |
| `hero/hero-reel-04.jpg` | 00:56 | Cabaña en el bosque | 1600 × 900 |
| `hero/hero-reel-05.jpg` | 01:04 | Bodegón iluminado con velas | 1600 × 900 |
| `hero/hero-reel-06.jpg` | 01:36 | Retrato con iluminación de color | 1600 × 900 |
| `hero/hero-reel-07.jpg` | 01:48 | Interior con luz cálida | 1600 × 900 |

Cada fotograma se recortó desde el centro superior del original: 160 píxeles a cada lado y los 180 píxeles inferiores. El recorte elimina los rótulos de Unreal Engine, software y detalles de breakdown sin reconstruir píxeles, alterar el color ni modificar la iluminación. La selección evita la portada, los créditos, las comparativas y las vistas divididas.

## Recursos de la primera maqueta

Estos archivos se conservan, pero los HTML ya no los utilizan:

- `hero-placeholder.webp`: océano ilustrativo generado con imagegen.
- `lighting-placeholder.webp`: cámara arquitectónica ilustrativa generada con imagegen.
- `renderman-placeholder.webp`: esferas ilustrativas generadas con imagegen; no corresponden al estudio real de la naranja.
- `aovguard-placeholder.svg`: diagrama original de flujo, no una captura de la herramienta.

Ninguna de esas imágenes se presenta como trabajo de Joshua Medina. `assets/favicon.svg` es el monograma tipográfico JM. Las fuentes de la interfaz son del sistema.
