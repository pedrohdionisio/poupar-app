/**
 * O Metro faz inline de `process.env.EXPO_PUBLIC_*` em build time, então a
 * variável precisa ser lida por referência estática — desestruturar
 * `process.env` devolveria `undefined`.
 */
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error(
    'EXPO_PUBLIC_API_URL não configurada. Copie o .env.example para .env e preencha a URL da poupar-api.'
  );
}

export const env = {
  apiUrl
};
