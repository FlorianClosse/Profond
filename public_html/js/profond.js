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
            createApp(teapot);
        }
    }).send();

    function createApp(model) {
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
                    e.stop();
                    this.campos = {
                        x: e.x,
                        y: e.y
                    };
                },
                onDragMove: function(e) {
                    e.stop();
                    if (this.campos == "undefined") {
                        this.campos = {
                            x: e.x,
                            y: e.y
                        };
                    }

                    this.camera.target.y += ((this.campos.y - e.y) / 20);
                    this.camera.target.x += -((this.campos.x - e.x) / 20);
                    this.camera.update();
                    this.campos.x = e.x;
                    this.campos.y = e.y;
                    console.debug(this.camera);
                },
                onTouchStart: function(e) {
                    e.stop();
                    this.campos = {
                        x: e.x,
                        y: e.y
                    };
                },
                onTouchMove: function(e) {
                    e.stop();


                },
                onMouseWheel: function(e) {
                    e.stop();

                },
                onKeyDown: function(e) {
                    if (e.key == "z") {
                        this.camera.target.z += 5;
                        this.camera.position.z += 5;
                        this.camera.update();
                    }
                    if (e.key == "s") {
                        this.camera.target.z -= 5;
                        this.camera.position.z -= 5;
                        this.camera.update();
                    }
                    if (e.key == "q") {
                        this.camera.target.x += 5;
                        this.camera.position.x += 5;
                        this.camera.update();
                    }
                    if (e.key == "d") {
                        this.camera.target.x -= 5;
                        this.camera.position.x -= 5;
                        this.camera.update();
                    }
                    console.debug(e);
                    if (e.key == "space") {
                        this.camera.target.y += 5;
                        this.camera.position.y += 5;
                        this.camera.update();
                    }
                    if (e.shift == true) {
                        this.camera.target.y -= 5;
                        this.camera.position.y -= 5;
                        this.camera.update();
                    }
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

                model.drawType = gl.LINES;

                //Réglage
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clearDepth(1.0);
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LEQUAL);
                gl.viewport(0, 0, +canvas.width, +canvas.height);
                //Ajout de la théliere dans la scène
                scene.add(model);
                //Aperçu
                draw();

                //Créer l'apercu
                function draw() {
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    theta += 0.01;
                    model.update();
                    scene.render();
                    PhiloGL.Fx.requestAnimationFrame(draw);
                }
            }
        });

    }
}