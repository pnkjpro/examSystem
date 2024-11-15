<template>
  <div class="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
    <h2 class="mb-6 text-2xl font-semibold text-gray-800">Create a Quiz</h2>

    <!-- Question Form -->
    <div class="space-y-6">
      <!-- Question Input -->
      <div>
        <label for="question" class="mb-2 block text-lg text-gray-700"
          >Question</label
        >
        <input
          type="text"
          id="question"
          v-model="quizForm.question"
          name="question"
          placeholder="Enter your question"
          class="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <!-- Options Input -->
      <div>
        <label class="mb-2 block text-lg text-gray-700">Options</label>
        <div class="space-y-2">
          <div class="flex items-center space-x-3">
            <input
              type="text"
              name="option1"
              v-model="quizForm.options[0].option"
              placeholder="Option 1"
              class="flex-1 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex items-center space-x-3">
            <input
              type="text"
              name="option2"
              v-model="quizForm.options[1].option"
              placeholder="Option 2"
              class="flex-1 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex items-center space-x-3">
            <input
              type="text"
              name="option3"
              v-model="quizForm.options[2].option"
              placeholder="Option 3"
              class="flex-1 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex items-center space-x-3">
            <input
              type="text"
              name="option4"
              v-model="quizForm.options[3].option"
              placeholder="Option 4"
              class="flex-1 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <!-- Correct Answer Input -->
      <div>
        <label for="correctAnswer" class="mb-2 block text-lg text-gray-700"
          >Correct Answer</label
        >
        <select
          id="correctAnswer"
          name="correctAnswer"
          v-model="quizForm.correctAnswerId"
          class="block w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="1">{{ quizForm.options[0].option }}</option>
          <option value="2">{{ quizForm.options[1].option }}</option>
          <option value="3">{{ quizForm.options[2].option }}</option>
          <option value="4">{{ quizForm.options[3].option }}</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          @click="QuestionId++"
          class="w-full rounded-md bg-blue-500 py-3 my-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Question
        </button>
        <button
          @click="createQuiz"
          class="w-full rounded-md bg-blue-500 py-3 my-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create Quizzes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";

let QuestionId = ref(1);
let quiz = [];

const initialQuizForm = {
  id: 1,
  question: "",
  options: [
    { id: 1, option: "" },
    { id: 2, option: "" },
    { id: 3, option: "" },
    { id: 4, option: "" },
  ],
  correctAnswerId: null,
};

const quizForm = ref(JSON.parse(JSON.stringify(initialQuizForm)));

watch(
  () => QuestionId.value,
  (newId, oldId) => {
    quizForm.value.id = oldId;
    quiz.push(quizForm.value);
    quizForm.value = JSON.parse(JSON.stringify(initialQuizForm));
    console.log("Reset Quizzes: ", quizForm.value);
  }
);

const createQuiz = () => {
  axios.post(`https://app.ritdos.com/api/create/examsheet`, {
    quiz: quiz,
    exam_name: "ccc",
  });
};
</script>
