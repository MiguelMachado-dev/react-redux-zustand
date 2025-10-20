import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

type Module = {
  id: number;
  title: string;
  lessons: Lesson[];
};
type Lesson = {
  id: string;
  title: string;
  duration: string;
};

type Course = {
  id: number;
  modules: Module[];
};

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
};

// Async actions (thunks)
export const loadCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get("/courses/1");

  return response.data as Course;
});

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLessonIndex = action.payload[1];
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[
          nextLessonIndex
        ];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex];

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLessonIndex = 0;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = true;
    });
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { course, currentLessonIndex, currentModuleIndex } = state.player;

    const currentModule = course?.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    // This creates a new object every time
    return { currentModule, currentLesson };
  }, shallowEqual);
};
