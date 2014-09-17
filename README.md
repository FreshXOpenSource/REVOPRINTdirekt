REVOPRINTdirekt Plugin
===========

Description:
=====

This plug-in allows you to easily add an animatable UI widget which slides from the side of the screen with an embedded iframe to the REVOPRINT printing service.



Features:
=====

  - Using CSS3 Transition for sliding out the feedback widget (jquery used as a fallback for older browsers)



Usage / Integration into your Copyhop site:
=====


```javascript
    <script type="text/javascript" src="http://revoprint.de/direkt.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            revoprint({'ort': 'saarbruecken', 'name': 'digitaldruck+pirrot+gmbh', 'bgColor': '#009ee3'});
        });
    </script>
````

Wenn Sie JavaScript-Code in einen bestimmten Bereich einfügen möchten, müssen Sie Ihr HTML-Dokument mit einem Editor öffnen, um den HTML-Code (Quellcode) der Seite einzusehen um die Bereiche 'Head' und 'Body' zu lokalisieren.

Suchen Sie im Quellcode ihrer Seite das HTML-Tag, welches den HEAD-Bereich abschließt. Gleich darunter finden Sie in der Regel das HTML-Tag welches den Beginn des Body-Bereichs darstellt:

</head>
<body>
Genau an dieser Stelle ist die Grenze zwischen Head und Body (Kopf und Körper ) Ihres HTML-Dokuments.

Oberhalb des </head>-Tags ist der HEAD-Bereich der Seite.


```html
<html>
    <head>
    ...
    
    HIER EINFÜGEN
    
    </head>
    <body>
    ...
    </body>
</html>


````
Fügen Sie das Skript von oben genau oberhalb des abschließenden </head> tags ein.




License:
=====

Copyright 2013
Licensed under the MIT License (just like jQuery itself)

