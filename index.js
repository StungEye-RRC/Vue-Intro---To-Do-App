let serializedStorage = {
  STORAGE_KEY: "our_vuejs_to_dos",
  fetch: function() {
    const serialized_to_dos =
      localStorage.getItem(serializedStorage.STORAGE_KEY) || "[]";
    return JSON.parse(serialized_to_dos);
  },

  save: function(to_dos) {
    const serialized_to_dos = JSON.stringify(to_dos);
    localStorage.setItem(serializedStorage.STORAGE_KEY, serialized_to_dos);
  }
};

new Vue({
  el: "#app",

  data: {
    new_todo_item: "",
    to_dos: serializedStorage.fetch()
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
      this.to_dos = this.to_dos.filter(todo => !todo.done);
    }
  },

  watch: {
    to_dos: {
      handler: serializedStorage.save,
      deep: true
    }
  }
});
