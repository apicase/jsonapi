import normalize from "json-api-normalize"

export const jsonApiPlugin = function jsonApiPlugin(service) {
  return service.extend({
    hooks: {
      done: function jsonApiDoneHook(ctx) {
        if (!ctx.meta.normalize) return next(ctx.result)
        ctx.result.rawBody = ctx.result.body
        ctx.result.body = normalize(ctx.result.body, ctx.meta.normalize)
        next(ctx.result)
      }
    }
  })
}
