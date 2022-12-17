import React from 'react';

import { ibg, isWebp } from '../../js/modules/functions';

const NotFoundBlock = () => {
  React.useEffect(() => {
    ibg();
    isWebp();
  }, []);

  return (
    <div
      style={{
        height: '100%',
        flex: '1 1 auto',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <h1 style={{ fontSize: '38px' }}>
        Page Not Found <b>404</b>
      </h1>
    </div>
  );
};

export default NotFoundBlock;
