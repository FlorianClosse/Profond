/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


PROFOND = {
    lstView: Array(),
    cptView: 0,
    MeshView: function(domContainer, jsonDataPath) {

        /*
         * public : Setter de this.active_depth
         */
        this.setDepth = function(bool) {
            this.active_depth = bool;
        };
        this.setStat = function(bool) {
            this.active_stat = bool;
        };
        this.setScale = function(int) {
            scale = int;
        }
        this.setTransparence = function(int) {
            this.active_transparence = int;
        }
        this.setDebugAxis = function(bool) {
            this.active_debug_axis = bool;
        };
        this.setActiveBetaParcours = function(bool) {
            this.active_beta_parcours = bool;
        };
        /*
         * public : Initialisation du container + variable interne
         */
        this.init = function() {
            this.getJson(this);
            if (Err == true) {
                return;
            }
            this.log("Json Download")
            this.init_vertex();
            if (Err == true) {
                return;
            }
            this.log("Fin du Chargement des vertices");
            this.init_faces_wall();
            if (Err == true) {
                return;
            }
            this.log("Fin du Chargement des faces Wall");
            this.init_faces_intl();
            if (Err == true) {
                return;
            }
            this.log("Fin du Chargement des faces Intl");
            this.init_faces_outl();
            if (Err == true) {
                return;
            }
            this.log("Fin du Chargement des faces Outl");
            this.init_faces_atmo();
            if (Err == true) {
                return;
            }
            this.log("Fin du Chargement des faces Atmo");
            this.init_camera();
            if (Err == true) {
                return;
            }
            this.log("Fin de l'initialisation de la camera");
            this.init_mesh();
            if (Err == true) {
                return;
            }
            this.log("Fin de l'initialisation du mesh");
            this.init_scene();
            if (Err == true) {
                return;
            }
            this.log("Fin de l'initialisation de la scene");
            if (this.active_stat == true) {
                this.init_stat();
                if (Err == true) {
                    return;
                }
                this.log("Fin de l'initialisation du stat");
            }
            if (this.active_debug_axis == true) {
                this.init_axe();
                if (Err == true) {
                    return;
                }
                this.log("Fin de l'initialisation du debugaxis");
            }
            this.render();
        };
        this.getJson = function(view) {
            $.ajax(jsonDataPath, {
                async: false
            }).done(function(data) {
                view.json = data;
            }).error(function(jqXHR, textStatus, errorThrown) {
                this.errLog(001, "Erreur lors de la recuperation du Json.");
            });
        };
        /**
         * private : initialise la liste des vertex
         */
        this.init_vertex = function() {
            /** TODO: voir si copie ou non */
            //var vertices = {};
            if (this.json != null && this.json['vertices'] != undefined) {

                vertices = this.json['vertices'];
                if (vertices.length >= 3) {
                    Xmin = vertices[0];
                    Xmax = vertices[0];
                    Ymin = vertices[1];
                    Ymax = vertices[1];
                    Zmin = vertices[2];
                    Zmax = vertices[2];
                }

                var i = 0;

                while (i < vertices.length) {
                    geometry.vertices.push(new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]));

                    if (Xmin > vertices[i]) {
                        Xmin = vertices[i] * 1;
                    }
                    if (Xmax < vertices[i]) {
                        Xmax = vertices[i] * 1;
                    }
                    if (Ymax < vertices[i + 1]) {
                        Ymax = vertices[i + 1] * 1;
                    }
                    if (Ymin > vertices[i + 1]) {
                        Ymin = vertices[i + 1] * 1;
                    }
                    if (Zmax < vertices[i + 2]) {
                        Zmax = vertices[i + 2] * 1;
                    }
                    if (Zmin > vertices[i + 2]) {
                        Zmin = vertices[i + 2] * 1;
                    }

                    i += 3;
                }


            } else {
                this.errlog(011, "Impossible de récupérer la liste des vertices dans les données JSON.");
            }
        };
        this.init_faces_wall = function() {
            var v = 0;
            var i = 0;
            if (this.json != null && this.json['indices'] != undefined) {
                indices = this.json['indices'];
                while (i < indices.length) {
                    var face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2]);
                    face.color.setHex(0x0000AA);
                    v = geometry.faces.push(face);
                    v = v - 1;
                    //Start population de lstFacesByVertex
                    /*if (lstFacesByVertex[indices[i]] == undefined)
                     {
                     lstFacesByVertex[indices[i]] = [];
                     }
                     if (lstFacesByVertex[indices[i + 1]] == undefined)
                     {
                     lstFacesByVertex[indices[i + 1]] = [];
                     }
                     if (lstFacesByVertex[indices[i + 2]] == undefined)
                     {
                     lstFacesByVertex[indices[i + 2]] = [];
                     }
                     
                     lstFacesByVertex[indices[i]].push(v);
                     lstFacesByVertex[indices[i + 1]].push(v);
                     lstFacesByVertex[indices[i + 2]].push(v);*/
                    i += 3;
                }
            } else {
                this.errlog(021, "Impossible de récupérer la liste des faces Intl dans les données JSON.");
            }
        };
        this.init_faces_intl = function() {
            if (this.json != null && this.json['indicesIntl'] != undefined) {

                indicesIntl = this.json['indicesIntl'];

                var i = 0;
                var v = 0;

                while (i < indicesIntl.length) {

                    var face = new THREE.Face3(indicesIntl[i], indicesIntl[i + 1], indicesIntl[i + 2])
                    face.color.setHex(0xEEEEEE);

                    v = geometry.faces.push(face);
                    v = v - 1; //récupération de l'indice de la face ajoutée.



                    //Start population de li
                    if (lstFacesByVertex[indicesIntl[i]] == undefined)
                    {
                        lstFacesByVertex[indicesIntl[i]] = [];
                    }
                    if (lstFacesByVertex[indicesIntl[i + 1]] == undefined)
                    {
                        lstFacesByVertex[indicesIntl[i + 1]] = [];
                    }
                    if (lstFacesByVertex[indicesIntl[i + 2]] == undefined)
                    {
                        lstFacesByVertex[indicesIntl[i + 2]] = [];
                    }

                    lstFacesByVertex[indicesIntl[i]].push(v);
                    lstFacesByVertex[indicesIntl[i + 1]].push(v);
                    lstFacesByVertex[indicesIntl[i + 2]].push(v);

                    i += 3;
                }

            } else {
                this.errlog(031, "Impossible de récupérer la liste des faces Intl dans les données JSON.");
            }
        };
        this.init_faces_outl = function() {
            if (this.json != null && this.json['indicesOutl'] != undefined) {

                indicesOutl = this.json['indicesOutl'];

                var i = 0;
                var v = 0;

                while (i < indicesOutl.length) {

                    var face = new THREE.Face3(indicesOutl[i], indicesOutl[i + 1], indicesOutl[i + 2])
                    face.color.setHex(0x00DD00);

                    v = geometry.faces.push(face);
                    v = v - 1; //récupération de l'indice de la face ajoutée.



                    //Start population de li
                    /*if (lstFacesByVertex[indicesOutl[i]] == undefined)
                     {
                     lstFacesByVertex[indicesOutl[i]] = [];
                     }
                     if (lstFacesByVertex[indicesOutl[i + 1]] == undefined)
                     {
                     lstFacesByVertex[indicesOutl[i + 1]] = [];
                     }
                     if (lstFacesByVertex[indicesOutl[i + 2]] == undefined)
                     {
                     lstFacesByVertex[indicesOutl[i + 2]] = [];
                     }
                     
                     lstFacesByVertex[indicesOutl[i]].push(v);
                     lstFacesByVertex[indicesOutl[i + 1]].push(v);
                     lstFacesByVertex[indicesOutl[i + 2]].push(v);
                     */
                    i += 3;
                }

            } else {
                this.errlog(041, "Impossible de récupérer la liste des faces Outl dans les données JSON.");
            }
        };
        this.init_faces_atmo = function() {
            if (this.json != null && this.json['indicesAtmo'] != undefined) {

                indicesAtmo = this.json['indicesAtmo'];

                var i = 0;
                var v = 0;

                while (i < indicesAtmo.length) {

                    var face = new THREE.Face3(indicesAtmo[i], indicesAtmo[i + 1], indicesAtmo[i + 2])
                    face.color.setHex(0xFF0000);

                    v = geometry.faces.push(face);
                    v = v - 1; //récupération de l'indice de la face ajoutée.



                    //Start population de li
                    /*if (lstFacesByVertex[indicesAtmo[i]] == undefined)
                     {
                     lstFacesByVertex[indicesAtmo[i]] = [];
                     }
                     if (lstFacesByVertex[indicesAtmo[i + 1]] == undefined)
                     {
                     lstFacesByVertex[indicesAtmo[i + 1]] = [];
                     }
                     if (lstFacesByVertex[indicesAtmo[i + 2]] == undefined)
                     {
                     lstFacesByVertex[indicesAtmo[i + 2]] = [];
                     }
                     
                     lstFacesByVertex[indicesAtmo[i]].push(v);
                     lstFacesByVertex[indicesAtmo[i + 1]].push(v);
                     lstFacesByVertex[indicesAtmo[i + 2]].push(v);
                     */
                    i += 3;
                }

            } else {
                this.errlog(051, "Impossible de récupérer la liste des faces Outl dans les données JSON.");
            }
        };
        this.init_html_select_faces = function() {
            var main_div = document.createElement('div');

            var wall_div = null;

            var intl_div = null;

            var outl_div = null;

            var atmo_div = null;

            $(dom).append(main_div);
        };

        this.beta_parcours = function() {
            //Condition d'initialisation
            if (cpt_vertice_taged == 0) {
                var onekey = null;
                lstFacesByVertex.forEach(function(key, data) {
                    if (onekey == null) {
                        onekey = data;
                    }
                });
                StackVertice.push(onekey);
            }

            

            if (cipher_vertice == null) {
                console.debug(cipher_vertice);
                cipher_vertice = StackVertice.pop();
                listingFaces = lstFacesByVertex[cipher_vertice];
                //console.debug(cipher_vertice);
                //console.debug(listingFaces);
                var lstVertexAtFace = [];
                listingFaces.forEach(function(data, key) {
                    var vertices_index = [];
                    vertices_index.push(geometry.faces[data].a);
                    vertices_index.push(geometry.faces[data].b);
                    vertices_index.push(geometry.faces[data].c);
                    vertices_index.forEach(function(data, key) {
                        if (data != cipher_vertice && lstVertexAtFace.indexOf(data) == -1) {
                            lstVertexAtFace.push(data);
                        }
                    });
                });
                //console.debug(lstVertexAtFace);
                lstVertexAtFace.forEach(function(data) {
                    StackVertice.push(data);
                });
            }

            console.debug(listingFaces);
            if (listingFaces.length > 0)
            {
                var indice_face = listingFaces.pop();
                scene.__objects[0].geometry.faces[indice_face].color.setHex(0x00FF00);
                scene.__objects[0].geometry.colorsNeedUpdate = true;
                scene.__objects[0].matrixAutoUpdate = false;
                scene.__objects[0].updateMatrix();
            }

            if (listingFaces.length == 0) {
                cipher_vertice = null;
            }



        };

        this.init_camera = function() {
            var camX = ((Xmax * scale - Xmin * scale) / 2) + Xmin * scale;
            var camY = ((Ymax * scale - Ymin * scale) / 2) + Ymin * scale;
            var camZx = (camX - Xmin * scale) / Math.tan(Math.PI / 4);
            var camZy = (camY - Ymin * scale) / Math.tan(Math.PI / 4);
            var camZ = 0;
            var deltaZ = 0;
            if (camZx > camZy) {
                deltaZ = camZx;
            } else {
                deltaZ = camZy;
            }
            camZ = Zmax * scale + deltaZ * 3;
            camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            camera.position.set(camX, camY, camZ);
        };
        this.init_mesh = function() {
            material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors, side: THREE.DoubleSide, transparent: this.active_transparence, opacity: 0.9, depthWrite: this.active_depth, depthTest: this.active_depth});
            mesh = new THREE.Mesh(geometry, material);
            mesh.geometry.dynamic = true;
            mesh.geometry.dirty = true;
            mesh.scale.set(scale, scale, scale);
            scene.add(mesh, camera);
        };
        this.init_scene = function() {
            light = new THREE.AmbientLight(0x555555);
            scene.add(light);
            cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
        };
        this.init_stat = function() {
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            $(dom).css("position", "relative");
            $(dom).append(stats.domElement);
        };
        this.init_axe = function() {
            axisLength = 1000;
            //Shorten the vertex function
            function v(x, y, z) {
                return new THREE.Vector3(x, y, z);
            }

            //Create axis (point1, point2, colour)
            function createAxis(p1, p2, color) {
                var line, lineGeometry = new THREE.Geometry(),
                        lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
                lineGeometry.vertices.push(p1, p2);
                line = new THREE.Line(lineGeometry, lineMat);
                scene.add(line);
            }

            createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
            createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
            createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
        };
        this.render = function() {
            if (PROFOND.lstView[indice_view].active_render == true) {
                renderer.render(scene, camera);
                requestAnimationFrame(PROFOND.lstView[indice_view].render);
                cameraControls.update();
                if (PROFOND.lstView[indice_view].active_stat == true) {
                    stats.update();
                }
                if (lock == false && (PROFOND.lstView[indice_view].cpt_tick == 40)) {
                    //lock = true;
                    PROFOND.lstView[indice_view].beta_parcours();
                    PROFOND.lstView[indice_view].cpt_tick = 0;
                    console.log("tick parcours");
                }
                PROFOND.lstView[indice_view].cpt_tick++;
            }
            //console.debug(camera.position.z);
        };
        this.errlog = function(code, message) {
            Err = true;
            console.log("Err " + code + " : View " + indice_view + " : " + message);
        };
        this.log = function(message) {
            console.log("PROFOND.MeshView : " + new Date() + " : View : " + indice_view + " : " + message + ".");
        };

        /*
         * private : Attributs
         */

        if (PROFOND.lstView == undefined) {
            PROFOND.lstView = [];
        }
        if (PROFOND.cptView == undefined) {
            PROFOND.cptView = 0;
        }

        var indice_view = PROFOND.cptView;
        PROFOND.lstView[indice_view] = this;
        PROFOND.cptView++;

        this.log("Create");

        //Active ou désactive le depth sur le rendu
        this.active_depth = true;
        this.active_stat = false;
        this.active_transparence = true;
        this.active_debug_axis = false;
        this.active_beta_parcours = false;
        this.active_render = true;
        this.active_input_selected = false;
        //Stockage du container Dom
        var dom = $(domContainer);
        // public (cf: JQuery Ajax) : copie des données Json
        this.json = null;

        //Stockage des extrêmes du mesh
        var Xmin = 0;
        var Xmax = 0;
        var Ymin = 0;
        var Ymax = 0;
        var Zmin = 0;
        var Zmax = 0;

        var scale = 1;

        //THREE.js init
        var renderer = new THREE.WebGLRenderer();
        //
        var width = parseInt(dom.css("width"), 10);
        var height = Math.floor((width / 16) * 9);
        dom.css("height", height + "px");
        renderer.setSize(width, height);
        dom.append(renderer.domElement);
        //
        var geometry = new THREE.Geometry();
        var camera = null;
        var scene = new THREE.Scene();
        var mesh = null;
        var cameraControls = null;
        var material = null;
        var light = null;
        var stats = null;

        //Stockage des vertices
        var vertices = {};
        var indices = {};
        var indicesIntl = {};
        var indicesOutl = {};
        var indicesAtmo = {};

        var Err = false;
        var ErrMessage = "";

        //Beta Parcours
        var StackVertice = [];
        var cpt_vertice_taged = 0;
        var lstFacesByVertex = [];
        var lstFacesChanges = [];
        var lstVerticesForTag = [];
        var cpt_a_traiter = 0;
        var cipher_vertice = null;
        var listingFaces = null;

        var lock = false;
        this.cpt_tick = 0;

    }

};