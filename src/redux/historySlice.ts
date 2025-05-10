import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchHistoryItem {
    word: string;
    timestamp: string;
}

interface HistoryState {
    searches: SearchHistoryItem[];
}

const initialState: HistoryState = {
    searches: [],
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addSearch: (state, action: PayloadAction<string>) => {
            const newSearch: SearchHistoryItem = {
                word: action.payload,
                timestamp: new Date().toISOString(),
            };
            state.searches.unshift(newSearch);
        },
        clearHistory: (state) => {
            state.searches = [];
        },
    },
});

export const { addSearch, clearHistory } = historySlice.actions;
export default historySlice.reducer;
