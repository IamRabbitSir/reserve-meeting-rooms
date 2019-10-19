var menu = {
    insertMenu:'insert into menu_info(menu_id,menu_name,menu_level,menu_parent_id,menu_path,isEnable,allowEdit,allowDelete,sortCode,comment,creater,create_day) values(uuid(),?,?,?,?,?,?,?,?,?,?,now())',
    //超级管理员组使用 isEnable表示是否启用(1和null启用) menu_level表示菜单等级(0一级菜单 1二级菜单)
    queryMenuOne:'select sortCode,menu_id,menu_name from menu_info where (isEnable="1" or isEnable is null) and (isdelete="0" or isdelete is null) and menu_level="0" order by sortCode asc',
    queryMenuTwo:'select sortCode,menu_id,menu_name,menu_parent_id,menu_path from menu_info where (isEnable="1" or isEnable is null) and (isdelete="0" or isdelete is null) and menu_level="1" order by sortCode asc',

    //其他组按照分配的菜单权限
    queryMenuOneMy:'select B.sortCode,B.menu_id,B.menu_name from power_menu A left join menu_info B on A.menu_id=B.menu_id where A.power_id=? and (B.isEnable="1" or B.isEnable is null) and (B.isdelete="0" or B.isdelete is null) and B.menu_level="0" order by B.sortCode asc',
    queryMenuTwoMy:'select B.sortCode,B.menu_id,B.menu_name,menu_parent_id,menu_path from power_menu A left join menu_info B on A.menu_id=B.menu_id where A.power_id=? and (B.isEnable="1" or B.isEnable is null) and (B.isdelete="0" or B.isdelete is null) and B.menu_level="1" order by B.sortCode asc',

    //根据url查询1级菜单和2级菜单名称
    queryMenuName:'select A.menu_name twoMenu,B.menu_name oneMenu,A.menu_jade from menu_info A  left join menu_info B on B.menu_id = A.menu_parent_id where A.menu_path = ?',

};

module.exports = menu;