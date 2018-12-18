// @flow

const util = require("util");
const UrlBuilder = require("./builder");

module.exports = class Impression {
  buildURL: string;

  constructor(
    UrlBuilder: UrlBuilder,
    programId: string,
    dimension1: ?string,
    dimension2: ?string,
    dimension3: ?string,
    dimension4: ?string,
    dimension5: ?string
  ) {
    UrlBuilder.programId = programId;
    UrlBuilder.kind = "impression";
    UrlBuilder.dimension1 = dimension1;
    UrlBuilder.dimension2 = dimension2;
    UrlBuilder.dimension3 = dimension3;
    UrlBuilder.dimension4 = dimension4;
    UrlBuilder.dimension5 = dimension5;
    this.buildURL = UrlBuilder.createURL;
  }

  get url() {
    return this.buildURL;
  }

  get image() {
    return util.format('<img data-src="%s" class="" />', this.url);
  }
};
