import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks"
import { HELLO, LOGIN, LOGOUT, GET_USER, REGISTER } from "@/apollo/queries"

export const useHello = (id) => useQuery(HELLO, { variables: { id } })
export const useRegister = () => useMutation(REGISTER)
export const useLogin = () =>
  useMutation(LOGIN, {
    update(cache, { data: { logIn: loggedInUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: loggedInUser },
      })
    },
  })
export const useLogout = () => useMutation(LOGOUT)
export const useLazyGetUser = () => useLazyQuery(GET_USER)
export const useGetUser = () => useQuery(GET_USER)
