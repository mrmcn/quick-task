import { debounce } from '@/lib/utils/debounce'
import { ChangeEvent, useCallback } from 'react'
import { useUpdateUrlWithParams } from './common/use-update-url-with-params'

export function useSearchTask() {
  const { valueCurrentQueryParameter, updateUrl } =
    useUpdateUrlWithParams('query')

  const debounceSearch = debounce((searchParameter) => {
    const searchParamsWithNewQuery = (params: URLSearchParams) => {
      if (searchParameter) {
        params.set('query', searchParameter)
      } else {
        params.delete('query')
      }
    }
    updateUrl(1, searchParamsWithNewQuery)
  })

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      debounceSearch(e.target.value)
    },
    [debounceSearch],
  )

  return { handleSearch, query: valueCurrentQueryParameter }
}
