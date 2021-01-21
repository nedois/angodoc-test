import React, { FC } from 'react';

import useStyles from './styles';

const FullPageLoader: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.loader}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default FullPageLoader;
