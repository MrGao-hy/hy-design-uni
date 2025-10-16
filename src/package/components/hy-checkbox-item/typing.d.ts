import type HyCheckboxGroupProps from "@/package/components/hy-checkbox-group/typing";

export interface ICheckboxGroupProps extends HyCheckboxGroupProps {
  setCheckedStatus: (name: string) => void;
}
