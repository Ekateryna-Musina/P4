Website Performance Optimization portfolio project
--------------------------------------------------

To install and run this project you should have installed npm and grunt. If you don't have them installed follow these links https://github.com/npm/npm and http://gruntjs.com/installing-grunt.

Project Installation
====================

1.	Install project dependencies with command: `npm install`.
2.	Run Grunt with `grunt` command.
3.	Run simple HTTP server running the following command from website root directory(choose any free port you have on your local workstation):`python -m SimpleHTTPServer 8003`
4.	Browse site http://localhost:8003.

Steps taken to optimize index.html
==================================

1.	Removed reference to web fonts downloading which affects page loading speed but not really needed in this case.

```
<link href="//fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
```

1.	Referenced css files have been minified using **grunt-contrib-cssmin** task. Also referenced *perfmatters.js* has been unglified with **grunt-contrib-uglify** task.

2.	**grunt-processhtml** task transforms *Index.src.html* to *Index.html* file by replacing all references to css and js files with appropriate minified css and uglified js files references and also minified with and **grunt-contrib-htmlmin** minifies this file.

3.	**async** keyword has been added for loading *analytics.js* script.

4.	*pizzeria.jpg* image has been resized and minified with **grunt-responsive-images** and **grunt-contrib-imagemin** grant tasks.

5.	Render-blocking java script and css removed from the page head.

Steps taken to optimize main.js
===============================

1.	Change pizza size functionality optimized. **determineDx** method has beed replaced with the simple width in percents for each selected pizza size:

```
function getPizzaWidth(size) {
  switch (size) {
    case "1":
      return "25%";
    case "2":
      return "33.33%";
    case "3":
      return "50%";
    case "4":
        return "100%";
    default:
      console.log("bug in sizeSwitcher");
  }
}
```

1.	**updatePositions** is called for each scroll event and each call contained the following code

```
var items = document.querySelectorAll('.mover');
```

and it was moved outside the method, because it does the same expensive select every time. 3. All pizza recipes are not generated all at once on load event. It is not necessary but affects page load performance. So on page load I've generate only 5 pizza recipes then after page loaded on each scroll event the others portions will be generated. 4. **generateItems** method has been optimized to generate appropriate number of moving pizza that depends on actual window height. 5. **querySelector** method has been replaced with much faster **getElementById**. 6. Removed unnecessary selectors from loop that did the same select each iteration, e.g:

```

for (var i = 2; i < 100; i++) {
  var pizzasDiv = document.getElementById("randomPizzas");
  pizzasDiv.appendChild(pizzaElementGenerator(i));
}
```

should be replaced with the following

```
var pizzasDiv = document.getElementById("randomPizzas");
for (var i = 2; i < 100; i++) {
  pizzasDiv.appendChild(pizzaElementGenerator(i));
}
```
