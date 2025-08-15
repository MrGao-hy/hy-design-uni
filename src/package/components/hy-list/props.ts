import type IProps from "./typing";

const defaultProps: IProps = {
  list: [],
  containerHeight: "100%",
  itemHeight: 50,
  marginBottom: 10,
  padding: 10,
  borderRadius: "3px",
  background: "transparent",
  border: false,
  line: 1,
  keyField: "id",
  load: "loadMore",
  showDivider: true,
};

export default defaultProps;
