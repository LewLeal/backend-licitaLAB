const config = require("config/database/config");
const getConfig = require("config/database/getConfig");

describe("config/database/getConfig", () => {
  test("get data config of 'test'", () => {
    expect( getConfig('test') ).toBe( config.test );
  });

  test("get data config of 'unknow'", () => {
    expect( getConfig('unknow')  ).toBe( config.development );
  });
});
