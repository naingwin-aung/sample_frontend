import api from "../axios"

export const ListPierQueryOption = (search: string, page: number, limit: number) => {
    return {
        queryKey: ['piers', search, page, limit],
        queryFn: () => fetchPiers(search, page, limit),
    }
}

const fetchPiers = async (search: string, page: number, limit: number) => {
    const response = await api.get(`/piers`, {
        params: {
            search,
            page,
            limit,
        }
    });

    return response.data.data;
}