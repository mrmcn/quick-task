import { ListSearchParameter } from '@/lib/constants/text-const'
import { debounce } from '@/lib/utils/debounce'
import { ChangeEvent, useCallback } from 'react'
import { useUpdateUrlWithParams } from './common/use-update-url-with-params'

export function useSearchTask() {
  const queryParameter = ListSearchParameter.query
  const { valueCurrentQueryParameter, updateUrl } =
    useUpdateUrlWithParams(queryParameter)

  const debounceSearch = debounce((searchParameter) => {
    const searchParamsWithNewQuery = (params: URLSearchParams) => {
      if (searchParameter) {
        params.set(queryParameter, searchParameter)
      } else {
        params.delete(queryParameter)
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
