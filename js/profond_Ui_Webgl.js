function webGLStart(url, element, width, height, depth) {
    $.getJSON(url, function(data) {

        var mesh;

        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000);
        camera.position.set(0, -100, 50);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        element.append(renderer.domElement);

        var geometry = new THREE.Geometry();
        var vertices = {};
        var indices = {};
        var indicesIntl = {};
        var indicesOutl = {};
        var indicesAtmo = {};

        var i = 0;
        var cpt_face = 0;
        var face;
        var cameraControls;


        vertices = data['vertices'];
        indices = data['indices'];
        indicesIntl = data['indicesIntl'];
        indicesOutl = data['indicesOutl'];
        indicesAtmo = data['indicesAtmo'];

        while (i < vertices.length) {
            geometry.vertices.push(new THREE.Vector3(vertices[i] * 100, vertices[i + 1] * 100, vertices[i + 2] * 100));
            i += 3;
        }

        var i = 0;
        while (i < indices.length) {

            face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
            face.color.setHex(0xeeeeee);
            geometry.faces.push(face);


            i += 3;
            cpt_face++;
        }

        var i = 0;
        while (i < indicesIntl.length) {

            face = new THREE.Face3(indicesIntl[i], indicesIntl[i + 1], indicesIntl[i + 2])
            face.color.setHex(0x20FF00);
            geometry.faces.push(face);


            i += 3;
            cpt_face++;
        }
        var i = 0;
        while (i < indicesOutl.length) {

            face = new THREE.Face3(indicesOutl[i], indicesOutl[i + 1], indicesOutl[i + 2])
            face.color.setHex(0x2020FF);
            geometry.faces.push(face);


            i += 3;
            cpt_face++;
        }
        var i = 0;
        while (i < indicesAtmo.length) {

            face = new THREE.Face3(indicesAtmo[i], indicesAtmo[i + 1], indicesAtmo[i + 2])
            face.color.setHex(0xF02000);
            geometry.faces.push(face);

            i += 3;
            cpt_face++;
        }

        geometry.computeFaceNormals();

        if (depth == true) {
            var material = new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors, side: THREE.DoubleSide, transparent: true, opacity: 1, depthWrite: true, depthTest: true});
        } else {
            var material = new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors, side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: true});
        }


        mesh = new THREE.Mesh(geometry, material);

        scene.fog = new THREE.Fog(0x000000, 1, 15000);

        var light = new THREE.PointLight(0x444444);
        light.position.set(50, 50, 50);
        scene.add(light);

        var light = new THREE.AmbientLight(0x555555);
        scene.add(light);

        var stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        element.append(stats.domElement);

        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh, camera);

        /*
         * PARTICLE
         */
        /*
         * TEST PARTICULE
         */

//        // create the particle variables
//        var pMaterial = new THREE.ParticleBasicMaterial({
//            color: 0x0F0F0F,
//            size: 0.3,
//            opacity: 1,
//            map: THREE.ImageUtils.loadTexture(
//                    "particle.png"
//                    ),
//            blending: THREE.AdditiveBlending,
//            transparent: true
//        });
//
//
//        /*
//         * FIN TEST PARTICULE
//         */
//
//        mesh2 = new THREE.ParticleSystem(geometry, pMaterial);
//        mesh2.sortParticles = true;
//
//
//        scene.add(mesh2);

        cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
        render();

        function render() {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
            cameraControls.update();
            stats.update();
        }
    });



}

