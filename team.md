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
  avatar: 'https://static.wixstatic.com/media/907b0c_89f9800349fa459ab3ad03f43c33ac87~mv2.png/v1/crop/x_10,y_13,w_669,h_902/fill/w_305,h_411,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/New%20PI2.png',
  name: 'Dr. Chengxiang (Tony) ZHUGE',
  title: 'Principal Investigator',
}]

const Reachers = [
  {
    avatar: 'https://static.wixstatic.com/media/1e0248_ae6f772e41ab41ec86dce4d7dbc106fe~mv2.png/v1/fill/w_252,h_372,fp_0.42_0.31,q_85,usm_0.66_1.00_0.01,enc_auto/1720780205658.png',
    name: 'Ruichen MA',
    title: 'Leading Researcher & PhD student',
  },
  {
    avatar: 'user.png',
    name: 'Xiong YANG',
    title: 'Leading Researcher & Postdoc Fellow',
  },
  {
    avatar: 'user.png',
    name: 'Fan ZHANG',
    title: 'Leading Researcher & Postdoc Fellow',
  },
    {
    avatar: 'https://www.github.com/pzq123456.png',
    name: 'Zhiqing PAN',
    title: 'Website Developer & Research Assistant',
  }
]


</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>
      The development of the Global EV Data project is led by a team of researchers and developers.
    </template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
      <template #title>
        Investigator
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
      <VPTeamMembers size="small" :members= "Reachers" />
    </template>
  </VPTeamPageSection>

</VPTeamPage>
