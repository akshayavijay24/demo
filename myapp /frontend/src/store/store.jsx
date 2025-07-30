import { configureStore, createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
  name: "vendors",
  initialState: { list: [], selected: null },
  reducers: {
    setVendors: (state, action) => {
      state.list = action.payload;
    },
    selectVendor: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setVendors, selectVendor } = vendorSlice.actions;
export default configureStore({ reducer: { vendors: vendorSlice.reducer } });
