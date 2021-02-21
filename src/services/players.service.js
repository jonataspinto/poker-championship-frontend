import { api } from "./api";
// import dataMock from "./_mock";

export const fetch = async () => {
  const res = await api.get("/player");
  return {
    players: res.data.data,
  };
};

// /* develop */
// export const fetch = async () => dataMock;
