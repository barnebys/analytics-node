// @flow

const md5 = require("md5");
const httpBuildQuery = require("http-build-query");

module.exports = class UrlHelper {
  secret: string;
  params: params;

  constructor(params: params, secret: string) {
    this.secret = secret;
    this.params = params;
  }

  get query(): string {
    const query = "/?" + httpBuildQuery(this.params);
    return query + "&s=" + md5(this.secret + query);
  }
};
