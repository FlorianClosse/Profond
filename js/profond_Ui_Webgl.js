function webGLStart(url, width, height) {

    var mesh, renderer, canvas;


    canvas = document.createElement('canvas');
    canvas.id = "canvas-container";
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, -100, 50);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);


    $("canvas-container").append(renderer.domElement)
    var geometry = new THREE.Geometry();

    $.getJSON(url, function(data) {

        var items = [];

        var vertices = {};
        var indices = {};
        vertices = data['vertices'];
        indices = data['indices'];
        var i = 0;

        while (i < vertices.length) {

            geometry.vertices.push(new THREE.Vector3(vertices[i] * 100, vertices[i + 1] * 100, vertices[i + 2] * 100));
            i += 3;
        }
        var i = 0;
        var cpt_face = 0;
        var face;

        while (i < indices.length) {
            if (cpt_face >= 152395 && cpt_face < (20019 + 152395)) {
                face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
                face.color.setHex(0x404040);
                geometry.faces.push(face);

            }
            if (cpt_face >= 172414 && cpt_face < (56 + 172414)) {
                face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
                face.color.setHex(0x20FF00);
                geometry.faces.push(face);

            }
            if (cpt_face >= 173082 && cpt_face < (843 + 173082)) {
                face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
                face.color.setHex(0xF02000);
                geometry.faces.push(face);
            }
            i += 3;
            cpt_face++;
        }

        geometry.computeFaceNormals();

        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, side: THREE.DoubleSide, transparent: true, opacity: 0.5, depthWrite: false});

        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh, camera);

        cameraControls = new THREE.TrackballControls(camera, renderer.domElement);

        render();

    });


    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);

        cameraControls.update();

        renderer.render(scene, camera);


    }
}
