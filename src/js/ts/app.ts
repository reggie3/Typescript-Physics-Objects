/// <reference path="./defs/three/three.d.ts" />
/// <reference path="./defs/cannon/cannon.d.ts" />
/// <reference path="./gameObject.ts" />
/// <reference path="./gameScene.ts" />
/// <reference path="./physicsItem.ts" />


import * as $ from "jquery";
import * as _ from "underscore";
import * as THREE from "three";
import * as CANNON from "cannon";
import GameObject = require('./gameObject');
import GameScene = require('./gameScene');
import PhysicsItem = require('./physicsItem');

var CANNON;
var game;
var dt = 1 / 60;

$(() => {
    console.log("jquery & underscore loaded1");

    createGame();
});

function createGame(){
    game = new GameObject.Game(CANNON, THREE);
    var scene = new GameScene.Scene(THREE);
    var box = new PhysicsItem.Box(CANNON, THREE,
    {
        width: 1.5,
        height: 2.5,
        z: 8,
        color: new THREE.Color("rgb(255, 255, 0)"),
        mass: 10,
        name: "yellow box.",
        rigid: true
    });
    scene.add(box);
    game.addWorld(box.body);
    
    var redBox = new PhysicsItem.Box(CANNON, THREE,
    {
        width: 1.5,
        height: 2.5,
        z: 8,
        x: 2,
        color: new THREE.Color("rgb(255, 0, 0)"),
        mass: 10,
        name: "red box",
        rigid: true
    });
    scene.add(redBox);
    game.addWorld(redBox.body);
    
    var ground = new PhysicsItem.Box(CANNON, THREE, {
       width: 20,
       height: .5,
       depth: 20,
       x: 0,
       y: -10,
       z: 0,
       color: new THREE.Color("rgb(0,255,0)"),
       name: "green ground",
       mass: 0,
       rigid: true
    });
    scene.add(ground);
    game.addWorld(ground.body);

    scene.positionCamera(null,null,40);
    var render = function () {
        requestAnimationFrame( render );
        game.world.step(dt);
        PhysicsItem.PhysicsItem.update();
        game.render(scene); 
    };
    
    render();
}

  
