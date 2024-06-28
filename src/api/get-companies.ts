import { api } from '../lib/axios'

interface Company {
  id: string
  name: string
}

export async function getCompanies() {
  const response = await api.get<Company[]>('/companies')
  const companiesSorted = response.data.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()

    if (nameA < nameB) return -1
    if (nameA > nameB) return 1

    return 0
  })

  return companiesSorted
}
