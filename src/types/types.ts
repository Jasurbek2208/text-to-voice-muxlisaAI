import store from "../store/store";

export interface IRootState {
  store: ReturnType<typeof store>;
}

export interface IMessageConfigs {
  date: string;
  value: string;
}

export interface ITextToVoiceHistory {
  type?: string;
  id: string;
  request: IMessageConfigs;
  response: IMessageConfigs;
}