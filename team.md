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
      <VPTeamMembers size="medium" :members= "Reachers" />
    </template>
  </VPTeamPageSection>

</VPTeamPage>

<!-- style -->
<style>
</style>
