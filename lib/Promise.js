export default function async(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, resolve, reject);
    });
  };
}
