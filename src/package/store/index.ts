import { createPinia } from "pinia";
import { createUnistorage } from "pinia-plugin-unistorage"; // 数据持久化

const store = createPinia();
store.use(createUnistorage());

export default store;

export * from "./userInfo";
