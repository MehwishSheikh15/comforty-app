import { createClient } from "next-sanity";

const client = createClient({
    projectId : "w45g6e77",
    dataset : "production",
    useCdn : true,
    apiVersion : "2023-10-10",
    token: "skFvaRxzlD709nu7cNzbOFZGhzoVomVTd2xm7MG7CeJbBbzkZz65nbhO5K91WCK3T9fLZXF4XJpr3v7yzse9K1yQYWWh4Bgfkvrl0e2XSu44SBsK2qGFf8tZmRLQsL6iCEuSZe3jtIuZAPBHoqgi2Bag1KXDkOUp5l1tbb7Eoazk3k2g43PT"
})

export async function sanityFetch({query, params = {}}: {query : string ,params?: any}){
    return await client.fetch(query, params)
}
    
