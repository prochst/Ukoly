const config = 'http://localhost:4000/graphql'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config: typeof config;
  }
}
export {}