import { scrape } from '$lib'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, fetch }) => {
  const { id } = params
  const data = await fetch('/brands.json')
  /**
   * @type {{ brand: string, url: string }[]}
   */
  const json = await data.json()
  const result = await scrape(json[Number(id)])

  return {
    brand: json[Number(id)],
    result,
  }
}
