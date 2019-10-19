var power_menu = {
    power_add_menu:'insert into power_menu (power_menu_id,power_id,menu_id,creater,create_day) values(uuid(),?,?,?,now())',
    power_update_menu:'update power_menu set power_id=?,menu_id=?,updater=?,updater_day=now() where power_menu_id=?',
    power_del_menu:'update power_menu set isdelete="1" where power_id=?',
    deleteReal_power:'delete from power_group where isdelete="1"',



};

module.exports = power_menu;