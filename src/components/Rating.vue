<script setup lang="ts">
  import { ref } from "vue";
  defineProps({
    rate: {
      type: Number,
      required: true,
    },
  });

  const maxStars = 5;
  const stars = ref(0);
  const hasCounter = ref(true);

  const staring = (i) => {
    stars.value = i + 1;
  };
</script>
<template>
  <div class="rating">
    <ul class="list">
      <li
        v-for="(star, i) in maxStars"
        :key="i"
        class="star"
        :class="{ active: star <= rate }"
        @click="staring(i)"
      >
        <i :class="star <= stars ? 'fas fa-star' : 'far fa-star'"></i>
      </li>
    </ul>
    <div v-if="hasCounter" class="info counter">
      <span class="score-rating">{{ rate }}</span>
      <span class="divider">/</span>
      <span class="score-max">{{ maxStars }}</span>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: #b7b7b7;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 6px 33px rgba(19, 18, 18, 0.09);
    .list {
      padding: 0;
      margin: 0 20px 0 0;
      &:hover {
        .star {
          color: #ffe100;
        }
      }
      .star {
        display: inline-block;
        font-size: 30px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
          ~ .star:not(.active) {
            color: inherit;
          }
        }
        &:first-child {
          margin-left: 0;
        }
        &.active {
          color: #ffe100;
        }
      }
    }
    .info {
      margin-top: 15px;
      font-size: 20px;
      text-align: center;
      display: table;
      .divider {
        margin: 0 5px;
        font-size: 20px;
      }
      .score-max {
        font-size: 20px;
        vertical-align: sub;
      }
    }
  }
</style>
