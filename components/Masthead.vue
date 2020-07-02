<template>
  <div id="masthead" class="container">
    <svg
      id="coke_masthead"
      data-name="coke_masthead"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1280 650"
    >
      <def>
        <mask id="clipMask">
          <path
            id="coke_line"
            data-name="coke_line"
            fill="white"
            d="M0,585.14.05,449.31H0V0H1279.88V192.59h.12l-.12,271.46a634.78,634.78,0,0,0-108.37-9.17c-129.91,0-256,45.19-394.54,114.14-84.84,42.23-197.86,81-348.55,81C292.72,650,137.56,625,0,585.14Z"
          />
        </mask>
      </def>
      <image
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        xlink:href="/img/dummy_masthead.jpg"
        mask="url(#clipMask)"
      />
    </svg>
    <div class="masthead-content">
      <h1>WIN A DREAM PREMIER<br/>LEAGUE EXPERIENCE IN<br/>ENGLAND</h1>
      <p>Grab a Coke, find the code and enter our lucky draw to win!  </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Masthead"
};
</script>

<style>
</style>