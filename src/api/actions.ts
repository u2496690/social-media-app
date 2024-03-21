import axios, { AxiosError } from "axios";

const API_URL = "https://literate-space-engine-69g6w5jjj456c5jv7-3000.app.github.dev/api";

export const getUserData = async (user: string): Promise<SocialMediaData> => {
  return new Promise<SocialMediaData>((resolve, reject) => {
    axios
      .get(`${API_URL}/userdata/${user}`)
      .then((res) => {
        resolve({
          username: user,
          pfp: res.data.pfp,
          followercount: res.data.followercount,
          followingcount: res.data.followingcount,
          postsnum: res.data.postsnum
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("User not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
