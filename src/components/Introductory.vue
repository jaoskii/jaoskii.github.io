<template>
	<section class="site-hero" style="background-image: url(images/image_1.jpg);" id="section-home" data-stellar-background-ratio="0.5">
		<div class="container">
			<div class="row intro-text align-items-center justify-content-center">
				<div class="col-md-10 text-center pt-5">

					<h1 class="site-heading site-animate">Hello, I'm <strong class="d-block">{{ name }}</strong></h1>
					<strong class="d-block text-white text-uppercase letter-spacing">and this is WELCOME to my PAGE!</strong>

				</div>
			</div>
		</div>
	</section> <!-- section -->
</template>

<script>
export default {
  name: 'Introductory',
  props: {
    name: String
  }
}
</script>
