import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

function loadLocalRoutes() {
  // 1.动态获取所有的路由对象, 放到对象中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1.读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*ts', {
    eager: true
  })
  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        if (!routes.find(item => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  const breadcrumbs: any[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }

  return breadcrumbs
}

/**
 *
 * @param menuList
 */
export function mapMenusListToIds(menuList: any[]) {
  // for (const itemX of menuList) {
  //   if (!itemX.children) continue
  //   for (const itemY of itemX.children) {
  //     if (!itemY.children) continue

  //   }
  // }
  const ids: any[] = []

  function recurseGetId(menu: any[]) {
    for (const item of menu) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

export function mapMenusListToPermissions(menuList: any[]) {
  const permissions: string[] = []
  function recurseGetPermmission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3 && item.permissions) {
        permissions.push(item.permissions)
      } else {
        recurseGetPermmission(item.children ?? [])
      }
    }
  }
  recurseGetPermmission(menuList)

  return permissions
}
