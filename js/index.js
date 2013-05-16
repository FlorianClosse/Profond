function webGLStart() {
    var $id = function(d) {
        return document.getElementById(d);
    };

    /*
     * Création de l'objet
     */
    new PhiloGL.IO.XHR({
        url: 'Teapot.json',
        onSuccess: function(text) {
            var json = JSON.parse(text);
            json.colors = [1, 0.5, 0.5, 1];
            var teapot = new PhiloGL.O3D.Model(json);
            //var teapot2 = new PhiloGL.O3D.Model(json);
            animateObject(teapot, 0);
           // animateObject(teapot2, 1);
        }
    }).send();

    function animateObject(teapot, glLines) {
        //Création de l'application
        PhiloGL('canvas', {
            program: {
                from: 'uris',
                path: 'shaders/',
                vs: 'frag-lighting.vs.glsl',
                fs: 'frag-lighting.fs.glsl',
                noCache: true
            },
            /*
             * Définis la position de caméra de départ
             */
            camera: {
                position: {
                    x: 0, y: 0, z: -50
                }
            },
            scene: {
                lights: {
                    enable: false,
                    points: {
                        diffuse: {
                            r: 1,
                            g: 0.5,
                            b: 0.5
                        },
                        specular: {
                            r: 1,
                            g: 0.0,
                            b: 0.0
                        },
                        position: {
                            x: 0,
                            y: 0,
                            z: 2
                        }
                    }
                }
            },
            /*
             * Gestion de la sourie
             */
            events: {
                onDragStart: function(e) {
                    this.pos = {
                        x: e.x,
                        y: e.y
                    };
                },
                onDragMove: function(e) {
                    var z = this.camera.position.z,
                            sign = Math.abs(z) / z,
                            pos = this.pos;

                    this.camera.rotation.y += -(pos.x - e.x) / 100;
                    this.camera.rotation.x += sign * (pos.y - e.y) / 100;
                    this.camera.update();
                    pos.x = e.x;
                    pos.y = e.y;
                },
                onTouchStart: function(e) {
                    e.stop();
                    this.pos = {
                        x: e.x,
                        y: e.y
                    };
                },
                onTouchMove: function(e) {
                    e.stop();
                    var z = this.camera.position.z,
                            sign = Math.abs(z) / z,
                            pos = this.pos;

                    this.camera.rotation.y += -(pos.x - e.x) / 100;
                    this.camera.rotation.x += sign * (pos.y - e.y) / 100;
                    this.camera.update();
                    pos.x = e.x;
                    pos.y = e.y;
                },
                onMouseWheel: function(e) {
                    e.stop();
                    var camera = this.camera;
                    camera.position.z += e.wheel;
                    camera.update();
                }
            },
            /*
             * Chargement de l'app
             */
            onLoad: function(app) {
                var gl = app.gl,
                        scene = app.scene,
                        canvas = app.canvas,
                        theta = 0;
                if(glLines == 0){
                    teapot.drawType = gl.LINES;
                }else{
                    teapot.drawType = TRIANGLES;
                }
                
                //Réglage
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clearDepth(1.0);
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LEQUAL);
                gl.viewport(0, 0, +canvas.width, +canvas.height);
                //Ajout de la théliere dans la scène


                
                scene.add(teapot);
                //Aperçu
                draw();

                //Créer l'apercu
                function draw() {
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    theta += 0.01;
                    teapot.update();
                    scene.render();
                    PhiloGL.Fx.requestAnimationFrame(draw);
                }
            }
        });

    }
}
