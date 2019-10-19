//dao/userSqlMapping.js
//Sql语句
var user_info = {
    insert:'insert into user_info(us_id,us_account,us_psw,us_name,us_sex,us_phone,us_email,team_id,us_position,can_del,creater,create_day) values(uuid(),?,?,?,?,?,?,?,?,?,?,now())',
    update:'update user_info set us_account=?,us_psw=?,us_name=?,us_sex=?,us_phone=?,us_email=?,team_id=?,us_position=? where us_id=?',
    delete:'delete from user_info where us_id=?',
    queryById:'select * from user_info where us_id=?',
    queryById_group:'select B.power_id,B.group_name from user_info A left join power_group B on A.power_id=B.power_id where us_id=?',
    queryAll:'select * from user_info',
    queryByUs_account:'select * from user_info where us_account=?',
    queryByA_P:'select * from user_info where us_account=? and us_psw=?',
    queryAllName:"select B.team_name,A.us_name from user_info A inner join user_team B on A.team_id = B.team_id where A.us_name != '管理员';",

    insert1:'insert into user_team(team_name,us_management) values(?,?)',
    update1:'update user_team set team_name=?,us_management=? where team_id=?',
    delete1:'delete from user_team where team_id=?',
    queryById1:'select * from user_team where team_id=?',
    queryAll1:'select * from user_team',
    queryDepartment:'select team_id,team_name from user_team',
};

module.exports = user_info;