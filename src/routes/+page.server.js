import json from "../../static/brands.json"

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch }) => {
  return {
    initialData: json,
  }
};
