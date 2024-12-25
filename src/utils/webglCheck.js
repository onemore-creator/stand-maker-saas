import WebGL from 'three/addons/capabilities/WebGL.js';

export const isWebGLSupported = () => WebGL.isWebGL2Available() ;
export const getWebGLErrorMessage = () => WebGL.getWebGL2ErrorMessage();
