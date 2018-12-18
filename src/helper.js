// @flow

//const md5 = require("md5");
const crypto = require("crypto");
const querystring = require("querystring");

module.exports = class UrlHelper {
  secret: string;
  params: params;

  constructor(params: params, secret: string) {
    this.secret = secret;
    this.params = params;
  }

  get query(): string {
    const query = "/?" + querystring.stringify(this.params);
    return (
      query +
      "&s=" +
      crypto
        .createHash("md5")
        .update(this.secret + query)
        .digest("hex")
    );
  }
};
