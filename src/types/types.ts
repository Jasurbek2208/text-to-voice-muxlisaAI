import store from "src/store/store";

export interface IRootState {
  store: ReturnType<typeof store>;
}

export interface IMessageConfigs {
  date: string;
  value: string;
}

export interface ITextToVoiceHistory {
  id: string;
  request: IMessageConfigs;
  response: IMessageConfigs;
}