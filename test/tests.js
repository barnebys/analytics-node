const assert = require("assert");

const { UrlBuilder, Impression } = require("../lib");

describe("URL Builder", () => {
  it("should match url with dimensions", () => {
    const urlBuilder = new UrlBuilder("analytics.barnebys.sh", "test");
    urlBuilder.programId = "123";
    urlBuilder.kind = "click-test";
    urlBuilder.url = "http://www.barnebys.com/";
    urlBuilder.dimension1 = "a";
    urlBuilder.dimension2 = "b";
    urlBuilder.dimension3 = "c";

    assert.equal(
      urlBuilder.createURL(),
      "https://analytics.barnebys.sh/?p=123&k=click-test&url=http%3A%2F%2Fwww.barnebys.com%2F&d1=a&d2=b&d3=c&s=3ea175e5980c6f1f13a46e7aade1b622"
    );
  });
});

describe("URL Builder with sponsored flag", () => {
  it("should match url with dimensions & sponsored", () => {
    const urlBuilder = new UrlBuilder("analytics.barnebys.sh", "test");
    urlBuilder.programId = "123";
    urlBuilder.kind = "click-test";
    urlBuilder.url = "http://www.barnebys.com/";
    urlBuilder.dimension1 = "a";
    urlBuilder.dimension2 = "b";
    urlBuilder.dimension3 = "c";
    urlBuilder.isSponsored = true;

    assert.equal(
      urlBuilder.createURL(),
      "https://analytics.barnebys.sh/?p=123&k=click-test&url=http%3A%2F%2Fwww.barnebys.com%2F&d1=a&d2=b&d3=c&sp=1&s=e2636749cbc87781f14c908f14faf2c0"
    );
  });
  it("should handle dealType dimension", () => {
    const urlBuilder = new UrlBuilder("analytics.barnebys.sh", "test");
    urlBuilder.programId = "123";
    urlBuilder.kind = "click-test";
    urlBuilder.url = "http://www.barnebys.com/";
    urlBuilder.dimension1 = "a";
    urlBuilder.dimension2 = "b";
    urlBuilder.dimension3 = "c";
    urlBuilder.isSponsored = true;
    urlBuilder.dealType = "1";

    assert.equal(
      urlBuilder.createURL(),
      "https://analytics.barnebys.sh/?p=123&k=click-test&url=http%3A%2F%2Fwww.barnebys.com%2F&d1=a&d2=b&d3=c&sp=1&dt=1&s=db8c86fbbf9dce90b837a976feff302b"
    );
  });
});

describe("Affiliate URLs 1", () => {
  it("should match url with affiliate flag", () => {
    const urlBuilder = new UrlBuilder("analytics.barnebys.sh", "test");
    urlBuilder.programId = "123";
    urlBuilder.kind = "click-test";
    urlBuilder.url = "http://www.barnebys.com/";
    urlBuilder.isAffiliate = true;

    assert.equal(
      urlBuilder.createURL(),
      "https://analytics.barnebys.sh/?p=123&k=click-test&url=http%3A%2F%2Fwww.barnebys.com%2F&a=1&s=840aac412069de81e28ad99b8739bbb3"
    );
  });
});

describe("Affiliate URLs 2", () => {
  it("should match url with affiliate flag", () => {
    const urlBuilder = new UrlBuilder("analytics.barnebys.sh", "test");
    urlBuilder.programId = "123";
    urlBuilder.kind = "click-test";
    urlBuilder.url = "http://www.barnebys.com/";
    urlBuilder.affiliate = true;

    assert.equal(
      urlBuilder.createURL(),
      "https://analytics.barnebys.sh/?p=123&k=click-test&url=http%3A%2F%2Fwww.barnebys.com%2F&a=1&s=840aac412069de81e28ad99b8739bbb3"
    );
  });
});

describe("Impression", () => {
  describe("Build URL", () => {
    it("should match url with dimensions", () => {
      const urlBuilder = new UrlBuilder("analytics.barnebys.sh", "test");
      const impression = new Impression(
        urlBuilder,
        "123",
        "a",
        "b",
        "c",
        "d",
        "e"
      );

      assert.equal(
        impression.url,
        "https://analytics.barnebys.sh/?p=123&k=impression&d1=a&d2=b&d3=c&d4=d&d5=e&sp=0&s=d76dec529c1a2bc523ecdf1be4fbc035"
      );
    });
  });

  describe("Image tag", () => {
    it("should match image tag", () => {
      const urlBuilder = new UrlBuilder("analytics.barnebys.sh", "test");
      const impression = new Impression(
        urlBuilder,
        "123",
        "a",
        "b",
        "c",
        "d",
        "e"
      );

      assert.equal(
        impression.image,
        '<img data-src="https://analytics.barnebys.sh/?p=123&k=impression&d1=a&d2=b&d3=c&d4=d&d5=e&sp=0&s=d76dec529c1a2bc523ecdf1be4fbc035" class="" />'
      );
    });
  });
});
