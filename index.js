/**
 * @author hassadee / https://hassadee.com/
 */

/* Global AFRAME */
if (typeof AFRAME === 'undefined') {
	throw new Error('Component attempted to register before AFRAME was available.');
}

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

		/* Buggy one */
		/*
		if (typeof input === 'undefined') {
			console.log("undefined");

			inputObject = this.sceneEl.object3D;
		} else if (input instanceof Array) {
			console.log("Array");

			inputObject = input.map(function (entity) {
				return entity.object3D;
			});
		} else if (input instanceof NodeList) {
			console.log("NodeList");

			inputObject = Array.prototype.slice.call(input).map(function (entity) {
				return entity.object3D;
			});
		} else {
			console.log("input.object3D");

			inputObject = input.object3D;
		}
		*/

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

		/*
		console.log("Breakpoint");
		console.log("inputObject: " + inputObject);
		console.log("input: " + input);
		*/
	}
});

/**
 * @author kovacsv / http://kovacsv.hu/
 * @author mrdoob / http://mrdoob.com/
 * @author mudcube / http://mudcu.be/
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Usage:
 *  var exporter = new THREE.STLExporter();
 *
 *  // second argument is a list of options
 *  var data = exporter.parse( mesh, { binary: true } );
 *
 */

THREE.STLExporter = function () {};

THREE.STLExporter.prototype = {
	constructor: THREE.STLExporter,
	parse: ( function () {
		var vector = new THREE.Vector3();
		var normalMatrixWorld = new THREE.Matrix3();

		return function parse(scene, options) {
			if ( options === undefined ) options = {};

			var binary = options.binary !== undefined ? options.binary : false;

			var objects = [];
			var triangles = 0;

			scene.traverse( function ( object ) {
				if ( object.isMesh ) {
					var geometry = object.geometry;

					if ( geometry.isBufferGeometry ) {
						geometry = new THREE.Geometry().fromBufferGeometry( geometry );
					}

					if ( geometry.isGeometry ) {
						triangles += geometry.faces.length;
						objects.push( {
							geometry: geometry,
							matrixWorld: object.matrixWorld
						} );
					}
				}
			} );

			if ( binary ) {
				var offset = 80; // skip header
				var bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;
				var arrayBuffer = new ArrayBuffer( bufferLength );
				var output = new DataView( arrayBuffer );
				output.setUint32( offset, triangles, true ); offset += 4;

				for ( var i = 0, il = objects.length; i < il; i ++ ) {

					var object = objects[ i ];

					var vertices = object.geometry.vertices;
					var faces = object.geometry.faces;
					var matrixWorld = object.matrixWorld;

					normalMatrixWorld.getNormalMatrix( matrixWorld );

					for ( var j = 0, jl = faces.length; j < jl; j ++ ) {

						var face = faces[ j ];

						vector.copy( face.normal ).applyMatrix3( normalMatrixWorld ).normalize();

						output.setFloat32( offset, vector.x, true ); offset += 4; // normal
						output.setFloat32( offset, vector.y, true ); offset += 4;
						output.setFloat32( offset, vector.z, true ); offset += 4;

						var indices = [ face.a, face.b, face.c ];

						for ( var k = 0; k < 3; k ++ ) {

							vector.copy( vertices[ indices[ k ] ] ).applyMatrix4( matrixWorld );

							output.setFloat32( offset, vector.x, true ); offset += 4; // vertices
							output.setFloat32( offset, vector.y, true ); offset += 4;
							output.setFloat32( offset, vector.z, true ); offset += 4;
						}
						output.setUint16( offset, 0, true ); offset += 2; // attribute byte count
					}
				}
				return output;
			} else {
				var output = '';
				output += 'solid exported\n';

				for ( var i = 0, il = objects.length; i < il; i ++ ) {
					var object = objects[ i ];

					var vertices = object.geometry.vertices;
					var faces = object.geometry.faces;
					var matrixWorld = object.matrixWorld;

					normalMatrixWorld.getNormalMatrix( matrixWorld );

					for ( var j = 0, jl = faces.length; j < jl; j ++ ) {
						var face = faces[ j ];
						vector.copy( face.normal ).applyMatrix3( normalMatrixWorld ).normalize();
						output += '\tfacet normal ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';
						output += '\t\touter loop\n';
						var indices = [ face.a, face.b, face.c ];
						for ( var k = 0; k < 3; k ++ ) {
							vector.copy( vertices[ indices[ k ] ] ).applyMatrix4( matrixWorld );
							output += '\t\t\tvertex ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';
						}
						output += '\t\tendloop\n';
						output += '\tendfacet\n';
					}
				}
				output += 'endsolid exported\n';
				return output;
			}
		};
	}())
};