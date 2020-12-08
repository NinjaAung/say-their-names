<template>
  <div id='app'>
    <v-app id='say-their-names'>
      <v-main :class='background'>
        <v-container class='fill-height'>
          <!-- SEARCH SECTION -->
          <v-row
            class='viewFade white'
            align='center'
            justify='center'
            style='height: 85vh;'
            v-show='!searching'
          >
            <v-col
              class='d-flex align-center justify-space-around flex-column'
              style='height: 100%;'
            >
               <!-- DEMOGRAPHIC -->
              <v-row align='center' justify='center' class='page-text flex-grow-0'>
                <hover-select
                  :items='genders'
                  defaultValue='He'
                  :setValue='setGender'
                ></hover-select>
                <span class='txt'>{{ gender === 'They' ? ' were ' : ' was ' }}</span>
                <hover-select
                  :items='races'
                  defaultValue='Black'
                  :setValue='setRace'
                ></hover-select>
                <span class='txt'> in </span>
                <hover-complete
                  :searcher='placeSearch'
                  defaultValue='Oakland, California'
                  :setValue='setPlace'
                >
                </hover-complete>
              </v-row>
              <!-- BODY CAMERA -->
              <v-row align='center' justify='center' class='page-text flex-grow-0'>
                <span class='txt'>The police </span>
                <hover-select
                  :items='cams'
                  defaultValue='could have had'
                  :setValue='setCam'
                ></hover-select>
                <span class='txt'> body cameras on them to record it.</span>
              </v-row>
              <!-- VERDICT -->
              <v-row align='center' justify='center' class='page-text flex-grow-0'>
                <hover-select
                  :items='verdicts'
                  defaultValue='An investigation is pending.'
                  :setValue='setVerdict'
                ></hover-select>
              </v-row>
              <!-- STATEMENT -->
              <v-row align='center' justify='center' class='page-text flex-grow-0'>
                <span class='txt font-italic'>
                  {{ gender + (gender === 'They' ? ' were ' : ' was ') + 'murdered.' }}
                </span>
              </v-row>
              <!-- ACTION -->
              <v-row align='center' justify='center' class='page-text flex-grow-0'>
                <v-btn
                  class='font-weight-black'
                  @click='startSearch'
                >
                  <span class="page-text">SAY THEIR NAMES.</span>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <!-- SEARCH RESULTS -->
          <v-row
            class='viewFade transparent'
            align='center'
            justify='center'
            style='height: 95vh;'
            v-if='searching'
          >
            <div class='searchBackground'>
              <p
                class='text-weight-black'
                style='white-space: pre-wrap; color: #060606; overflow-wrap: break-word !important;'
                v-html="genText()"
              ></p>
            </div>
            <v-col
              class='d-flex flex-column align-center'
              style='min-height: 95vh; max-height: 95vh; z-index: 2;'
              cols=12 sm=12 md=10 lg=8 xl=6
            >
              <span
                class='page-title font-weight-bold white--text text-center pb-2'
              >
                SAY THEIR NAMES
              </span>
              <v-btn
                x-large
                color='transparent'
                class='font-weight-black text-lowercase pb-8'
                @click='returnToSearch'
              >
                <span v-text="'return to search'" class='page-sub-text grey--text'></span>
              </v-btn>
              <virtual-list
                class='no-scrollbar flex-grow-1'
                style='overflow-y: auto; width: 100%'
                data-key='_id'
                :data-sources='results'
                :data-component='itemComponent'
                :estimate-size="120"
                :extra-props="{ numItems: results.length }"
                v-if="results.length > 0"
              />
              <div
                :class='loading'
                style='width: 100%'
                v-if='results.length === 0'
              >
                <p class='text-center grey--text text--lighten-2 page-sub-text pa-4'>
                  {{
                    this.searchFailed
                      ? 'An issue occured while trying to gather names.'
                      : 'Gathering Names...'
                  }}
                </p>
                <v-progress-linear
                  style='width: 45%'
                  color='white'
                  indeterminate
                  rounded
                  :height="8"
                ></v-progress-linear>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
    <div v-if='starting' class='blackout' :style='blackoutPosition'> </div>
    <div v-if='returning' class='whiteout' :style='whiteoutPosition'> </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js';
import VirtualList from 'vue-virtual-scroll-list';
import HoverSelect from './components/HoverSelect.vue';
import HoverComplete from './components/HoverComplete.vue';
import VictimItem from './components/VictimItem.vue';
import Places from './data/places.json';
import search from './search';

export default {
  name: 'App',
  components: { HoverSelect, HoverComplete, VirtualList },
  data: () => ({
    genders: ['He', 'She', 'They'],
    races: ['Black', 'Hispanic', 'Asian', 'White', 'a Native American', 'a Pacific Islander', 'someone'],
    cams: ['had', 'did not have', 'could have had'],
    verdicts: [
      'An investigation is pending.',
      'This was unreported.',
      'This was deemed justified by a legal entity.',
      'What happened to the officers involved?',
    ],
    placeSearch: new Fuse(Places.places, { includeScore: false, threshold: 0.35 }),
    gender: 'He',
    race: 'Black',
    place: 'Oakland, California',
    cam: 'could have had',
    verdict: 'An investigation is pending.',
    starting: false,
    searching: false,
    searchFailed: false,
    isLoading: false,
    returning: false,
    searchTime: 0,
    blackoutPosition: '',
    whiteoutPosition: '',
    background: 'white',
    results: [],
    itemComponent: VictimItem,
  }),
  computed: {
    loading() {
      return `loading-page d-flex flex-column align-center justify-center flex-grow-1 ${this.isLoading ? 'is-loading' : ''}`;
    },
  },
  methods: {
    genText() {
      let text = '';
      const template = 'NO JUSTICE: NO PEACE     I CAN\'T BREATH'.split('').join('&#8203;');
      const buffer = '     '.split('').join('&#8203;');
      for (let i = 0; i < 10; i += 1) {
        text += template;
        if (i < 9) text += buffer;
      }
      return text;
    },

    setGender(gender) {
      this.gender = gender;
    },

    setRace(race) {
      this.race = race;
    },

    setPlace(place) {
      this.place = place;
    },

    setCam(cam) {
      this.cam = cam;
    },

    setVerdict(verdict) {
      this.verdict = verdict;
    },

    startSearch(event) {
      const px2vw = 100 / document.documentElement.clientWidth;
      const px2vh = 100 / document.documentElement.clientHeight;
      const x = event.clientX * px2vw;
      const y = event.clientY * px2vh;
      this.blackoutPosition = `position: absolute; top: ${y}vh; left:${x}vw;`;
      this.starting = true;
      this.isLoading = true;

      search(
        this.gender,
        this.race,
        this.place,
        this.cam,
        this.verdict,
        this.displayResults,
        () => { this.searchFailed = true; },
      );
      this.searchTime = Date.now();

      setTimeout(() => {
        this.background = 'black';
      }, 450);

      setTimeout(() => {
        this.starting = false;
        this.searching = true;
      }, 675);
    },

    displayResults(data) {
      this.isLoading = false;
      setTimeout(() => {
        const dt = Date.now - this.searchTime;
        if (dt < 675) setTimeout(() => { this.results = data; }, 675 - dt);
        else this.results = data;
      }, 200);
    },

    returnToSearch(event) {
      const px2vw = 100 / document.documentElement.clientWidth;
      const px2vh = 100 / document.documentElement.clientHeight;
      const x = event.clientX * px2vw;
      const y = event.clientY * px2vh;
      this.whiteoutPosition = `position: absolute; top: ${y}vh; left:${x}vw;`;
      this.returning = true;
      this.results = [];

      setTimeout(() => {
        this.background = 'white';
      }, 450);

      setTimeout(() => {
        this.returning = false;
        this.searching = false;
      }, 675);
    },
  },
};
</script>

<style>
html { overflow-y: hidden; }

.txt {
  white-space: pre;
}

.blackout {
  background-color:  rgba(0, 0, 0, 1);
  animation: growCirc .65s, blackout 0.4s;
  animation-timing-function: cubic-bezier(0, 0, 0.5, 1.0);
  width: 200vmax;
  height: 200vmax;
  margin-left: -100vmax;
  margin-top: -100vmax;
  border-radius: 50%;
  z-index: 100;
}

.whiteout {
  background-color:  rgba(255, 255, 255, 1);
  animation: growCirc .65s, whiteout 0.4s;
  animation-timing-function: cubic-bezier(0, 0, 0.5, 1.0);
  width: 200vmax;
  height: 200vmax;
  margin-left: -100vmax;
  margin-top: -100vmax;
  border-radius: 50%;
  z-index: 100;
}

@keyframes growCirc {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes blackout {
  from {
    background-color:  rgba(0, 0, 0, 0);
  }
  to {
    background-color:  rgba(0, 0, 0, 1);
  }
}

@keyframes whiteout {
  from {
    background-color:  rgba(255, 255, 255, 0);
  }
  to {
    background-color:  rgba(255, 255, 255, 1);
  }
}

.viewFade {
  opacity: 1;
  animation: viewFading 0.75s;
  animation-timing-function: ease-out;
}
@keyframes viewFading {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.page-title {
  font-size: calc(20px + 3vmin);
}

.page-text {
  font-size: calc(15px + 2vmin);
}

.page-sub-text {
  font-size: calc(10px + 1.5vmin);
}

.searchBackground {
  position: absolute;
  top: 0;
  left: 0;
  padding-left: -10vw;
  padding-right: -10vw;
  padding-top: -10vh;
  padding-bottom: -10vw;
  width: 100vw;
  height: 100vh;
  font-size: 7vmax;
  z-index: 0;
  overflow: hidden;
}

.loading-page {
  opacity: 0;
  transition: opacity .2s;
}

.is-loading{
  opacity: 1 !important;
}
</style>
