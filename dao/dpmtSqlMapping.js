var organization = {
    insert_ct:'insert into center_info(ct_id,ct_name,creater,create_day) values(uuid(),?,?,now())',
    update_ct:'update center_info set ct_name=?,updater=?,updater_day=now() where ct_id=?',
    delete_ct:'update center_info set isdelete="1" where ct_id=?',
    queryAll_ct:'select ct_name,creater,create_day,updater,updater_day from meet_app',

    insert_team:'insert into user_team(team_id,team_name,ct_id,creater,create_day) values(uuid(),?,?,?,now())',
    update_team:'update user_team set team_name=?,ct_id=?,updater=?,updater_day=now() where team_id=?',
    delete_team:'update user_team set isdelete="1" where team_id=?',
    queryAll_team:'select team_name,ct_id,creater,create_day,updater,updater_day from user_team'
};

module.exports = organization;