import store from "src/store/store";

export interface IRootState {
  store: ReturnType<typeof store>;
}

export interface ITextToVoiceHistory {
  id: string;
  request: string;
  response: any;
}