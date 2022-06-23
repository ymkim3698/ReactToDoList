const express = require('express');
const router = express.Router();
const db_pool = require('../utils/db_pool');
const oracledb = require('oracledb');



router.get('/', async function(req, res){
  res.send({ result: "set comand"});
  console.log('[Server ] default');  //데이터
});

router.get('/selectUser', async function(req, res){
  try {
    const result_data = await db_pool.query("select * from TB_LSH_TEST", []);
    
    console.log('[Server ]'+result_data.rows);  //데이터
    res.send({ rs_code: "T", rs_value:result_data});
  } catch (err) {
    console.log(err)
    res.send({ rs_code: "F", rs_value:"ERROR"});
  }
});

router.get('/test', async function(req, res){
  

    var config = {
      user          :"WS_USER",
      password      : "WS_USER",
      connectString : "(DESCRIPTION =  (ADDRESS_LIST =  (ADDRESS = (PROTOCOL = TCP)(HOST = source.mainlineit.com)(PORT = 1521)) ) (CONNECT_DATA =  (SERVICE_NAME = mainline.com) ) )",
      externalAuth  : false
    };
      
    oracledb.getConnection(config, (err, connection) =>{
      
      try {
        connection.execute("select * from TB_LSH_TEST", [], function (err, result) {
          if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
          }
          console.log(result.metaData);  //테이블 스키마
          console.log(result.rows);  //데이터
          res.send({ rs_code: "T", rs_value:result});
        
        });
      } catch (err) {
        doRelease(connection);
        console.log(err)
        res.send({ rs_code: "F", rs_value:"ERROR"});
      }
    });

  });


function doRelease(connection) {
  connection.release(function (err) {
      if (err) {
          console.error(err.message);
      }
  });
}

module.exports = router;