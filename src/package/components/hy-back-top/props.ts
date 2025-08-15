import type IProps from "./typing";

const defaultProps: IProps = {
  mode: "circle",
  icon: {},
  text: "",
  duration: 500,
  scrollTop: 0,
  top: 400,
  bottom: 100,
  right: 20,
  zIndex: 888,
  customStyle: {
    transform: "rotate(180deg)",
  },
};

export default defaultProps;
