# Proyecto Reto-Seek

Para las pruebas unitarias, se utiliza `Vitest` junto con `React Testing Library` para realizar pruebas sobre los componentes de React, asegurando la correcta funcionalidad y comportamiento de la interfaz de usuario.

## Instalación

ara instalar las dependencias del proyecto, se recomienda usar el siguiente comando con la opción `--legacy-peer-deps`, garantizando así una instalación fluida y compatible con todas las dependencias de `coverage`:

```bash
npm i --legacy-peer-deps
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye el proyecto para producción.
- `npm run test`: Ejecuta las pruebas unitarias.
- `npm run coverage`: Genera el informe de cobertura.

## Estructura del Proyecto

- `src/`: Contiene el código fuente del proyecto.
- `public/`: Contiene archivos estáticos.


## Configuración de Vitest

El archivo de configuración de Vitest (`vitest.config.ts`) está configurado para usar `jsdom` como entorno de pruebas y `v8` como proveedor de `coverage`. Los informes de `coverage` se generan en formato `text`, `json` y `html`.


## Uso de Mockoon

Se utiliza Mockoon para realizar los mocks de las APIs. Esto permite simular respuestas de servicios externos y controlar el flujo de datos para las pruebas en desarrollo

# Uso de Patrones en el Proyecto

Este proyecto emplea varios patrones de diseño de React para garantizar la escalabilidad, reutilización y claridad en la estructura de los componentes. A continuación, se describen los principales patrones implementados:

## Componente de Orden Superior (Higher-Order Component, HOC)

Aunque no se muestra explícitamente en el código proporcionado, el proyecto utiliza el concepto de HOCs para reutilizar lógica de componentes. Un HOC es una función que toma un componente y retorna un nuevo componente con funcionalidades extendidas.

- **Ejemplo en este proyecto:**  
  - `TaskListProvider` funciona como un HOC, envolviendo a sus hijos y proporcionándoles acceso al contexto.

## Composición de Componentes

La composición de componentes permite construir componentes complejos combinando componentes más simples. Este patrón fomenta la reutilización y facilita la lectura del código.

- **Ejemplo:**  
  - `ListContext` envuelve a sus hijos con `TaskListProvider`, lo que permite compartir la lógica de estado en diferentes niveles del árbol de componentes.
