import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class ObjectLoader {
    constructor() {
        this.loader = new GLTFLoader();

        const loadingManager = new THREE.LoadingManager();
        loadingManager.setURLModifier((url) => {
            // Return an empty 1x1 white texture data URI to bypass real texture loading
            if (url.endsWith('.jpg') || url.endsWith('.png') || url.includes('texture')) {
                console.log(`Ignoring texture: ${url}`);
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
            }
            return url; // For other resources, use the original URL
        });

        this.loader.manager = loadingManager;
    }

    loadModel(url, onLoad, onProgress, onError) {
        this.loader.load(
            url,
            (gltf) => {
                if (onLoad) {
                    onLoad(gltf);
                }
            },
            (progressEvent) => {
                if (onProgress) {
                    console.log(`Loading progress: ${(progressEvent.loaded / progressEvent.total) * 100}%`);
                    onProgress(progressEvent);
                }
            },
            (errorEvent) => {
                console.error(`Error loading model from ${url}:`, errorEvent);
                if (onError) {
                    onError(errorEvent);
                }
            }
        );
    }
}

export default ObjectLoader;