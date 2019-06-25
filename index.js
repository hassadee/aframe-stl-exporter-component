/**
 * @author hassadee / https://hassadee.com/
 */

/* Global AFRAME */
if (typeof AFRAME === 'undefined') {
	throw new Error('Component attempted to register before AFRAME was available.');
}

require('./vendor/STLExporter');

/**
* STL Exporter component for A-Frame.
*/
AFRAME.registerSystem('stl-exporter', {
	schema: {
		verbose: { default: false }
	},

	multiple: false,

	init: function () {
		this.exporter = new THREE.STLExporter();
	},

	export: function (input, options) {
		console.log("export");

		var inputObject;
		var link = document.createElement('a');

		if (typeof input === 'undefined') {
			inputObject = this.sceneEl.object3D;
		} else {
			inputObject = input.object3D;
		}

		function save(blob, filename) {
			link.href = URL.createObjectURL(blob);
			link.download = filename || 'data.json';
			link.dispatchEvent(new MouseEvent( 'click' ));
		}

		function saveArrayBuffer(buffer, filename) {
			save(new Blob([ buffer ], { type: 'application/octet-stream' }), filename);
		}

		function saveString(text, filename) {
			save(new Blob([ text ], { type: 'text/plain' }), filename);
		}

		if (options && options.binary === true) {
			saveArrayBuffer(this.exporter.parse(inputObject, { binary: true }), 'model-binary.stl');
		} else {
			saveString(this.exporter.parse(inputObject), 'model-ascii.stl');
		}
	}
});