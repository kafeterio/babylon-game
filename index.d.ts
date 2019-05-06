declare namespace JSX {
  interface IntrinsicElements {
    [name: string]: any
  }
  interface IntrinsicAttributes {
    [name: string]: any
  }
}

declare module "dynamic-cdn-webpack-plugin" {
  export class FOO {}
}
