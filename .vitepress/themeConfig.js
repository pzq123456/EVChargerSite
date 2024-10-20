export const themeConfig = {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Team', link: '/team' },
        { text: 'Blog', link: '/blogs' },
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