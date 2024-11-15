<template>
  <v-container v-if="!showDialog" class="my-12">
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="timer" color="primary">
          <v-card-title class="float-right"
            ><span>Time Left: {{ formatTime(timeLeft) }}</span></v-card-title
          >
        </v-card>
        <v-card
          v-for="question in questions"
          :key="question.id"
          color="lime-lighten-5"
          height="480"
          style="position: relative"
          class="rounded-full py-4"
          v-show="quesNo == question.id"
        >
          <v-card-title>{{
            question.id + "." + question.question
          }}</v-card-title>
          <div
            v-for="option in question.options"
            :key="option.id"
            class="flex items-center mx-8 my-1"
          >
            <input
              type="radio"
              @click="selectedAnswered(question.id, option.id)"
              :name="question.id"
              :value="option.id"
              v-model="userAnswered[question.id]"
              class="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500"
            />
            <label class="ms-2 text-sm font-medium text-gray-900">{{
              option.text
            }}</label>
          </div>

          <v-row style="position: absolute; bottom: 2%; width: 100%">
            <v-col
              v-show="quesNo != 1"
              class="mx-2 justify-content-center d-flex"
            >
              <v-btn @click="quesNo--">Back</v-btn>
            </v-col>
            <v-col class="mx-2 justify-content-center d-flex">
              <v-btn @click="clearAnswer(question.id)" class="mx-2"
                >Clear</v-btn
              >
            </v-col>
            <v-col class="mx-2 justify-content-center d-flex">
              <v-btn @click="markReview(question.id)" color="orange-darken-3"
                >Mark Review</v-btn
              >
            </v-col>
            <v-col
              v-show="quesNo != questions.length"
              class="mx-2 justify-content-center d-flex"
            >
              <v-btn @click="quesNo++">Next</v-btn>
            </v-col>
            <v-col class="mx-2 justify-content-center d-flex">
              <v-btn @click="submitAnswer()" color="success">Submit</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="yellow-lighten-5">
          <v-card-title>Pankaj Pandey</v-card-title>
          <v-btn size="x-small" class="mx-2 my-2" color="primary"></v-btn>
          <span class="text-subtitle-2">Visited Question</span> <br />
          <v-btn size="x-small" class="mx-2 my-2" color="default"></v-btn
          ><span class="text-subtitle-2">Unvisited Question</span> <br />
          <v-btn
            size="x-small"
            class="mx-2 my-2"
            color="orange-darken-3"
          ></v-btn
          ><span class="text-subtitle-2"
            >Question Marked for Review and Unanswered</span
          >
          <br />
          <v-btn size="x-small" class="mx-2 my-2" color="pink-darken-3"></v-btn
          ><span class="text-subtitle-2"
            >Question Marked for Review and Answered</span
          >
          <br />
        </v-card>
        <v-divider></v-divider>
        <v-btn
          class="mx-1 my-1"
          v-for="question in questions"
          :key="question.id"
          :color="isVisited(question.id)"
          @click="quesNo = question.id"
          >{{ question.id }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>

  <v-dialog max-width="400" persistent class="mx-auto" v-model="showDialog">
    <v-card>
      <v-card-title class="text-h5 text-primary text-center"
        >Your Score</v-card-title
      >
      <v-card-subtitle class="text-primary font-weight-bold"
        >Total Questions: {{ questions.length }}</v-card-subtitle
      >
      <v-card-subtitle class="text-primary font-weight-bold"
        >Total Answered Questions:
        {{ Object.keys(userAnswered).length }}</v-card-subtitle
      >
      <v-card-subtitle class="text-primary font-weight-bold"
        >Total UnAnswered Questions:
        {{ unAnsweredQues.length }}</v-card-subtitle
      >
      <v-card-subtitle class="font-weight-bold"
        ><v-icon icon="mdi-seal-variant"></v-icon>Your Score:
        {{ score }}</v-card-subtitle
      >
      <v-card-actions>
        <v-btn @click="closeForm">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import questions from "@/Examsheet/questionData.json";
import { ref, watch, onBeforeUnmount, onMounted } from "vue";

const quesNo = ref(1);
const visitedQues = ref([1]);
let fullname = ref("");
const userAnswered = ref({});
let unAnsweredQues = ref([]);
let score = ref(0);
let showDialog = ref(false);
const markAsReview = ref([]);

const timeLeft = ref(100);
let timer = null;

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

const startTimer = () => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
      submitAnswer();
    }
  }, 1000);
};

const clearAnswer = (quesId) => {
  delete userAnswered.value[quesId];
};

// Function to format time in minutes and seconds
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};
// =============== Watches for the Question change and storing it into visitedQues =============
watch(quesNo, (newVal) => {
  console.log(newVal);
  if (!visitedQues.value.includes(newVal)) {
    visitedQues.value.push(newVal);
  }
});

// =============== Close and reseting the Exam =============
const closeForm = () => {
  showDialog.value = false;
  quesNo.value = 1;
  userAnswered.value = {};
  unAnsweredQues.value = [];
  score.value = 0;
  visitedQues.value = [1];
  timeLeft.value = 100;
  startTimer();
};

// =============== Selected Answered =============
const selectedAnswered = (quesId, optionId) => {
  userAnswered.value[quesId] = optionId;
};

// =============== Mark as Review =============
const markReview = (QuesId) => {
  if (!markAsReview.value.includes(QuesId)) {
    markAsReview.value.push(QuesId);
  }
  console.log("marked as review", markAsReview.value);
  if (quesNo.value < 5) {
    quesNo.value += 1;
  } else {
    return;
  }
};

// =============== If user visited the question No. ===========
const isVisited = (QuesId) => {
  if (visitedQues.value.includes(QuesId)) {
    if (markAsReview.value.includes(QuesId) && userAnswered.value[QuesId]) {
      return "pink-darken-3";
    }
    if (markAsReview.value.includes(QuesId)) {
      return "orange-accent-4";
    }
    return "primary";
  }
  return "default";
};

// =============== Submit Answer and Calculating the score =============
const submitAnswer = () => {
  for (let question of questions) {
    if (userAnswered.value[question.id] == question.correctAnswerId) {
      score.value += 1;
    }

    if (!userAnswered.value[question.id]) {
      unAnsweredQues.value.push(question.id);
      console.log("Unanswered Questions: ", unAnsweredQues.value);
    }
  }
  showDialog.value = true;
};
</script>

<style scoped>
::v-deep .v-card {
  border-radius: 5px;
}

.timer {
  font-size: 24px;
  color: white;
  border-radius: 2px;
}
::v-deep .v-card--variant-elevated {
  box-shadow: none !important;
}
</style>
