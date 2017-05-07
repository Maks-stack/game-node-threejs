/* eslint-disable no-unused-vars*/
import * as THREE from "three"

export default class Game {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(70, 0, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.object3D = this.create3DObject()
    this.light = this.createLight()

    this.init()

    window.addEventListener("resize", this.onWindowResize.bind(this), false)
    document.body.appendChild(this.renderer.domElement)
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  init() {
    this.camera.position.z = 5
    this.animate()
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.object3D.rotation.x += 0.1
    this.object3D.rotation.z += 0.1
    this.renderer.render(this.scene, this.camera)
  }

  create3DObject() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    return cube
  }
  createLight() {
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaa, 0x000000, 0.9)
    this.scene.add(hemisphereLight)
    return hemisphereLight
  }
}
