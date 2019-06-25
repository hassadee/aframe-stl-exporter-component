/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @author hassadee / https://hassadee.com/\n */\n\n/* Global AFRAME */\nif (typeof AFRAME === 'undefined') {\n\tthrow new Error('Component attempted to register before AFRAME was available.');\n}\n\n__webpack_require__(/*! ./vendor/STLExporter */ \"./vendor/STLExporter.js\");\n\n/**\n* STL Exporter component for A-Frame.\n*/\nAFRAME.registerSystem('stl-exporter', {\n\tschema: {\n\t\tverbose: { default: false }\n\t},\n\n\tmultiple: false,\n\n\tinit: function () {\n\t\tthis.exporter = new THREE.STLExporter();\n\t},\n\n\texport: function (input, options) {\n\t\tconsole.log(\"export\");\n\n\t\tvar inputObject;\n\t\tvar link = document.createElement('a');\n\n\t\tif (typeof input === 'undefined') {\n\t\t\tinputObject = this.sceneEl.object3D;\n\t\t} else {\n\t\t\tinputObject = input.object3D;\n\t\t}\n\n\t\tfunction save(blob, filename) {\n\t\t\tlink.href = URL.createObjectURL(blob);\n\t\t\tlink.download = filename || 'data.json';\n\t\t\tlink.dispatchEvent(new MouseEvent( 'click' ));\n\t\t}\n\n\t\tfunction saveArrayBuffer(buffer, filename) {\n\t\t\tsave(new Blob([ buffer ], { type: 'application/octet-stream' }), filename);\n\t\t}\n\n\t\tfunction saveString(text, filename) {\n\t\t\tsave(new Blob([ text ], { type: 'text/plain' }), filename);\n\t\t}\n\n\t\tif (options && options.binary === true) {\n\t\t\tsaveArrayBuffer(this.exporter.parse(inputObject, { binary: true }), 'model-binary.stl');\n\t\t} else {\n\t\t\tsaveString(this.exporter.parse(inputObject), 'model-ascii.stl');\n\t\t}\n\t}\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./vendor/STLExporter.js":
/*!*******************************!*\
  !*** ./vendor/STLExporter.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @author kovacsv / http://kovacsv.hu/\n * @author mrdoob / http://mrdoob.com/\n * @author mudcube / http://mudcu.be/\n * @author Mugen87 / https://github.com/Mugen87\n *\n * Usage:\n *  var exporter = new THREE.STLExporter();\n *\n *  // second argument is a list of options\n *  var data = exporter.parse( mesh, { binary: true } );\n *\n */\n\nTHREE.STLExporter = function () {};\n\nTHREE.STLExporter.prototype = {\n\n\tconstructor: THREE.STLExporter,\n\n\tparse: ( function () {\n\n\t\tvar vector = new THREE.Vector3();\n\t\tvar normalMatrixWorld = new THREE.Matrix3();\n\n\t\treturn function parse( scene, options ) {\n\n\t\t\tif ( options === undefined ) options = {};\n\n\t\t\tvar binary = options.binary !== undefined ? options.binary : false;\n\n\t\t\t//\n\n\t\t\tvar objects = [];\n\t\t\tvar triangles = 0;\n\n\t\t\tscene.traverse( function ( object ) {\n\n\t\t\t\tif ( object.isMesh ) {\n\n\t\t\t\t\tvar geometry = object.geometry;\n\n\t\t\t\t\tif ( geometry.isBufferGeometry ) {\n\n\t\t\t\t\t\tgeometry = new THREE.Geometry().fromBufferGeometry( geometry );\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif ( geometry.isGeometry ) {\n\n\t\t\t\t\t\ttriangles += geometry.faces.length;\n\n\t\t\t\t\t\tobjects.push( {\n\n\t\t\t\t\t\t\tgeometry: geometry,\n\t\t\t\t\t\t\tmatrixWorld: object.matrixWorld\n\n\t\t\t\t\t\t} );\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t} );\n\n\t\t\tif ( binary ) {\n\n\t\t\t\tvar offset = 80; // skip header\n\t\t\t\tvar bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;\n\t\t\t\tvar arrayBuffer = new ArrayBuffer( bufferLength );\n\t\t\t\tvar output = new DataView( arrayBuffer );\n\t\t\t\toutput.setUint32( offset, triangles, true ); offset += 4;\n\n\t\t\t\tfor ( var i = 0, il = objects.length; i < il; i ++ ) {\n\n\t\t\t\t\tvar object = objects[ i ];\n\n\t\t\t\t\tvar vertices = object.geometry.vertices;\n\t\t\t\t\tvar faces = object.geometry.faces;\n\t\t\t\t\tvar matrixWorld = object.matrixWorld;\n\n\t\t\t\t\tnormalMatrixWorld.getNormalMatrix( matrixWorld );\n\n\t\t\t\t\tfor ( var j = 0, jl = faces.length; j < jl; j ++ ) {\n\n\t\t\t\t\t\tvar face = faces[ j ];\n\n\t\t\t\t\t\tvector.copy( face.normal ).applyMatrix3( normalMatrixWorld ).normalize();\n\n\t\t\t\t\t\toutput.setFloat32( offset, vector.x, true ); offset += 4; // normal\n\t\t\t\t\t\toutput.setFloat32( offset, vector.y, true ); offset += 4;\n\t\t\t\t\t\toutput.setFloat32( offset, vector.z, true ); offset += 4;\n\n\t\t\t\t\t\tvar indices = [ face.a, face.b, face.c ];\n\n\t\t\t\t\t\tfor ( var k = 0; k < 3; k ++ ) {\n\n\t\t\t\t\t\t\tvector.copy( vertices[ indices[ k ] ] ).applyMatrix4( matrixWorld );\n\n\t\t\t\t\t\t\toutput.setFloat32( offset, vector.x, true ); offset += 4; // vertices\n\t\t\t\t\t\t\toutput.setFloat32( offset, vector.y, true ); offset += 4;\n\t\t\t\t\t\t\toutput.setFloat32( offset, vector.z, true ); offset += 4;\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\toutput.setUint16( offset, 0, true ); offset += 2; // attribute byte count\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\treturn output;\n\n\t\t\t} else {\n\n\t\t\t\tvar output = '';\n\n\t\t\t\toutput += 'solid exported\\n';\n\n\t\t\t\tfor ( var i = 0, il = objects.length; i < il; i ++ ) {\n\n\t\t\t\t\tvar object = objects[ i ];\n\n\t\t\t\t\tvar vertices = object.geometry.vertices;\n\t\t\t\t\tvar faces = object.geometry.faces;\n\t\t\t\t\tvar matrixWorld = object.matrixWorld;\n\n\t\t\t\t\tnormalMatrixWorld.getNormalMatrix( matrixWorld );\n\n\t\t\t\t\tfor ( var j = 0, jl = faces.length; j < jl; j ++ ) {\n\n\t\t\t\t\t\tvar face = faces[ j ];\n\n\t\t\t\t\t\tvector.copy( face.normal ).applyMatrix3( normalMatrixWorld ).normalize();\n\n\t\t\t\t\t\toutput += '\\tfacet normal ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\\n';\n\t\t\t\t\t\toutput += '\\t\\touter loop\\n';\n\n\t\t\t\t\t\tvar indices = [ face.a, face.b, face.c ];\n\n\t\t\t\t\t\tfor ( var k = 0; k < 3; k ++ ) {\n\n\t\t\t\t\t\t\tvector.copy( vertices[ indices[ k ] ] ).applyMatrix4( matrixWorld );\n\n\t\t\t\t\t\t\toutput += '\\t\\t\\tvertex ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\\n';\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\toutput += '\\t\\tendloop\\n';\n\t\t\t\t\t\toutput += '\\tendfacet\\n';\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\toutput += 'endsolid exported\\n';\n\n\t\t\t\treturn output;\n\n\t\t\t}\n\n\t\t};\n\n\t}() )\n\n};\n\n\n//# sourceURL=webpack:///./vendor/STLExporter.js?");

/***/ })

/******/ });