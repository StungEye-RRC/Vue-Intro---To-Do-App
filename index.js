const serializedStorage = {
  // The key where we are storing the serialized to dos in localStorage.
  STORAGE_KEY: "our_vuejs_to_dos",
  fetch: function() {
    // Get the serialized to dos. If there are none, return a serialized array.
    const serialized_to_dos =
      localStorage.getItem(serializedStorage.STORAGE_KEY) || "[]";
    // Return the de-serialized array of to dos.
    return JSON.parse(serialized_to_dos);
  },

  save: function(to_dos) {
    // Serialized the array of to do items.
    const serialized_to_dos = JSON.stringify(to_dos);
    // Store the serialized array in localStorage.
    localStorage.setItem(serializedStorage.STORAGE_KEY, serialized_to_dos);
  }
};

new Vue({
  el: "#app", // Bind our app to the div with an id of app in the index.html file.

  data: {
    new_todo_item: "", // Bound using v-model to the sole app input.
    to_dos: serializedStorage.fetch() // Array of todos, pulled from localStorage.
  },

  methods: {
    add_item: function() {
      // Guard statement to prevent empty todo items from being added.
      if (this.new_todo_item === "") return;
      // Add the new item to the to_dos array.
      this.to_dos.push({ text: this.new_todo_item, done: false });
      // Clear out the input that is bound to the new_todo_item.
      this.new_todo_item = "";
    },

    clear_completed: function() {
      // Remove all todo items that are done.
      this.to_dos = this.to_dos.filter(todo => !todo.done);
    }
  },

  watch: {
    to_dos: {
      // Passed to_dos to this function when the array changes.
      handler: serializedStorage.save,
      // Ensure that changes to the properties of the to do items trigger the handler.
      deep: true
    }
  }
});
