import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap"
import "./style.css"

//Velicine
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Scena
const scene = new THREE.Scene();

//Geometrija
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness:0.5
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Kamera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

//Svijetlo
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
light.intensity=1.6
scene.add(light)

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Kontrole
const controls=new OrbitControls(camera, canvas)
controls.enableDamping= true 
controls.enablePan=false
controls.enableZoom=false
controls.autoRotate=true
controls.autoRotateSpeed=4

//Responzivnost
window.addEventListener('resize', () => {
    size.width = window.innerWidth
    size.height = window.innerHeight

    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
})

//Trajno renderanje scene
const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()

//Gsap animacije
const tl = gsap.timeline({defaults: {duration:1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y:"-100%"}, {y:"0%"})
tl.fromTo('.heading', {opacity: 0}, {opacity:1})

//Animacija za boje
let mouseDown=false
let color=[]
window.addEventListener('mousedown', ()=>(mouseDown=true))
window.addEventListener('mouseup', ()=>(mouseDown=false))
window.addEventListener('mousemove', (e)=>{
    if(mouseDown){
        color=[
            Math.round((e.pageX/size.width) * 255),
            Math.round((e.pageY/size.width) * 255),
            140,
        ]
        //Animacija
        let newColor=new THREE.Color(`rgb(${color.join(",")})`)
        gsap.to(mesh.material.color, {r:newColor.r, g:newColor.g, b:newColor.b})
    }
})