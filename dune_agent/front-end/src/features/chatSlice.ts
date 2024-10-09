import { Message } from "ai"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface ChatState {
  transformedMessages: Message[]
}

const initialState: ChatState = {
  transformedMessages: [],
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setTransformedMessages: (state, action: PayloadAction<any[]>) => {
      state.transformedMessages = action.payload
    },
  },
})

export const { setTransformedMessages } = chatSlice.actions

export default chatSlice.reducer
