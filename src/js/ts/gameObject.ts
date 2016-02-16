/// <reference path="./defs/three/three.d.ts" />

export class Game {
    name: string;
    state: string;
    renderer;
    world;  //the physics world
    CANNON;
    THREE;

    constructor(CANNON, THREE) {
        this.CANNON = CANNON;
        this.THREE = THREE;
        //init renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
            
        //init physics world
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0); // m/s²
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 5;
        this.world.defaultContactMaterial.contactEquationStiffness = 1e6;
        this.world.defaultContactMaterial.contactEquationRelaxation = 10;

        //console.log("new world created.");
        //console.log("new Game created");
    }

    render(scene) {
        this.renderer.render(scene.threeScene, scene.camera);
    }

    addWorld(body) {
        this.world.add(body)
    }
}
    
//an item in the game.  meant to be a superclass for actual game objects
export class GameItem {
    static gameItemID: number = 0;
    static gameItems = [];
    gameObjectID: number;

    constructor() {
        this.gameObjectID = GameItem.gameItemID;

        //store this gameObject in an array for later
        GameItem.gameItems[this.gameObjectID] = this;
        console.log("Object " + GameItem.gameItemID + " created.");
        GameItem.gameItemID++;
    }

    getItem(id: number) {
        return GameItem.gameItems[id];
    }
}    

