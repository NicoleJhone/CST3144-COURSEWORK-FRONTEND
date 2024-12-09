var webstore = new Vue({
  el: "#app",
  data: {
    sitename: "After School Classes",
    subjects: subjects,
    showsubject: true,
    sortBy: "subject",
    ascending: true,
    searchValue: "",
    cart: [],
  },
  methods: {
    // add to cart button
    addToCart(subject) {
      this.cart.push(subject);
    },
    //if condition for ATC button
    canAddToCart(subject) {
      return subject.availableSpace > this.cartCount(subject);
    },
    // checkout/lesson toggle
    showCart() {
      this.showsubject = !this.showsubject;
    },
    // cart length count
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
    // remove subject from cart
    removeFromCart(index) {
        this.cart.splice(index, 1);
        if (this.cart.length === 0) {
            this.showsubject = true;
        }
    }
  },
  computed: {
    sortedSubjects() {
      let subjectsArray = this.subjects;

      // sort by subjects
      subjectsArray = subjectsArray.sort((a, b) => {
        if (this.sortBy == "subject") {
          let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        } //sort by location
        else if (this.sortBy == "location") {
          let fa = a.location.toLowerCase(),
            fb = b.location.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        } // sort by price
        else if (this.sortBy == "price") {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        } // sort by availability
        else if (this.sortBy == "availability") {
          if (a.availableSpace > b.availableSpace) return 1;
          if (a.availableSpace < b.availableSpace) return -1;
          return 0;
        }
      }); //sort to asc/desc
      if (!this.ascending) {
        subjectsArray.reverse();
      }
      return subjectsArray;
    },
    cartItemCount: function () {
      return this.cart.length;
    },
  },
});
