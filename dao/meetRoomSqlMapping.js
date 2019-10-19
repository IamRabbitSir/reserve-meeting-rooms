var meet_room = {
    insert:'insert into meet_room(meetroom_name,meetroom_addr,meetroom_num,meetroom_remark) values(?,?,?,?)',
    update:'update meet_room set meetroom_name=?,meetroom_addr=?,meetroom_num=?,meetroom_remark=? where meetroom_id=?',
    delete:'delete from meet_room where us_id=?',
    queryById:'select * from meet_room where meetroom_id=?',
    queryAll:'select * from meet_room',
    query1:'select meetroom_id,meetroom_name from meet_room'
};

module.exports = meet_room;