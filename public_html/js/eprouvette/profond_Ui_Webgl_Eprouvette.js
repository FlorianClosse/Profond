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

        i = 0;
        var v = 0;
        var first = cpt_face;
        tabface = {};
        var cbh1 = document.getElementById('cb1');

        while (i < indices.length) {


            face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
            face.color.setHex(0x0000AA);
            v = geometry.faces.push(face);
//

            var check = document.createElement('input');
            check.type = 'checkbox';
            check.value = v;
            cbh1.appendChild(check);
          

            i += 3;
            v += 1
            cpt_face++;
        }


        var v = 0;
        var first = cpt_face;
        tabface = {};
        var cbh2 = document.getElementById('cb2');
        var i = 0;
        while (i < indicesIntl.length) {

            face = new THREE.Face3(indicesIntl[i], indicesIntl[i + 1], indicesIntl[i + 2])
            face.color.setHex(0xEEEEEE);
            v = geometry.faces.push(face);

            var check = document.createElement('input');
            check.type = 'checkbox';
            check.value = v;
            cbh2.appendChild(check);
            cb2.appendChild(document.createTextNode(v));


            i += 3;
            v += 1
            cpt_face++;
        }

        var v = 0;
        var first = cpt_face;
        tabface = {};
        var i = 0;
        var cbh3 = document.getElementById('cb3');
        while (i < indicesOutl.length) {

            face = new THREE.Face3(indicesOutl[i], indicesOutl[i + 1], indicesOutl[i + 2])
            face.color.setHex(0x00DD00);
            v = geometry.faces.push(face);


            var check = document.createElement('input');
            check.type = 'checkbox';
            check.value = v;
            cbh3.appendChild(check);
            cb3.appendChild(document.createTextNode(v));


            i += 3;
            v += 1
            cpt_face++;
        }

        var v = 0;
        var first = cpt_face;
        tabface = {};
        var i = 0;
        var cbh4 = document.getElementById('cb4');
        while (i < indicesAtmo.length) {
            face = new THREE.Face3(indicesAtmo[i], indicesAtmo[i + 1], indicesAtmo[i + 2])
            face.color.setHex(0xFF0000);
            v = geometry.faces.push(face);


            var check = document.createElement('input');
            check.type = 'checkbox';
            check.value = v;
            cbh4.appendChild(check);
            cb4.appendChild(document.createTextNode(v));

            v += 1
            i += 3;
            cpt_face++;
        }



        var camX = ((Xmax - Xmin) / 2) + Xmin;
        var camY = ((Ymax - Ymin) / 2) + Ymin;
        var camZ = Zmax + 20;

        var camera = new THREE.PerspectiveCamera(45, width / height, 1, camZ * 10);
        camera.position.set(camX, camY, camZ + 10);


        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors, side: THREE.DoubleSide, transparent: true, opacity: 0.9, depthWrite: depth, depthTest: depth});

        mesh = new THREE.Mesh(geometry, material);

        var light = new THREE.AmbientLight(0x555555);
        scene.add(light);

        var stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        element.append(stats.domElement);

        mesh = new THREE.Mesh(geometry, material);
        mesh.geometry.dynamic = true;
        mesh.geometry.dirty = true;

        scene.add(mesh, camera);

        cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
        render();


        function render() {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
            cameraControls.update();
            stats.update();
        }

        $(".cb input").click(function() {
            if ($(this).attr('checked') == "checked") {
                scene.__objects[0].geometry.faces[this.value].color.setHex($(this).attr('data-old-color'));
                scene.__objects[0].geometry.colorsNeedUpdate = true;
                scene.__objects[0].matrixAutoUpdate = false;
                scene.__objects[0].updateMatrix();
            } else {
                $(this).attr('data-old-color', scene.__objects[0].geometry.faces[this.value].color.getHex());
                scene.__objects[0].geometry.faces[this.value].color.setHex(0x8aFF8a);
                scene.__objects[0].geometry.colorsNeedUpdate = true;
                scene.__objects[0].matrixAutoUpdate = false;
                scene.__objects[0].updateMatrix();
            }
        });
    });
}