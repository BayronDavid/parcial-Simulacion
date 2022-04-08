import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import Particle from './Classes/Particle.js'

// CREATE SCENE AND CAMERA-------------------------------------------------
var container = document.getElementById('canvas');

var canvasWidth = container.offsetWidth;
var canvasHeight = container.offsetHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color (255, 255, 255)

const camera = new THREE.PerspectiveCamera(
  75,
  canvasWidth / canvasHeight,
  0.1,
  100000
  );
camera.position.x = -5000;
camera.position.z = -10000;
camera.position.y = 10000;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);

container.appendChild(renderer.domElement);

// ORBIT CONTROLS -------------------------------------------------
const controls = new OrbitControls( camera, renderer.domElement );

// GRID ----------------------------------------------------------
const size = 100000;
const divisions = 100;

const gridHelper = new THREE.GridHelper( size, divisions );
const gridHelperVertical = new THREE.GridHelper( 50000, 50 );
gridHelperVertical.position.y = 25000
gridHelperVertical.position.z = 10000
gridHelperVertical.rotation.x = Math.PI/2;

scene.add( gridHelper );

//SITUATIONS--------------------------------------------------
var conditions = document.getElementById('conditions');


var particles = []
var count = 0;
// let particle = new Particle(xn, yn, zn, vxn, vyn, vzn, mass, tam, color, krest[x, y, z], suelo)
// null ==> random values by default  

function situation1() {
  particles = []
  count = 0;
    // Se toma el valor 1 para que el lenguaje no tome un valor aleatorio
    // Caída libre de 3 partículas cada una con una posición inicial diferente, color y diferente tamaño, una con rebote con constante de restitución de 0.5, 
    // otra con constante de restitución de 0.8, otra sin rebote, en el piso ubicado en y=-10:

    let particle1 = new Particle(1000, 10000, -1000, 10,   1,   1,   10, null, null, [0.5, 0.5, 0.5],     0);
    let particle2 = new Particle(-1000, 9000, 1000,  10,   1,   1,   10, null, null, [0.8, 0.8, 0.8],     0);
    let particle3 = new Particle(1000, 20000, 1000,  10,   1,   1,   10, null, null, [0   ,  0,   0], -1000);



    particles.push(particle1);
    particles.push(particle2);
    particles.push(particle3);

    scene.add(particles[0].getParticle());
    scene.add(particles[1].getParticle());
    scene.add(particles[2].getParticle());

    conditions.innerHTML = "Caída libre de 3 partículas cada una con una posición inicial diferente, color y diferente tamaño, una con rebote con constante de restitución de 0.5, otra con constante de restitución de 0.8, otra sin rebote, en el piso ubicado en y=-10:"
}

function situation2() {
  // Lanzamiento parabólico desde las coordenadas x=0, y=0, z=20, 
  // velocidades iniciales en x= -20, y=40, z=20. Con rebote en el piso 
  // y=0, y en una pared ubicada en el plano z=100, coeficiente de restitución
  // sólo para eje y con valor de 0.8, y coeficiente de restitución en eje z 
  // de 0.5 tiempo simulación = 10,  paso para el método numérico 0.1.
  scene.add( gridHelperVertical );

  count = 0;
  
    particles = []
                    //Particle(xn, yn, zn,  vxn, vyn,   vzn,  mass, tam, color, krest, suelo, parededZ)
    let particle = new Particle(0, 0, 2000, -200,  400,   200,  10, null, null, [0.8, 0, 0.5], 0,  10000);

    particles.push(particle);

    scene.add(particles[0].getParticle());

    conditions.innerHTML = "Lanzamiento parabólico desde las coordenadas x=0, y=0, z=20, velocidades iniciales en x= -20, y=40, z=20. Con rebote en el piso y=0, y en una pared ubicada en el plano z=100, coeficiente de restitución sólo para eje y con valor de 0.8, y coeficiente de restitución en eje z de 0.5 tiempo simulación = 10,  paso para el método numérico 0.1."
}

function situation3() {
  scene.remove( gridHelperVertical);
  // Tiro parabólico de 3 partículas cada una con una posición inicial diferente, color y diferente tamaño, 
  // una con rebote con constante de restitución de 1,  otra con constante de restitución de 0.5, otra sin rebote, 
  // el piso se ubica en y=5.

  count = 0;
  particles = []
                   //constructor(xn,    yn,     zn,  vxn, vyn,vzn,  mass, tam, color,                       krest,        suelo, parededZ)
    let particle1 = new Particle(-1000, 5000,  1000,   100,  100,   100,  10,    null, new THREE.Color(255, 0, 0), [1 ,  1,   1  ], 500);
    let particle2 = new Particle(1000,  5000,  1000,  -100,  100,   100,  10,    null, new THREE.Color(0, 0, 255), [0.5, 0.5, 0.5], 500);
    let particle3 = new Particle(-1000,  5000, -1000,  -100,  0,    -100,  10,    null, new THREE.Color(0, 255, 0), [0,   0,   0  ], 500);


    particles.push(particle1);
    particles.push(particle2);
    particles.push(particle3);

    scene.add(particles[0].getParticle());
    scene.add(particles[1].getParticle());
    scene.add(particles[2].getParticle());

    conditions.innerHTML ="Tiro parabólico de 3 partículas cada una con una posición inicial diferente, color y diferente tamaño, una con rebote con constante de restitución de 1,  otra con constante de restitución de 0.5, otra sin rebote, el piso se ubica en y=5."
}

// EVENTS ------------------------------



var radioButtonEuler = document.getElementById('radioButtonEuler');
var radioButtonRK = document.getElementById('radioButtonRK');

var situation1Button = document.getElementById('situation1Button');
var situation2Button = document.getElementById('situation2Button');
var situation3Button = document.getElementById('situation3Button');

situation1Button.addEventListener('click', ()=>{
  situation1();
})
situation2Button.addEventListener('click', ()=>{
  situation2();
})
situation3Button.addEventListener('click', ()=>{
  situation3();
})

function animate() {

  for (let i = 0; i < particles.length; i++) {
    if (radioButtonRK.checked){
      particles[i].parabolicShot_RK();
    }
    if(radioButtonEuler.checked){
      particles[i].parabolicShot_Euler();
    }
  }
  
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

export{
  animate
}

