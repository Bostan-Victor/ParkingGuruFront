// styled.d.ts
import 'styled-components';

interface Theme {
  [key: string]: {
    [key: string]: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
