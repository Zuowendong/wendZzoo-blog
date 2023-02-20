import { defineConfig } from "vitepress";
import vueConfig from "./vue.config";
import workConfig from "./work.config";

export default defineConfig({
	title: "wendzzoo",
	description: "Welcome my blogs",
	base: "/zwd/",
	lastUpdated: true,

	head: [
		["link", { rel: "icon", href: "/favicon.png" }], // 也是放在/public目录中
	],

	themeConfig: {
		logo: "/favicon.svg",
		nav: [
			{ text: "主页", link: "/" },
			{
				text: "我的技术栈",
				items: [
					{ text: "Vue", link: "/vue/", activeMatch: "/vue/" },
					{ text: "JS", link: "/js/" },
					{ text: "CSS", link: "/css/" },
					{ text: "HTML", link: "/html/" },
					{ text: "Docker", link: "/docker/" },
				],
			},
			{ text: "工作拾遗", link: "/work/" },
		],
		socialLinks: [{ icon: "github", link: "https://github.com/Zuowendong" }],
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2023-present",
		},
		sidebar: {
			"/vue/": vueConfig,
			"/work/": workConfig,
		},
	},
});
