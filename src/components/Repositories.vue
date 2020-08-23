<template>
<section class="site-section" id="section-portfolio">
  <div class="container">
    <div class="row">
      <div class="section-heading text-center col-md-12">
        <h2>Featured <strong>Portfolio</strong></h2>
      </div>
    </div>
    <div class="filters">
      <ul>
        <li class="active" data-filter="*">ALL</li>
        <li :data-filter="'.'+types" v-for="types in repo_types" :key="types">{{ types.toUpperCase() }}</li>
      </ul>
    </div>

    <div class="filters-content">
      <div class="row grid">
        
        <div class="single-portfolio col-sm-4 all" :class="repo.repo_type" v-for="repo in repos" :key="repo.name">
          <div class="relative">
            <div class="thumb">
              <div class="overlay overlay-bg"></div>
              <img class="image img-fluid" :src="repo.repo_image" alt="">
            </div>
            <a href="images/p1.jpg" class="img-pop-up">  
              <div class="middle">
                <div class="text align-self-center d-flex"><img src="images/preview.png" alt=""></div>
              </div>
            </a>                                  
          </div>
          <div class="p-inner">
            <h4>{{ repo.repo_name }}</h4>
            <div class="cat">{{ repo.repo_desc }}</div>
          </div>                                         
        </div>

      </div>
    </div>
  </div>
</section>
<!-- .section -->
</template>

<script>
export default {
  name: 'Repositories',
  data: function(){
    return {
      repos: [
        {
          "repo_name": "CHATTEE ORDER BOT",
          "repo_desc": "Social Media - Ordering Bot",
          "repo_type": "bots",
          "repo_image": "images/p1.jpg"
        },
        {
          "repo_name": "ECOMM-SBC.PH",
          "repo_desc": "E-commerce Website for SBC",
          "repo_type": "websites",
          "repo_image": "images/p4.jpg"
        },
        {
          "repo_name": "SYNGENTA SMS ORDERING",
          "repo_desc": "SMS Ordering",
          "repo_type": "apps",
          "repo_image": "images/p5.jpg"
        },
        {
          "repo_name": "JUANMAL.PH",
          "repo_desc": "Multi-merchant Ecommerce platform",
          "repo_type": "websites",
          "repo_image": "images/p3.jpg"
        },
        {
          "repo_name": "DEVSBOOK",
          "repo_desc": "Freelancer Website Platform",
          "repo_type": "websites",
          "repo_image": "images/p6.jpg"
        },
        {
          "repo_name": "AERIES",
          "repo_desc": "All around bot platform",
          "repo_type": "bots",
          "repo_image": "images/p2.jpg"
        },
      ],
      repo_types: ["bots","websites","apps"]
    }
  }
}
</script>
