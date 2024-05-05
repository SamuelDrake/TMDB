import httpInstance from "../httpInstance";

export const getPopularMovies = async () => {
    try {
        const endpoint = `popular?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
        const response = await httpInstance.get(endpoint);
        return { data: response.data, error: null };
    } catch (err: unknown) {
        let errorMessage = 'An unexpected error occurred';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return { data: null, error: errorMessage };
    }
}
