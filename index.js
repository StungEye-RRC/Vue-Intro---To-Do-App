new Vue({
  el: "#app",

  data: {
    new_todo_item: "",
    to_dos: [
      { text: "Finish Vue Js Lecture", done: false },
      { text: "Watch Vue Js Intro Video", done: true },
      { text: "Learn Javascript Programming", done: true }
    ]
  },

  methods: {
    add_item: function() {
      // Guard statement to prevent empty todo items from being added.
      if (this.new_todo_item === "") return;

      // Add the new item to the to_dos array.
      this.to_dos.push({ text: this.new_todo_item, done: false });

      // Clear out the input that is bound to the new_todo_item.
      this.new_todo_item = "";
    }
  }
});
