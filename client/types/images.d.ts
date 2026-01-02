declare module '*.png' {
  const value: number;
  export default value;
}
declare module '*.jpg' {
  const value: number;
  export default value;
}
declare module '*.jpeg' {
  const value: number;
  export default value;
}
declare module '*.svg' {
  import * as React from 'react';
  const content: React.FC<any> | number;
  export default content;
}