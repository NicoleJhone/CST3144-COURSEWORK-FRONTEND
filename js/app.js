var webstore = new Vue({
  el: "#app",
  data: {
    sitename: "After School Classes",
    subjects: [],
    showsubject: true,
    sortBy: "subject",
    ascending: true,
    searchValue: "",
    cart: [],
    order: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      lessonID: "",
    },
    searchValue: "",
  },
  created: function () {
    console.log("requesting data from server ...");

    fetch(
      "https://cst3144-coursework-express-js.onrender.com/collection/lessons"
    ).then(function (response) {
      response.json().then(function (json) {
        webstore.subjects = json;
        console.log(json);
      });
    });
  },
  methods: {
    // add to cart button
    addToCart(subject) {
      if (this.canAddToCart(subject)) {
        this.cart.push(subject);
      } else {
        alert("No more space available for this lesson.");
      }
    },

    //if condition for ATC button
    canAddToCart(subject) {
      const count = this.getCartItemCount(subject);
      return subject.availableSpace > count;
    },
    // checkout/lesson toggle
    showCart() {
      this.showsubject = !this.showsubject;
    },
    getCartItemCount(subject) {
      return this.cart.filter((item) => item._id === subject._id).length;
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
    },
    // Validate name (letters only)
    validateName(name) {
      const nameRegex = /^[A-Za-z]+$/;
      return nameRegex.test(name);
    },
    // Validate phone number (numbers only)
    validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^[0-9]+$/;
      return phoneRegex.test(phoneNumber);
    },
    // Check if the form is valid
    isFormValid() {
      return (
        this.validateName(this.order.firstName) &&
        this.validateName(this.order.lastName) &&
        this.validatePhoneNumber(this.order.phoneNumber)
      );
    },

    //checkout functionality
    saveOrder() {
      if (this.isFormValid()) {
        const newProduct = {
          firstName: this.order.firstName,
          lastName: this.order.lastName,
          phoneNumber: this.order.phoneNumber,
          lessonID: this.cart,
          space: this.cart.length,
        };

        console.log("Submitting order:", newProduct);

        fetch(
          "https://cst3144-coursework-express-js.onrender.com/collection/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            console.log("Order response:", responseJSON);

            // Update available lesson space
            this.cart.forEach((item) => {
              const quantity = this.getCartItemCount(item); //
              fetch(
                "https://cst3144-coursework-express-js.onrender.com/collection/lessons/" +
                  item._id,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    availableSpace: item.availableSpace - quantity,
                  }),
                }
              )
                .then((response) => response.json())
                .then((responseJSON) => {
                  console.log(
                    "Lesson " + item.title + " updated:",
                    responseJSON
                  );
                })
                .catch((error) => {
                  console.error(
                    "Error updating lesson " + item._id + ":",
                    error
                  );
                });
            });

            alert("Order has been submitted!");
            this.order.firstName = "";
            this.order.lastName = "";
            this.order.phoneNumber = "";
            this.cart = [];
            if (this.cart.length === 0) {
              this.showsubject = true;
            }
          })
          .catch((error) => {
            console.error("Error submitting order:", error);
          });
      } else {
        alert("Missing fields");
      }
    },
    searchLessons() {
      // If the search term is empty, don't fetch any results
      if (this.searchValue.trim() === "") {
        this.subjects = [];  // Clear results
        return;
      }
  
      // Construct the search URL with query parameters
      let url = `https://cst3144-coursework-express-js.onrender.com/search?q=${this.searchValue}`;
  
      // Fetch data from the backend API
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.subjects = data; // Update the lessons with the search results
        })
        .catch(error => console.error("Error:", error));
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
