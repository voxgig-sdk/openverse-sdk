
import { Context } from './Context'


class OpenverseError extends Error {

  isOpenverseError = true

  sdk = 'Openverse'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OpenverseError
}

