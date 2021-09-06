import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import BasicRubik from './object/Rubik'

/**
 * 主函数
 */
export default class Main {
  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.devicePixelRatio = window.devicePixelRatio
    this.viewCenter = new THREE.Vector3(0, 0, 0)

    this.initRender()
    this.initCamera()
    this.initScene()
    this.initLight()
    this.initObject()
    this.render()
  }

  initRender() {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(this.width, this, this.height)
    this.renderer.setClearColor(0xffffff, 1)
    this.renderer.setPixelRatio(this.devicePixelRatio)
    document.body.append(this.renderer.domElement)
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1500)
    this.camera.position.set(0, 0, 300 / this.camera.aspect)
    this.camera.up.set(0, 1, 0)
    this.camera.lookAt(this.viewCenter)

    this.orbitController = new OrbitControls(this.camera, this.renderer.domElement)
    this.orbitController.enbleZoom = false
    this.orbitController.rotateSpeed = 2
    this.orbitController.target = this.viewCenter
  }

  initScene() {
    this.scene = new THREE.Scene()
  }

  initLight() {
    this.light = new THREE.AmbientLight(0xfefefe)
    this.scene.add(this.light)
  }

  initObject() {
    const rubik = new BasicRubik(this)
    rubik.model()
  }

  render() {
    this.renderer.clear()
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}
