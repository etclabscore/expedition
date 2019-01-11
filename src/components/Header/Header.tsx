import * as React from 'react';

import './Header.css';

interface Props {}

const styles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

function Header(prop: Props) {
  return (
    <div style={styles}>
      <div>Emerald Tool</div>
    </div>
  );
}

export default Header;