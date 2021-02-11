# <p align='center'>**USING WEBPACK**</p>
## <p>**Gentle strides towards [Webpack](https://webpack.js.org/)**</p>
### <p>**Bundling bootstrap and a JS module**</p>


### by: [@JWokiri](https://twitter.com/JWokiri). <br/>

---
<br/>

## Post Overview <br/>
If you are using node to develop websites, and would wish to harness bootstrap functionalities (in somewhat a proffesional sense) then read this to the end.

If you are wondering what I am talking about then here's a brief description:
**Bootstrap** is an HTML, CSS, and JavaScript framework for developing responsive, mobile-first-design websites. It is completely free to download and use!

**Webpack** on the other hand is, amongst other things, a module bundler. It reads your html, css and javascript code and brings together every asset or module or component that makes your app function; and accordingly incorporates them in the final generated file(s). 

I will, in this writeup show you how to use webpack to collect (therefore making them available for offline use) various bootstrap components  to make our bootstrap-dependent app function properly. You will also see that a javascript file which is not necessarily part of the app but whose function we would need (therefore termed a module) is brought on board to facilitate a proper working of our very simple app.


---
<br/>

## **Concept, Procedure and Requisites**

### Time to dive in...

<br/><br/>

## <p align='center'>1. Ensure you have nodejs installed.</p>

This may be confirmed by verifying the version. Run the following code in your command prompt or powershell-- henceforth I will refer to either as *terminal*:

``` powershell
node --version
```

The software is installed in my pc, and infact **v14.15.3**.

If you do not have node installed, please do so from [nodejs official download website](https://nodejs.org/en/download/).

With node installed, we can then initialize our project (or package). Make and get into a directory of your choice e.g. "webpackbundling" and run the following command in the terminal:

``` powershell
npm init -y
```

This will create a **package.json** file into the root of the directory. The ``` -y``` flag is optional and is here used so that the default package.json file is automatically created, otherwise one would have to give a set of answers to a CLI questionnaire 😟😟.

My generated **package.json** file looks like this.

```json
{
  "name": "webpackbundling",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Our directory, webpackbundling, is now officially termed a package. **Note that** the path to every file or directory we create will be referenced from this root folder.

<br/><br/>

## <p align='center'>2. Next, we will install webpack and webpack-cli modules.</p>

A **module** is any file or directory in the **node_modules** directory that can be loaded by the Node.js require() function.
Every module we install will be 'tracked' by the initially generated package.json. The benefit of this is that our package becomes easy for others to manage and install the very modules we used.

It is important to note that webpack module requires another module called **webpack-cli** to work properly. Webpack-cli is therefore termed webpack's peer dependency which need to be installed too. Also (optional, but highly recommended) we will install **webpack-dev-server** so that we may monitor our work progress in realtime.

These three will be installed as development modules by running either of the following command in the terminal:

```powershell
npm install --save-dev webpack webpack-cli webpack-dev-server
```

Or...

```powershell
npm i -D webpack webpack-cli webpack-dev-server
```
Once successful, open the package.json file to see the alterations that have occured. While at it, we need to make certain additions to help serve our needs.

In the "scripts" key, add the following values:

```json

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack serve --config ./webpack.config.js --mode=development --open",
    "build": "webpack --config ./webpack.config.js --mode=production"
  },

```

Look keenly at the pieces of statement we have added; you will see that both 'start' and 'build' script commands are configured with a file called **webpack.config.js**.

We need to create this file in the root directory and appropriately populate it, but that will wait a bit.

<br/><br/>

## <p align='center'>3. We need the services of certain webpack modules.</p>


Remember we are making a web app. Webpack needs to work with either a specified html file template or generate a default. We will explore both starting with the latter, but in anycase we need to install a plugin that is reponsible for handling this part of the business. It is called **html-webpack-plugin**.

Accordingly,

```powershell
npm i -D html-webpack-plugin
```

**`NOTE:`** html-webpack-plugin not only generates an HTML but also includes into it script and link tags properly sourcing or linking assets from their right location.

We will now create the webpack.config.js file and populate it in this manner:

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    mainApp: "./src/js/app.js",
  },

  output: {
    path: path.resolve(__dirname, "prod"),
    filename: "[name].js",
  },

  devServer: {
    port: 2021,
  },

  plugins: [new HtmlWebpackPlugin()],
};

```
We are getting close to showing results, hold on just for a moment...

**Look keenly at the module.exports json object:-** At the `entry` key-- which is a basic webpack requirement, we named a json key `mainApp` *(or anything you wish)* and assigned a value of `"./src/js/app.js` to it. You know what we need to do, create that file, i.e a src directory, js directory and an app.js file therein.

Log "Webpack worked!" into the app.js file. i.e:

### <p align='center' style='margin-bottom:0;'>**src/js/app.js**</p>

```javascript
console.log("Webpack worked!")
```

Now run the following into the terminal:

```powershell
npm start
```

**What happened?** Your default browser opened at the address http://localhost:2021/ with a blank page. Now, get over to the console and verify that our "Webpack Worked!" message is logged--- It sure did, at least for me. If yours did not, then re-read the technical procedure of this write-up to confirm that there are no impactful differences that caused the anomaly. Are we cool...?

### Good Progress 👌💃💪

<br/><br/>

## <p align='center'>4. Incorporating Bootstrap and extracting css file.</p>

Stop the local server with **`Ctrl + C`** and install bootstrap and sass-loader with their respective peer dependencies...

### **The modules (and some loaders) needed are listed below with their respective roles:**<br/><br/>

**bootstrap:** Used for website styling<br/>
**jquery:** Bootstrap peer dependency<br/>
**popper.js:** Bootstrap peer dependency<br/>

**sass-loader:** Used to turn scss into css<br/>
**node-sass:** Sass-loader peer dependency<br/>

**css-loader:** Turns css into common js<br/>
**mini-css-extract-plugin:** Extract css into files<br/>

Install them with the command:

```ps
npm i -D bootstrap jquery popper.js sass-loader node-sass css-loader mini-css-extract-plugin
```

Make the folowing two files, then populate as shown:

1=> src/js/bootstrapStyling.js

2=> src/scss/bootstrapStyling.scss


### <p align='center' style='margin-bottom:0;'>**src/js/forbootstrap.js**</p>

```javascript
import "bootstrap"; //Javascript modules
import "../scss/bootstrapStyling.scss"; // scss, css
```
<br/>

### <p align='center' style='margin-bottom:0;'>**src/scss/bootstrapStyling.scss**</p>

```scss
@import "~bootstrap/scss/bootstrap";
```

### **Trust me, bootstrap is now ready to use!**

Let's be sure about it by deliberatly using a certain bootstrap classes.

### Make an HTML file and populate as shown:

### <p align='center' style='margin-bottom:0;'>**src/myApp.html**</p>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>

<body>
    <div class="container mt-sm-2 p-sm-4">
        <nav class="navbar navbar-expand-sm bg-light navbar-light">
            <span class="navbar-brand tertiaryFont">Distance Converter</span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link text-success font-weight-bolder" href="#">Home</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

    <div class="container">
        <div class="container">
            <label for="distanceMiles">Distance in Miles:</label>
            <input type="text" class="form-control" id="distanceMiles" name="distanceMiles">

            <button id="submitID" type="submit" class="btn btn-outline btn-outline-success mt-2">Convert to Kilometers</button>

            <div class="pt-5 pb-5">
                <h5 id="answerID" class="font-weight-bold"></h5>
            </div>
        </div>
    </div>

    <footer class="mt-5">
        <div class="container">
            <div class="jumbotron mb-0">
                <h4 class="font-weight-bold text-center tertiaryFont mt-5">GENTLE STRIDES TOWARDS WEBPACK</h4>
                <h6 class="lead text-center mt-0">Bundling bootstrap and a JS module <small>using webpack</small></h6>
                <h6 class="lead text-center mt-0"><small><a class="nav-link" href="https://twitter.com/JWokiri" title="Connect in Twitter.">myTwitter</a></small></h6>
            </div>
        </div>
</footer>

</body>

</html>
```
<br/>

### Adjust **webpack.config.js** so that it is this:

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    mainApp: "./src/js/app.js",
    bootstrapStyling: "./src/js/bootstrapStyling.js",
  },

  output: {
    path: path.resolve(__dirname, "prod"),
    filename: "[name].js",
  },

  devServer: {
    port: 2021,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, //Extracts css into files
          "css-loader", //Tuns css into common js
        ],
      },

      {
        //transpiles SCSS to js
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, //Extract css into files
          "css-loader", //Turns css into common js
          "sass-loader", //Turns scss into css
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new HtmlWebpackPlugin({
      title: "My Gentle Webpack App",
      template: "./src/myApp.html",
    }),
  ],
};

```

### Delete the contents of **`"./src/js/app.js`** file and adjust it to:

```javascript
import { miles_KMs, roundoff } from "./calculator";

const userInput = document.querySelector("#distanceMiles");
const submitID = document.querySelector("#submitID");
const answerID = document.querySelector("#answerID");


submitID.addEventListener("click", () => {
  // The value of your input
  let distanceMiles = userInput.value;

  // The results in kilometers after conversion
  let distanceKMs = miles_KMs(distanceMiles);

  // Writing answer into the dom
  let theAnswer = roundoff(distanceKMs, 3);

  if (theAnswer){
      answerID.style.color = "#28a745";
      answerID.innerHTML = `${theAnswer} kilometers`
  }else{
      answerID.style.color = 'red'
      answerID.innerHTML = `${distanceMiles} is not a valid number`;
  }
});

userInput.addEventListener('focus', () => {
    userInput.value = ''
})

```

What have you noticed in the first line?

You saw that two functions, **`miles_KMs`** and **`roundoff`** functions are imported from a module called calculator.js.

Let's create this file THEN ENJOY THE FRUITS OF OUR LABOR:-

Create src/js/calculator.js and populate it as shown:

### <p align='center' style='margin-bottom:0;'>**src/js/calculator.js**</p>
```javascript
const miles_KMs = distInMiles => distInMiles / 0.62137;
const roundoff = (num, dp) => Number(Math.round(num + "e" + dp) + "e-" + dp);

module.exports = {
  miles_KMs,
  roundoff,
};
```

All set. Webpack will now bundle everything together and give us a functioning app.

In the terminal, run

```powershell
npm run-script build
```

### At the root folder, there is a new directory called **prod** that is generated. Navigate into it and open the **/prod/index.html**.

## Enjoy a bundled functioning app 😜👋.