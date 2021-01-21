import {
  borders,
  compose,
  css,
  display,
  flexbox,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
} from '@material-ui/system';
import { styled } from '@material-ui/styles';

const innerStyleFunction = css(
  compose(borders, display, flexbox, positions, palette, shadows, sizing, spacing, typography),
) as any;

const styleFunction = (props: any) => ({
  '&&': innerStyleFunction(props),
});

styleFunction.filterProps = innerStyleFunction.filterProps;

const Box = styled('div')(styleFunction, {
  name: 'MuiBox',
});

export default Box;
