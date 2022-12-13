<template>
  <div class="q-pa-md bg-grey-6" style="max-width: 500px">
    <q-form
      ref="formRef"
      @reset="onReset"
      @submit="addMovie"
      class="q-gutter-md"
    >
      <q-input
        :rules="titleRules"
        v-model="title"
        label="Title"
        standout="bg-pink-9 text-white"
      />
      <q-input
        standout="bg-pink-9 text-white"
        v-model.number="year"
        label="Year of release"
        lazy-rules
        :rules="[
          (val) => val > 1950 || 'Only movies made after 1950 are accepted',
        ]"
      />
      <q-input
        v-model="url"
        standout="bg-pink-9 text-white"
        label="Poster"
        hide-hint
        hint="The poster's URL"
      />

      <q-input
        v-model="description"
        label="A short description"
        autogrow
        standout="bg-pink-9 text-white"
        type="textarea"
      />

      <q-btn :loading="uploading" type="submit" label="Add" color="pink-10" />
      <q-btn flat label="Reset" type="reset" color="pink-10" class="q-ml-sm" />
    </q-form>
  </div>
</template>

<script>
export default {
  emits: ["push-movie"],

  data() {
    return {
      title: "",
      year: undefined,
      url: "",
      uploading: false,
      description: "",
    };
  },

  methods: {
    onReset() {
      this.title = "";
      this.year = undefined;
      this.url = "";
      this.description = "";
    },

    async addMovie() {
      this.uploading = true;
      const data = {
        title: this.title,
        year: this.year,
        url: this.url,
        description: this.description,
      };
      const res = await fetch(
        "https://my-mov-proj-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      this.$emit("push-movie", { ...data, id: result.name });
      this.uploading = false;
      this.$refs.formRef.reset();
    },
  },

  computed: {
    titleRules() {
      return [
        (val) => val.length > 3 || "Title must have at least 3 characters",
      ];
    },
  },
};
</script>

<style scoped>
div {
  border-radius: 12px;
  box-shadow: 0 2px 8px gray;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
