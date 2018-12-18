// @flow

const UrlHelper = require("./helper");

module.exports = class UrlBuilder {
  domain: string;
  secret: string;
  params: params;

  constructor(domain: string, secret: string) {
    this.domain = domain;
    this.secret = secret;
    this.params = {};
  }

  set programId(id: string) {
    this.params["p"] = id;
  }

  set kind(kind: string) {
    this.params["k"] = kind;
  }

  set url(url: string) {
    this.params["url"] = url;
  }

  set isAffiliate(affiliate: boolean) {
    this.params["a"] = affiliate;
  }

  set dimension1(value: ?string) {
    this.params["d1"] = value;
  }

  set dimension2(value: ?string) {
    this.params["d2"] = value;
  }

  set dimension3(value: ?string) {
    this.params["d3"] = value;
  }

  set dimension4(value: ?string) {
    this.params["d4"] = value;
  }

  set dimension5(value: ?string) {
    this.params["d5"] = value;
  }

  get createURL(): string {
    const urlHelper = new UrlHelper(this.params, this.secret);

    return "https://" + this.domain + urlHelper.query;
  }
};
