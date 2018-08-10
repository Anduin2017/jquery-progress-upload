# jquery-progress-upload

[![npm](https://img.shields.io/npm/v/jquery-progress-upload.svg?style=flat)](https://www.npmjs.com/package/jquery-progress-upload)

A library to show progress and open button for file uploader.

## Example

Click [here](https://colossus.aiursoft.com) to view an example.

## How to install

```bash
$ npm install jquery-progress-upload
```

And add your reference:

```html
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/jquery-progress-upload/src/jquery-progress-upload.js"></script>
```

## How to use

### Client side

Create a form

```html
<form action="/api/upload" method="post" enctype="multipart/form-data">
    <input type="file" id="file" data-max-file-size="30M" />
</form>
```

Add add the following javascript.

```javascript
var settings = { };
$('#file').setProgressedUploader(settings);
```

Run your app and upload a file.

### Server side

Create a new action at `/api/upload` and save that file.

For example:(In C#)

```C#
var file = Request.Form.Files.First();
var fileStream = new FileStream(GetCurrentDirectory(), FileMode.Create);
await file.CopyToAsync(fileStream);
```

## API

```javascript
var settings = {
    onInit: function (elements) {
        //Occurs when element loads.
    },

    onGetFile: function (elements) {
        //Occurs when user put a file in it.
    },

    onStartSubmitting: function (elements) {
        //Occurs when user is submitting the form.
    },

    onProcessing: function (elements) {
        //Occurs when all data transformed.
    },

    onFinish: function (elements, data) {
        //Occurs when server gives response.
    },
    
    onError: function(e){
        //Occurs when server could not accept the file.
    }
};

$('#file').setProgressedUploader(settings);
```
