<template>
  <div class="d-flex flex-column align-center justify-start" style="width: 100%">
    <div class="mt-6 mt-sm-7 mt-md-8 mt-lg-9 mt-xl-10"/>
    <div class="item-zoom">
      <a
        class="text-center grey--text text--lighten-2 font-weight-bold page-text"
        @click="() => { selected = !selected; }"
      >
        {{source.name}}
      </a>
    </div>
    <v-expand-transition>
      <div :class="'item-viz' + (selected ? ' item-focused' : '')" v-show="selected">
        <p class="text-center grey--text text--lighten-2 page-sub-text pa-4">
          {{demographic}}
          <br>
          <br>
          <a
            class="grey--text text--lighten-2 page-sub-text text-decoration-underline"
            :href="source['related-media']"
          >
            {{whenAndWhere}}
          </a>
          <br>
          <br>
          {{source['description-of-incident']}}
          <br>
          <br>
          {{perpetrators}}
          <br>
          <br>
          {{bodycams}}
          <br>
          <br>
          {{offDuty}}
          <br v-if="source['off-duty']">
          <br v-if="source['off-duty']">
          {{source['disposition-of-death']}}
        </p>
      </div>
    </v-expand-transition>
    <div class="mb-6 mb-sm-7 mb-md-8 mb-lg-9 mb-xl-10"/>
    <v-divider
      style="width: 80%;"
      v-if="source.index < (numItems - 1)"
      class="grey darken-1"
    ></v-divider>
  </div>
</template>

<script>
export default {
  name: 'VictimItem',
  data: () => ({
    selected: false,
  }),
  props: {
    source: Object,
    numItems: Number,
  },
  computed: {
    demographic() {
      const { age, race, gender } = this.source;
      if ((!race || race === 'Unknown') && (!age || age === 'Unknown') && (!gender || gender === 'Unknown')) return 'A Human Being.';

      let phrase = 'A';

      if (age && age !== 'Unknown') {
        if (age.substring(0, 1) === '8') phrase += 'n';
        phrase += ` ${age} year old`;
      }
      if (race && race !== 'Unknown race' && race !== 'Unknown Race') {
        if (race === 'Pacific Islander') phrase += ` ${(gender && gender !== 'Unknown') ? `${gender} ` : ''}${race}`;
        else phrase += ` ${this.source.race}`;
      }

      const ageNum = Number.parseInt((age && age !== 'Unknown') ? age : '100', 10);
      if (race !== 'Pacific Islander') {
        // ugh why did they just put Transgender as an option?
        // Can't even be inclusive with just "Transgender"! So unhelpful...
        if (gender === 'Male') phrase += ageNum < 18 ? ' Boy.' : ' Man.';
        else if (gender === 'Female') phrase += ageNum < 18 ? ' Girl.' : ' Woman.';
        else phrase += ageNum < 18 ? ' Child.' : ' Human Being.';
      }

      return phrase;
    },

    whenAndWhere() {
      return `On ${this.source['date-of-incident']} in ${this.source.city}, ${this.source.state}`;
    },

    perpetrators() {
      return `Perpetrated by the ${this.source['agency-responsible']}`;
    },

    bodycams() {
      if (this.source['body-camera'] === 'False') return 'Body cameras were not present or not recording.';
      if (this.source['body-camera'] === 'True') return 'Body cameras were recording it.';
      return 'Body cameras may have been present.';
    },

    offDuty() {
      if (this.source['off-duty'] === 'True') return 'The officers involved were off-duty.';
      return '';
    },
  },
};
</script>

<style>
.item-zoom {
  transition: transform .2s;
}

.item-zoom:hover {
  transform: scale(1.15);
}

.item-viz {
  opacity: 0;
  transition: opacity 0.15s;
}

.item-focused {
  opacity: 1;
}
</style>
