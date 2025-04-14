/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch }) => {
  const data = await fetch('/brands.json')
  const json = await data.json()
  return {
    initialData: json,
  }
};
