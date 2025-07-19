// news
import img1 from '../../../News/imgs/1.png'
import img2 from '../../../News/imgs/2.png'
import img3 from '../../../News/imgs/3.png'
import img4 from '../../../News/imgs/4.1.png'


// publications
import image1 from '../../../asset/image.png'

export const teamData = {
    hero: {
        title: "Global EV Data Initiative",
        tagline: "An open electric vehicle data initiative that aims to collect, analyze, visualize, and share data on the electric vehicle market, policy, and charging infrastructure across the globe.",
        logo: "logo.png",
    },

    carousel: [
        {
            title: "Advanced Air Mobility (AAM) Social Media Text Data",
            description: "This social media text dataset contains only the cleaned data alongside results from our AAM text mining research, including sentiment and topic analyses. ",
            image: img4
        },
        {
            title: "2024 Global EV Data",
            description: "An updated dataset of public electric vehicle charging stations in the US, China, and Europe.",
            image: img2
        },
        // {
        //     title: "Data Innovation",
        //     description: "Developing innovative data solutions for the EV industry",
        //     image: img3
        // }
    ],

    features: [
        {
            title: 'Map',
            details: 'We visualize various spatial EV data and the analysis results through interactive maps.',
            link: '/map',
            icon: '🌍'
        },
        {
            title: 'Data',
            details: 'We collect global EV policy, market, and charging facility data from various data sources.',
            link: '/data',
            icon: '📊'
        },
        {
            title: 'Publications',
            details: 'We update regularly the latest research outputs using the global EV data.',
            link: '/publications',
            icon: '📚'
        }
    ],

    publications: [
        {
            title: "Where are public electric vehicle charging stations located globally? Insights from a spatial planning perspective.",
            authors: "Xiong Yang, Zhenhan Peng, Chengxiang Zhuge*, Justin Hayse Chiwing G. Tang, Ruichen Ma, Binru Wei, and Wenzhong Shi*",
            journal: "Under Review",
            year: 2024,
            link: "/publications",
            image: image1,
            abstract: "This study provides a comprehensive analysis of the global distribution of public electric vehicle (EV) charging stations, highlighting spatial patterns and planning implications.",
            github: "https://github.com/"
        },
        {
            title: "Stakeholder attention to advanced air mobility reveals worldwide disparities",
            authors: "Justin Hayse Chiwing G. Tang, Yuan Li, Enyuan Cao, Xiong Yang, Ding Chen, Ruichen Ma, Zhenhan Peng, Binru Wei, Chengxiang Zhuge*",
            journal: "Under Review",
            year: 2025,
            link: "/publications",
            image: img4,
            abstract: "This paper examines the global disparities in stakeholder attention towards advanced air mobility (AAM), utilizing a comprehensive dataset to analyze trends and regional differences.",
            github: "https://github.com/Charlene1218L/AAM_text_mining"
        },
        // {
        //     title: "XXX XXXX",
        //     authors: "XXX, XXX, XXX",
        //     journal: "XXX Journal",
        //     year: 2025,
        //     link: "#",
        //     image: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg",
        //     abstract: "Comprehensive evaluation of various policy instruments and their effectiveness in promoting electric vehicle adoption.",
        //     github: ""
        // },
    ],

    news: [
        {
            title: "[Talk] Presentations on Global EV Data Initiative at University of Cambridge",
            date: "2025-5-21",
            summary: "The Principal Investigator of the Global EV Data Initiative, Dr. Chengxiang (Tony) Zhuge was invited by Prof Ying Jin and Dr Li Wan to give two talks at the Architecture and Land Economy departments, University of Cambridge on 30 April and 1 May 2025...",
            link: "/News/2025-5-21",
            image: img3
        },
        {
            title: "[Data] Global Public Electric Vehicle Charging Station Data in 2024",
            date: "2025-03-19",
            summary: "We are glad to share the Global Public Electric Vehicle Charging Station Data in 2024, which contain public EV charging station locations in the US, China and Europe...",
            link: "News/2025-3-19",
            image: img2
        },
        {
            title: "[Data] Global Public Electric Vehicle Charging Station Data in 2022",
            date: "2024-11-22",
            summary: "We are glad to share the Global Public Electric Vehicle Charging Station Data in 2022, which contain public EV charging station locations in the US, China and Europe...",
            link: "News/2024-11-22",
            image: img1
        },
    ],

    team: [
        {
            name: "Dr xxx",
            role: "Principal Investigator",
            bio: "Expert in sustainable transportation with 15+ years of experience.",
            image: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg"
        },

        {
            name: "Dr. xxx",
            role: "Senior Researcher",
            bio: "Specializes in data visualization and spatial analysis.",
            image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
        },
        {
            name: "xxxx",
            role: "PhD Candidate",
            bio: "Researching policy impacts on EV adoption rates.",
            image: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg"
        }
    ],
}