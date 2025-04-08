import axios from 'axios';

// Configuración base de axios
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000; // 30 segundos

// Interceptor para manejar errores
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('La conexión ha excedido el tiempo de espera');
      return Promise.reject({
        message: 'La conexión ha excedido el tiempo de espera. Por favor, inténtelo de nuevo.',
        originalError: error
      });
    }

    if (!error.response) {
      console.error('Error de conexión:', error.message);
      return Promise.reject({
        message: 'No se pudo conectar con el servidor. Por favor, verifique su conexión.',
        originalError: error
      });
    }

    return Promise.reject(error);
  }
);

export default axios; 