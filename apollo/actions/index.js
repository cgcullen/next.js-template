import { useQuery, useMutation } from "@apollo/react-hooks"
import { HELLO } from "@/apollo/queries"

export const useHello = (id) => useQuery(HELLO, { variables: { id } })
