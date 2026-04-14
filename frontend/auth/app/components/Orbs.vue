<template>
  <div class="orb orb1"></div>
  <div class="orb orb2"></div>
  <div class="orb orb3"></div>
</template>

<style lang="scss" scoped>
.orb {
  position: absolute;

  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
}

.orb1 {
  width: 320px;
  height: 320px;

  top: 10%;
  left: 5%;

  background: rgba(79, 156, 255, 0.08);
  animation: float 8s ease-in-out infinite;
}

.orb2 {
  width: 220px;
  height: 220px;

  bottom: 15%;
  right: 10%;

  background: rgba(188, 140, 255, 0.06);
  animation: float 6s ease-in-out infinite reverse;
}

.orb3 {
  width: 150px;
  height: 150px;

  top: 60%;
  left: 40%;

  background: rgba(57, 212, 200, 0.05);
  animation: float 10s ease-in-out infinite;
}

@media (max-width: 1280px) {
  .orb {
    filter: blur(50px);
  }

  .orb1 {
    width: 200px;
    height: 200px;

    top: 5%;
  }

  .orb2 {
    width: 150px;
    height: 150px;

    bottom: 10%;
    right: 5%;
  }

  .orb3 {
    display: none;
  }
}
</style>
