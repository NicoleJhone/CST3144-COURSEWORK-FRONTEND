var webstore = new Vue({
  el: "#app",

  data: {
    sitename: "After School Classes", // Store name
    subjects: [], // Array to hold lesson data
    showsubject: true, // Boolean to toggle between subjects and cart
    sortBy: "subject", // Default sorting criterion
    ascending: true, // Flag for ascending/descending sorting
    searchValue: "", // User search input
    cart: [], // Array to hold items in the cart
    order: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      lessonID: "",
    },
  },

  created: function () {
    // Fetch lessons data when the app is created
    console.log("requesting data from server ...");

    fetch(
      "https://cst3144-coursework-express-js.onrender.com/collection/lessons"
    ).then(function (response) {
      response.json().then(function (json) {
        webstore.subjects = json; // Store fetched data in subjects
        console.log(json); // Log fetched data
      });
    });
  },

  methods: {
    // Add a subject to the cart if space is available
    addToCart(subject) {
      if (this.canAddToCart(subject)) {
        this.cart.push(subject); // Add subject to cart
      } else {
        alert("No more space available for this lesson."); // Alert if no space
      }
    },

    // Check if the subject can be added to the cart based on available space
    canAddToCart(subject) {
      const count = this.getCartItemCount(subject);
      return subject.availableSpace > count; // Return true if space is available
    },

    // Toggle between subjects view and cart view
    showCart() {
      this.showsubject = !this.showsubject;
    },

    // Get the count of a specific subject in the cart
    getCartItemCount(subject) {
      return this.cart.filter((item) => item._id === subject._id).length;
    },

    // Count the number of times an item appears in the cart
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },

    // Remove a subject from the cart
    removeFromCart(index) {
      this.cart.splice(index, 1); // Remove the subject at the specified index
      if (this.cart.length === 0) {
        this.showsubject = true; // If cart is empty, show subjects
      }
    },

    // Validate that name contains only letters
    validateName(name) {
      const nameRegex = /^[A-Za-z]+$/;
      return nameRegex.test(name); // Return true if valid name
    },

    // Validate that phone number contains only numbers
    validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^[0-9]+$/;
      return phoneRegex.test(phoneNumber); // Return true if valid phone number
    },

    // Check if the form is valid by validating name and phone number
    isFormValid() {
      return (
        this.validateName(this.order.firstName) &&
        this.validateName(this.order.lastName) &&
        this.validatePhoneNumber(this.order.phoneNumber)
      );
    },

    // Submit the order if form is valid
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
            body: JSON.stringify(newProduct), // Send order data to the server
          }
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            console.log("Order response:", responseJSON);

            // Update the available space for lessons in the cart
            this.cart.forEach((item) => {
              const quantity = this.getCartItemCount(item); // Get item quantity
              fetch(
                "https://cst3144-coursework-express-js.onrender.com/collection/lessons/" +
                  item._id,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    availableSpace: item.availableSpace - quantity, // Update space
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

            alert("Order has been submitted!"); // Alert user that order is submitted
            this.order.firstName = "";
            this.order.lastName = "";
            this.order.phoneNumber = "";
            this.cart = []; // Empty the cart after checkout
            if (this.cart.length === 0) {
              this.showsubject = true; // Show subjects if cart is empty
            }
          })
          .catch((error) => {
            console.error("Error submitting order:", error);
          });
      } else {
        alert("Missing fields"); // Alert if form validation fails
      }
    },

    // Search for lessons based on the search value
    searchLessons() {
      // Fetch all lessons if search input is empty
      if (this.searchValue.trim() === "") {
        fetch("https://cst3144-coursework-express-js.onrender.com/collection/lessons")
          .then((response) => response.json())
          .then((json) => {
            webstore.subjects = json;
          })
          .catch((error) => console.error("Error fetching all lessons:", error));
        return;
      }
    
      // Build search URL with query parameters
      let url = `https://cst3144-coursework-express-js.onrender.com/search?q=${this.searchValue}`;
      if (this.price) url += `&price=${this.price}`;
      if (this.availableSpace) url += `&availableSpace=${this.availableSpace}`;
    
      // Fetch filtered lessons
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.subjects = data;
        })
        .catch((error) => console.error("Error searching lessons:", error));
    }
    
  },

  computed: {
    // Sort subjects based on selected criteria and direction
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
        subjectsArray.reverse(); // Reverse the order if descending
      }
      return subjectsArray;
    },

    // Get the total count of items in the cart
    cartItemCount: function () {
      return this.cart.length; // Return the total count of cart items
    },
  },
});
