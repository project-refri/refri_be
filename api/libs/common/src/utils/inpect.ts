import * as util from 'util';

export function inspect(obj) {
  return util.inspect(obj, { showHidden: true, depth: null, colors: true });
}
