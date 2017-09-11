import * as THREE from 'three';
export default class Plane {
    constructor (floorTexture, x, z) {
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	      floorTexture.repeat.set(x, z);
        let geometry = new THREE.PlaneBufferGeometry( x, z, x, x );
        let material = new THREE.MeshPhongMaterial(
            { map: floorTexture, side: THREE.DoubleSide, color: 0xe6e6e6, wireframe:false } );
        this.mesh = new THREE.Mesh( geometry, material );

        //this translation position the plane at the center of the level
        this.mesh.translateZ(x/2 - 0.5);
        this.mesh.translateX(z/2 - 0.5);

        //rotate the plane horizontally
        this.mesh.rotation.x += -Math.PI/2;
        this.mesh.receiveShadow = true;
    }

    getMesh() {
       return this.mesh;
    }
}
