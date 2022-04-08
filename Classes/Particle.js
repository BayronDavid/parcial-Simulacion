import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import Calculus from './Calculus.js'

export default class Particle{
    constructor(xn, yn, zn, vxn, vyn, vzn, mass, tam, color, krest, suelo, paredeZ){
        this.particle = null;
        this.xn = xn  || Math.floor(Math.random() * (100-0)+0); 
        this.yn = yn  || Math.floor(Math.random() * (100-0)+0); 
        this.zn = zn  || Math.floor(Math.random() * (100-0)+0); 
        this.vxn= vxn || Math.floor(Math.random() * (100-0)+0); 
        this.vyn= vyn || Math.floor(Math.random() * (200-0)+0); 
        this.vzn= vzn || Math.floor(Math.random() * (100-0)+0); 

        this.mass  = mass  || Math.floor(Math.random() * (100-1)+1);
        this.krest = krest || [0, 0, 0];

        this.color = color  || new THREE.Color( 0xffffff ).setHex( Math.random() * 0xffffff );
        this.tam   = tam    || Math.floor(Math.random() * (500-100)+100);
        
        this.suelo   = suelo    || 0;
        this.paredeZ = paredeZ  || null

        this.calculus = new Calculus(this.mass, this.gravity, null);
        this.count = this.calculus.getCount();      
        this.newParticle();
    }

    getCount(){
        return this.calculus.getCount();
    }

    setParticle(particle){
        this.particle = particle;
        this.updatePosition()
    }

    getParticle(){
        return this.particle;
    }
    
    newParticle(){
        this.calculus.setCount(this.calculus.getCount()  + 1);
        this.geometry = new THREE.SphereGeometry(this.tam,32,16);
        this.material = new THREE.MeshBasicMaterial({color : this.color});
        this.setParticle(new THREE.Mesh(this.geometry, this.material))
    }

    updatePosition(){
        this.calculus.setCount(this.calculus.getCount()  + 3);
        this.particle.position.x = this.xn;
        this.particle.position.y = this.yn;
        this.particle.position.z = this.zn;
    }

    detectCollision(suelo){
        this.suelo = suelo || 0;
        if(this.yn <= this.suelo){
            this.yn    =  this.suelo
            this.vxn   =  this.krest[0] * this.vxn 
            this.vyn   = -this.krest[1] * this.vyn 
            this.vzn   =  this.krest[2] * this.vzn 
        }
        if(this.paredeZ && this.zn >= this.paredeZ){
            console.log('asda', this.paredes);
            this.vxn   =  this.krest[0] * this.vxn 
            this.vzn   =  -this.krest[2] * this.vzn
        }
        this.updatePosition()
    }

    parabolicShot_Euler(){
        this.calculus.setCount(this.calculus.getCount()  + 6);
        this.vxn = this.calculus.euler(this.xn, this.vxn, 'dv', false);
        this.vyn = this.calculus.euler(this.yn, this.vyn, 'dv', true);
        this.vzn = this.calculus.euler(this.zn, this.vzn, 'dv', false);
        this.xn  = this.calculus.euler(this.xn, this.vxn, 'd', false);
        this.yn  = this.calculus.euler(this.yn, this.vyn, 'd', true);
        this.zn  = this.calculus.euler(this.zn, this.vzn, 'd', false);

        this.detectCollision(this.suelo);
    }
    
    parabolicShot_RK(){
        this.calculus.setCount(this.calculus.getCount()  + 6);
        this.vxn = this.calculus.RungeKutta(this.xn, this.vxn, 'dv', false);
        this.vyn = this.calculus.RungeKutta(this.yn, this.vyn, 'dv', true);
        this.vzn = this.calculus.RungeKutta(this.zn, this.vzn, 'dv', false);
        this.xn  = this.calculus.RungeKutta(this.xn, this.vxn, 'd', false);
        this.yn  = this.calculus.RungeKutta(this.yn, this.vyn, 'd', true);
        this.zn  = this.calculus.RungeKutta(this.zn, this.vzn, 'd', false);

        this.detectCollision(this.suelo);
    }
}