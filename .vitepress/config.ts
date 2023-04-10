import { defineConfig } from "vitepress";
import vueConfig from "./vue.config";
import workConfig from "./work.config";
import tsConfig from "./ts.config";
import jsConfig from "./js.config";
import cssConfig from "./css.config";
import htmlConfig from "./html.config";
import viteConfig from "./vite.config";
import liveConfig from "./live.config";
import arithmeticConfig from "./arithmetic.config";
import httpConfig from "./http.config";
import projectConfig from "./project.config";
import baseConfig from './base.config'

export default defineConfig({
	title: "wendzzoo",
	description: "Welcome my blogs",
	base: "/zwd/",
	lastUpdated: true,

	head: [
		["link", { rel: "icon", href: "/zwd/favicon.png" }], // 也是放在/public目录中
	],

	themeConfig: {
		logo: "/favicon.svg",
		outline: [1, 3],
		nav: [
			{ text: "主页", link: "/" },
			{
				text: "我的技术栈",
				items: [
					{ text: "Vue", link: "/vue/", activeMatch: "/vue/" },
					{ text: "JS", link: "/js/" },
					{ text: "TS", link: "/ts/" },
					{ text: "CSS", link: "/css/" },
					{ text: "HTML", link: "/html/" },
					{ text: "Vite", link: "/vite/" },
					{ text: "Docker", link: "/docker/" },
					{ text: "算法", link: "/arithmetic/" },
					{ text: "Http", link: "/http/" },
				],
			},
			{ text: "计算机基础", link: "/base/" },
			{ text: "工作拾遗", link: "/work/" },
			{ text: "生活", link: "/live/" },
			{ text: "项目", link: "/project/" },
		],
		socialLinks: [{ icon: "github", link: "https://github.com/Zuowendong" }],
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2023-present",
		},
		sidebar: {
			"/vue/": vueConfig,
			"/ts/": tsConfig,
			"/js/": jsConfig,
			"/css/": cssConfig,
			"/html/": htmlConfig,
			"/work/": workConfig,
			"/vite/": viteConfig,
			"/live/": liveConfig,
			"/arithmetic/": arithmeticConfig,
			"/http/": httpConfig,
			"/project/": projectConfig,
			"/base/": baseConfig
		},
	},
});
