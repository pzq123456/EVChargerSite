export const themeConfig = {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
        { text: 'Home', link: '/' },
        // { text: 'About', link: '/about' },
        { text: 'Map', link: '/map' },
        { text: 'Data', link: '/data' },
        { text: 'Team', link: '/team' },
        { text: 'Publications', link: '/publications' },
        { text: 'News', link: '/News' },
        { text: 'Contact', link: '/contact' },
    ],

    logo: '/logo.png',

    socialLinks: [
        { icon: 'github', link: 'https://github.com/GlobalEVData/EVChargerSite' }
    ],

    footer: {
        copyright: 'EVChargerMap © 2024 | <a href="https://thetipteam.editorx.io/website/">The TIP Research Group</a> @ <a href="https://www.polyu.edu.hk/"> HKPolyU </a>'

    },

    search: {
        provider: 'local'
    }
}