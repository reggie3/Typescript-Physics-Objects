/// <reference path="./defs/three/three.d.ts" />


    
    export class PhysicsItem{
        static physicsItemID: number = 0;
        static physicsItems = [];
        physicsItemID: number;
        name: string;
        
        constructor(){
            this.physicsItemID = PhysicsItem.physicsItemID;

            //store this physicsObject in an array for later
            PhysicsItem.physicsItems[this.physicsItemID] = this;
            console.log("Object " + PhysicsItem.physicsItemID + " created.");
            PhysicsItem.physicsItemID ++;
        } 
        
        getItem(id: number){
            return PhysicsItem.physicsItems[id];
        }
        
        public static update(){
           for(var i=0; i<PhysicsItem.physicsItems.length; i++){
               PhysicsItem.physicsItems[i].update();  
           } 
        }
    }
    
    export class Box extends PhysicsItem{
        geometry;
        material;
        mesh;
        body;
        
        constructor(CANNON, THREE, options?) {
            super();
            this.name =  options && options.name;
            
            //create the mesh
            this.geometry = new THREE.BoxGeometry(
                options && options.width || 1, 
                options && options.height || 1,
                 options && options.depth || 1
            ); 
            
            this.material = new THREE.MeshBasicMaterial( { color:  (options && options.color) ? options.color : new THREE.Color("rgb(255, 0, 0)")} );
            this.mesh = new THREE.Mesh(this.geometry, this.material );
            this.mesh.position.set(
                options && options.x || 0, 
                options && options.y || 0,
                options && options.z || 0
            );
            console.log("Box " + this.physicsItemID + " created");
            
           
            var boxShape = new CANNON.Box(new CANNON.Vec3(
                this.geometry.width/2,
                this.geometry.depth/2,
                this.geometry.height/2
            ));

            if(options && options.rigid){
                this.body = new CANNON.Body({ mass: 
                    options && options.mass || 0 
                });
            }
            else{
                this.body = new CANNON.Body({ mass: 
                    options && options.mass || 0 
                });
            }
            this.body.addShape(boxShape);
            this.body.position.set(
                this.mesh.position.x, 
                this.mesh.position.y,
                this.mesh.position.z);
            
            //add theis item to the array of physics items
            PhysicsItem.physicsItems.push(this);
        }
        
        update(){
            this.mesh.position.copy(this.body.position);
            this.mesh.quaternion.copy(this.body.quaternion);  
        }
    }
