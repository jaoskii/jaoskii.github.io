<template>
	<section class="site-section " id="section-resume">
		<div class="container">
			<div class="row">
				<div class="col-md-12 mb-5">
					<div class="section-heading text-center">
						<h2>My <strong>Resume</strong></h2>
					</div>
				</div>
				<div class="col-md-12">
					<h2 class="mb-5">Experiences</h2>
					<div v-if="exp">
						<div class="resume-item mb-4" v-for="x in exp" :key="x.id">
							<span class="date"><span class="icon-calendar"></span> {{ x.daterange }}</span>
							<h3>{{ x.exp_title }}</h3>
							<p>{{ x.exp_desc }}</p>
							<span class="school">{{ x.exp_loc }}</span>
						</div>
					</div>
					<div v-else>
						<h3>No experiences found. Please try again.</h3>
					</div>
				</div>
			</div>
		</div>
	</section> <!-- .section -->
</template>

<script>
export default {
name: 'Resumes',
	props: {
		experiences: Array
	},
	data: function() {
		return {
			exp: [
				{	
					id: 1,
					daterange: "2013 - 2014",
					exp_title: "Techinical Service Crew",
					exp_desc: "Being a PC Techinician and Sales Agent on an IT Store",
					exp_loc: "Computer World - (Camarin and Bagong Silang Branches)"
				},
				{	
					id: 2,
					daterange: "2014-2015",
					exp_title: "Customer Service Representative (CSR - Call Center Agent)",
					exp_desc: "Call center agent position doing a CSR job for Bank of America Account",
					exp_loc: "Teletech - Technohub Branch"
				},
				{	
					id: 1,
					daterange: "2015 - April 2020",
					exp_title: "Senior Fullstack Web Developer",
					exp_desc: "Also experienced being a fullstack web dev, I was doing some accounting systems here.",
					exp_loc: "Solutionbase Corporation"
				},
				{	
					id: 1,
					daterange: "April 2020 - Present",
					exp_title: "Senior Fullstack Web Developer",
					exp_desc: "Another position as a Senior fullstack web developer, but are open to other languanges and homebased <3",
					exp_loc: "Cushyfy Solutions"
				},	
			]
		}
	}//end data
}
</script>
