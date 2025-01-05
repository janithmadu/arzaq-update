import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  data: Record<string, any>;
  errors: Record<string, any>;
}

const initialState: FormState = {
  data: {},
  errors: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<Record<string, any>>) {
      state.data = { ...state.data, ...action.payload };
    },
    setFormErrors(state, action: PayloadAction<Record<string, any>>) {
      state.errors = { ...state.errors, ...action.payload };
    },
    resetFormState(state) {
      state.data = {};
      state.errors = {};
    },
  },
});

export const { setFormData, setFormErrors, resetFormState } = formSlice.actions;
export default formSlice.reducer;
