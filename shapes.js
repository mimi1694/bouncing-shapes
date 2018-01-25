//set up the scene
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
const light = new THREE.DirectionalLight()

scene.background = (new THREE.Color('white'))
renderer.setSize(3 * window.innerWidth / 4, 3 * window.innerHeight / 4)
document.body.appendChild(renderer.domElement)
camera.position.z = 17
light.position.set(-1, 1, 1)


//-----GEOMETRY VARIABLES------//

let box = new THREE.BoxGeometry(1, 1, 1)
let sphere = new THREE.SphereGeometry(0.5, 32, 32)
let torus = new THREE.TorusGeometry(0.5, 0.25, 32, 32, 2 * Math.PI)

//-----MATERIAL VARIABLES------//

let phong = new THREE.MeshPhongMaterial({
    color: 'pink',
    emissive: 0,
    specular: 0x070707,
    shininess: 100
})
let basic = new THREE.MeshBasicMaterial({
    color: 'pink'
})
let lambert = new THREE.MeshPhongMaterial({
    color: 'pink',
    reflectivity: .5,
    refractionRatio: 1
})

//-----FUNCTIONALITY------//

//make the objects and add them to the scene
let obj, currentShape, currentMesh

currentShape = box
currentMesh = phong
obj = new THREE.Mesh(currentShape, currentMesh)
scene.add(light)
scene.add(obj)

//methods for making the objects move
let bounceControl = false
let up = true
let animate = () => {
    requestAnimationFrame(animate)
    obj.rotation.y += 0.01
    if (bounceControl) {
        obj.rotation.x = 0
        obj.rotation.y = 0
        if (up) {
            obj.translateOnAxis(new THREE.Vector3(0, 1, 0).normalize(), 0.1)
            if (obj.position.y > 3.4) {
                up = false
            }
        }
        else if (!up) {
            obj.translateOnAxis(new THREE.Vector3(0, 1, 0).normalize(), -0.1)
            if (obj.position.y < -3.4) {
                up = true
            }
        }
        else {
            obj.position.set(0, 0, 0)
        }
    }
    renderer.render(scene, camera)
}

window.onload = () => {
    document.getElementById('shape-form').onchange = (evt) => {
        switch (evt.target.value) {
            case 'box':
                currentShape = box
                break
            case 'sphere':
                currentShape = sphere
                break
            case 'torus':
                currentShape = torus
                break
            default:
                currentShape = box
                break
        }
        obj.geometry = currentShape
        obj.geometry.buffersNeedUpdate = true
    }

    document.getElementById('mesh-form').onchange = (evt) => {
        switch (evt.target.value) {
            case 'phong':
                currentMesh = phong
                break
            case 'basic':
                currentMesh = basic
                break
            case 'lambert':
                currentMesh = lambert
                break
            default:
                currentMesh = box
                break
        }
        obj.material = currentMesh
        obj.material.needsUpdate = true
    }

    let bounce = document.getElementById('bounce')
    bounce.innerHTML = 'BOUNCE!'
    bounce.onclick = () => {
        if (bounceControl === false) {
            bounceControl = true
            bounce.innerHTML = 'STOP'
        }
        else {
            bounceControl = false
            bounce.innerHTML = 'BOUNCE!'
        }
    }
    animate()
}
