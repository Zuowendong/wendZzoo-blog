const vueMenu = require("./vue.menu");

module.exports = {
	base: "/",
	title: "wendzzoo",
	description: "Welcome my blogs",
	patterns: ["**/*.md", "**/*.vue", "**/*.svg"],
	head: [["link", { rel: "icon", href: "/favicon.png" }]],
	locales: {
		"/": { lang: "zh-CN", title: "wendzzoo" },
	},
	shouldPrefetch: () => false,
	themeConfig: {
		repo: "Zuowendong/zwd",
		sidebarDepth: 2,
		nav: [
			{ text: "主页", link: "/" },
			{
				text: "我的技术栈",
				items: [{ text: "Vue", link: "/vue/" }],
			},
		],
		sidebar: {
			"/vue/": vueMenu,
		},
		lastUpdated: "Last Updated",
	},
};
