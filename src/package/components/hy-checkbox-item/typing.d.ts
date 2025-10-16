import type HyCheckboxGroupProps from "@/package/components/hy-checkbox-group/typing";
import type { ToRefs } from "vue";

export interface ICheckboxGroupContext extends ToRefs<HyCheckboxGroupProps> {
  setCheckedStatus: (name: string | number) => void;
}
