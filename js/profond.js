function webGLStart() {
    //console.log("test");
    scene = new THREE.Scene();
    var mesh;



//    $.ajax("polyMesh_light.json", {
//        "async": true,
//        "timeout": 100000,
//        "error": function(jqxhr, textstatus, errorthrow) {
//            console.debug(textstatus);
//            console.debug(errorthrow);
//        }
//    }).done(function(data) {
//        console.debug(data);
//        alert('done');
//    }).fail(function(data) {
//        console.debug(data);
//        alert('fail');
//    })
//    .always(function() {
//        alert('end');
//    });

    var debugaxis = function(axisLength) {
        //console.log("test2");
        //Shorten the vertex function
        function v(x, y, z) {
            return new THREE.Vector3(x, y, z);
        }

        //Create axis (point1, point2, colour)
        function createAxis(p1, p2, color) {
            var line, lineGeometry = new THREE.Geometry(),
                    lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 6});
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            scene.add(line);
        }

        createAxis(v(-20, 0, 0), v(20, 0, 0), 0xFF0000);
        createAxis(v(0, -20, 0), v(0, 20, 0), 0x00FF00);
        createAxis(v(0, 0, -20), v(0, 0, 20), 0x0000FF);
    };

    debugaxis(100);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, -100, 50);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(2400, 1200);


    $("#canvas-container").append(renderer.domElement)
    var geometry = new THREE.Geometry();
    //console.log("test3");
    $.getJSON('polyMesh.json', function(data) {
        //console.log("test4");
        var items = [];
        //console.debug(data);
        var vertices = {};
        var indices = {};
        vertices = data['vertices'];
        indices = data['indices'];
        var i = 0;
        //console.debug(vertices);
        while (i < vertices.length) {
            //Add Vertice att Geometry
            geometry.vertices.push(new THREE.Vector3(vertices[i] * 100, vertices[i + 1] * 100, vertices[i + 2] * 100));
            i += 3;
        }
        var i = 0;
        var cpt_face = 0;
        var face;
        //console.debug(vertices);
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
        //console.log(vertices.length);
        geometry.computeFaceNormals();

        //console.debug(geometry);

        var material = new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors, side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthWrite: false});

        mesh = new THREE.Mesh(geometry, material);

        scene.fog = new THREE.Fog(0x000000, 1, 15000);

        var light = new THREE.PointLight(0x444444);
        light.position.set(50, 50, 50);
        scene.add(light);

        var light = new THREE.AmbientLight(0x555555);
        scene.add(light);

        //console.debug(mesh);
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