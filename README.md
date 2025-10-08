# Rick and Morty App 🚀

Una aplicación móvil desarrollada con **React Native** y **Expo** que consume la API de Rick and Morty, implementando una arquitectura limpia con patrones de diseño modernos.

## 📱 Características

- ✅ Lista de personajes de Rick and Morty
- ✅ Detalles de cada personaje
- ✅ Sistema de favoritos
- ✅ Navegación entre pantallas
- ✅ Tema personalizable
- ✅ Arquitectura limpia (Clean Architecture)
- ✅ Cobertura completa de tests

## 🏗️ Arquitectura del Proyecto

Este proyecto sigue los principios de **Clean Architecture** organizando el código en capas bien definidas:

```
rick-and-morty-app/
├── app/                          # Configuración principal de la app
│   ├── App.tsx                   # Componente principal
│   └── navigation/               # Configuración de navegación
├── modules/                      # Módulos funcionales
│   ├── characters/               # Módulo de personajes
│   │   ├── domain/              # Entidades y contratos
│   │   ├── application/         # Casos de uso
│   │   ├── infrastructure/      # Implementaciones
│   │   └── ui/                  # Componentes de interfaz
│   └── favorites/               # Módulo de favoritos
│       ├── domain/              # Entidades y contratos
│       ├── application/         # Casos de uso
│       ├── infrastructure/      # Implementaciones
│       └── ui/                  # Componentes de interfaz
└── shared/                      # Código compartido
    ├── domain/                  # Entidades compartidas
    └── ui/                      # Componentes UI reutilizables
```

### 📂 Descripción de las Capas

#### **Domain Layer** 🎯

- **Propósito**: Contiene la lógica de negocio pura
- **Contenido**: Entidades, interfaces de repositorios
- **Ejemplo**: `Character.ts`, `CharacterRepository.ts`

#### **Application Layer** ⚙️

- **Propósito**: Casos de uso y lógica de aplicación
- **Contenido**: Use cases que orquestan la lógica de negocio
- **Ejemplo**: `GetCharacters.ts`, `GetCharacterById.ts`

#### **Infrastructure Layer** 🔧

- **Propósito**: Implementaciones concretas de interfaces
- **Contenido**: Repositorios HTTP, contextos, adaptadores
- **Ejemplo**: `HttpCharacterRepository.ts`, `FavoritesContext.tsx`

#### **UI Layer** 🎨

- **Propósito**: Interfaz de usuario y presentación
- **Contenido**: Screens, hooks, componentes
- **Estructura**:
  - `atoms/`: Componentes básicos (botones, textos)
  - `molecules/`: Combinación de atoms (cards, items)
  - `organisms/`: Componentes complejos (listas, formularios)
  - `screens/`: Pantallas completas

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- Para desarrollo móvil: **Expo Go** app en tu dispositivo

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/apomongelos/rick-and-morty-app.git
   cd rick-and-morty-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

## 📱 Comandos Disponibles

### Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web
```

### Testing

```bash
# Ejecutar todos los tests en modo watch
npm test

# Ejecutar tests una sola vez
npm run test -- --watchAll=false

# Ejecutar tests con coverage
npm run test -- --coverage --watchAll=false

# Ejecutar tests específicos
npm run test -- --testPathPattern=characters
```

### Linting

```bash
# Ejecutar linter
npm run lint

# Ejecutar linter con auto-fix
npm run lint -- --fix
```

## 🧪 Testing

El proyecto cuenta con una cobertura completa de tests organizados por capas:

### **Unit Tests** 🔬

- Tests de casos de uso (application layer)
- Tests de repositorios (infrastructure layer)
- Tests de componentes individuales

### **Integration Tests** 🔗

- Tests de flujos completos entre capas
- Tests de interacción usuario-sistema

### **Estructura de Tests**

```
__tests__/
├── application/         # Tests de casos de uso
├── infrastructure/      # Tests de implementaciones
└── ui/                 # Tests de componentes UI
    └── screens/        # Tests de pantallas
```

### **Convenciones de Naming**

- `*.test.ts`: Tests unitarios
- `*.integration.test.tsx`: Tests de integración
- `*.success.test.tsx`: Tests de casos exitosos
- `*.error.test.tsx`: Tests de casos de error
- `*.empty.test.tsx`: Tests de estados vacíos

## 📊 Tecnologías Utilizadas

### **Frontend**

- **React Native** - Framework móvil
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **React Navigation** - Navegación

### **Testing**

- **Jest** - Framework de testing
- **React Native Testing Library** - Testing de componentes
- **React Test Renderer** - Renderizado para tests

### **Code Quality**

- **ESLint** - Linting
- **Prettier** - Formateo de código
- **TypeScript** - Verificación de tipos

## 🔄 Flujo de Desarrollo

1. **Crear feature branch** desde `main`
2. **Implementar funcionalidad** siguiendo la arquitectura por capas
3. **Escribir tests** para la nueva funcionalidad
4. **Ejecutar tests** y linting
5. **Crear Pull Request**

## 🏛️ Principios de Diseño

### **SOLID Principles**

- **Single Responsibility**: Cada clase tiene una responsabilidad
- **Open/Closed**: Abierto para extensión, cerrado para modificación
- **Liskov Substitution**: Implementaciones intercambiables
- **Interface Segregation**: Interfaces específicas
- **Dependency Inversion**: Dependencias hacia abstracciones

### **Clean Architecture Benefits**

- ✅ **Testabilidad**: Cada capa se puede testear independientemente
- ✅ **Mantenibilidad**: Código organizado y fácil de mantener
- ✅ **Escalabilidad**: Fácil agregar nuevas funcionalidades
- ✅ **Flexibilidad**: Cambiar implementaciones sin afectar otras capas

## 📱 API

La aplicación consume la [Rick and Morty API](https://rickandmortyapi.com/):

- **Base URL**: `https://rickandmortyapi.com/api`
- **Endpoints utilizados**:
  - `GET /character` - Lista de personajes
  - `GET /character/:id` - Detalle de personaje

## 🤝 Contribución

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto es de uso educativo y está bajo licencia MIT.

---

**Desarrollado con ❤️ y Clean Architecture**
