export function checkCollision(obj1, obj2){
    //Cordinates and size of two objects. Last one is for tolerance so they can intersect a little
    return obj1.x+obj1.WIDTH>=obj2.x&&obj1.x<=obj2.x+obj2.WIDTH&&obj1.y+obj1.HEIGHT>=obj2.y&&obj1.y<=obj2.y+obj2.HEIGHT
}