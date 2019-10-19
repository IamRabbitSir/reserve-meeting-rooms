var param = {
    insert:'insert into param_time(meet_continued_time) values(?)',
    update:'update param_time set meet_continued_time=? where param_id=?',
    delete:'delete from param_time where param_id=?',
    queryById:'select * from param_time where param_id=?',
    queryAll:'select * from param_time',
    queryMeetTime:'select meet_continued_time from param_time',

    insert1:'insert into param_style(meet_style) values(?)',
    update1:'update param_style set meet_style=? where param_id=?',
    delete1:'delete from param_style where param_id=?',
    queryById1:'select * from param_style where param_id=?',
    queryAll1:'select * from param_style',
    queryMeetStyle:'select meet_style from param_style',

};

module.exports = param;
