import * as THREE from 'three';
let OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
let PLYLoader = require("./PLYLoader.js");
let MTLLoader = require('three-mtl-loader');

let Promise = require('es6-promise').Promise;

import 'whatwg-fetch'; //https://github.com/github/fetch

export function loadObjWithMtl(objs_path, obj_filename, mtl_filename){
    let p = new Promise((resolve, reject) => {
        let mtlLoader = new MTLLoader();
        mtlLoader.setPath(objs_path);
        mtlLoader.load(mtl_filename,
                       (materials)=> {
                           materials.preload();
                           console.log(materials.materials.hoverCraft);
                           //materials.materials.hoverCraft.map = null;
                           let objLoader = new THREE.OBJLoader();
                           objLoader.setMaterials(materials);
                           objLoader.setPath(objs_path);
                           objLoader.load(obj_filename,
                                          (model)=>{
                                              resolve(model);
                                          },
                                          (xhr)=>{
                                              console.log(xhr.loaded);
                                          },
                                          (err)=>{ reject(err);}
                                         );
                       },
                       (xhr)=>{
                           console.log(xhr.loaded);
                       },
                       (err)=>{ reject(err);}
                      );
    });
    return p;
}



export function loadTexture(url){
    let p = new Promise((resolve, reject) => {
        let texLoader = new THREE.TextureLoader();
        texLoader.load(url,
                        (tex)=>{ resolve(tex);},
                        (xhr)=>{
                            //console.log(xhr.loaded);
                        },
                        (err)=>{ reject(err);}
                        );
    });
    return p;
}

export function loadPly(url){
    let p = new Promise((resolve, reject) => {
        let plyLoader = new THREE.PLYLoader();
        plyLoader.load(url,
                        (model)=>{ resolve(model);},
                        (xhr)=>{
                            //console.log(xhr.loaded);
                        },
                        (err)=>{ reject(err);}
                        );
    });
   return p;
}

export function loadObj(url){
    let p = new Promise((resolve, reject) => {
        let objLoader = new THREE.OBJLoader();
        objLoader.load(url,
                        (model)=>{ resolve(model);},
                        (xhr)=>{
                            //console.log(xhr.loaded);
                        },
                        (err)=>{ reject(err);}
        );
    });
    return p;
}

export function getArrayBuffer(url){
    let p = new Promise((resolve, reject) => {
        return fetch(url).then(response => {
            if (response.ok) {
                resolve(response.arrayBuffer());
            } else {
                reject(new Error('error'));
            }
        }, error => {
            reject(new Error(error.message));
        });
    });
    return p;
}
