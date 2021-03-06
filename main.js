import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import HelvetikerFontPath from 'three/examples/fonts/helvetiker_regular.typeface.json';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geomotry = new THREE.TorusGeometry(15, 1, 16, 50);
const geomotry2 = new THREE.TorusGeometry(13, 1, 16, 50);
const material = new THREE.MeshStandardMaterial({
  color: '#ff69b4',
});
const torus = new THREE.Mesh(geomotry, material);
const torus2 = new THREE.Mesh(geomotry2, material);

scene.add(torus);
scene.add(torus2);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const textGeometry = new THREE.TextGeometry( 'Cecilie', {
	font: new THREE.Font(HelvetikerFontPath),
	size: 5,
	height: 1,
	curveSegments: 30,
	bevelEnabled: true,
	bevelThickness: 0.5,
	bevelSize: 0.25,
	bevelOffset: 0,
	bevelSegments: 1,
});
var textMaterial = new THREE.MeshPhongMaterial( 
  { color: 0xFF69B4, specular: 0xffffff }
);

var text = new THREE.Mesh( textGeometry, textMaterial );

text.position.set(-10, -2, 0);
scene.add( text );


function addStar() {
  const geomotry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geomotry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x -= 0.003;
  torus2.rotation.y -= 0.0075;
  torus2.rotation.z -= 0.012;

  controls.update();

  renderer.render(scene, camera);
}

animate();