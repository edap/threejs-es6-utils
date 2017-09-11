import {Raycaster} from 'three';
// if performance problems will arrise, try http://www.cannonjs.org/

export default class CollisionDetector{
    constructor(objectMesh, collidableObjectsMeshes){
        this.obj = objectMesh;
        this.collidable = collidableObjectsMeshes;
    }

    hit(){
        let originPoint = this.obj.position.clone();
        for (let vertexIndex = 0; vertexIndex < this.obj.geometry.vertices.length; vertexIndex++) {
            let localVertex = this.obj.geometry.vertices[vertexIndex].clone();
            let globalVertex = localVertex.applyMatrix4( this.obj.matrix );
            let directionVector = globalVertex.sub( this.obj.position );
            let ray = new Raycaster( originPoint, directionVector.clone().normalize() );
            let collisionResults = ray.intersectObjects( this.collidable );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
                return true;
            } else {
                return false;
            }
	      }
    }
}
