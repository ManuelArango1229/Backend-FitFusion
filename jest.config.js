module.exports = {
  preset: 'ts-jest',  // Usa ts-jest como preset
  testEnvironment: 'node',  // Define el entorno de prueba
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Ajusta el alias de rutas si es necesario
    '^../../auth/(.*)$': '<rootDir>/src/auth/$1',  // Mapea las rutas relativas
  },
  roots: ['<rootDir>/src'],  // Asegúrate de que las pruebas apunten a src/
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Transforma los archivos TypeScript
  },
};
