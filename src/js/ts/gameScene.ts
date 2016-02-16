/// <reference path="./defs/three/three.d.ts" />


    
    //a game scene.  It will have the camera, lights, and scene graph
    export class Scene{
        name: string;
        sequence: string;
        camera;
        lights = [];
        static sceneID: number = 0;
        static scenes = [];
        threeScene;
        THREE;
        
        constructor(THREE, name?: string){
            this.THREE = THREE;
            if(name){
                this.name = name;
            }
            
            this.threeScene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 
            console.log("scene " + Scene.sceneID  + " created");
            Scene.scenes.push(this);
            Scene.sceneID++;
        }
        
        add(item){
            this.threeScene.add(item.mesh);
        }
        
        positionCamera(x?:number, y?:number, z?:number){
            if(x)
                this.camera.position.x = x;
            if(y)
                this.camera.position.y = y;
            if(z)
                this.camera.position.z = z;
        }
    }
    

