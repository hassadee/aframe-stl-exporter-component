# aframe-stl-exporter-component

[![Version](http://img.shields.io/npm/v/aframe-stl-exporter-component.svg?style=flat-square)](https://npmjs.org/package/aframe-stl-exporter-component)
[![License](http://img.shields.io/npm/l/aframe-stl-exporter-component.svg?style=flat-square)](https://npmjs.org/package/aframe-stl-exporter-component)

A STL Exporter component for [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| verbose  | Log the STL output to the console | false |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):
```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://raw.githubusercontent.com/hassadee/aframe-stl-exporter-component/master/dist/aframe-stl-exporter-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity stl-exporter></a-entity>
  </a-scene>
</body>
```

Usage on your component:

```javascript
sceneEl.systems['stl-exporter'].export(input, options);
```

The function accepts severals different `input` values:
* None (export the whole scene)
* One entity

More information about the component and its options could be found on the [three.js STLExporter](https://threejs.org/examples/#misc_exporter_stl)

#### npm

Install via npm:

```bash
npm install aframe-stl-exporter-component
```

Then require and use.

```js
require('aframe');
require('aframe-stl-exporter-component');
```