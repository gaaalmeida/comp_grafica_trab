let camera, scene, renderer, controls

const params = {
    auto_rotation: true,
    rotation_speed: 2
}

const init = () => {
    renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setClearColor( 0xffffff )
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 )
    camera.position.set( -1.5, 2.5, 3.0 )

    controls = new THREE.OrbitControls( camera, renderer.domElement )
    controls.autoRotate = true
    controls.autoRotateSpeed = params.rotation_speed
    controls.minDistance = 2
    controls.maxDistance = 10
    controls.enablePan = false

    const light = new THREE.HemisphereLight( 0xffffff, 0x080808, 1.5 )
    light.position.set( -1.25, 1, 1.25 )
    light.castShadow = true
    scene.add( light )

    const loader = new THREE.TextureLoader()
    const texture = loader.load( "./assets/logo-principal.png" )

    const geometry = new THREE.BoxGeometry( 1, 1, 1 )
    geometry.clearGroups()
    geometry.addGroup(0, Infinity, 0)
    geometry.addGroup(0, Infinity, 1)

    const material_texture = new THREE.MeshBasicMaterial( {
        transparent: true,
        map: texture
    } )

    const material_color = new THREE.MeshBasicMaterial( {
        color: 0xf1f1f1
    } )

    const materials = [ material_color, material_texture ]
    const cube = new THREE.Mesh( geometry, materials )

    scene.add(cube)

    animate()

    // GUI
    const gui = new lil.GUI()

    gui.add( params, 'auto_rotation' ).name( 'Auto Rotation' ).onChange( () => {
        controls.autoRotate = true
        animate()
    } )

    gui.add ( params, 'rotation_speed' ).name ( 'Rotation Speed' ).onChange( () => {
        controls.autoRotateSpeed = params.rotation_speed
    } )

    // Events
    window.addEventListener( 'resize', onWindowResize )
    controls.addEventListener( 'change', render )
}

const animate = () => {
    if ( params.auto_rotation === true ) {
        requestAnimationFrame( animate )
        controls.update()

        render()
    }
}

const render = () => {
    renderer.render( scene, camera )
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize( window.innerWidth, window.innerHeight )

    render()
}

init()
render()