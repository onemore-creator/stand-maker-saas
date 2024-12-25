import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { isWebGLSupported, getWebGLErrorMessage } from '../../utils/webglCheck';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import ObjectLoader from './ObjectLoader'; 

function SceneContainer({ sceneSize }) {
    const refContainer = useRef(null);
    const modelLoader = new ObjectLoader();
    let model = null; 

    useEffect(() => {
        // Check if WebGL is supported 
        if (!isWebGLSupported()) {
            const warning = getWebGLErrorMessage();
            refContainer.current && refContainer.current.appendChild(warning);
            return;
        }

        // Initialize scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            sceneSize.width / sceneSize.height,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(sceneSize.width, sceneSize.height);
        renderer.setClearColor(0xa1a1a1);
        
        // Attach the renderer to the container div
        refContainer.current && refContainer.current.appendChild( renderer.domElement );

        const controls = new OrbitControls( camera, renderer.domElement );

        // Create a cube and add it to the scene
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        const gridSize = 50; // Size of the grid
        const gridDivisions = 50; // Number of divisions
        const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
        gridHelper.position.y = 0; // Ensure it's aligned with the floor
        scene.add(gridHelper);


        modelLoader.loadModel(
            '/obj2.gltf', // Update the URL accordingly
            (gltf) => {
                model = gltf.scene;
                scene.add(model);
        
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material.wireframe = true; // Turn on wireframe view
                        // child.material = material;
                    }
                });

                const box = new THREE.Box3().setFromObject(model);
                const size = new THREE.Vector3();
                box.getSize(size); // Get the size of the bounding box
                const center = new THREE.Vector3();
                box.getCenter(center); // Get the center of the bounding box
        
                // Center the model in the scene
                model.position.sub(center); // Move the model's center to (0, 0, 0)
        
                // Calculate a scale factor to fit the model within a desired size (e.g., scale so the largest dimension is 1 unit)
                const maxDimension = Math.max(size.x, size.y, size.z);
                const scaleFactor = 10 / maxDimension;
                model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                    },
            undefined,
            (error) => {
                console.error('Failed to load the model. Detailed error:', error);
            }
        );

        camera.position.set( 0, 20, 100 );

        // Animation loop
        const animate = function () {
            requestAnimationFrame(animate);
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            // if (model) {
            //     model.rotation.y += 0.01; // Rotate the model around the y-axis
            //     model.rotation.x += 0.005; // Optional: Rotate around the x-axis
            // }

            controls.update();

            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener and renderer
        return () => {
            window.removeEventListener('resize', handleResize);

            refContainer.current && refContainer.current.removeChild(renderer.domElement);
        };
    }, [sceneSize]);

    return <div ref={refContainer} />;
}

export default SceneContainer;
