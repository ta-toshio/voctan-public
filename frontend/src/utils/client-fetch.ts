
export const fetcher = async (path: string, option?: RequestInit) => {
  const res = await fetch(path, option)
  return await res.json()
}

