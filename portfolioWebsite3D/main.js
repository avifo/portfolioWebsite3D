import './style.css';
import * as THREE from 'three';// THREE.js library
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; //used to load in custom models
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; //used to let the camera orbit around a target


const scene = new THREE.Scene(); //container for the 3D models

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //camera for viewing, first argument is the field of view 2nd one is aspect ratio taken by dividing the width by the height of the window last 2 ardument are the view frustrum 

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
}); //puts the canvas on the html element with the id "bg"

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(8, 3, 128, 100);
const meterial = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true });
const torus = new THREE.Mesh(geometry, meterial);

//const loader = new GLTFLoader();

//loader.load('crutchwall.glb', function (gltf) {
//    //scene.add(gltf.scene);
//    const crutchMesh = gltf.scene.children.find((child) => child.name === "crutchwall");
//    crutchMesh.scale.set(crutchMesh.scale.x * 0.01, crutchMesh.scale.y * 0.01, crutchMesh.scale.z * 0.01);
//    crutchMesh.position.x = -2;
//    crutchMesh.rotation.x += 0.05;
//    crutchMesh.rotation.y += 0.075;
//    crutchMesh.rotation.z += 0.05;
//    scene.add(crutchMesh);
//
//    //gltf.animations; // Array<THREE.AnimationClip>
//    //gltf.scene; // THREE.Group
//    //gltf.scenes; // Array<THREE.Group>
//    //gltf.cameras; // Array<THREE.Camera>
//    //gltf.asset; // Object
//}
//);

const pointLight = new THREE.PointLight(0xffffff); //point light in the scene
pointLight.position.set(10, 10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff); //ambient light within the scene
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight); // helpers to find where the point light is positioned
const gridHelper = new THREE.GridHelper(200, 50); // grid line
//scene.add(lightHelper, gridHelper); //adds those to the scene

//const controls = new OrbitControls(camera, renderer.domElement); //system to control the camera 

function addStarBlue() { // function that populates the scene with stars 
    const geometry = new THREE.SphereGeometry(0.25, 24, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0xBED6DE, wireframe: true })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);

}

function addStarYellow() { // function that populates the scene with stars
    const geometry = new THREE.SphereGeometry(0.25, 24, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff70, wireframe: true })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);

}

function addStarRed() { // function that populates the scene with stars
    const geometry = new THREE.SphereGeometry(0.25, 24, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0xff7070, wireframe: true })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); //creates x y z position of star

    star.position.set(x, y, z);
    scene.add(star);

}

Array(100).fill().forEach(addStarBlue); // adds blue stars
Array(100).fill().forEach(addStarYellow); // adds yellow stars
Array(100).fill().forEach(addStarRed); // adds red stars

//const spaceTexture = new THREE.TextureLoader().load("space.jpg")
//scene.background = spaceTexture;

//moon
//const moonTexture = new THREE.TextureLoader().load('moon.jpg');
//const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0xff6347, wireframe: true
    })
);

scene.add(moon);
scene.add(torus);

moon.position.z = 30;
moon.position.setX(-10);


function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}


function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    renderer.render(scene, camera);
}
document.body.onscroll = moveCamera;
animate()