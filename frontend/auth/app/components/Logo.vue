<template>
  <div class="logo">
    <span class="logo__bracket">&lt;</span>CodeHub<span class="logo__bracket">/&gt;</span>
    <div class="logo__dot" />
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 40px;

  font-family: var(--spaced);
  font-size: 18px;
  font-weight: 700;

  animation: fadeUp 0.4s ease both;

  &__bracket {
    color: var(--blue);
  }

  &__dot {
    width: 6px;
    height: 6px;

    background: var(--green);
    border-radius: 50%;

    animation: pulse 2s infinite;
  }
}

@media (max-width: 1220px) {
  .logo {
    margin-bottom: 0;
    font-size: 15px;
    gap: 6px;
    
    &__dot {
      width: 5px;
      height: 5px;
    }
  }
}

@media (max-width: 768px) {
    .logo {
        font-size: 22px;
        margin-bottom: 10px;
    }
}
</style>
