import { FC, ReactElement, cloneElement } from 'react';
import { useScrollTrigger } from '@material-ui/core';

interface ElevationScrollProps {
  children: ReactElement;
}

const ElevationScroll: FC<ElevationScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 3 : 0,
  });
};

export default ElevationScroll;
