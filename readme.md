<p align="center">
<img width=300px height=300px src="https://raw.githubusercontent.com/Benrobo/contaxion/main/lib/img/logo.png?token=APSXSWB3TJZEEGHMO2MKEQLBOYFZS" alt="contaxion logo">
</p>

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/benrobo/contaxion/main?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/benrobo/contaxion?style=for-the-badge)
![GitHub all releases](https://img.shields.io/github/downloads/benrobo/contaxion/total?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/benrobo/contaxion?style=for-the-badge)
![GitHub Repo stars](https://img.shields.io/github/stars/benrobo/contaxion?style=for-the-badge)
![GitHub watchers](https://img.shields.io/github/watchers/benrobo/contaxion?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/benrobo/contaxion?style=for-the-badge)

### Contaxion:
#### A minimalistic javascript plugin which enable you integrate, inject, embed contact form within your webstite with the appropriate theme of the site without the need of complex backend.
<img src="https://raw.githubusercontent.com/Benrobo/contaxion/main/img/screenshot/screenshot1.PNG">

## 🏁 Getting Started.


### 🎉 Installing plugin.

##### contaxion plugin can be installed on any website by just linking the script and css file into your application


```html
    <head>
        /*This must be placed within the head section of the page  */
        <link rel="http://contaxion.css"/>
    </head>
```

```html
    <body>

        .......

        .......

        // this must be placed above the closing body tag
        <script defer src="http://contaxion.js"></script>
    </body>
```

### 🎁 Initializing contaxion.

##### To initialize contaxion,all you have to do is invoke the code above the closing body tag after the contaxion script tag

```javascript
    <body>

        // this must be placed above the closing body tag
        <script defer src="http://contaxion.js"></script>

        <script>
            new Contaxion(<properties>).init();
        </script>
    </body>
```

### ✨ Configuring contaxion.

##### By default, leaving the Object instance empty without passing it the required properties, set contaxion form to default look and style. To configure contaxion, all you have to do is pass in the required properties in form of an objects

```html

    <script>
        new Contaxion({
            // contaxion properties
        }).init();
    </script>
```

### ✔ Contaxion Properties.

##### contaxion object instance takes in the following configuration properties. 

```javascript

    {
        parent: "<required> | .container | #container", // A block level html container element eg (div)
        formTitle: "<optional>", // The title of the contact form which should get displayed, by default is set to 'Contact Us' eg (red, #0000, rgb(0,255,0))
        genRandColor: "<optional> | boolean", //If you wanna generate a random color in for your contact form, setting this to (true) and not setting the (headerColor && buttonColor && buttonColor) would generate random color
        headerColor: "<optional>", //the contact form header color by default is set to a pink background color eg (red, #0000, rgb(0,255,0))
        buttonColor: "<optional>", // the submit contact us button background color by default is set to the header background color, eg (red, #0000, rgb(0,255,0))
        openFormBtn: "<optional>", //the toggle contaxion form button background color
        openFormBtnShadow: "<optional>", // the box-shadow for the toggle contaxion form button
        toEmail: "<required>", //contaxion recipient email address.
    }
```

### 👌 Contaxion Basic Example.

```html

  <html lang="en">
  <head>
    <link rel="stylesheet" href="contaxion.css" />
  </head>
  <body>
    <div class="contaxion-container"></div>

<script src="https://contaxion.js"></script>
    <script>
      new Contaxion({
        parent: ".contaxion-container",
        formTitle: "Contact Form",
        headerColor: "teal",
        buttonColor: "teal",
        openFormBtn: "teal",
        openFormBtnShadow: "teal",
        toEmail: "johndoe@gmail.com"
      }).init()
      
    </script>
  </body>
</html>
```

### 🎗 Result

<img src="https://raw.githubusercontent.com/Benrobo/contaxion/main/lib/img/screenshot/screenshot3.PNG">

### 💎 Making use of the default Contaxion form.

```html

  <html lang="en">
  <head>
    <link rel="stylesheet" href="contaxion.css" />
  </head>
  <body>
      <!-- This is required -->
    <div class="contaxion-container"></div>

    <script src="https://contaxion.js"></script>
    <script>
      new Contaxion({
        parent: ".contaxion-container",
        toEmail: "johndoe@gmail.com"
      }).init()
      
    </script>
  </body>
</html>
```
### 🎉 Result

<img src="https://raw.githubusercontent.com/Benrobo/contaxion/main/img/screenshot/screenshot1.PNG">

### Contaxion-Api

[Contaxion-Api..](https://github.com/Benrobo/contaxion-api)