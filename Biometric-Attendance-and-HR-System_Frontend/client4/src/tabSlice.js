import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'Profile',
  activeSubTab: 'Personal Information',
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveSubTab: (state, action) => {
      state.activeSubTab = action.payload;
    },
  },
});

export const { setActiveTab, setActiveSubTab } = tabSlice.actions;
export default tabSlice.reducer;
