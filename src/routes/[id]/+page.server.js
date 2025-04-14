import { scrape } from '$lib'
import json from "../../../static/brands.json"

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, fetch }) => {
  const { id } = params
  const result = await scrape(json[Number(id)])

  return {
    brand: json[Number(id)],
    result,
  }
}
