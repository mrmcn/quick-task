import Await from '@/lib/components/await'
import { ListError } from '@/lib/constants/text-const'
import { FetchData } from '@/lib/services/queries/task'
import Skeleton from '@mui/material/Skeleton'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Suspense } from 'react'

export default function TypographyWithSuspense({
  props,
  userDataPromise,
}: TypographyWithSuspenseProps) {
  return (
    <Typography {...props}>
      <Suspense fallback={<Skeleton width={50} />}>
        <Await promise={userDataPromise}>
          <Data />
        </Await>
      </Suspense>
    </Typography>
  )
}

function Data({ data }: DataProps) {
  const userData = data ?? ListError.dataError
  return <>{userData}</>
}

interface TypographyWithSuspenseProps {
  props: TypographyProps
  userDataPromise: FetchData<string>
}

interface DataProps {
  data?: string
}
