import { fetchOptions } from "./options.fetch"

export const ListOptionQueryOption = (slug: string, option_id: number) => {
    return {
        queryKey: ['options', slug, option_id],
        queryFn: () => fetchOptions(slug, option_id),
    }
}