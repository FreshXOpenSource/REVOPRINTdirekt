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



[direkt](http://revoprint.de/direkt.js)


```javascript


    <script type="text/javascript" src="http://revoprint.de/direkt.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            revoprint("saarbruecken", "digitaldruck+pirrot+gmbh", "#009ee3");
        });
    </script>
</head>
</html>




License:
=====

Copyright 2013
Licensed under the MIT License (just like jQuery itself)

