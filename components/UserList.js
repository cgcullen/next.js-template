import {
  useGetUser,
  useGetUsers,
  useChangeRole,
  useDeleteUser,
} from "@/apollo/actions"

const UserList = () => {
  const { data: authUser, error: authError } = useGetUser()
  const { data, loading, error } = useGetUsers()
  const [
    deleteUser,
    { data: deletedUser, error: deleteError },
  ] = useDeleteUser()
  const [setChangeRole, { data: rdata, error: rerror }] = useChangeRole()
  const handleChangeRole = (e, id) => {
    setChangeRole({ variables: { id, role: e.target.value } })
  }
  const handleDelete = (id) => {
    if (confirm("are you sure you want to delete this user?"))
      deleteUser({ variables: { id } })
  }
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        {data &&
          data.users.map((user) => (
            <li key={user.id}>
              <a
                href="#"
                className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                          {user.firstname} {user.lastname}
                        </div>
                        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <div className="text-sm leading-5 text-gray-900">
                            {user.id == authUser.user.id && (
                              <span>
                                {user.role
                                  .toLowerCase()
                                  .replace(/(?<= )[^\s]|^./g, (a) =>
                                    a.toUpperCase()
                                  )}
                              </span>
                            )}
                            {user.id !== authUser.user.id && (
                              <select
                                name="role"
                                value={user.role}
                                onChange={(e) => handleChangeRole(e, user.id)}
                              >
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                              </select>
                            )}
                          </div>
                          <div>
                            <time dateTime="2020-01-07">January 7, 2020</time>
                          </div>
                          <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            ></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {authUser.user.id !== user.id && (
                    <div onClick={() => handleDelete(user.id)}>
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default UserList
