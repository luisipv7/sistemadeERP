// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
module.exports = function(app, cb) {
  let lbTables = {
    db: [
      'ACL',
      'RoleMapping',
      'Role',
      'AccessToken',
      'produto',
    ],
  };
  console.log('\x1b[35m\n%s\n\x1b[0m', 'Atualizando o banco de dados...');
  app.dataSources.db.autoupdate(lbTables.db, err => {
    if (err) throw err;
  });
  process.nextTick(cb);
};

