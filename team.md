---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const Investigators = [{
  avatar: '1.png',
  name: 'Dr. Chengxiang (Tony) ZHUGE',
  title: 'Principal Investigator',
}]

// External Collaborators
const ExternalCollaborators = [
  {
    avatar: '6.png',
    name: 'Binru WEI',
    title: 'Assistant Professor at Zhejiang University',
  },
  {
    avatar: '7.png',
    name: 'Zhenhan PENG',
    title: 'PhD Student at KU Leuven, Belgium',
  }
]



const Reachers = [
  {
    avatar: '2.png',
    name: 'Ruichen MA',
    title: 'Leading Researcher & PhD student',
  },
  {
    avatar: '3.png',
    name: 'Xiong YANG',
    title: 'Leading Researcher & Postdoc Fellow',
  },
  {
    avatar: '8.png',
    name: 'Fan ZHANG',
    title: 'Leading Researcher & Postdoc Fellow',
  },
  {
    avatar: '4.png',
    name: 'Justin Hayse Chiwing G. TANG',
    title: 'Leading Researcher & PhD Student',
  },
  {
    avatar: '5.png',
    name: 'Enyuan CAO',
    title: 'Data Analyst & PhD Student',
  },
  {
    avatar: '10.png',
    name: 'Xiaoqi SHI',
    title: 'Data Analyst & Master Student',
  },
  {
    avatar: '9.png',
    name: 'Dingkang TENG',
    title: 'Data Analyst & Master Student',
  },
  {
    // Ding Chen，Data Analyst & Master Student
    avatar: '11.png',
    name: 'Ding CHEN',
    title: 'Data Analyst & Master Student',
  },
  {
    avatar: 'https://www.github.com/pzq123456.png',
    name: 'Zhiqing PAN',
    title: 'Website Developer & Research Assistant',
    links : [
      {
        icon: 'github',
        link: 'https://www.github.com/pzq123456',
      }
    ]
  },
]


// Justin
// Leading Researcher & PhD Student

// Enyuan
// Data Analyst & PhD Student

// Xiaoqi SHI
// Data Analyst & Master Student




</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>
     The Global EV Data Initiative is led by <a href="https://thetipteam.editorx.io/website/">The TIP Research Group</a> at The Hong Kong Polytechnic University (PolyU), which is an interdisciplinary research group focusing on <b class = "TIP">T</b>echnology innovation, <b class = "TIP">I</b>nfrastructure planning and <b class = "TIP">P</b>olicy making in Smart Cities
    </template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
      <template #title>
      Principal Investigator
      </template>
      <template #members>
        <VPTeamMembers size="medium" :members= "Investigators" />
      </template>
  </VPTeamPageSection>



  <VPTeamPageSection>
    <template #title>
      Researchers & Developers
    </template>
    <template #members>
      <VPTeamMembers size="medium" :members= "Reachers" />
    </template>
  </VPTeamPageSection>


  <VPTeamPageSection>
      <template #title>
        International Collaborators
      </template>
      <template #members>
        <VPTeamMembers size="medium" :members= "ExternalCollaborators" />
      </template>
  </VPTeamPageSection>
</VPTeamPage>

<!-- style -->
<style scoped>
  a {
    color: #3eaf7c;
  }

  .TIP {
    color: #3eaf7c;
    font-weight: bold;
    font-size: 1.2em;
  }

</style>
