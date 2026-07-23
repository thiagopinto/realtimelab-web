// Centralizamos a URL para não repetir por todo o código
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Se amanhã precisarmos adicionar um token de autenticação JWT em todas as chamadas,
// faríamos a configuração do Axios ou do Fetch nativo aqui!