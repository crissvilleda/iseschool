export const get = (obj, path, defaultValue = undefined) => {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function isEmpty(value) {
  if (value != "" && value != undefined && value != null) return false;
  return true;
}
