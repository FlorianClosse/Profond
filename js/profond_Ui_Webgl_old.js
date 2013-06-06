function webGLStart(url, element, width, height) {
    $.getJSON(url, function(data) {
        var mesh;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
        camera.position.set(0, -100, 50);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        element.append(renderer.domElement);
        var geometry = new THREE.Geometry();
        var vertices = {};
        var indices = {};
        var i = 0;
        var cpt_face = 0;
        var face;
        var cameraControls;
        console.debug(data);
        vertices = data['vertices'];
        indices = data['indices'];
        while (i < vertices.length) {
            geometry.vertices.push(new THREE.Vector3(vertices[i] * 100, vertices[i + 1] * 100, vertices[i + 2] * 100));
            i += 3;
        }
        var i = 0;
        while (i < indices.length) {
            if (cpt_face >= 152395 && cpt_face < (20019 + 152395)) {
                //Add Vertice att Geometry
                face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
                face.color.setHex(0xeeeeee);
                geometry.faces.push(face);

            }
            if (cpt_face >= 172414 && cpt_face < (56 + 172414)) {
                //Add Vertice att Geometry
                face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
                face.color.setHex(0x20FF00);
                geometry.faces.push(face);

            }
            if (cpt_face >= 172470 && cpt_face < (612 + 172470)) {
                //Add Vertice att Geometry
                face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
                face.color.setHex(0x2020FF);
                geometry.faces.push(face);

            }
            if (cpt_face >= 173082 && cpt_face < (843 + 173082)) {
                //Add Vertice att Geometry
                face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
                face.color.setHex(0xF02000);
                geometry.faces.push(face);
            }
            i += 3;
            cpt_face++;
        }

        geometry.computeFaceNormals();

        var material = new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors, side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false});

        mesh = new THREE.Mesh(geometry, material);

        scene.fog = new THREE.Fog(0x000000, 1, 15000);

        var light = new THREE.PointLight(0x444444);
        light.position.set(50, 50, 50);
        scene.add(light);

        var light = new THREE.AmbientLight(0x555555);
        scene.add(light);


        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh, camera);

        cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
        render();

        function render() {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
            cameraControls.update();
        }
    });



}

