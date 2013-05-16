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



    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 50);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(1600, 900);


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
        //console.debug(vertices);
        while (i < indices.length) {
            //Add Vertice att Geometry
            geometry.faces.push(new THREE.Face3(indices[i], indices[i + 1], indices[i + 2]));
            i += 3;
        }
        //console.log(vertices.length);



        var material0 = new THREE.MeshBasicMaterial({color: 0x808080,depthTest: true,depthWrite: true,wireframe: true});
        //var material1 = new THREE.MeshBasicMaterial({color: 0x00FF00});
        //var material2 = new THREE.MeshBasicMaterial({color: 0xFF0000});
        console.debug(material0);


        console.debug(geometry);
       
        mesh = new THREE.Mesh(geometry,material0);
        console.debug(mesh);
        scene.add(mesh, camera);
        cameraControls = new THREE.TrackballControls(camera, renderer.domElement);

        render();

    });


    function render() {
        requestAnimationFrame(render);

        cameraControls.update();

        renderer.render(scene, camera);


    }
}
