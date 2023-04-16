import{_ as l,c as i,o as t,e}from"./app.f522415e.js";const P=JSON.parse('{"title":"TCP\u534F\u8BAE\u4E3A\u4EC0\u4E48\u8981\u8BBE\u8BA1\u4E09\u6B21\u63E1\u624B","description":"","frontmatter":{},"headers":[],"relativePath":"http/tcp.md","lastUpdated":1681651782000}'),o={name:"http/tcp.md"},a=e('<h1 id="tcp\u534F\u8BAE\u4E3A\u4EC0\u4E48\u8981\u8BBE\u8BA1\u4E09\u6B21\u63E1\u624B" tabindex="-1">TCP\u534F\u8BAE\u4E3A\u4EC0\u4E48\u8981\u8BBE\u8BA1\u4E09\u6B21\u63E1\u624B <a class="header-anchor" href="#tcp\u534F\u8BAE\u4E3A\u4EC0\u4E48\u8981\u8BBE\u8BA1\u4E09\u6B21\u63E1\u624B" aria-hidden="true">#</a></h1><ol><li>TCP\u534F\u8BAE\u662F\u4E00\u79CD\u53EF\u9760\u7684\uFF0C\u57FA\u4E8E\u5B57\u8282\u6D41\u7684\uFF0C\u9762\u5411\u8FDE\u63A5\u7684\u4F20\u8F93\u5C42\u534F\u8BAE <ol><li>\u53EF\u9760\u6027\u4F53\u73B0\u5728TCP\u534F\u8BAE\u901A\u4FE1\u7684\u53CC\u65B9\u7684\u6570\u636E\u4F20\u8F93\u662F\u7A33\u5B9A\u7684\uFF0C\u5373\u4FBF\u662F\u5728\u7F51\u7EDC\u4E0D\u597D\u7684\u60C5\u51B5\u4E0B\uFF0CTCP\u90FD\u80FD\u591F\u4FDD\u8BC1\u6570\u636E\u4F20\u8F93\u5230\u76EE\u6807\u7AEF</li><li>TCP\u901A\u8BAF\u53CC\u65B9\u7684\u6570\u636E\u4F20\u8F93\u662F\u901A\u8FC7\u5B57\u8282\u6D41\u6765\u5B9E\u73B0\u7684</li><li>\u9762\u5411\u8FDE\u63A5\u662F\u56E0\u4E3A\u5728\u6570\u636E\u4F20\u8F93\u4E4B\u524D\u5FC5\u987B\u8981\u5EFA\u7ACB\u4E00\u4E2A\u8FDE\u63A5\uFF0C\u7136\u540E\u57FA\u4E8E\u8FD9\u4E2A\u8FDE\u63A5\u6765\u8FDB\u884C\u6570\u636E\u4F20\u8F93</li></ol></li><li>TCP\u662F\u9762\u5411\u8FDE\u63A5\u7684\u534F\u8BAE\uFF0C\u5728\u6570\u636E\u4F20\u8F93\u4E4B\u524D\u9700\u8981\u5EFA\u7ACB\u4E00\u4E2A\u53EF\u9760\u7684\u8FDE\u63A5\uFF0CTCP\u91C7\u7528\u4E09\u6B21\u63E1\u624B\u7684\u65B9\u5F0F\u6765\u5B9E\u73B0\u8FDE\u63A5\u7684\u5EFA\u7ACB\uFF0C\u901A\u4FE1\u53CC\u65B9\u9700\u8981\u53D1\u9001\u4E09\u6B21\u8BF7\u6C42\u624D\u80FD\u786E\u4FDD\u4E00\u4E2A\u53EF\u9760\u8FDE\u63A5\u7684\u5EFA\u7ACB <ol><li>\u7B2C\u4E00\u6B21\uFF0C\u5BA2\u6237\u7AEF\u5411\u670D\u52A1\u7AEF\u53D1\u9001\u8FDE\u63A5\u8BF7\u6C42\uFF0C\u5E76\u4E14\u643A\u5E26\u540C\u6B65\u5E8F\u5217\u53F7SYN</li><li>\u7B2C\u4E8C\u6B21\uFF0C\u670D\u52A1\u7AEF\u6536\u5230\u8BF7\u6C42\u540E\uFF0C\u53D1\u9001SYN\u548CACK <ol><li>SYN: \u8868\u793A\u670D\u52A1\u7AEF\u662F\u4E00\u4E2A\u540C\u6B65\u5E8F\u5217\u53F7</li><li>ACK\uFF1A\u8868\u793A\u5BF9\u524D\u9762\u7684\u5BA2\u6237\u7AEF\u8FD9\u4E2A\u8BF7\u6C42\u7684\u4E00\u4E2A\u786E\u8BA4\uFF0C\u544A\u8BC9\u5BA2\u6237\u7AEF\u5DF2\u7ECF\u6536\u5230\u4E86\u8BF7\u6C42</li></ol></li><li>\u5BA2\u6237\u7AEF\u6536\u5230\u670D\u52A1\u7AEF\u8BF7\u6C42\u4E4B\u540E\uFF0C\u518D\u4E00\u6B21\u53D1\u9001ACK <ol><li>ACk: \u9488\u5BF9\u670D\u52A1\u7AEF\u8FDE\u63A5\u7684\u4E00\u4E2A\u786E\u8BA4\uFF0C\u8868\u793A\u544A\u8BC9\u670D\u52A1\u7AEF\u5DF2\u7ECF\u6536\u5230\u8BF7\u6C42</li></ol></li></ol></li><li>\u4E3A\u4F55\u8FD9\u6837\u8BBE\u8BA1 <ol><li>TCP\u662F\u53EF\u9760\u6027\u901A\u8BAF\u534F\u8BAE\uFF0C\u6240\u4EE5TCP\u534F\u8BAE\u7684\u901A\u4FE1\u53CC\u65B9\u90FD\u5FC5\u987B\u8981\u7EF4\u62A4\u4E00\u4E2A\u5E8F\u5217\u53F7\uFF0C\u53BB\u6807\u8BB0\u5DF2\u7ECF\u53D1\u9001\u51FA\u53BB\u7684\u6570\u636E\u5305\uFF0C\u54EA\u4E9B\u662F\u5DF2\u7ECF\u88AB\u5BF9\u65B9\u7B7E\u6536\u7684\u3002\u4E09\u6B21\u63E1\u624B\u5C31\u662F\u901A\u884C\u53CC\u65B9\u76F8\u4E92\u544A\u77E5\u5E8F\u5217\u53F7\u7684\u521D\u59CB\u503C\uFF0C\u4E3A\u4E86\u786E\u4FDD\u8FD9\u4E2A\u5E8F\u5217\u53F7\u88AB\u6536\u5230\uFF0C\u6240\u4EE5\u53CC\u65B9\u90FD\u9700\u8981\u4E00\u4E2A\u786E\u8BA4\u7684\u64CD\u4F5C</li><li>TCP\u9700\u8981\u5728\u4E0D\u53EF\u9760\u7684\u7F51\u7EDC\u73AF\u5883\u4E0B\u5B9E\u73B0\u53EF\u9760\u7684\u6570\u636E\u4F20\u8F93\uFF0C\u610F\u5473\u7740\u901A\u4FE1\u53CC\u65B9\u5FC5\u987B\u8981\u901A\u8FC7\u67D0\u79CD\u624B\u6BB5\u5B9E\u73B0\u4E00\u4E2A\u53EF\u9760\u7684\u6570\u636E\u4F20\u8F93\u901A\u9053\uFF0C\u4E09\u6B21\u901A\u4FE1\u662F\u5EFA\u7ACB\u8FD9\u6837\u901A\u9053\u7684\u6700\u5C0F\u503C</li><li>\u9632\u6B62\u5386\u53F2\u7684\u91CD\u590D\u8FDE\u63A5\u521D\u59CB\u5316\u9020\u6210\u7684\u6DF7\u4E71\u95EE\u9898\uFF0C\u6BD4\u5982\u5728\u7F51\u7EDC\u73AF\u5883\u5F88\u5DEE\u7684\u60C5\u51B5\u4E0B\uFF0C\u5BA2\u6237\u7AEF\u8FDE\u7EED\u591A\u6B21\u53D1\u8D77\u5EFA\u7ACB\u8FDE\u63A5\u7684\u8BF7\u6C42\uFF0C\u5047\u8BBE\u53EA\u6709\u4E24\u6B21\u63E1\u624B\uFF0C\u90A3\u4E48\u670D\u52A1\u7AEF\u53EA\u80FD\u9009\u62E9\u63A5\u53D7\u6216\u8005\u62D2\u7EDD\u8FD9\u4E2A\u8FDE\u63A5\u8BF7\u6C42\uFF0C\u4F46\u662F\u670D\u52A1\u7AEF\u4E0D\u77E5\u9053\u8FD9\u4E2A\u8BF7\u6C42\u662F\u4E0D\u662F\u4E4B\u524D\u56E0\u4E3A\u7F51\u7EDC\u5835\u585E\u800C\u8FC7\u671F\u7684\u8BF7\u6C42\uFF0C\u4E5F\u5C31\u662F\u8BF4\u670D\u52A1\u7AEF\u4E0D\u77E5\u9053\u5F53\u524D\u5BA2\u6237\u7AEF\u7684\u8FDE\u63A5\u662F\u6709\u6548\u8FD8\u662F\u65E0\u6548\u7684</li></ol></li></ol>',2),_=[a];function c(r,s,n,d,p,C){return t(),i("div",null,_)}const h=l(o,[["render",c]]);export{P as __pageData,h as default};
