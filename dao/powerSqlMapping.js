var power = {
    insert_power:'insert into power_group(power_id,group_name,group_desc,creater,create_day) values(uuid(),?,?,?,now())',
    update_power:'update power_group set group_name=?,group_desc=?,updater=?,updater_day=now() where power_id=?',
    delete_power:'update power_group set isdelete="1" where power_id=?',
    deleteReal_power:'delete from power_group where isdelete="1"',
    //查询记录数
    queryRecords_power:'select count(0) num from power_group where isdelete ="0" or isdelete is null',
    //查询所有权限组数据（剔除已删除的数据）
    queryAll_power:'select power_id,group_name,group_desc,creater,create_day,updater,updater_day from power_group where isdelete ="0" or isdelete is null order by create_day ASC',
    //查询所有已删除的权限组数据
    queryDel_power:'select group_name,group_desc,creater,create_day,updater,updater_day from power_group where isdelete ="1" limit ?,?',
    query_powerOne:'select group_name,group_desc from power_group where power_id=?',




    queryAll_powerbbbb:'select power_id,group_name,group_desc,creater,create_day,updater,updater_day from power_group where isdelete ="0" or isdelete is null order by create_day ASC',

};

module.exports = power;