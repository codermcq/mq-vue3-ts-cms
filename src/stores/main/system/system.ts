import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData
} from '@/service/main/system/sysytem'
import { defineStore } from 'pinia'
import useMainStore from '../main'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number
  pageList: any[]
  pageTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUserListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)

      // 重新请求新的数据
      this.postUsersListAction({ ofset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)

      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: any) {
      const deleteResult = await deletePageById(pageName, id)

      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)

      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 新建之后获取新的数据
      const mainStore = useMainStore()
      mainStore.fetchEntrieDataAction()
    },
    async editPageDateAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)

      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 编辑之后获取新的数据
      const mainStore = useMainStore()
      mainStore.fetchEntrieDataAction()
    }
  }
})

export default useSystemStore
