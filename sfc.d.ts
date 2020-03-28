declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.module.css?module' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss?module' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}
