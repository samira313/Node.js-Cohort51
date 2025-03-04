import dotenv from "dotenv";
dotenv.config();

export default { 
    BASE_URL:process.env.BASE_URL,
    API_KEY:process.env.API_KEY,
};
