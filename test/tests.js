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

describe("Affiliate URLs", () => {
    it("should match url with affiliate flag", () => {
        const urlBuilder = new UrlBuilder("analytics.barnebys.sh", "test");
        urlBuilder.programId = "123";
        urlBuilder.kind = "click-test";
        urlBuilder.url = "http://www.barnebys.com/";
        urlBuilder.isAffiliate = true

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
        "https://analytics.barnebys.sh/?p=123&k=impression&d1=a&d2=b&d3=c&d4=d&d5=e&s=c77633cd4932a98243a0edd86dc82d97"
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
        '<img data-src="https://analytics.barnebys.sh/?p=123&k=impression&d1=a&d2=b&d3=c&d4=d&d5=e&s=c77633cd4932a98243a0edd86dc82d97" class="" />'
      );
    });
  });
});
