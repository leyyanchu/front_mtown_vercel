export default defineNuxtPlugin({
  name: 'extend-ofetch',
  parallel: false,
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig();
    const opts: Parameters<typeof $fetch>[1] = {
      baseURL: (config.public.kurocoApiDomain as string) || '/',
      credentials: 'include',
    };

    const _$fetch = $fetch.create({
      onRequest(conf) {
        conf.options = {
          ...conf.options,
          ...opts,
        };
      },
    });

    // override client $fetch
    globalThis.$fetch = _$fetch;

    // override server $fetch
    const app = useNuxtApp();
    app?.ssrContext?.event?.$fetch && (app.ssrContext.event.$fetch = _$fetch);
  },
});
