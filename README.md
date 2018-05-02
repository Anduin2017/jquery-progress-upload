# jquery-progress-upload

A library to show progress and open button for file uploader.

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
<form id="myform">
    <input type="file" id="file" data-max-file-size="30M" />
</form>
```

Add add the following javascript.

```javascript
    $('#file').progressloader('/api/upload','#myform');
```

Run your app and upload a file.

### Server side

Create a new action at `/api/upload` and save that file.

For example:

```C#
var file = Request.Form.Files.First();
var fileStream = new FileStream(GetCurrentDirectory(), FileMode.Create);
await file.CopyToAsync(fileStream);
```