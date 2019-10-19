var meet_app = {
    insert:'insert into meet_app(meet_title,meet_content,meet_time,start_time,end_time,us_email,us_depart_id,us_position) values(?,?,?,?,?,?,?,?)',
    update:'update meet_app set us_account=?,us_psw=?,us_name=?,us_sex=?,us_phone=?,us_email=?,us_depart_id=?,us_position=? where meet_id=?',
    delete:'delete from meet_app where meet_id=?',
    queryById:'select * from meet_app where meet_id=?',
    queryAll:'select * from meet_app',
    queryByMeet_title:'select * from meet_app where meet_title like ?'
};

module.exports = meet_app;