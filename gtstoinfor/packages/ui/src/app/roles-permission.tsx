
export interface RolePermissionProps {
    role: string;
    menus: string[];
    submenus: string[];
    scopes:string[];
}
export function RolePermission(role:string,menu:string,subMenu:string,scope:string){
    let logInUserData = JSON.parse(localStorage.getItem('currentUser'))

    // checkAccessScope(role:string,menus:string[],subMenus:string[],scopes:string[]) {
        const accessFlag = logInUserData.menuAccessObject.find(item => item.menuName == menu).subMenuData.find(submenuItem => submenuItem.subMenuName == subMenu).scopes
        const scopeCheck = accessFlag.includes(scope)
      //   console.log(accessFlag,'==================')
        return  scopeCheck
    // }


}

export default RolePermission