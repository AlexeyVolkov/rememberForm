# rememberForm

##### rememberForm is a JavaScript file that remembers user`s form input.

- [Download](https://raw.githubusercontent.com/AlexeyVolkov/rememberForm/master/rememberForm.min.js)

Saves the form's input data and fill in the form.

## Requirements

```html
<form name="uniqueFormName"></form>
```

Your form should have an unique form name attribute.

## Usage

```html
<script src="/path/to/rememberForm.min.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/gh/AlexeyVolkov/rememberForm@1.1/rememberForm.min.js"></script> -->
<script>
  rememberForm("#form");
  rememberForm(".needs-validation");
  rememberForm(".page section .forms-group .form32");
</script>
```
