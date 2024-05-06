import httpInstance from "../httpInstance";

export const getUpcoming = async () => {
    try {
        const response = await httpInstance.get(`/movie/upcoming?api_key=${process.env.REACT_APP_MDB_API_KEY}`);
        return { data: response.data, error: null };
    } catch (error: any) {
        return { data: null, error: error.message || "An unexpected error occurred" };
    }
};
