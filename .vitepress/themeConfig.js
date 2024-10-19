export const themeConfig = {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
        {
        text: 'Examples',
        items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
        ]
        }
    ],

    socialLinks: [
        { icon: 'github', link: 'https://github.com/pzq123456/EVChargerSite' }
    ],

    footer: {
        copyright: 'EVChargerMap © 2024 | <a href="https://thetipteam.editorx.io/website/">The TIP Research Group</a>'

    },

    search: {
        provider: 'local'
    }
}