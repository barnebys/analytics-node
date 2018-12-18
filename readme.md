[![Latest Stable Version](https://poser.pugx.org/barnebys/analytics-node/v/stable)](https://packagist.org/packages/barnebys/analytics-node)
[![Build Status](https://travis-ci.org/barnebys/analytics-node.svg?branch=master)](https://travis-ci.org/barnebys/analytics-node)


# Barnebys Analytics

This is an helper for Node to build tracking URL for [Barnebys Analytics](https://github.com/barnebys/analytics) with ease.

## Install

`yarn install @barnebys/analytics-node`

## Track clicks

```
// Create the URL Builder with your tracking domain & secret
const { UrlBuilder } = require("@barnebys/analytics-node");
const urlBuilder = new UrlBuilder("analytics.mydomain.sh", "secret");

urlBuilder.programId = "123";
urlBuilder.kind = "click";
urlBuilder.url = "http://www.barnebys.com/";
urlBuilder.dimension1 = "a";
urlBuilder.dimension2 = "b";
urlBuilder.dimension3 = "c";

// Get the signed tracking URL
const url = urlBuilder.createURL
```

## Track leads

```
const { UrlBuilder } = require("@barnebys/analytics-node");
const urlBuilder = new UrlBuilder("analytics.mydomain.sh", "secret");
...
urlBuilder.affiliate = true;
...
``` 

## Impressions

Generate the URL from PHP and use a lazy loader that loads the tracking pixel 
when visible in the browser window. If you do not have a compatible lazy loader we 
recommend using this [lazy loader](https://github.com/verlok/lazyload) which is written in vanilla js. 


For most compatibility - place the script below before your `</body>` tag.

```
<script type="text/javascript">
    (function(w, d){
        var b = d.getElementsByTagName('body')[0];
        var s = d.createElement("script"); s.async = true;
        var v = !("IntersectionObserver" in w) ? "8.5.2" : "10.3.5";
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/" + v + "/lazyload.min.js";
        w.lazyLoadOptions = {
            threshold: 0
        };
        b.appendChild(s);
    }(window, document));
</script>
```

### Generating impression URL

```
// Create the URL Builder with your tracking domain & secret
const { UrlBuilder } = require("analytics-node");
const urlBuilder = new UrlBuilder("analytics.mydomain.sh", "secret");

// Create the impression passing on UrlBuilder, program id and optional dimensions 1-3
const impression = new Impression(
    urlBuilder,
    "123",
    "a",
    "b",
    "c",
    "d",
    "e"
);


// Get the URL for the tracking pixel 
const url = impression.buildURL

// Or output image tag for lazy load
const tag = impression.image

```


