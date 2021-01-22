import glob from "glob";

export async function getPathsLongerThan(basePath, length) {
  const paths = await getPaths(basePath);

  return paths
    .filter((path) => path)
    .filter((path) => path.length > length)
    .map((path) => ({
      length: path.length,
      path: path,
    }));
}

export function getPaths(basePath) {
  const path = `${basePath.trimEnd("/")}/**/*`;
  const options = {
    ignore: "./**/node_modules/**/*",
  };

  return new Promise((resolve, reject) => {
    glob(path, options, (error, paths) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(paths);
    });
  });
}
