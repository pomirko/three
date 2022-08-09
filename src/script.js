import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const cubeGeometry = new THREE.BoxGeometry( .5, .5, .5 );
const sphereGeometry = new THREE.SphereGeometry(.5);
const coneGeometry = new THREE.ConeGeometry(.5, .5)
// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

// Mesh
// const sphere = new THREE.Mesh(geometry,material)
const cube = new THREE.Mesh(cubeGeometry, material)
const cone = new THREE.Mesh(coneGeometry, material)
const sphere = new THREE.Mesh(sphereGeometry, material)
// scene.add(sphere)
// scene.add(cone)

// scene.add(cube)
// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

function randomPosition (min, max) {
    return Math.random() * (max - min + 1) + min;
};
const modelList = document.getElementsByClassName('models-list')[0]
const create = () => {
    const typeOgGeometry = document.getElementsByClassName('class-geometry')[0].value
    const customSize = document.getElementsByClassName('input-size')[0].value
    function appendObjInModelList (newObj) {
        const li = document.createElement("li")
        console.log(newObj)
        li.innerHTML =`${newObj.uuid} <button class="delete-model">X</button>`
        li.id = newObj.uuid
        modelList.appendChild(li)
    }
    switch (typeOgGeometry) {
        case 'cube' : {
            const newObjGeom = new THREE.BoxGeometry(0.1*customSize,0.1*customSize,0.1*customSize)
            const newObj = new THREE.Mesh(newObjGeom, material)
            newObj.position.set(randomPosition(-1, 1), randomPosition(-1, 1), randomPosition(-1, 1))
            appendObjInModelList(newObj)
            return scene.add(newObj)
        }
        case 'sphere' : {
            const newObjGeom = new THREE.SphereGeometry(0.1*customSize)
            const newObj = new THREE.Mesh(newObjGeom, material)
            newObj.position.set(randomPosition(-1, 1), randomPosition(-1, 1), randomPosition(-1, 1))
            appendObjInModelList(newObj)
            return scene.add(newObj)
        }
        case 'cone' : {
            const newObjGeom = new THREE.ConeGeometry(0.1*customSize,0.1*customSize)
            const newObj = new THREE.Mesh(newObjGeom, material)
            newObj.position.set(randomPosition(-1, 1), randomPosition(-1, 1), randomPosition(-1, 1))
            appendObjInModelList(newObj)
            return scene.add(newObj)
        }
    }
    
}
document.getElementsByClassName('create-btn')[0].addEventListener('click', create)
document.getElementsByClassName('models-list')[0].addEventListener('click', event => {
    // document.getElementById().remove()
})
renderer.render(scene, camera)