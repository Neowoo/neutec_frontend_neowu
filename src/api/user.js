import axios from "../utils/axios";

const repoList = (data) => {
  const result = new Promise((resolve, reject) => {
    axios
      .get(`/users/${data.user}/repos`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return result;
};

// eslint-disable-next-line import/prefer-default-export
export { repoList };
