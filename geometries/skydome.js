import {vertexSkyDome, fragmentSkyDome} from './shaders/skydomeShaders.js';
import {SphereGeometry, ShaderMaterial, Mesh} from 'three';

export default class Skydome {
    constructor(backgroundTexture){
        this.mesh = this._createSkyDome(backgroundTexture);
    }

    _createSkyDome(backgroundTexture){
        var geometry = new SphereGeometry(17, 60, 40);
        var uniforms = {
            texture: { type: 't', value: backgroundTexture }
        };

        var material = new ShaderMaterial( {
            uniforms:       uniforms,
            vertexShader:   vertexSkyDome(),
            fragmentShader: fragmentSkyDome()
        });

        let skyDome = new Mesh(geometry, material);
        skyDome.scale.set(-1, 1, 1);
        skyDome.rotation.order = 'XZY';
        skyDome.translateY(-2);
        skyDome.renderDepth = 1000.0;
        return skyDome;
    }

    setPosition(vec3){
        this.mesh.translateX(vec3.x);
        this.mesh.translateZ(vec3.z);
    }
}
