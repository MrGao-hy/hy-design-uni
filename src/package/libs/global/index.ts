import type { App } from "vue";
import registerProperties from "./register-properties";

export const globalRegister = (app: App): void => {
  app.use(registerProperties);
};
