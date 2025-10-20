# React Redux vs Zustand Comparison

A practical demonstration project showcasing how to migrate from Redux Toolkit to Zustand for state management in React applications. This project implements the same functionality using both state management solutions to highlight the differences in complexity, boilerplate, and developer experience.

## 🎯 Project Overview

This application is a video course player with the following features:
- Course modules and lessons navigation
- Video playback interface
- Progress tracking
- Responsive design with Tailwind CSS

The project demonstrates the same functionality implemented with:
- **Redux Toolkit** (`/src/store/`) - Traditional Redux with modern tooling
- **Zustand** (`/src/zustand-store/`) - Minimalist state management

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start mock API server (in another terminal)
npm run server

# Run tests
npm test

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # React components
├── lib/                # Utilities (axios config)
├── pages/              # Page components
├── store/              # Redux Toolkit implementation
│   ├── slices/         # Redux slices
│   └── index.ts        # Store configuration
├── zustand-store/      # Zustand implementation
│   ├── index.ts        # Zustand store
│   └── store.spec.ts   # Tests
└── styles/             # Global styles
```

## 🔧 State Management Comparison

### Redux Toolkit Implementation

**Location**: `/src/store/slices/player.ts`

```typescript
// Store setup with reducers and async thunks
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLessonIndex = action.payload[1];
    },
    next: (state) => { /* complex logic */ }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });
    // ... more reducers
  }
});

// Component usage
const dispatch = useAppDispatch();
const { course, isLoading } = useAppSelector(state => state.player);
```

### Zustand Implementation

**Location**: `/src/zustand-store/index.ts`

```typescript
// Simple store setup with direct state and actions
export const useStore = create<PlayerStore>((set, get) => ({
  course: null,
  isLoading: true,
  
  load: async () => {
    set({ isLoading: true });
    const { data } = await api.get("/courses/1");
    set({ course: data, isLoading: false });
  },
  
  play: (moduleAndLessonIndex) => {
    set({
      currentModuleIndex: moduleAndLessonIndex[0],
      currentLessonIndex: moduleAndLessonIndex[1],
    });
  }
}));

// Component usage
const course = useStore(state => state.course);
const load = useStore(state => state.load);
```

## 📊 Key Differences

| Aspect | Redux Toolkit | Zustand |
|--------|---------------|---------|
| **Boilerplate** | Requires slices, reducers, actions, thunks | Direct state and actions in one place |
| **Setup** | Store configuration, providers, types | Simple create() call |
| **Async Handling** | createAsyncThunk + extraReducers | Direct async actions |
| **Type Safety** | Requires explicit type definitions | Built-in TypeScript inference |
| **Bundle Size** | ~47KB | ~2.9KB |
| **Learning Curve** | Moderate (Redux concepts) | Minimal (hooks-based) |
| **DevTools** | Built-in Redux DevTools | Optional DevTools integration |

## 🔄 Migration Benefits

1. **Reduced Boilerplate**: ~60% less code for the same functionality
2. **Simpler Mental Model**: No actions, reducers, or thunks to manage
3. **Better TypeScript Support**: Automatic type inference
4. **Performance**: No Provider wrapper, optimized re-renders
5. **Bundle Size**: Significantly smaller footprint

## 🧪 Testing

Both implementations include comprehensive tests:
- Redux tests: `/src/store/slices/player.spec.ts`
- Zustand tests: `/src/zustand-store/store.spec.ts`

Run tests with:
```bash
npm test
```

## 📚 Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management (comparison)
- **Zustand** - State management (demonstration)
- **Axios** - HTTP client
- **Vitest** - Testing framework
- **JSON Server** - Mock API

## 🎯 Learning Objectives

This project helps developers understand:
- How Redux Toolkit simplifies traditional Redux
- The architectural differences between Redux and Zustand
- Migration strategies from Redux to Zustand
- Performance and developer experience trade-offs
- When to choose each state management solution

## 🤝 Contributing

This is an educational project. Feel free to explore the code, run the examples, and compare the different approaches to state management.
