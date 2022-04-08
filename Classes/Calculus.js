export default class Calculus{
    
    constructor(mass, gravity, step){
        this.count  = 0;
        this.mass       = mass      || 1;
        this.gravity    = gravity   || -9.8;
        this.step       = step      || 0.5;
    }
        
    gravityForce(mass){
        this.count++; 
        return this.gravity*mass
    }

    f(p, v, yAxis){
        if(yAxis){
            this.count++; 
            return this.gravityForce(this.mass)
        }
        return 0;
    }
    
    dv(p, v, yAxis){
        this.count++; 
        return this.f(p, v, yAxis)/9.8  //modificación
    }
    
    d(p, v, yAxis){
        this.count++; 
        return v
    }

    getCount(){
        return this.count;
    }
    setCount(count){
        this.count = count;
    }

    euler(p, v, f, yAxis){
        if(f=='dv'){
            this.count++; 
            return v + this.dv(p, v, yAxis)*this.step;
        }else if(f=='d'){
            this.count++; 
            return p + this.d (p, v, yAxis)*this.step;
        }
    }
    RungeKutta(p, v, f, yAxis) {

        if(f=='dv'){
            this.count +=  4; 
            this.k1 = this.step * this.dv(p                 , v                     , yAxis)
            this.k2 = this.step * this.dv(p + 0.5 * this.k1 , v + 0.5 * this.step   , yAxis)
            this.k3 = this.step * this.dv(p + 0.5 * this.k2 , v + 0.5 * this.step   , yAxis)
            this.k4 = this.step * this.dv(p + this.k3       , v + this.step         , yAxis)
            
            return v + (this.k1 + 2 * this.k2 + 2 * this.k3 + this.k4) / 6;
        }else if(f=='d'){
            this.count +=  4; 
            this.k1 = this.step * this.d (p                 , v                     , yAxis)
            this.k2 = this.step * this.d (p + 0.5 * this.k1 , v + 0.5 * this.step   , yAxis)
            this.k3 = this.step * this.d (p + 0.5 * this.k2 , v + 0.5 * this.step   , yAxis)
            this.k4 = this.step * this.d (p + this.k3       , v + this.step         , yAxis)
            
            return p + (this.k1 + 2 * this.k2 + 2 * this.k3 + this.k4) / 6;
        }
    }
}

