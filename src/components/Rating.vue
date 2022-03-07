<script setup lang="ts">
  import { ref } from "vue";
  const props = defineProps({
    rating: {
      type: Number,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    onlyStar: {
      type: String,
      required: true,
    },
    justShow: {
      type: Boolean,
      required: false,
    }
  });

  const maxStars = 5;
  const stars = ref(props.rating);
  const rateable = ref(props.justShow);
  const hasCounter = props.onlyStar;
  const emit = defineEmits(["rating"]);

  const staring = (i) => {
    if (rateable.value) {
      stars.value = i + 1;
    }
  };

  function Rating(i) {
    staring(i);
    emit("rating", stars.value);
  }
</script>
<template>
  <div class="rating">
    <h1>{{ props.title }}</h1>
    <ul class="list">
      <li
        v-for="(star, i) in maxStars"
        :key="i"
        :class="{ star: true, hoverable: rateable, active: star <= stars }"
        @click="Rating(i)"
      >
        <i :class="star <= stars ? 'fas fa-star' : 'far fa-star'"></i>
      </li>
    </ul>
    <div v-if="hasCounter" class="info counter">
      <span class="score-rating">{{ stars }}</span>
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

    background-color: #00000000!important;
    border-radius: 8px;
    box-shadow: 0 6px 33px rgba(19, 18, 18, 0.09);
    .list {
      padding: 0;
      margin: 0 20px 0 0;
      &:hover {
        .hoverable {
          color: #ffe100;
          cursor: pointer;
        }
      }
      .star {
        display: inline-block;
        font-size: 20px;
        transition: all 0.2s ease-in-out;
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
      font-size: 15px;
      text-align: center;
      display: table;
      .divider {
        margin: 0 5px;
        font-size: 15px;
      }
      .score-max {
        font-size: 15px;
        vertical-align: sub;
      }
    }
  }
</style>
