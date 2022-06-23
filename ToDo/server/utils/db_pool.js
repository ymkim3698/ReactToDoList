
const oracledb = require('oracledb');


var config = {
  user          :"WS_USER",
  password      : "WS_USER",
  connectString : "(DESCRIPTION =  (ADDRESS_LIST =  (ADDRESS = (PROTOCOL = TCP)(HOST = source.mainlineit.com)(PORT = 1521)) ) (CONNECT_DATA =  (SERVICE_NAME = mainline.com) ) )",
  externalAuth  : false
};
  
module.exports.query = async function (query, params) {
  
  let result_data = [];
  try {
    let connection = await oracledb.getConnection(config);
      
    try {
      let result = await connection.execute(query, params) ;
        result_data = result;
      } catch (err) {
        console.log(err);
      } finally {
        doRelease(connection);
      }
  } catch (e) {
    console.log(e);
  } finally {
  }
  return result_data;
}


function doRelease(connection) {
  connection.release(function (err) {
      if (err) {
          console.error(err.message);
      }
  });
}