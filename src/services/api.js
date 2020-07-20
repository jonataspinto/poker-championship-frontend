import axios from "axios";

export const api = axios.create({ baseURL: "https://poker-champioship.herokuapp.com/api" });
