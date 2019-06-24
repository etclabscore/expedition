import * as React from "react";

import "./Header.css";

interface IProps {
  //
}

const styles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

function Header(prop: IProps) {
  return (
    <div style={styles}>
      <div>Explorer</div>
    </div>
  );
}

export default Header;
