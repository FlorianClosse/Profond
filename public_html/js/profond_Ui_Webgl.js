function webGLStart(url, element, width, height, depth) {
    $.getJSON(url, function(data) {
        var mesh;


        var scene = new THREE.Scene();

        $(element).css({width: width, height: height});

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.domElement.style.width = width;
        renderer.domElement.style.height = height;
        renderer.domElement.style.border = "3px solid red";
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



        var Xmin = vertices[0];
        var Xmax = vertices[0];
        var Ymin = vertices[1];
        var Ymax = vertices[1];
        var Zmax = vertices[2];


        while (i < vertices.length) {
            geometry.vertices.push(new THREE.Vector3(vertices[i] * 100, vertices[i + 1] * 100, vertices[i + 2] * 100));

            if (Xmin > vertices[i]) {
                Xmin = vertices[i] * 100;
            }
            if (Xmax < vertices[i]) {
                Xmax = vertices[i] * 100;
            }
            if (Ymax < vertices[i + 1]) {
                Ymax = vertices[i + 1] * 100;
            }
            if (Ymin > vertices[i + 1]) {
                Ymin = vertices[i + 1] * 100;
            }
            if (Zmax < vertices[i + 2]) {
                Zmax = vertices[i + 2] * 100;
            }

            i += 3;
        }

        var i = 0;
        var nbr = 0;

        while (i < indices.length) {

            face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
            face.color.setHex(0xeeeeee);
            geometry.faces.push(face);

            if (indices[i] >= nbr) {
                nbr = indices[i];

            }
            i += 3;
            cpt_face++;
        }
        console.debug(nbr);



        var i = 0;
        var nbr = 0;

        while (i < indicesIntl.length) {

            face = new THREE.Face3(indicesIntl[i], indicesIntl[i + 1], indicesIntl[i + 2])
            face.color.setHex(0x20FF00);
            geometry.faces.push(face);
            if (indices[i] >= nbr) {
                nbr = indices[i];

            }

            i += 3;
            cpt_face++;
        }
        console.debug(nbr);


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

        var camX = ((Xmax - Xmin) / 2) + Xmin;
        var camY = ((Ymax - Ymin) / 2) + Ymin;
        var camZ = Zmax + 20;

        var camera = new THREE.PerspectiveCamera(45, width / height, 1, camZ * 100);
        camera.position.set(camX, camY, camZ + 10);


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
        stats.domElement.style.bottom = '50px';
        element.append(stats.domElement);

        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh, camera);

        cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
        render();

        function render() {
            stats.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
            cameraControls.update();

        }
    });



}

