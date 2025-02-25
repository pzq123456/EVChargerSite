import path from "path";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import { createContentLoader } from "vitepress";

const hostname = "https://globalevdata.github.io/";

export async function createRssFile(config) {
	const feed = new Feed({
		title: "Global EV Data Initiative",
		description: "An open electric vehicle data initiative that aims to collect, analyse, visualize and share data on the electric vehicle market, policy and charging infrastructure across the globe.",
		id: hostname,
		link: hostname,
		language: "en",
		copyright: 'GlobalEVData © 2024 - Present | <a href="https://thetipteam.editorx.io/website/">The TIP Research Group</a> @ <a href="https://www.polyu.edu.hk/"> HKPolyU </a>',
	});

	// 监控 News 和 public 文件夹下的 Markdown 文件
	const posts = await createContentLoader(["News/**/*.md", "public/**/*.md"], {
		excerpt: true,
		render: true,
	}).load();

	// 按日期排序
	posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

	for (const { url, excerpt, html, frontmatter } of posts) {
		// 排除 index.md 文件
		if (url.endsWith("index.md")) {
			continue;
		}

		// 仅保留 type 为 news 的文章
		if (frontmatter.type !== "news") {
			continue;
		}

		// 添加文章到 RSS 源
		feed.addItem({
			title: frontmatter.title,
			id: `${hostname}${url}`,
			link: `${hostname}${url}`,
			description: excerpt,
			content: html,
			author: [
				{
					name: "Global EV Data Initiative",
					email: "global.ev.map@gmail.com",
					link: "https://globalevdata.github.io/",
				},
			],
			date: new Date(frontmatter.date),
		});
	}

	// 生成 RSS 文件
	writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8"); // feed.xml 存放在 outDir 目录下
    // 打印存储的具体地址
    // console.log(path.join(config.outDir, "feed.xml"));
    // console.log("RSS file generated.");
}