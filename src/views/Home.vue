<template>
  <div class="home">
	<Header/>
	<Introductory name="Rajhi John Tabora" />
	<Repositories />
	<Resumes />
	<AboutMe />
	<!-- <Testimonials /> -->
	<!-- <ContactUs /> -->
	<Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Introductory from '@/components/Introductory.vue'
import Repositories from '@/components/Repositories.vue'
import Footer from '@/components/Footer.vue'
import Resumes from '@/components/Resumes.vue'
import AboutMe from '@/components/AboutMe.vue'
/*import Testimonials from '@/components/Testimonials.vue'
import ContactUs from '@/components/ContactUs.vue'*/

export default {
  name: 'Home',
  components: {
	Header,
	Introductory,
	Repositories,
	Resumes,
	AboutMe,
	/*Testimonials,
	ContactUs,*/
    Footer
  }
}
</script>
