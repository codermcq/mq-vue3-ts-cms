import { postEntrieDepartments, postEntrieMenus, postEntrieRoles } from "@/service/main/main";
import { defineStore } from "pinia";

interface IMainState {
  entrieRoles: any[]
  entrieDepartments: any[]
  entrieMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entrieRoles: [],
    entrieDepartments: [],
    entrieMenus: []
  }),
  actions: {
    async fetchEntrieDataAction() {
      const rolesResult = await postEntrieRoles()
      const departmentsResult = await postEntrieDepartments()
      const menusResult = await postEntrieMenus()

      this.entrieRoles = rolesResult.data.list
      this.entrieDepartments = departmentsResult.data.list
      this.entrieMenus = menusResult.data.list
    }
  }
})

export default useMainStore
