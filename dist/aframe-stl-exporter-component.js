/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * @author hassadee / https://hassadee.com/\n */\n\n/* Global AFRAME */\nif (typeof AFRAME === 'undefined') {\n\tthrow new Error('Component attempted to register before AFRAME was available.');\n}\n\nconst STLExporter = (__webpack_require__(/*! ./vendor/STLExporter */ \"./vendor/STLExporter.js\").STLExporter);\n\n/**\n* STL Exporter component for A-Frame.\n*/\nAFRAME.registerSystem('stl-exporter', {\n\tschema: {\n\t\tverbose: { default: false }\n\t},\n\n\tmultiple: false,\n\n\tinit: function () {\n\t\tthis.exporter = new STLExporter();\n\t},\n\n\texport: function (input, options) {\n\t\tvar inputObject;\n\t\tvar link = document.createElement('a');\n\n\t\tif (typeof input === 'undefined') {\n\t\t\tinputObject = this.sceneEl.object3D;\n\t\t} else {\n\t\t\tinputObject = input.object3D;\n\t\t}\n\n\t\tfunction save(blob, filename) {\n\t\t\tlink.href = URL.createObjectURL(blob);\n\t\t\tlink.download = filename || 'data.json';\n\t\t\tlink.dispatchEvent(new MouseEvent( 'click' ));\n\t\t}\n\n\t\tfunction saveArrayBuffer(buffer, filename) {\n\t\t\tsave(new Blob([ buffer ], { type: 'application/octet-stream' }), filename);\n\t\t}\n\n\t\tfunction saveString(text, filename) {\n\t\t\tsave(new Blob([ text ], { type: 'text/plain' }), filename);\n\t\t}\n\n\t\tif (options && options.binary === true) {\n\t\t\tsaveArrayBuffer(this.exporter.parse(inputObject, { binary: true }), 'model-binary.stl');\n\t\t} else {\n\t\t\tsaveString(this.exporter.parse(inputObject), 'model-ascii.stl');\n\t\t}\n\t}\n});\n\n//# sourceURL=webpack://aframe-stl-exporter-component/./index.js?");

/***/ }),

/***/ "./vendor/STLExporter.js":
/*!*******************************!*\
  !*** ./vendor/STLExporter.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   STLExporter: () => (/* binding */ STLExporter)\n/* harmony export */ });\n//import { Vector3 } from 'three';\n\n/**\n * Usage:\n *  const exporter = new STLExporter();\n *\n *  // second argument is a list of options\n *  const data = exporter.parse( mesh, { binary: true } );\n *\n */\n\nclass STLExporter {\n\n\tparse( scene, options = {} ) {\n\n\t\toptions = Object.assign( {\n\t\t\tbinary: false\n\t\t}, options );\n\n\t\tconst binary = options.binary;\n\n\t\t//\n\n\t\tconst objects = [];\n\t\tlet triangles = 0;\n\n\t\tscene.traverse( function ( object ) {\n\n\t\t\tif ( object.isMesh ) {\n\n\t\t\t\tconst geometry = object.geometry;\n\n\t\t\t\tconst index = geometry.index;\n\t\t\t\tconst positionAttribute = geometry.getAttribute( 'position' );\n\n\t\t\t\ttriangles += ( index !== null ) ? ( index.count / 3 ) : ( positionAttribute.count / 3 );\n\n\t\t\t\tobjects.push( {\n\t\t\t\t\tobject3d: object,\n\t\t\t\t\tgeometry: geometry\n\t\t\t\t} );\n\n\t\t\t}\n\n\t\t} );\n\n\t\tlet output;\n\t\tlet offset = 80; // skip header\n\n\t\tif ( binary === true ) {\n\n\t\t\tconst bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;\n\t\t\tconst arrayBuffer = new ArrayBuffer( bufferLength );\n\t\t\toutput = new DataView( arrayBuffer );\n\t\t\toutput.setUint32( offset, triangles, true ); offset += 4;\n\n\t\t} else {\n\n\t\t\toutput = '';\n\t\t\toutput += 'solid exported\\n';\n\n\t\t}\n\n\t\tconst vA = new THREE.Vector3();\n\t\tconst vB = new THREE.Vector3();\n\t\tconst vC = new THREE.Vector3();\n\t\tconst cb = new THREE.Vector3();\n\t\tconst ab = new THREE.Vector3();\n\t\tconst normal = new THREE.Vector3();\n\n\t\tfor ( let i = 0, il = objects.length; i < il; i ++ ) {\n\n\t\t\tconst object = objects[ i ].object3d;\n\t\t\tconst geometry = objects[ i ].geometry;\n\n\t\t\tconst index = geometry.index;\n\t\t\tconst positionAttribute = geometry.getAttribute( 'position' );\n\n\t\t\tif ( index !== null ) {\n\n\t\t\t\t// indexed geometry\n\n\t\t\t\tfor ( let j = 0; j < index.count; j += 3 ) {\n\n\t\t\t\t\tconst a = index.getX( j + 0 );\n\t\t\t\t\tconst b = index.getX( j + 1 );\n\t\t\t\t\tconst c = index.getX( j + 2 );\n\n\t\t\t\t\twriteFace( a, b, c, positionAttribute, object );\n\n\t\t\t\t}\n\n\t\t\t} else {\n\n\t\t\t\t// non-indexed geometry\n\n\t\t\t\tfor ( let j = 0; j < positionAttribute.count; j += 3 ) {\n\n\t\t\t\t\tconst a = j + 0;\n\t\t\t\t\tconst b = j + 1;\n\t\t\t\t\tconst c = j + 2;\n\n\t\t\t\t\twriteFace( a, b, c, positionAttribute, object );\n\n\t\t\t\t}\n\n\t\t\t}\n\n\t\t}\n\n\t\tif ( binary === false ) {\n\n\t\t\toutput += 'endsolid exported\\n';\n\n\t\t}\n\n\t\treturn output;\n\n\t\tfunction writeFace( a, b, c, positionAttribute, object ) {\n\n\t\t\tvA.fromBufferAttribute( positionAttribute, a );\n\t\t\tvB.fromBufferAttribute( positionAttribute, b );\n\t\t\tvC.fromBufferAttribute( positionAttribute, c );\n\n\t\t\tif ( object.isSkinnedMesh === true ) {\n\n\t\t\t\tobject.applyBoneTransform( a, vA );\n\t\t\t\tobject.applyBoneTransform( b, vB );\n\t\t\t\tobject.applyBoneTransform( c, vC );\n\n\t\t\t}\n\n\t\t\tvA.applyMatrix4( object.matrixWorld );\n\t\t\tvB.applyMatrix4( object.matrixWorld );\n\t\t\tvC.applyMatrix4( object.matrixWorld );\n\n\t\t\twriteNormal( vA, vB, vC );\n\n\t\t\twriteVertex( vA );\n\t\t\twriteVertex( vB );\n\t\t\twriteVertex( vC );\n\n\t\t\tif ( binary === true ) {\n\n\t\t\t\toutput.setUint16( offset, 0, true ); offset += 2;\n\n\t\t\t} else {\n\n\t\t\t\toutput += '\\t\\tendloop\\n';\n\t\t\t\toutput += '\\tendfacet\\n';\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction writeNormal( vA, vB, vC ) {\n\n\t\t\tcb.subVectors( vC, vB );\n\t\t\tab.subVectors( vA, vB );\n\t\t\tcb.cross( ab ).normalize();\n\n\t\t\tnormal.copy( cb ).normalize();\n\n\t\t\tif ( binary === true ) {\n\n\t\t\t\toutput.setFloat32( offset, normal.x, true ); offset += 4;\n\t\t\t\toutput.setFloat32( offset, normal.y, true ); offset += 4;\n\t\t\t\toutput.setFloat32( offset, normal.z, true ); offset += 4;\n\n\t\t\t} else {\n\n\t\t\t\toutput += '\\tfacet normal ' + normal.x + ' ' + normal.y + ' ' + normal.z + '\\n';\n\t\t\t\toutput += '\\t\\touter loop\\n';\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction writeVertex( vertex ) {\n\n\t\t\tif ( binary === true ) {\n\n\t\t\t\toutput.setFloat32( offset, vertex.x, true ); offset += 4;\n\t\t\t\toutput.setFloat32( offset, vertex.y, true ); offset += 4;\n\t\t\t\toutput.setFloat32( offset, vertex.z, true ); offset += 4;\n\n\t\t\t} else {\n\n\t\t\t\toutput += '\\t\\t\\tvertex ' + vertex.x + ' ' + vertex.y + ' ' + vertex.z + '\\n';\n\n\t\t\t}\n\n\t\t}\n\n\t}\n\n}\n\n\n\n//# sourceURL=webpack://aframe-stl-exporter-component/./vendor/STLExporter.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;