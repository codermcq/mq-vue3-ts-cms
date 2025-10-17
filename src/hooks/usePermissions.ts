import useLoginStore from '@/stores/login/login'

function usePermissions(permissionsID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  if (permissions && permissions.length > 0) {
    return permissions.find((item) => item?.includes(permissionsID))
  }
  return false
}

export default usePermissions
