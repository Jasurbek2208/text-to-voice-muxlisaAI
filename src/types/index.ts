import React from "react";
import store from "@store/store";

export interface IRootState {
  store: ReturnType<typeof store>;
}

export interface IMessageConfigs {
  id?: string;
  date: string;
  value: string;
}

export interface ITextToVoiceHistory {
  type?: string;
  id: string;
  request: IMessageConfigs;
  response: IMessageConfigs;
}

export interface IRoute {
  path: string;
  element: React.ReactNode;
}

export interface IVerifyAccountParams {
  verifyId: string;
  email: string;
}

export interface IDeleteUserParams {
  verifyId: string;
  userToken?: string;
}