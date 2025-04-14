import { scrape } from '$lib'
import json from "../../../static/brands.json"

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, fetch }) => {
  const { id } = params
  let result = await scrape(fetch, json[Number(id)])

  return {
    brand: json[Number(id)],
    result,
  }
}
